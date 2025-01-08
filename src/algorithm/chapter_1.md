# 查缺补漏

### 宏定义
替换对应部分，进行编译与运行 末尾不加分号
### 条件运算符
`(bool ? A : B)` 如果bool为true, return A; bool为false, return B;
### 位运算符
```
a << x  //a按照二进制每位左移x
a >> x  //a按照二进制每位右移x
a ^ B   //按位异或
a & b   //按位与
a | b   //按位或
~a      //按位非
```
### INF(无穷大)
`const int INF = 0x3fffffff`
`const int INF = (1 << 30) - 1` 
### scanf
本质为输入双引号内所有内容，按照格式符替换
数组不用& 因为数组虽然不是指针，但是会自动退化为第一个元素的地址
scanf会自动跳过空白符（除了%c）
### printf
`%% -> %`
`\\ -> \`
### 实用输出格式
```
%md   //右对齐输出 高位用空格补齐 超过m直接输出
%0md  //用0来填充而不是空格
%.mf  //取m位小数点（四舍六入五成双）
```
### getchar putchar
`ch = getchar()` 会捕捉\n
`putchar(ch)`    输出单个字符
### typrdef
`typedef 一长串 名字`
### cmath
大部分cmath传入和传出的都是double
```
fabs (db)       //绝对值
floor(db)       //下取整
ceil (db)       //上取整
pow  (db,db)    //幂函数
sqrt (db)       //平方根
log  (db)       //其实是ln
sin  (db)       //sin
cos  (db)       //cos
tan  (db)       //tan
asin (db)       //arcsin
acos (db)       //arccos
atan (db)       //arctan
round(db)       //四舍五入
```
### 数组
函数内部变量开辟空间于系统栈
全局变量开辟空间来着静态存储区
1e6以上有爆栈风险
### memset
`memset(a, 0, sizeof(a))`一般只赋值0和-1
### gets
`gets(str)`被废了（C11）
`fgets(str, sizeof(str), stdin)`是替代品，但是会读取`\n`，所以要用`str[strcspn(str, "\n")] = 0;`去除
`gets()`可以吸收一个字符串，小心前面有`\n`,要用`getchar()`吸收一下
`gets()`以`\n`结束读取
`puts()`输出字符串后直接换行
### 字符数组的存放方式
`gets` `scanf`会自动在结尾加`\0`
`printf` `puts`会自动识别结尾的`\0`
所以储存的时候要预留一位
### cstring
```
strlen(ch_arr)            //返回长度（\0前字符数量）
strcmp(ch_arr1, ch_arr2)  //按照字典序比大小，< 返回负数 > 返回正数 ==返回0
strcpy(ch_arr1, ch_arr2)  //复制ch_arr2包含\0在内到ch_arr1
strcat(ch_arr1, ch_arr2)  //拼接ch_arr2到ch_arr1后面
```
### sscanf
`sscanf(ch_arr, "%d", &num)` 把ch_arr里面的数字当成数字输入到num里面
其它类型数据也可以同样处理
### sprintf
`sprintf(ch_arr, "%d, num)` 把num写到ch_arr里面
其它类型数据也可以同样处理

### 数组作为函数参数
数组第一维不需要长度
数组第二维需要长度
### 指针是一个unsigned类型的整数
`int *p = &num` 这样给指针赋值。
指针解引用后的是对象本身
### 引用
相当于起别名，给指定对象一个其他的标识符，不是取地址
### 结构体
结构体不能定义自己，但是可以定义指向自己的指针
结构体的初始化，如果自己改了构造函数，就得初始化结构体变量
所以可以重载构造函数，享受福利
### cin
```
cin.getline(ch_arr, length) \\读入一整行
getline(cin, string)        \\读入一整行
```
### eps
由于浮点数的精度误差，需要一个范围判断两数相等
经验表明1e-8差不多
```
const double eps = 1e-8;
#define Equ(a,b)     (((fabs((a)-(b)))) < (eps))  //等于
#define More(a,b)    (((a) - (b)) > ( eps))       //大于
#define Less(a,b)    (((a) - (b)) < (-eps))       //小于
#define MoreEqu(a,b) (((a) - (b)) > (-eps))       //大等于
#define LessEqu(a,b) (((a) - (b)) < ( eps))       //小等于
```
### 圆周率
`const double Pi = acos(-1.0);`
### 浮点数有关
- 因为精度问题，0可能是一个负数，无法sqrt
- 因为编译环境问题可能会出现-0.00，可以将结果存为字符串与-0.00对比并加上eps修正
### 复杂度
OJ的运算能力为1e7~1e8 / s
空间复杂度指消耗最大的数据空间，一般够用，所以用空间换时间
编码复杂度指代码量
### 黑盒测试
通过`scanf("%d", &n) != EOF` 或者 `gets(str) != NULL`判断是否到达输入末尾

