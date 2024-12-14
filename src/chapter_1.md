# Chapter 1
## 算法初步
### 排序
##### 选择排序
##### 插入排序
##### sort 
### 散列（hash）
bool数组存储每个数是否存在
int数组存储出现次数
通过数组下标查找

### 整数散列函数
把 key值 -> H(key)
常见散列函数
直接定址法 ： H(key) = key
线性变换法 ： H(key) = a * key + b
平方取中法 ： 取key平方中的一些数字
除留余数法 ： H(key) = key % mod
##### 冲突
不同的key对应H(key)相同
线性排查法 H(key)+k
平方探查法 H(key)+k^2
拉链法     key值相同存到线性链表
也可以用`map`和`unordered_map`
### 字符串散列函数
二维整点映射 0 <= x,y <= range; h = x * range + y
字符串
A~Z 26进制
A~Z a~Z 52进制
A~Z a~z 0~9 62进制
### 递归
递归边界 递归式
全排列问题
n皇后问题
回溯法（提前检测是否满足，从而及时止损）
### 贪心
##### 简单贪心
##### 区间贪心
注意开闭区间
区间不相交问题 
- 去除有子区间的区间，按照左端点排序，一旦出现一个不重合的改目前区间
  
区间选点问题
- 同上，

### 二分
需要严格递增序列
##### 二分查找
- 不确定有无的寻找
```
int binary_search(int arr[], int n, int left, int right)
{
    int mid = left + (right - left) / 2;
    while (left <= right)
    {
        mid = left + (right - left) / 2;
        if (arr[mid] == n)
        {
            return mid;
        }
        else if (arr[mid] > n)
        {
            right = mid -1;
        }
        else
        {
            left = mid + 1;
        }
    }
    
    return -1;
}
```
- 寻找第一个大于等于的
```
int lowerbound(int A[], int x, int left, int right)
{
    int mid;
    while (left < right)
    {
        mid = left + (right - left) / 2;
        if (A[mid] >= x)
        {
            right = mid;
        }
        else
        {
            left = mid + 1;
        }
    }
    return left;
}


```

- 寻找第一个大于的
```
int upperbound(int A[], int x, int left, int right)
{
    int mid;
    while (left < right)
    {
        mid = left + (right - left) / 2;
        if (A[mid] > x)
        {
            right = mid;
        }
        else
        {
            left = mid + 1;
        }
    }
    return left;
}
```
##### 二分夹逼
##### 快速幂
```
typedef long long LL
LL binaryPow(LL a, LL b, LL m)
{
    if (b == 0) return 1;
    if (b % 2 == 1) return a * binaryPow(a, b -1, m) % m;
    else 
    {
        LL mu1 = binaryPow(a, b / 2, m)
        {
            return mu1 * mu1 % m;
        }
    }
}
```
迭代写法
```
typedef long long LL
LL binaryPow(LL a, LL b, LL m)
{
    LL ans = 1;
    while (b > 0)
    {
        if (b > 0)
        {
            if (b & 1)
            {
                ans = ans * a % m;
            }
            a = a * a % m;
            b >>= 1;
        }
    }
    return ans;
}
```
### Two Pointer 
单调递增的数组
##### 寻找和为m的组合
```
while(i<j)
{
    if (a[i] + a[j] == m)
    {
        i++;j++;
    }
    else if (a[i] + a[j] < m)
    {
        i++;
    }
    else j--;
}
```
##### 2-路归并排序
```
const int maxn = 100;
void merge(int A[],int l1, int l2,int r1,int r2)
{
    int i = l1 ,j = l2;
    int tmp[maxn],index=0;
    while (i <= r1 && j <= r2)
    {
        if (A[i] < A[j]){
            tmp[index++] = A[i++];
        }
        else{
            tmp[index++] = B[j++];
        }
    }
    while (i <= r1) tmp[index++] = A[i++];
    while (j <= r2) tmp[index++] = B[j++];
    for (i = 0; i< index; i++)
    {
        A[l1+1] = tmp[i];
    }
    void mergeSort(int A[], int l, int r ){
        if(l < r)
        {
            int mid = l + (r - l) / 2;
            mergeSort(A, l, mid);
            mergeSort(A, mid + 1, r);
            merge(A, l, mid, mid+1, right);
        }
    }
}

```
非递归实现
```
void mergeSort(int A[])
{
    for (int step = 2; step / 2 <= n; step*=2){
        for(int i = 1; i <= n; i+= step )
        {
            int mid = i + step / 2 - 1;
            if (mid + 1 <= n)
            {
                merge(A, i, mid, mid+1, min(i+step-1, n));
            }
        }
    }
}
```
##### 快速排序
- 把A[1]存起来tmp，left = 1， right = 末尾。
- A[right] => tmp,right--,如果A[right]<tmp;A[left] = A[right]
- A[left] <= tmp, left++,如果A[left]>tmp;A[right] = A[left]
- left == right A[left]=tmp;

```
int partition(int A[], int left, int right)
{
    int temp = A[left];
    while(left < right)
    {
        while(left < right && A[right] > tmep)
        {
            right--;
        }
        A[left] = A[right];
        while(left < right && A[left] <= temp>) left++;
        A[right] = A[left];
    }
    A[left] = temp;
    return left;
}
void Quick(int A[], int left, int right)
{
    if (left < right)
    {
        int pos = partition(A,left,right);
        Quick(A, left, pos -1);
        Quick(A, pos + 1, right);
    }
}
```
##### 随机快排
先生成一个范围内的随机数，将A[left] 与 A[随机数]交换，剩下一样。

### 其他高效思想
##### 打表
##### 寻找通项公式
##### 随机选择算法
通过随机快速排序，每次随机选择一个数排序，并切割数组，直到随机到第K大的数字
存在O(n)的选择算法