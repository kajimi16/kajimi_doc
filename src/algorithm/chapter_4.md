# 数学入门
### 简单数学模拟
### 最大公约数 最小公倍数
##### 欧几里得算法（辗转相除法）
`gcd(a,b)=gcd(b, a%b);`
b==0时return b;
最小公倍数 = a / gcd * b;
### 分数
用 struct 存 up分子 down分母
分子为0分母为1
分母为负上下取相反数
化简上下同除gcd
加减乘除进行模拟
分子分母最好用LL保存（乘法可能越界）
### 质数
##### 埃氏筛
一个存储质数的数组
一个存储取值范围内每个数是不是质数的bool数组
从遍历取值范围，如果是质数，那么把所有范围内它的质数标记为合数
`for(int j = i*i; j <= max; j+=i);`
##### 质因子分解
用struct factor存质因子和出现次数
开到10就够了，因为10个就超过int了
遍历之前的质数表（< sqrt(num)），不断用输入的数字除以，如果遍历完还不为0
说明还剩余一个本身目前的值
### 高精度
大数字可以开成struct 存贮数组和长度
加入构造函数进行初始化
##### 高精度加法
##### 高精度乘法
##### 高精度减法
记得用大的减小的
记得去除前导0
```cpp
while (c.len - 1 >= 1 && c.d[c.len-1] == 0)
{
    c.len--;
}
```
##### 高精度除法
从高位开始
每次carry 一个余数
carry *10 + a.d[i];
carry %= b;
记得去除前导0
### 扩展欧几里得算法
##### 求ax + by = gcd(a,b)的解
```cpp
int exGcd(int a, int b, int &x, int &y)
{
    if (b == 0)
    {
        x= 1; y = 0;
        return a;
    }
    int g = exGcd(b, a % b, x, y);
    int temp = x;
    x = y;
    y = temp - a / b * y;
    return g;
    
}
```
得到的x y 为特解
x = x + (b / gcd(a,b)) * 任意整数
y = y - (a / gcd(a,b)) * 任意整数
##### ax + by = c
如果`c % gcd(a,b) == 0`
特解x,y为 exgcd结果*(c/gcd(a,b))
x = x + (b / gcd(a,b)) * 任意整数
y = y - (a / gcd(a,b)) * 任意整数
##### 同余式(ax-c)%m == 0
化为 ax + my = c 求解
同样如果`(c % gcd(a,m) == 0)`有解，且恰好有gcd(a,m)个mod m意义下不同的解；
特解x,y为 exgcd结果*(c/gcd(a,m))
x = x + (m / gcd(a,m)) * 任意整数
y = y - (a / gcd(a,m)) * 任意整数
##### 逆元的求解与(b/a)%m的计算
逆元：(ab-1)%m == 0;a b互为逆元
(b / a )% m = (b * x) % m; a x互为逆元
通过求解(ax - 1)%m==0得到逆元x
如果 1%gcd(a,m)为0就有唯一解

##### 费马小定理
如果m是素数，a为任意整数且a%m!=0,那么$(a^{m-1}-1) \% m = 0$
所以逆元就是$a^{m-2}$用快速幂很快就能得到答案
##### 如果都失效怎么办
(b / a) % m = (b % (am)) / a;

### 组合数
##### 求n！里面的质因子p数目
朴素思想遍历1~n
简化一
n!里面质因子数量 = $\frac{n}{p} + \frac{n}{p^2}+\cdots$
可以求0的数量（5的数量）
##### 组合数的计算
- 朴素模拟21！直接爆
- 实际上C(m,n)=C(m,n-1)+C(m-1,n-1);
 用数组存储结果
- 也可以牺牲范围用定义式的变形
```cpp
LL C(LL n, LL m)
{
    LL ans = 1;
    for (LL i = 1;i <= m; i++)
    {
        ans = ans * (n - m + i) / i;
    }
    return 0;
}
```
##### 组合数的计算%p
###### 方法一 n-1e5 m-1e5
递推的每一步%p
###### 方法二 n-1e6 m-1e6
对定义式进行计算
C(m,n) = n! / m! (n - m)!
计算每个阶乘的每个质因子的数量，用快速幂得到每个质因子次方%p的数量再%p
###### 方法三 n-1e9 m-1e5 p-prime
对定义式的变形计算
m < p p为质数
```cpp
int C(int n, int m, int p)
{
    int ans = 1;
    for (int i = 1; i <= m; i++)
    {
        ans = ans * (n - m + i) % p;
        ans = ans * inserve(i,p) %p;
    }
    return ans;
}
```
m >= p p为素数
先统计分子分母里面p的数量
如果分子p比分母多，直接输出0
如果一样多，去除p的成分，再正常计算逆元
```cpp
int C(int n, int m, int p){
    int ans = 1; numP = 0;
    for (int i = 1; i <=m; i++)
    {
        int tmp = n-m+i;
        while(tmp %p==0)
        {
            numP++;
            tmp/=p;
        }
        ans = ans * tmp % p;
        tmp = i;
        while(tmp % p == 0){
            numP--;
            tmp/=p;
        }
        ans =ans * inverse(tmp, p) % p;
    }
    if (numP > 0) return 0;
    else return ans;
}
```
如果p不是质数呢
把p质因子分解，求出分子比分母多余的各个质因子，快速幂对这些多余质因子的乘积取余
另一边去除所有质因子后对属于部分逆元计算
也可以把分子分母全质因子分解，得到多余的质因子，进行运算取模。

###### 方法四 n-1e18 m-1e18 p-prime-1e5
```cpp
int Lucas(int n, int m){
    if (m == 0) return 1;
    return C(n%p,m%p) * Lucas(n/p,m/p) % p;
}
```
