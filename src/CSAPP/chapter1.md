# 第1章 计算机系统漫游
在我看来，第一部分的内容就是带我们过了一遍计算机系统的整体架构。 
它用20多面传达了一个思想————**你懂了1%，就懂了99%**。 
我们要学会构建一个黑盒子（抽象），对于里面的组成，我们不去了解，而是当成一个实现了某种功能的整体去使用它，只有在真正需要知道原理不可的时候，再去深入研究。 （就像你学走路的时候不用了解身体是怎么构造的，知其然不知其所以然有时候可以有效降低学习成本，简易理解）
闲话少说，围绕大部分人写的第一个c语言程序，让我们开始计算机系统漫游。
```c
#include <stdio.h>

int main() {
    printf("Hello, world!\n");
    return 0;
}
```
### 1.1信息就是位+上下文
从ASCLL标准开始，这里引出了重要概念，**系统中所有的信息—包括磁盘文件、内存中的程序、内存中存放的用户数据以及网络上传送的数据，都是由一串比特表示的。** 
简而言之，8个位（0/1）搭包成一个字节，字节组成文件，由ASCLL组成的叫文本文件，c语言源文件就是一个文本文件。剩下的都叫二进制文件。 
我们不禁发出疑问，都是一堆1和0，计算机怎么知道它们是什么呢？ 
这就是上下文的作用，上下文解释了这些字节是什么。
### 1.2程序被其他程序翻译成不同的格式
众所周知，我们的c语言是高级语言，计算机看不懂。 
我们的helloworld程序要运行，需要以下步骤
- 预处理器阶段：预处理器把我们的`#include<stdio.h>`替换成预制好的代码（stdio.h）
- 编译阶段：编译器把预处理后的代码翻译成汇编语言
- 汇编阶段：汇编器把汇编语言翻译成机器语言，现在电脑看得懂了
- 链接阶段：链接器把多个目标文件（.o文件）和库文件（.a文件）链接成一个可执行文件（比如我们的helloworld用到了printf函数，需要把printf.o链接进来）

这么折腾完之后，我们就得到了可执行文件，可以运行在计算机上。 

### 1.3了解编译系统如何工作是大有益处的
跳过，因为这里再讲接下来哪几章会提到编译器的什么内容，**看不懂说是**

### 1.4处理器读并解释储存在内存中的指令
现在我们要运行helloworld程序，表面上，我们看见黑框里面出现了"hello, world!"，实际上，内部又发生了什么呢？ 
#### 硬件组成
- 总线：贯穿整个系统的一组电子管道，它携带信息字节并负责在各个部件间传递。总之电线说是（x）
- I/O设备：输入/输出设备，比如键盘、显示器、鼠标、磁盘、网络接口等。输入输出设备和总线依靠适配器/控制器连接。
- 主存：在处理器执行程序时，用来存放程序和程序处理的数据。俗称内存（x
- CPU：解释(或执行）存储在主存中指令的引擎。
  - PC：程序计数器，记录下一条要执行的指令的地址。
  - 寄存器：CPU内部的小容量存储器，用来暂存指令或数据。
  - ALU：算术逻辑单元，用来执行算术和逻辑运算。
总之，这么一堆精密复杂的东西构成了CPU，通过把数据在主存，ALU，寄存器之前移动或操作，完成了各种机器代码指令。 
实际上没有这么简单，剩下的以后细说说是。
#### 运行hello程序
接下来大体讲一下具体运行
- shell程序把命令送到寄存器，再存到内存
- 回车完成命令输入，shell把hello的代码和数据从磁盘复制到内存
  - 数据通过DMA（直接存储器存取）从磁盘复制到主存（可以不经过CPU）
- CPU从内存中取出指令并执行
- 指令最终达成把"hello,world\n"从主存移动到寄存器文件，再复制到显示器。

### 1.5高速缓存至关重要
我们可以发现，有很多时间浪费在了信息的挪动上，显然，如果能加速信息复制的时间开销，程序就能运行得更快。 
众所周知，空间越大，访问时间越慢，于是CPU引入了cache（高速缓存）来解决这个问题。在高速缓存里面加入经常访问的数据，从而达到了加速的作用。
### 1.6存储设备形成层次结构
为了兼得大空间和低访问时间，CPU引入了存储设备的层次结构。 
- L0：寄存器
- L1：L1高速缓存
- L2：L2高速缓存
- L3：L3高速缓存
- L4：主存
- L5：磁盘
- L6：网络

越上层，空间越小，访问时间越快；。借用层次结构，我们提高了程序性能。
### 1.7操作系统管理硬件
先思考一个问题，为什么进行编程的时候我们不用考虑底层硬件的细节，也不用考虑其他程序的干扰？ 
实际上是操作系统通过抽象，实现了
- （1）防止硬件被失控的应用程序滥用
- （2）向应用程序
提供简单一致的机制来控制复杂而又通常大不相同的低级硬件设备。
#### 进程
在程序运行的时候（比如我们的helloworld），操作系统创造了系统只有它在运行的假象，称为进程。 
进程是操作系统对一个正在运行的程序的一种抽象。操作系统可以通过保存进程的上下文，实现了CPU的并发执行（反复横跳，就是说看起来一个CPU在运行多个进程，实际上只是快速切换而已）。
比如A进程先跑了一段时间，B进程来了，A的上下文被存起来，B进程开始运行，B运行完了，再通过A被存储的上下文继续A。 
这个转化的由操作系统内核（kernel）管理，它实际上是操作系统代码常驻主存的部分，是系统管理全部进程所用代码和数据结构的集合。
#### 线程
**看不懂说是**
#### 虚拟内存
还有个有意思的问题，为什么我们设计程序的时候不用管乱七八糟的字节存在哪里？ 
实际上，操作系统通过虚拟内存，实现了进程独占主存的假象。并且虚拟地址空间被明确分成了具有准确定义的区，包括
- 程序代码和数据
- 堆
- 共享库
- 栈
- 内核虚拟内存
#### 文件
文件其实就是字节序列。但是超出想象的是，各种设备（比如鼠标键盘屏幕）都被看成文件。 
通过这种抽象，我们可以通过统一的方法去用不同的设备，也可以让同一个程序在不同的环境下运行。
### 1.8系统之间利用网络通信
从现在开始，我们即将脱离单机模式，进入Internet。 
还是helloworld，我们可以通过新的方式运行
- 在键盘输入hello
- 客户端像服务器发送hello请求
- 服务器运行hello程序，产生"hello,world\n"
- 服务器把结果发送给客户端
- 客户端把结果显示在屏幕上。

### 1.9重要主题
这一块讲了一堆散装概念
#### Amdahl定律
假如我们把程序中a比例的时间缩短到1/k，那么总体的时间会变成$ T_{new} = (1 - a)T_{old} + \frac{aT
_{old}}{k} $
那么整体加速比就为
$S = \frac{1}{(1 - a) + \frac{a}{k}}$
#### 并发和并行
并发就是一个有多个活动的系统，并行就是用并发让程序运行得更快。
- 线程级并发：多个线程快速切换
- 指令级并行：多个指令同时执行
- 单指令多数据并行：一条指令处理多个数据
#### 抽象的重要性
现在我们可以看出，计算机系统一直在做抽象这件事来建立可以直接使用的简单有序的模型，从而降低各方面的开销以及提高性能。
### 1.10小结
你在看的已经是小结了，何必再看一个小结（笑）。

写于2025年1月8日21:21:47