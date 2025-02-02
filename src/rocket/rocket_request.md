# Rocket Request
这部分感觉就是大的要来了，密密麻麻的官方文档目录，看着有点害怕 
### methods
按照我的理解就是``` get post put delete ```这些路由属性响应的http method（方法）
```rust
#[post("/")]
```
就像这一个例子，它会把POST请求match（匹配）到路径"/"上（这里的POST需要和post这个属性区分语义）
#### 特性1 HEAD Requests
在GET路由存在的情况下，rocket会剥离response的body，达到自动处理HEAD请求的目的。 
当然，也可以explicitly（显式地）声明head请求的处理方式。
#### 特性2 Reinterpreting
因为浏览器只允许对HTML forms进行GET或POST的request以进行上传。 Rocket会在特定的条件下对request method进行reinterpretation（重新解释）以适应浏览器的限制。 
引用官方文档的例子：
If a POST request contains
-  a body of `Content-Type: application/x-www-form-urlencoded `
-  the form's first field has the name `_method `
-  a valid HTTP method name as its value (such as `"PUT"`), that field's value is used as the method for the incoming request.  

这允许Rocket应用程序提交非POST表单。  
比如官方提供的 [todo](https://github.com/rwf2/Rocket/blob/v0.5/examples/todo/static/index.html.tera#L47) 案例就利用了这个特性来从一个网页表单（web form）上传（submit） PUT和DELETE 请求（requests）。 

### Dynamic Paths（动态路径）
```rust
#[get("/hello/<name>")]
fn hello(name: &str) -> String {
    format!("Hello, {}!", name)
}
```
看到被尖括号包含的name了吗，这个就是一个动态路径。 
如果我们mount了"/"这个根路径(.mount("/", routes![hello])
接下来每个有两个路径segment（片段）的请求，只要第一个是hello，第二个就会变成name的值。  
接下来我们就可以hello乱七八糟的东西了（ 
实际上只要有各种FromParem的trait，都可以作为动态路径的一部分。这些类型被叫作parameter guards（参数守卫）。 
#### Multiple Segments
这里我们又有了implement (实现)`FromSegments`（特征）的segments guards（片段守卫），可以匹配多个路径片段。  
段守卫必须是路径的最后一个组件：任何位于段守卫之后的文本都将导致编译时错误（runtime error）。   
```rust
use std::path::PathBuf;

#[get("/page/<path..>")]
fn get_page(path: PathBuf) { /* ... */ }
```
比如这个例子就可以匹配所有page开头的路径，后面跟着任意数量的路径片段。
这么搞有什么好处呢，比如可以快速简洁地防止 Path Traversal（路径遍历）攻击。 
这个攻击有一个很有意思的名字可以概括它的原理——dot-dot-slash，比如在一些操作系统里面可以用./..访问当前目录的上级目录，而这可能不是我们需要的结果，我们就可以通过这种方式来阻止这种行为。
比如下面是官方文档一个4行代码实现安全静态文件服务的例子：
```rust
use std::path::{Path, PathBuf};
use rocket::fs::NamedFile;

#[get("/<file..>")]
async fn files(file: PathBuf) -> Option<NamedFile> {
    NamedFile::open(Path::new("static/").join(file)).await.ok()
}
```
这里的file参数是一个PathBuf，可以匹配任意数量的路径片段。 
#### Ignored Segments
感觉这里没什么好说的
- `<_>`：忽略一个片段
- `<-..>`：忽略多个片段
### Forwarding (转发)
在匹配路由的过程中，Rocket会按照路由声明的顺序进行匹配，如果有多个路由匹配到同一个请求，Rocket会选择最先声明的那个路由。 
每个路由都有一个associated priority（优先级）属性。当然，也可以手动规划rank这个属性来手动规划匹配顺序。 
```rust
#[get("/user/<id>")]
fn user(id: usize) { /* ... */ }

#[get("/user/<id>", rank = 2)]
fn user_int(id: isize) { /* ... */ }

#[get("/user/<id>", rank = 3)]
fn user_str(id: &str) { /* ... */ }

#[launch]
fn rocket() -> _ {
    rocket::build().mount("/", routes![user, user_int, user_str])
}
```
依然用例子来学习，
这个例子会先进行匹配"/user/<id>"，因为它是最先声明的路由。如果不匹配 
然后匹配"/user/<id>"的isize版本，因为它比usize版本的rank属性更高。如果不匹配 
最后匹配"/user/<id>"的&str版本，因为它比的rank属性最高。 
可以用Result的枚举类型来搞事情   
比如user函数的id参数类型是Result<usize, &str>，那么user路由就永远不会forward（转发）。Ok变体表示<id>是一个有效的usize，而Err变体表示<id>不是一个usize。Err的value包含了无法解析为usize的字符串。
#### Default Ranking（预制排序）
预制排序有-12到-1的档次，越低优先级越高，和path和query（查询参数）的color（特色）有关。 
color分四种：
- static 
  - 对于path（-8）对于query（-4）
  - 表示所有路径都是静态的
- partial
  - 对于path（-4）对于query（-3）
  - 表示路径的有动有静
- wild
  - 对于path（-0）对于query（-2）
  - 表示路径全动态
- none 
  - 对于query（-1）
  - 表示没有传入参数

按照上述规则相加可以得到default rank（默认排序），可以看出这个预制参数越小表示越静态
### Request Guards
作为官方文档认为的rocket的最强组件，request guards（请求守卫）可以让我们在路由处理函数（handler）之前对请求进行预处理。 很显然，根据举一反三，请求守卫具有`FromRequest`的trait。 
它通常代表着一个validation policy（验证策略），比如验证请求参数是否合法，或者检查请求是否来自某个IP地址。 
实际上它一般被当成输入来使用，实际上在Rocket分发请求之前，会自动搞一些守卫对handler进行验证。 只有被验证通过的handler才会被分发请求。 
#### Custom Guards
我们可以自己实现请求守卫，只需要给自己的类型实现`FromRequest`的trait。这样就可以保证只有满足对应条件的情况下，参数列表里含有对应type的handler才会被分发请求。 
```rust 
#[get("/sensitive")]
fn sensitive(key: ApiKey) { /* .. */ }
```
这里的`ApiKey`类型就是一个自定义的请求守卫，它会在请求处理之前进行验证。 
#### Guard Transparency
守卫透明性解释了为什么对于敏感的请求参数，我们需要在路由处理函数之前进行验证。 
请求守卫提供了编译时验证，意味着敏感信息在编译时就已经得到了保证。 
```rust
fn health_records(user: &SuperUser) -> Records { /* ... */ }
```
以上述代码为例，
- health_records函数需要&SuperUser类型
- SuperUser类型的唯一构建者是`FromRequest`.
- 只有Rocket可以通过`FromRequest`提供&Request.
- 所以调用health_records的请求必须是来自SuperUser的请求。
#### Forwarding Guards
```rust
use rocket::response::Redirect;

#[get("/login")]
fn login() -> Template { /* .. */ }

#[get("/admin")]
fn admin_panel(admin: AdminUser) -> &'static str {
    "Hello, administrator. This is the admin panel!"
}

#[get("/admin", rank = 2)]
fn admin_panel_user(user: User) -> &'static str {
    "Sorry, you must be an administrator to access this page."
}

#[get("/admin", rank = 3)]
fn admin_panel_redirect() -> Redirect {
    Redirect::to(uri!(login))
}
```
直接上代码，告诉你为什么转发和守卫结合非常强大。 
上述代码，实现了只有SuperUser才可以访问admin_panel路由，而普通用户只能看到一个错误信息。
而如果前两个函数没有任何一个成功，就会转发到admin_panel_redirect路由，因为它没有请求守卫，所以它可以100%成功地把失败的请求转发到login路由。 
#### Fallible Guards
***错误处理这块施工中，看得不是很懂***

### Cookies
CookieJar结构体是一种对多个cookie进行增改删的玩意。 
