# Rocket学习笔记
### Introduction
打开我们rocket web框架的官方文档，首先看到Introduction部分，可能介绍了它好在哪里，那么对于我没有意义（因为我不知道不同框架，也没用过其他web框架） 
### Upgrading
接着跳过Upgrading，因为我还没用过，所以知道0.5升级了什么没有意义。
### Quickstart
然后看到quickstart，里面给出了可以快速实践的例子。
```
git clone https://github.com/rwf2/Rocket
cd Rocket
git checkout v0.5
cd examples/hello
cargo run
```
实际上hello这个项目就是创建了一个有hello文字的页面（）。
### Getting Started
这部分先告诉你去下载rustup（毕竟rocket是rust语言的框架）。这部分应该都已经预先完成了吧（？ 
接下来Getting Started部分会让你打一个helloworld的例子（万物起源hello,world），然后让你运行它。 
cargo new 一个新项目，加入依赖
```toml
[dependencies]
rocket = "0.5.1"
```
然后再main.rs中加入代码,主体如下：
```rust
#[macro_use] extern crate rocket;

#[get("/")]
fn index() -> &'static str {
    "Hello, world!"
}

#[launch]
fn rocket() -> _ {
    rocket::build().mount("/", routes![index])
}
```
大概是这样，对于我来说大概就是天书，好在接下来的章节将围绕这部分细节开始。

### Overview
围绕上述的例子，官方文档展开了精确到行的解析
rocket把从request到response的过程分成了几个步骤（lifecycle）：
- Routing    (路由)
- Validation (验证)
- Processing (处理)
- Response   (响应)

#### Routing
- A set of parameters to match an incoming request against.
- A handler to process the request and return a response. 

个人理解路由是与输入请求相匹配的一组参数和一个处理委托并返回响应的函数。 
（A handler is simply a function that takes an arbitrary number of arguments and returns any arbitrary type. handler 是一个接受任意数量参数并返回任意类型的函数。） 
那么结合上面的代码我们就可以知道如下代码起到路由声明的作用
```rust
#[get("/")]                   // <- route attribute 路由分发
fn index() -> &'static str {  // <- request handler 请求函数
    "hello, world!"
}
```
#### Mounting
完成了路由声明，接下来是挂载（mount）路由。 
在分发委托给路由前，路由需要被挂载 
```rust
rocket::build().mount("/", routes![index])
```
这里我们可以注意到"/"和声明部分get后面是一致的（实际上并不需要），而routes!后面内容和index函数名一致。 
前面部分是路由所在基础路径（base path），后面部分是要挂载到对应基础路径的路由。 
现在GET请求到达"/"路径时，将会调用index函数并返回"hello, world!"。 

#### Launching
Rocket（火箭）已经制作得差不多了，现在该Launch（发射）了。
发射一般有两种方式，第一种，也是最被欢迎的一种，就是通过```#[launch] ```路由分发 (第二种通过```#[rocket::main]```)
它会产生一个main函数并且启动server
```rust
#[macro_use] extern crate rocket;

#[get("/world")]
fn world() -> &'static str {
    "Hello, world!"
}

#[launch]
fn rocket() -> _ {
    rocket::build().mount("/hello", routes![world])
}
```
终于，我们复现了所有的代码。

#### Futures and Async
***看不懂说是***