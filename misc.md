
# misc


SaaS 平台：[氚云](https://h3yun.com/index.php?g=Chuanyun&m=Scene&a=index)、[搭搭云](https://www.dadayun.cn/)

S.O.L.I.D 原则：

```txt
S：单一职责原则
O：开闭原则
L：里氏替换原则
I：接口隔离原则
D：依赖倒置原则
```

https://github.com/donnemartin/system-design-primer

you can't bind to ports <1024 if you are not root. 想要起 http://localhost 这样的默认 80 端口服务器，就需要系统自带的 Apache 设置，其他 server 需要有 sudo 权限和关联系统启动项、不方便。

- 注意：mac不区分文件名的大小写，类名及文件名大小写改变后，不会自动刷新。编译时可能抛出“找不到类”的错误，要重新删除相应文件，再下载下来
- Docker 镜像加速地址：登录阿里云、找到 Docker Hub 镜像站点，拷贝专属加速器地址。

编程语言分类：http://hyperpolyglot.org/

## Java

- [为什么我要改用Kotlin](https://droidyue.com/blog/2017/05/18/why-do-i-turn-to-kotlin/index.html)
- [数据库深度解析 | 从NoSQL历史看未来](https://mp.weixin.qq.com/s?__biz=MzAwMDU1MTE1OQ==&mid=209753217&idx=1&sn=d3a021a7bd959cbf92ffc658336b2387)
- [为什么ORM性能比iBATIS好？](http://blog.sina.com.cn/s/blog_9a97a37c0101b4fb.html)
- [你应该知道的 RPC 原理](http://blog.jobbole.com/92290/)
- [我在系统设计上犯过的14个错](https://mp.weixin.qq.com/s?__biz=MjM5MzYzMzkyMQ==&mid=2649826281&idx=1&sn=9c80215f5ee4b9fcf3be91012ad13608#rd)
- [Java 征途：行者的地图](http://www.cnblogs.com/mindwind/p/5251430.html)
- [Java工程师成神之路~](http://www.hollischuang.com/archives/489)
- [算法 with Java](https://github.com/pedrovgs/Algorithms)
- [Java 设计模式](https://www.programcreek.com/java-design-patterns-in-stories/)

QPS、RT、CPU 性能监控

- 阿里云OSS：文件存储系统（避免把文件存到数据库里、占用IO资源）
- tair：内存缓存服务器
  - 开源：memcached / redis
- F5：硬件负载均衡，LVS替代(软负载)
  - 即为name server（configServer），名字服务器，存放各个机器名，能知道有哪些机器。
- HSF(High Speed FrameWork)：远程服务调用框架
  - non-blocking IO.可以减少CPU切换开销，留更多CPU资源给业务代码。类比渔夫钓鱼，鱼竿有灯，钓起来灯亮，渔夫遍历查看鱼竿的等是否亮，亮了通知订阅者。一个渔夫可以看更多鱼竿，但如果鱼竿很多，一个渔夫看不过来，会造成延迟增加。
  - IO连接多路复用。一个连接上维持多个会话。
  - 序列化协议，hessian序列化。
  - 同类开源的rpc框架：dubbo或thrift等
- osgi：用于进行类库隔离的组件，允许组件动态热部署
- hbase、hive
- DRM：[分布式资源管理](http://doc.alipay.net/pages/viewpage.action?pageId=37848001)，DRM框架即提供了这样一种能力，可以在运行时动态、即时地改变应用系统内存中的资源值，并且已经解决多机房问题。
- zookeeper：可以充当一个服务注册表（Service Registry），让多个服务提供者形成一个集群，让服务消费者通过服务注册表获取具体的服务访问地址（ip+端口）去访问具体的服务提供者。zookeeper提供了“心跳检测”功能，它会定时向各个服务提供者发送一个请求（实际上建立的是一个 socket 长连接），如果长期没有响应，服务中心就认为该服务提供者已经“挂了”，并将其剔除

jdbc 是一套API，不同的数据库对其做了不同的实现。

jpa 标准是由 hibernate 作者总结提出的，所以跟 hibernate 结合的很好。许多框架都做了对 jpa 的实现。

slf4j-api 提供 API 标准，对其可以有多种实现，如：slf4j-nodep、log4j、jdk logging api、apache commons-log 等。

通常一个Web服务站点的后端服务器不是将Java的应用服务器直接暴露给服务访问者，
而是在应用服务器（如Jboss）的前面再加一个Web服务器（如Apache或Nginx），
可以做日志分析、负载均衡、权限控制、防止恶意请求以及静态资源预加载等。

Tomcat中的设计模式：模板模式；工厂模式；单例模式；门面设计模式；观察者模式；命令模式；责任链模式。

- bean 普通的java bean 可以包含业务逻辑代码！
- entity 实体bean ，一般是用于ORM 对象关系映射 ，一个实体映射成一张表，一般无业务逻辑代码！
- POJO全称是Plain Ordinary Java Object / Plain Old Java Object，中文可以翻译成：普通Java类，具有一部分getter/setter方法的那种类就可以称作POJO，很显然POJO也是JavaBean的一种。一般在web应用程序中建立一个数据库的映射对象时，我们只能称它为POJO。

- DAL(数据访问层)、IDAL(接口层)、BLL(业务逻辑层)
- PO(Persisent Object)持久对象，和VO一样都是由一组属性和属性的 get 和 set 方法组成。PO 的属性是跟数据库表的字段一一对应的。PO 对象需要实现序列化接口。
- VO(value object)值对象，通常用于业务层之间的数据传递，和 PO 一样也是仅仅包含数据而已。但应是抽象出的业务对象 ,可以和表对应 ,也可以不 ,这根据业务的需要。
- DAO(data access object) 数据访问对象，它负持久层的操作，为业务层提供接口。此对象用于访问数据库。通常和 PO 结合使用， DAO 中包含了各种数据库的操作方法。通过它的方法 , 结合 PO 对数据库进行相关的操作。
- DTO(Data Transfer Object) 数据传输对象，主要用于远程调用等需要大量传输对象的地方。

比如我们一张表有 100 个字段，那么对应的 PO 就有 100 个属性。
但是我们界面上只要显示 10 个字段，客户端用 WEB service 来获取数据，没有必要把整个 PO 对象传递到客户端，这时我们就可以用只有这 10 个属性的 DTO 来传递结果到客户端，这样也不会暴露服务端表结构 . 到达客户端以后，如果用这个对象来对应界面显示，那此时它的身份就转为 VO。

- BO(business object) 业务对象，从业务模型的角度看 , 见 UML 元件领域模型中的领域对象。封装业务逻辑的 java 对象 , 通过调用 DAO 方法 , 结合 PO,VO 进行业务操作。主要作用是把业务逻辑封装为一个对象。这个对象可以包括一个或多个其它的对象。比如一个简历，有教育经历、工作经历、社会关系等等。我们可以把教育经历对应一个 PO ，工作经历对应一个 PO ，社会关系对应一个 PO 。建立一个对应简历的 BO 对象处理简历，每个 BO 包含这些 PO 。这样处理业务逻辑时，我们就可以针对 BO去处理。

### 环境

Idea / Android Studio 快捷键

```sh
ctrl + j/q   # 显示文档
cmd + click  # 跳到调用
Ctrl + Option + H   # 显示方法调用栈
opt + enter   # 排错
Ctrl + Alt + B   # 跳转到方法实现处
```

Idea 一直在`scanning files to index`解决办法：把`node_module`目录设置为`Excluded`。

### Java / Android 环境安装

首先安装 [JDK](http://www.oracle.com/technetwork/java/javase/downloads/index.html)
(oracle官网从 jdk1.7 开始才有 Mac 版的安装包，单独的[jdk6 地址](https://support.apple.com/kb/DL1572?locale=zh_CN))

> 安装 JDK 后，如何确认 mac java 安装路径，并设置`JAVA_HOME`环境变量：http://chessman-126-com.iteye.com/blog/2162466 
> 根据苹果的官方说明，Mac OS X 10.5 及以后的版本应该使用 /usr/libexec/java_home 命令来确定 JAVA_HOME 

安装 [Android Studio 和 Android SDK](https://developer.android.com/studio/index.html)
(安装好 studio 后会提示安装 sdk， Google 已不直接让单独安装 sdk 了！！)

Android NDK 下载：https://developer.android.com/ndk/downloads/index.html

添加环境变量：`export ANDROID_HOME=/../android-sdk` 至 `~/.bashrc` 或 `~/.zshrc` 。

[解决](http://blog.kuoruan.com/24.html) Android SDK Manager 下载慢无法更新：

- 方法一：打开地址：http://ping.chinaz.com/，分别测试 dl.google.com 和 dl-ssl.google.com 的IP地址，将获取到的IP写入hosts文件。
- 方法二：使用国内镜像源`mirrors.neusoft.edu.cn`/`ubuntu.buct.edu.cn`/`mirrors.dormforce.net`
- 方法三: 直接从仓库网站下载再导入,如 [Android SDK | “Android 6.0”](https://afterroot.wordpress.com/2016/01/01/android-sdk-android-6-0-package-direct-links/)。如何导入呢?

    稍微注意能发现: Android AVD Manager 里的每一个安装项目都和 <ANDROID_SDK_root> 目录下的子目录名相对应。
    比如下载了 sysimg_arm-23_r03.zip 文件, 应该将此文件解压到 <ANDROID_SDK_root>/system-images/android-23 目录下,
    再重启 Android AVD Manager 会看到 "Android 6.0 (API 23) 节点下的 "ARM EABI v7a System Image | API 23, rev 3"
    的 status 从 "Not installed" 变为 "Installed" , 导入成功。(注意有些目录比较大、很占空间)

#### Maven

[Unable to import Maven project into IntelliJ IDEA](http://stackoverflow.com/questions/12701347/unable-to-import-maven-project-into-intellij-idea)

maven依赖找不到

- 先在用户目录（~/.m2）下的 settings.xml 里，添加内网mvn仓库源。
- 若不行，再把maven安装目录（xx/apache-maven-3.3.3/conf）下的 settings.xml 替换为与用户目录下 settings.xml 一致。
- 若还不行，删掉用户目录（~/.m2/repository）下已下载的所有依赖，在项目目录下`mvn install -DskipTests`重新安装。

#### Eclipse

遇到问题，先在项目目录`mvn clean`，再点击eclipse菜单里project菜单项下的`clean...`。
eclipse 配置 jre：preferences --> Java --> Installed JREs --> search .

导入Java工程：

1. 在项目目录下运行：`mvn eclipse:eclipse` 将maven项目转化为eclipse项目（生成两个eclipse导入所需的配置文件）
2. 再eclipse导入
3. 修改代码后执行`mvn compile`或`mvn test`检验

eclipse 不能读取到环境变量`System.out.print(System.getenv("JAVA_HOME"))`返回null，需要从 terminal 中打开
`open /Applications/eclipse/Eclipse.app`。[更多](http://stackoverflow.com/questions/603785/environment-variables-in-mac-os-x?lq=1)

#### mysql 启动错误：

启动 `系统偏好设置 -> MySQL` 时，提示`is not owned by the mysql or _mysql user`。
解决：`sudo chown -R  _mysql:wheel  /usr/local/mysql/data`

## hybrid app

[京东多端统一开发框架 - Taro](https://mp.weixin.qq.com/s?__biz=MzIxMzExMjYwOQ%3D%3D&mid=2651890991&idx=1&sn=6dcf81fd2639bc20d7245990a30fefd0)

[QQ空间面向移动时代Hybrid架构设计](https://mp.weixin.qq.com/s?__biz=MjM5MDE0Mjc4MA==&mid=2650993637&idx=1&sn=8a2673272575abbef4b0f6dbc25e0186)

[Apache Cordova - 前身是 PhoneGap](https://cordova.apache.org/) 是移动 hybrid 开发方式先驱，
其他公司内部部署的 bridge 等，大都效仿于它。

[H5与Native交互之JSBridge技术](http://tech.youzan.com/jsbridge/)

一般 hybrid 应用流程：用户从click开始，到 launch WebView , WebView 去加载 CDN 上的 HTML 文件，页面 loading 起来后才会去获取 JSON 数据。但在 launch WebView 的时候网络处于空等状态，这会浪费时间。Android 机器 launch WebView 大概需要1秒以内（客户端如果是多进程的架构，WebView 在另一个进程内部，launch 一次 WebView 除了进程 loading 还有浏览器内核的加载）。
[Tencent/VasSonic](https://github.com/Tencent/VasSonic) / 
[手机QQ Hybrid 的架构如何优化演进？](https://mp.weixin.qq.com/s/evzDnTsHrAr2b9jcevwBzA)

大体优化思路就是：缓存/预加载/并行，缓存一切网络请求，尽量在用户打开之前就加载好所有内容，能并行做的事不串行做。这里有些优化手段需要做好一整套工具和流程支持，需要跟开发效率权衡，视实际需求优化。

### js 引擎

[JavaScriptCore全面解析](https://cloud.tencent.com/developer/article/1004875)

Safari 由 WebKit 和 JavaScriptCore 组成。
WebKit是个渲染引擎，简单来说负责页面的布局，绘制以及层的合成，
javascript 引擎是 JavaScriptCore (JSC) 它包括了2部分：解释器和简单方法JIT, 解释器即解释执行 js 文件；
JIT在java虚拟机中应用比较多，针对执行较多次的热点方法进行编译为本地方法，执行效率更高，JSC中的JIT同理。

iOS 或 android 上能够运行的JavaScript 引擎有4个： JavaScriptCore, SpiderMonkey, V8 and Rhino. 支持程度见表：

|      | iOS      |    Android | 
| ---- | :-------- | --------:|
| JavaScriptCore | Interpreter only  |  Interpreter and JIT |
| SpiderMonkey  |  Interpreter only  |  Interpreter and JIT |
| V8  |  JIT only for jailbroken devices  |  JIT |
| Rhino  |  Unsupported  |  Interpreter |

Chrome for iOS 使用 UIWebView 由于 UIWebView 的能力限制，它只能使用移动版 Safari 的渲染层，JavaScriptCore(without JIT)（而不是V8）和单进程模式。
Android Browser 使用 V8.

### React Native

- ios: cmd+d 打开菜单, cmd+r 刷新
- Android: cmd+m 打开菜单, rr 刷新

react native: Image decoding can take more than a frame-worth of time. 
This is one of the major source of frame drops on the web because decoding is done in the main thread. 
In React Native, image decoding is done in a different thread.

### iOS

```sh
# iOS Simulator
command + v  /  command + shift + v  # 粘贴
shift + command + H   # twice to simulate the double tap of home button
command + 3  # 缩小到 50% 大小

xcrun simctl install booted ~/Downloads/AlipayWallet.app   # 安装 app 到 模拟器
```

[xcode9 storyboard 用法](https://www.youtube.com/watch?v=UFRdN2IMMGQ)

添加 APP 图标时，2x 3x 的图标大小「不能一样」，否则会一直报错：The app icon set named “AppIcon” did not have any applicable content

### Android

Android 反编译 apk 工具：apktool / dex2jar / jd-gui / http://www.javadecompilers.com/ (在线工具)

- [Android 开发知识图谱](https://blog.csdn.net/xyz_lmn/article/details/41411355)
- [广泛使用的开源二维码扫描代码 zxing](https://github.com/zxing/zxing)

android 使用颜色格式包含[`ARGB`](https://developer.android.com/guide/topics/resources/more-resources.html#Color)，这在[IE 6-8](https://beijingyoung.com/articles/rgba-argb-converter/)里也支持，[转换方式](https://css-tricks.com/8-digit-hex-codes/)。
chrome62 will support [`#RGBA`/`#RRGGBBAA`](https://www.chromestatus.com/feature/5685348285808640) 8-digit hex color.

[android 应用架构](http://www.jianshu.com/p/3edcf85539a6)

Android NDK向前但不向后兼容，利用NDK针对android-17生成的so文件可以在android-22上运行，反之却不行。
这点与Android SDK的兼容性不一样，在SDK14上编译的应用，在API23上也是可以运行的；
在SDk23上的编译的应用，只要minSdkVersion小于14，同样在API14上可以运行。

浏览器内核区别：手机系统官方浏览器、Chrome、UC、QQ、android控件里的webview、自己开发的APP里引用的 Webview，内核都不一样。

#### Android emulator

~~如果未设置环境变量, 到 <ANDROID_SDK_root>/tools 目录, 双击 android, 如果设置了环境变量, 命令行运行`android`会打开 
"Android SDK Manager"。~~ （新的 android 模拟器只能通过 Android Studio 打开）再在菜单中选择 Tools -> Manage AVDs (或命令行运行`android avd`), 打开 "Android Virtual Device (AVD) Manager" 会看到虚拟机列表，如果为空, 点击按钮 "Create..." 创建虚拟机。

```sh
adb shell input text 'text'  # 向 avd 里粘贴文字，只有一个虚拟机开着

adb devices
adb -s emulator-5554 shell input text 'my%stext'
# 如果有空格、特殊字符等, 会报错: Error: Invalid arguments for command: text usage: input ... 
# 对这些字符 ( ) < > | ; & * \ ~ " ' 加上反斜杠 \ 转义, 空格用 %s 转义
```


## python

- [Python Data Science Handbook](https://jakevdp.github.io/PythonDataScienceHandbook/)
- [那些让人惊艳的Python库](https://mp.weixin.qq.com/s?__biz=MzI1NTAyMjgwNA==&mid=2457510474&idx=1&sn=6ddcb7b2e519a595c3bf3ba1a05f8fa8)

mac 需要安装 xcode (会附带 gcc) ，虽然自带了 Python ，但还是使用 Homebrew 安装 Python 为好。 
Homebrew 会自动安装好 Setuptools 和 pip ，Setuptools提供 easy_install 命令，实现通过网络（通常Internet）下载和安装第三方Python包。

[macOS Sierra 安装 opencv 最简单方法](http://www.pyimagesearch.com/2016/12/19/install-opencv-3-on-macos-with-homebrew-the-easy-way/) 

```sh
python -m SimpleHTTPServer 3435  # python 起简单服务器

brew install python python3  # 一起安装 2.7.x 和 3.x

# 检测是否生效。 https://docs.brew.sh/Homebrew-and-Python.html
which python  # right: /usr/local/bin/python  not: /usr/bin/python
which python2  # right: /usr/local/bin/python  not: /usr/bin/python
which python3 # right: /usr/local/bin/python3 not: /usr/bin/python3
python -V   # system Python interpreter
python2 -V  # Homebrew installed Python 2 interpreter
python3 -V  # Homebrew installed Python 3 interpreter (if installed)

# 使用 homebrew 安装的 python2 覆盖 “系统默认的” python2
# https://stackoverflow.com/questions/45622838/homebrew-python-2-7-vs-os-x-python-2-7
export PATH="$(brew --prefix python)/libexec/bin:$PATH"

# outdated: create some symbolic links
# brew linkapps python / python3

# sudo easy_install pip  # brew install python 时默认已经安装了？
sudo pip install virtualenv virtualenvwrapper  # 虚拟环境工具
```

## cpp

- [值得推荐的C/C++框架和库](https://www.ezlippi.com/blog/2014/12/c-open-project.html)

mac 安装 xcode 自动安装 c/c++ 编译器。

```sh
gcc file.c file1.c
g++ file.cc file1.cc
```

使用 "Eclipse for c++" IDE + CDT (全称C/C++ Development Toolkit) 
另外搭配 cmake 的方法：http://stackoverflow.com/a/38716337/2190503

> 不建议用 Clion (直接集成了 cmake 工具)，收费、开的时间长有内存泄露问题。

## Go

编程哲学的重塑是Go语言独树一帜的根本原因，其它语言仍难以摆脱OOP或函数式编程的烙印，只有Go完全放弃了这些，对编程范式重新思考，对热门的面向对象编程提供极度简约但却完备的支持。Go是互联网时代的C语言，不仅会制霸云计算，10年内将会制霸整个IT领域。


# 架构

## 云计算

BaaS、FaaS、Serverless:
BaaS后端即服务 - 概念篇 https://yq.aliyun.com/articles/8521
BaaS、FaaS、Serverless都是什么馅儿？ https://yq.aliyun.com/articles/224403
对Serverless架构的一点体验和思考: https://www.jianshu.com/p/51a19ef5f8cf
LeanCloud 与阿里云到底有什么区别？ https://blog.leancloud.cn/4645/
AWS Lambda: https://aws.amazon.com/cn/lambda/

- 对业务开发团队来说，他们的开发能力更专注前端，交互，需要掌握的技术栈里就只需要javascript和Restful API就够了，他们可以更专注去理解业务模型和逻辑，快速构建业务系统，进行业务创新。
- 而对于后端团队，将跟专注做平台和服务，后者需要他们将J2EE时代的开发架构，比如MVC， RPC等架构向微服务，EDA，CQRS等云时代的架构升级，更好的将系统复杂性解构，利用服务化来构建满足业务团队的需要。

传统系统中，工程师最基本的能力也要让系统能做到“水平扩展”，即通过加机器能应对流量暴涨，但也要尽量节约机器成本。

性能和扩展性

- 什么是性能问题？ 如果你的系统对于一个用户访问还很慢，那就是性能问题；
- 什么是扩展性问题？ 如果你的系统对一个用户来说是快的，但是在用户不断增长的高访问量下就慢了。

MapReduce 是一种分布式的程序设计模型，专门用来在集群里处理大量的数据。
主要由两部分组成：mapper和reducer。mapper读取一部分数据，运算后输出成一系列的中间（intermediate）数据；
而reducer将mapper的输出数据查核、合并，产生最后输出。

许多语言都可以实现MapReduce，所以有很多不同的实现版本，除了Google自己的版本，还有许多开源的版本，
例如Hadoop、GridGain等，最常被使用的就是Hadoop。Hadoop是以Java实现的，但是可以支持许多其他语言写成的mapper和reducer。

Hadoop 是设计用来处理大量数据和运算的，所以如果只有少量数据时，就会比关系型数据库还要慢了。

采用虚拟化技术可降低Linux使用硬件的成本，虚拟化技术有：VMWare / KVM / XEN / Microsoft Hyper-V 。 
如 CPU16核/内存24G/硬盘300G 的Linux服务器，可以“一虚三”、即虚拟出三个虚拟机来。

## 各种

[现在的前端框架全是通过API获得数据，如何记录用户登录状态？](https://www.zhihu.com/question/301253397/answer/547887208)

[正向代理与反向代理有什么区别](http://mp.weixin.qq.com/s/ikrI3rmSYs83wdSWqq2QIg)

[微服务架构的几种模式](http://microservices.io/patterns/index.html)

[浅谈命令查询职责分离(CQRS)模式](http://www.cnblogs.com/yangecnu/p/Introduction-CQRS.html)、
[DDD CQRS架构和传统架构的优缺点比较](http://www.cnblogs.com/netfocus/archive/2016/02/06/5184182.html)

什么是微服务架构：https://os.alipayobjects.com/rmsportal/OzCkwPWAvRGwqXv.png

Matt在对微服务的总体介绍中是这样说的：经过分离的组件可以各自拥有独立的生命周期，并且按需进行扩展。
不仅如此，这种方式也打破了组件之间的技术依赖，这就允许每个服务各自选择最适合的技术进行实现。
通过将较大的问题分解为几个较小的问题，让每个问题更易于进行分析，也更利于开发者选择最适合的解决方案。

微服务与SOA之间是否存在关联？

- 现如今，谈论SOA的各种不足似乎已经成为了一件很普遍的事。但如果你认真地观察，就会发现SOA的缺陷中的绝大部分与微服务是相同的，只是有关他们的案例更为具体一些。而两者的优势其实也大体相同，因为从本质上看，这两种技术所做的都是同一件事：将一个较大的问题分解为多个较小的问题。
- 在我看来，微服务只是一种为经过良好架构设计的SOA解决方案实现的面向服务的交付方案。SOA提供了上下文的框架，同时也提供了微服务所坚持的大部分规则。不仅如此，SOA还提供了一种更宽泛的上下文，使微服务能够在复杂的企业中符合这些上下文。许多人在不断地抱怨SOA中的各种WS-*协议、ESB的庞大以及各种极端复杂的项目，其实这只是面临的挑战不同而已。

当前业界比较成熟的微服务框架有Netflix的Karyon/Ribbon，Spring的Spring Boot/Cloud，阿里的Dubbo等。
配置中心比较成熟的开源方案有百度的Disconf，360的QConf，Spring的Cloud Config和阿里的Diamond等。

REST/RPC和序列化，框架层要支持将业务逻辑以HTTP/REST或者RPC方式暴露出来，HTTP/REST是当前主流API暴露方式，
在性能要求高的场合则可采用Binary/RPC方式。针对当前多样化的设备类型(浏览器、普通PC、无线设备等)，
框架层要支持可定制的序列化机制，例如，对浏览器，框架支持输出Ajax友好的JSON消息格式，
而对无线设备上的Native App，框架支持输出性能高的Binary消息格式。

通常来说，RESTful服务最适合于为某个数据模型提供CRUD操作，而微服务架构中的服务往往能够被轻易地分解为这些CRUD类型的服务，
因此它与RESTful就能够很好地结合在一起。而对于其他类型的服务来说，类RESTful风格的服务通常也是一种良好的选择，
这种类RESTful的风格也会使用HTTP作为传输协议，但服务本身并不一定要100%地符合RESTful的原则。

soa是Service-Oriented Architecture的首字母简称，面向服务架构。开发人员很容易理解为是一个Web Service，但是这绝对不是SOA，那顶多只能算是SOA的一种实现方法。

[stateless-authentication-for-microservices](http://www.slideshare.net/alvarosanchezmariscal/stateless-authentication-for-microservices)、
[user-authentication-with-jwt](http://blog.leapoahead.com/2015/09/07/user-authentication-with-jwt/)

uuid 全宇宙单独id。guid 一定范围内单独id，比 uuid 范围小。

B/S架构：无需安装、跨平台，像web项目。基于统一的应用层协议HTTP来交互数据，HTTP是无状态的短连接通信方式。
C/S架构：本地安装、不跨平台，像QQ等客户端程序。采用长连接的交互模式。

再说说WebService和soap，WebService也是微软重头宣传的技术之一，但是微软喜欢封装，所以采用了SOAP方式实现WebService，
这又是一个过重的协议，又证明了微软没有高并发高性能程序设计经验。独霸Web的LAMP平台，也使用了WebService，
但是人家没有采用soap，而是采用xml-rpc, json-rpc，还有Restful webserivice，这些都比微软的soap webservice轻量级，
而且更简单。至于后来的wcf, wpf, wf，那更是直接把微软送入了地狱。

MVC是一个流行的软件架构。可以从Ruby on Rails获得许多有关MVC的基本设计原则，将其引入并支持node的MVC设计。Express已经采用了路由的概念（Rails的基本原则），还需要分离的模型：视图和控制器。接下来，创建controllers、model、views目录等，将现有的每个路由的方法调用转换为单独的函数然后导出，等操作。MVC架构使得代码看起来干净又简单，并且扩展性更好。

代理（proxy）是一种路由请求方式，将不同源的请求通过同一个服务器处理，原因可能有很多：缓存、安全，甚至是故意模糊请求的来源。有转发代理、反向代理等。反向代理用于控制请求如何被发送到服务器，例如现在有五个服务器，但有四个不希望有用户直接访问。因而将所有的请求转发到第五个服务器，然后再代理给其他服务器。反向代理也被用于平衡负载和通过缓存请求改进系统的整体表现。


## API 设计

[Apollo Data Stack](http://docs.apollostack.com/)、
[How to build a GraphQL server](https://medium.com/apollo-stack/tutorial-building-a-graphql-server-cddaa023c035#.gdvn0fb8v)

[Swagger 及 API 管理](https://www.linkedin.com/pulse/swagger-%E5%8F%8A-api-%E7%AE%A1%E7%90%86%E7%AE%80%E4%BB%8B-minglei-tu)

There are some important differences between the two though:

- Falcor returns Observables, GraphQL just values. For how Netflix wanted to use Falcor, this makes a lot of sense for them. They make multiple requests and present data as it's ready, but it also means that the client developer has to work with the Observables directly. GraphQL is a request/response model, and returns back JSON, which is trivially easy to then use. Relay adds back in some of the dynamicism that Falcor presents while maintaining only using plain values.
- Type system. GraphQL is defined in terms of a type system, and that's allowed us to built lots of interesting tools like GraphiQL, code generators, error detection, etc. Falcor is much more dynamic, which is valuable in its own right but limits the ability to do this kind of thing.
- Network usage. GraphQL was originally designed for operating Facebook's news feed on low end devices on even lower end networks, so it goes to great lengths to allow you to declare everything you need in a single network request in order to minimize latency. Falcor, on the other hand, often performs multiple round trips to collect additional data. This is really just a tradeoff between the simplicity of the system and the control of the network. For Netflix, they also deal with very low end devices (e.g. Roku stick) but the assumption is the network will be good enough to stream video.

### [Falcor](http://netflix.github.io/falcor/)

不同于传统REST API，它只提供唯一的一个端点。有了它，开发者不再需要向不同的服务器端点请求不同的数据，而是向同一个端点请求不同的模型数据。服务器端可以识别请求参数，并由Falcor Router调用恰当的router函数。也就是说，Falcor提供了一个更加直观的API，就是开发者的数据模型。这可以确保服务器永远不会返回不必要的模型数据，节省了带宽。Falcor客户端还可以使用缓存数据为连续的请求提供服务，减少服务器响应时间。

- [Demand driven architecture（CQRS/Falcor）](http://www.javacodegeeks.com/2015/10/transcending-rest-and-rpc.html)
- rpc优却点：低延迟，数据量小；不可缓存(手动管理)，紧耦合
- rest优却点：可缓存，松耦合；高延迟，数据量大
- 两者结合:
  - one model everywhere
  - The data is the API
- You can convert any JSON object into a JSON Graph in two steps:
  - Move all objects to a unique location within the JSON object
  - Replace all other occurrences of the object with a Reference to that object’s unique location

- 他希望编写优雅、易读的代码。在用户界面上查找和修改数据要直观，最好是开发者只需要考虑自己的数据模型，而不用关心可用的API端点。
- 他希望可以消除由传统REST API所导致的不必要的请求和响应开销。
- 他还希望用一种更好的方法取代难以维护和改进的传统REST API。

### [GraphQL](https://github.com/facebook/graphql)

GraphQL is Facebook's [graph API](https://developers.facebook.com/docs/graph-api)
（[How to get lots of data from the Facebook Graph API with just one request - Optimizing request queries to the Facebook Graph API](https://www.sammyk.me/optimizing-request-queries-to-the-facebook-graph-api)）。
[基于 GraphQL 的产品](https://www.reindex.io/)。

- [GraphQL - The Good and the Bad](https://scotch.io/tutorials/graphql-the-good-and-the-bad)
- [GraphQL is the King. Long Live the King!](https://medium.com/@scbarrus/graphql-is-the-king-long-live-the-king-r-i-p-rest-cf04ce38f6c#.avmpteg2j)
- [Introducing Relay and GraphQL译](http://segmentfault.com/a/1190000002570887)
- [文档](http://graphql.org/docs/getting-started/) / [graphql-js](https://github.com/graphql/graphql-js)
- [From REST to GraphQL](https://blog.jacobwgillespie.com/from-rest-to-graphql-b4e95e94c26b#.e3re515s5)
- [From REST to GraphQL-](https://news.ycombinator.com/item?id=10365555)

GraphQL is essentially the one [API Gateway](http://microservices.io/patterns/apigateway.html) to rule them all. And then you add Relay on top of it to build up the exact query you want.

- GraphQL Returns Only the Data You Request. 请求什么返回什么
- GraphQL Returns Data in the Same Shape You Requested It. 返回的数据结构和请求结构一致
- GraphQL Sends a Single Request to the API and Returns a Single Response. 把同时发出的多个请求合并为一个，返回一个请求结果集合，并自动拆分到不同的组件里


## rest

- [介绍-入门](http://www.cnblogs.com/artech/p/restful-web-api-02.html)
- [RESTful API 设计指南](http://www.ruanyifeng.com/blog/2014/05/restful_api.html)
- [理解本真的REST架构风格](http://www.infoq.com/cn/articles/understanding-restful-style)、[如何设计好的RESTful API？](http://www.infoq.com/cn/articles/how-to-design-a-good-restful-api)
- [hateoas](http://timelessrepo.com/haters-gonna-hateoas)
- [RESTful API的十个最佳实践](http://www.cnblogs.com/xiaoyaojian/p/4612503.html)
- [最佳实践](http://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api)
- [Google/Facebook/GitHub等设计对比](http://blog.octo.com/en/design-a-rest-api/)
- [jsonapi](http://jsonapi.org/format/) - [jsonapi中文](http://jsonapi.org.cn/format/)

[来自于PayPal的RESTful API标准](https://segmentfault.com/a/1190000005924733) / 
[Microsoft/api-guidelines](https://github.com/Microsoft/api-guidelines/blob/master/Guidelines.md)

[What does “state transfer” in Representational State Transfer (REST) refer to?](https://stackoverflow.com/questions/4603653/what-does-state-transfer-in-representational-state-transfer-rest-refer-to)

总结：

通过url来设计系统的结构。根据REST，每个url都代表一个resource，而整个系统就是由这些resource组成的。因此，如果url是设计良好的，那么系统的结构就也应该是设计良好的。REST允许我们通过url设计系统，就像Test Driven Development允许我们使用testcase设计class接口一样。使用REST的关键是如何抽象资源，抽象得越精确，对REST的应用就越好。

- 使用名词而不是动词，使用名词的复数形式。（一些非CRUD操作如login/logout，可以用动词，方便理解）
- Get方法和查询参数不应该改变资源状态。GET PUT和DELETE方法是幂等方法。
- 假如资源连接到其它资源，则使用子资源形式`GET /cars/711/drivers/4`，但cars和drivers可以是并列的资源。
- 有一种url形式，它对应到程序中的继承关系：`/products/books`，也可以`/books`单独作为顶层接口。
- 为集合提供过滤、排序、字段选择以及分页
  - 过滤：为所有字段或者查询语句提供独立的查询参数：`GET /cars?color=red Returns a list of red cars`
  - 排序：允许跨越多字段的正序或者倒序排列：`GET /cars?sort=-manufactorer,+model`
  - 字段选择：一些情况下，我们只需要在列表中查询几个有标识意义的字段，我们不需要从服务端把所有字段的值都请求出来，所以需要支持API选择查询字段的能力，这也可以提到网络传输性能和速度：`GET /cars?fields=manufacturer,model,id,color`
  - 使用offset和limit来获取固定数量的资源结果，当其中一个参数没有出现时，应该提供各自的默认值，比如默认取第一页，或者默认取20条数据：`GET /cars?offset=10&limit=5 取第三页的5条数据`
  - 使用自定义的头X-Total-Count发回给调用段实际的资源数量。
- 使用HTTP状态码处理错误
  - 200 – OK – 一切正常
  - 201 – OK – 新资源已经被创建
  - 204 – OK – 资源删除成功
  - 304 – 没有变化，客户端可以使用缓存数据
  - 400 – Bad Request – 调用不合法，确切的错误应该在error payload中描述，例如：“JSON 不合法 ”
  - 401 – 未认证，调用需要用户通过认证
  - 403 – 不允许的，服务端正常解析和请求，但是调用被回绝或者不被允许
  - 404 – 未找到，指定的资源不存在
  - 422 – 不可指定的请求体 – 只有服务器不能处理实体时使用，比如图像不能被格式化，或者重要字段丢失。
  - 500 – Internal Server Error – 标准服务端错误，API开发人员应该尽量避开这种错误

- 无状态通信（Stateless）：通信的会话状态（Session State）应该全部由客户端负责维护。应该注意区别应用的状态和连接协议的状态。HTTP连接是无状态的（也就是不记录每个连接的信息），而REST传输会包含应用的所有状态信息。通讯本身的无状态性可以让不同的服务器的处理一系列请求中的不同请求，提高服务器的扩展性。
- 充分利用好HTTP缓存是RESTful API可伸缩性的根本。HTTP协议是一个分层的架构，从两端的user agent到origin server之间，可以插入很多中间组件。而在整个HTTP通信链条的很多位置，都可以设置缓存。HTTP协议内建有很好的缓存机制，可以分成过期模型和验证模型两套缓存机制。

根据[richardson模型](http://martinfowler.com/articles/richardsonMaturityModel.html), REST架构的成熟度有3个等级:

- Level 0 POX (这个就不算REST了)
- Level 1 Resources:  解决了Level 0 接口的问题, 使得各种资源有了自己相应的URI,虽然仍然是POX的交互方式, 但是每一个接口都更加紧凑和内聚, 相应的容易维护起来.
- Level 2 Http verbs:  这一级别使用http verbs来对各种资源进行crud操作, 使得应用程序的接口更加的统一, 语义更加明确.
- Level 3 Hypermedia Controls:
  - RESTful的架构本意是"在符合架构原理的前提下，理解和评估以网络为基础的应用软件的架构设计，得到一个功能强、性能好、适宜通信的架构。" 这个世界上规模最大的, 耦合度最低, 最稳定的, 性能最好的分布式网络应用是什么? 就是WEB本身. 规模,稳定,性能都不用说了. 为什么说耦合度低呢? 想一想每个人上网的经历, 你几乎不需要任何培训就可以上一个新的网络购物平台挑选商品,用信用卡付款,邮寄到自己家里.把网站的程序想像成一个状态机, 用户在一系列状态转换中完成自己的目标. 这中间的每一步, 应用程序都告诉你当前的状态和可能的下一步操作, 最终引导用户从挑选商品,挑选更多商品,到支付页面,到输入信用卡信息,最终完成付费,到达状态机的终点.这种 service discoverablility 和 self-documenting 就是 level 3 想解决的问题 在这里面, 告诉用户当前状态以及各种下一步操作的东西, 比如链接, 按钮等等, 就是Hypermedia Controls. Hypermedia Controls 就是这个状态机的引擎. Level 3 的REST架构就是希望能够统一这一类的 Hypermedia Controls, 赋予他们标准的, 高度可扩展的标准语义及表现形式, 使得甚至无人工干预的机器与机器间的通用交互协议边的可能. 比如你可以告诉一个通用的购物客户端, "给我买个最便宜的xbox", 客户端自动连上google进行搜索, 自动在前10个购物网站进行搜索, 进行价格排序, 然后自动挑选最便宜的网站, 进行一系列操作最终完成用信用卡付费, 填写个人收件地址然后邮寄. 这些都依赖于Hypermedia Controls带来的这种 service discoverablility 和 self-documenting。

资源、子资源、相关资源，都能通过「links」关联，达到从一个资源找到相关资源(links列出URL)，或者直接 embedded 相关资源。

### 业务实例

> 其他：[github](http://api.github.com/)、[instagram](https://instagram.com/developer/)、
[白宫API规范](https://github.com/WhiteHouse/api-standards)

> [React.js and Spring Data REST: Part 1 - Basic Features](https://spring.io/blog/2015/09/01/react-js-and-spring-data-rest-part-1-basic-features)、[React.js and Spring Data REST: Part 2 - Hypermedia](http://spring.io/blog/2015/09/15/react-js-and-spring-data-rest-part-2-hypermedia)，包含_links、_embedded、Paging、Sorting 很完善的rest库。

具体到业务中的表现就是“embedded resources”，代码中的实现方式是在一些标记@RestResource注解的bean中(model)的一些属性上加入@Relation注解(自定义的注解)，并设置相应的loader用来加载相关资源，然后写具体的loader来实现功能。

目前只在业务中的一部分实现了这个功能，前端能通过拼接参数获得关联资源(也能exclude掉不需要的数据字段)，实例如`http://xx?e=xx&_xfields=title&_embedded=category,category.types,type,rank,status`，通过改变`_xfields / _embedded`会得到不同结果，其实这样已经带来了不少便利。当然如果像github-API一样把关联资源子资源等的link-uri的给出，那么也就产生了在线API文档，少了些找文档的问题。

如果不用这样的@Relation注解实现、Java怎么处理这个问题呢？一般是要设置不少`多余的`model，如父子资源各有一个model，当需要一起用的时候，又要设置新的合并起来的model。或者会形成很多map数据结构的层层嵌套，导致代码耦合难以阅读。


# http

在网络体系结构中，TCP 是运输层而 HTTP 是应用层。HTTP增加了技术复杂性，是因为它需要支持「分块传输编码」。分块传输编码可以在响应数据未完全生成时进行数据传输，此时还无法确定响应信息的具体大小。如果分块中所包含信息的长度为0，则表示响应信息的结束。

HTTP协议根本没有长短连接这一说，HTTP协议是基于请求/响应模式的，因此只要服务端给了响应，本次HTTP连接就结束了。

HTTP分为长连接和短连接，其实本质上是说的TCP连接。TCP连接是一个双向的通道，它是可以保持一段时间不关闭的，因此TCP连接才有真正的长连接和短连接这一说。HTTP协议说到底是应用层的协议，而TCP才是真正的传输层协议，只有负责传输的这一层才需要建立连接。

HTTP1.1默认是长连接，也就是默认Connection的值就是keep-alive。好处是：长连接情况下，多个HTTP请求可以复用同一个TCP连接，这就节省了很多TCP连接建立和断开的消耗。

对于客户端来说，不管是长轮询还是短轮询，客户端的动作都是一样的，就是不停的去请求，不同的是服务端，短轮询情况下服务端每次请求不管有没有变化都会立即返回结果，而长轮询情况下，如果有变化才会立即返回结果，而没有变化的话，则不会再立即给客户端返回结果，直到超时为止。但是长轮询也是有坏处的，因为把请求挂起同样会导致资源的浪费，假设还是1000个人停留在某个商品详情页面，那就很有可能服务器这边挂着1000个线程，在不停检测库存量，这依然是有问题的。　因此，从这里可以看出，不管是长轮询还是短轮询，都不太适用于客户端数量太多的情况，因为每个服务器所能承载的TCP连接数是有上限的，这种轮询很容易把连接数顶满。

一种轮询方式是否为长轮询，是根据服务端的处理方式来决定的，与客户端没有关系。轮询的长短，是服务器通过编程的方式手动挂起请求来实现的。

- 发起一个HTTP请求的过程就是建立一个socket通信的过程。可以模拟浏览器发起HTTP请求：
  - 如用HttpClient发起；
  - Linux中的`curl`命令，通过`curl+url`就可以发起HTTP请求
- 搞清楚`Expires`、`Last-Modified`、`Etag`、

HTTP协议本身是一种面向资源的应用层协议，但对HTTP协议的使用实际上存在着两种不同的方式：一种是RESTful的，它把HTTP当成应用层协议，比较忠实地遵守了HTTP协议的各种规定；另一种是SOA的，它并没有完全把HTTP当成应用层协议，而是把HTTP协议作为了传输层协议，然后在HTTP之上建立了自己的应用层协议。

幂等性并不属于特定的协议，它是分布式系统的一种特性；所以，不论是SOA还是RESTful的Web API设计都应该考虑幂等性。（幂等性是数学中的一个概念，表达的是N次变换与1次变换的结果相同）

- HTTP GET方法用于获取资源，不应有副作用，所以是幂等的。（不会改变资源的状态，但不是每次GET的结果相同）
- HTTP DELETE方法用于删除资源，有副作用，但它应该满足幂等性。
- HTTP POST和PUT的区别容易被简单地误认为“POST表示创建资源，PUT表示更新资源”；而实际上，二者均可用于创建资源，更为本质的差别是在幂等性方面。
- POST所对应的URI并非创建的资源本身，而是资源的接收者。比如：POST http://www.forum.com/articles的语义是在http://www.forum.com/articles下创建一篇帖子，HTTP响应中应包含帖子的创建状态以及帖子的URI。两次相同的POST请求会在服务器端创建两份资源，它们具有不同的URI；所以，POST方法不具备幂等性。
- 而PUT所对应的URI是要创建或更新的资源本身。比如：PUT http://www.forum/articles/4231的语义是创建或更新ID为4231的帖子。对同一URI进行多次PUT的副作用和一次PUT是相同的；因此，PUT方法具有幂等性。

#### Content-type & Accept

- Content-type in a request refers to the type of the data you are sending!
  - [Do I need a content type for http get requests](http://stackoverflow.com/questions/5661596/do-i-need-a-content-type-for-http-get-requests)：Get requests should not have content-type because they do not have request entity (that is, a body)
- Accept：Content-Types that are acceptable for the response.

### [合并 HTTP 请求是否真的有意义？](http://www.zhihu.com/question/34401250)

- 浏览器针对每个域名并发建立的最大TCP连接数基本都是6个，然后每个连接上串行发送若干个请求。HTTP1.1协议规定请求只能串行发送。
- 100个请求下：在http1.1，keep-alive是默认的，现代浏览器都有DNS缓存，DNS寻址时间可忽略。
  - 寻址还是会花很少量时间，考虑个别情况下 DNS 缓存失效时需要更多点时间（10ms 左右）。另外url检查时间，一般可忽略。
- 3次握手由于有 keep-alive，一条和一百条都只需一次TCP握手--无差别。
- 发送报文--增多了99次的http请求头，请求之间有停顿（网络延迟 RTT），如果合并后节省延迟时间 RTT*(n-1)。网络延迟低或请求数n比较小时，可忽略不计。（4G以上网络延迟很低）。
  - PC上的RTT大概是50ms, wifi 为100ms， 3G为200ms，2G为400ms。例如：一个200M带宽、2000ms延迟的网络，和一个2M带宽，20ms延迟的网络。
  - 无线环境下头部大小每减少100个字节，速度能够提升20~30ms。因为：上下行带宽严重不对称，上行带宽太小。
    - 假设一个请求头部是800个字节，如果上行带宽是100个字节，那至少得传8次才能将一个请求传完。补充一下，上下行带宽不对称主要是技术和市场原因决定的，倒不是运营商太奸诈。
- 考虑丢包（比如移动网络），合并请求会更有优势。
  - 丢的是tcp包？服务器怎么知道丢了，丢了哪些内容(如get请求内容一部分丢了)？浏览器会重新发送，还是自动重发？
- 据说keep-alive在经过代理或者防火墙的时候可能会被断开。

#### [http pipelining](https://en.wikipedia.org/wiki/HTTP_pipelining)

- pipeline 原理是 客户端可以并行发送多个请求，但是服务器的响应必须按次序返回。一些服务器和代理不支持pipeline；在 pipeline 中的前一个链接可能会阻塞后边的链接；减缓页面加载速度。
- 检测浏览器是否开启：Firefox 地址栏中输入 about:config 搜索 pipe 找到 network.http.pipelining 。Chrome 地址栏中输入 chrome://flags 找不到开启地方，Chrome 默认禁止了 pipelining。[原因](https://www.chromium.org/developers/design-documents/network-stack/http-pipelining)

#### SPDY 和 HTTP2

核心优势就是多路复用，简单说来就是将多个请求通过一个TCP连接发送。

浏览器能不能将100个请求通过一个TCP连接发送？会出现什么问题？那就是TCP协议的head of line blocking,队头阻塞。
设想这样一个场景，一个页面有100个请求，第99个请求时，TCP丢了一个包，TCP自然会重传，重传时间是T1，重传成功后，浏览器才能获取到完整页面的响应内容，然后渲染和展示整个页面。也就是说整个页面的加载时间延迟了T1时间。在此之前，用户没有得到任何内容。

[http2讲解](http://http2-explained.haxx.se/content/zh/index.html)

[htt2 and UDP](http://2014.jsconf.eu/speakers/iliyan-peychev-http-20-and-quic-protocols-of-the-near-future.html)

[websockets 的问题](https://samsaffron.com/archive/2015/12/29/websockets-caution-required)


# 字符编码

计算机中存储信息的最小单元是一个字节，即8个bit，所以能表示的字符范围是0~255个。

- ASCII码：单字节编码，一共128个字符，用一个字节的低7位表示。
- ISO-8859-1：单字节编码，扩展了ASCII，总共能表示256个字符，涵盖了大多数西欧语言字符。
- GB2312：双字节编码，编码范围A1~F7，包含6763个汉字。
- GBK：兼容并扩展了gb2312，编码范围是8140~FEFE(去掉XX7F)，总共有23940个码位，能表示21003个汉字。

utf-16

用两个字节（16个bit）表示Unicode转化格式。每两个字节表示一个字符，这就大大简化了字符串操作。utf-16编码不论什么字符都用两个字节表示，规则很简单，编码效率非常高，适合在本地磁盘和内存之间使用、可以进行字符和字节之间的快速切换、如Java的内存编码就采用utf-16编码。  
但有很大一部分字符用一个字节就可以表示了，因此存储空间浪费了一倍，不适合用在网络之间传输，因为会没必要的增大了网络传输流量，而且网络传输容易损坏字节流，一旦字节流损坏将很难恢复。另外它采用顺序编码，不能对单个字符的编码值进行校验，如果中间的一个字符码值损坏，后面的所有码值都将受影响。

utf-8

采用一种变长技术，每个编码区域有不同的字码长度。如果一个字节最高位（第8位）为0，表示是一个ASCII字符。对单字节范围内的字符仍然用一个字节表示，对汉字采用三个字节表示。更适合网络传输，单个字符损坏也不会影响后面的其他字符，在编码效率上介于GBK和utf-16之间，在编码效率和编码安全上做了平衡，是理想的中文编码方式。

web上的编码

URL中包含中文时需要进行编码，但URL中`?`前后部分（分别是uri和QueryString查询字符串）编码方式不同，后端相应的解码方式也不同。

- 对uri部分进行解码的字符集是在connector的`<Connector URIEncoding="UTF-8" />`中定义的，如果没有定义，将以默认编码ISO-8859-1解析，所以最好设置为utf-8编码。
- 而HTTP的get方式请求的QueryString与post方式请求的表单参数都是作为`Parameters`保存的，都通过`request.getParameter`获取参数值，对它们的解码也是在该方法第一次被调用时进行的（注意：要在第一次调用request.getParameter方法之前就设置request.setCharacterEncoding(charset)，否则post表单提交上来的数据可能出现乱码）。浏览器根据ContentType的charset编码格式对之进行编码，然后提交到服务器，服务端同样也是用ContentType中的字符集进行解码的。

# DNS域名解析

- 输入域名并按下回车后
- 第一步，浏览器会检查缓存中有没有这个域名对应的解析过的IP地址，有就结束，没有进入下一步
- 第二步，浏览器查找操作系统缓存中是否有。操作系统也有一个域名解析过程，在hosts文件里设置可以将任何域名解析到任何能够访问的IP地址。如果指定了，浏览器会使用这个IP地址。（早期Windows中的域名被入侵黑客劫持问题）
- 前两步都是在本机完成的，如果无法完成解析，就会请求域名服务器了。我们的网络配置中都会有「DNS服务器地址」，操作系统会把域名发送给LDNS，也就是本地区的域名服务器。大约80%的域名解析到这里完成。
- 第四步，如果LDNS没命中，就到Root Server域名服务器请求解析。然后`gTLD Server`，`Name Server域名服务器`，返回该域名对应的`IP和TTL值`被Local DNS Server缓存，解析结果返回给用户、缓存到本地系统缓存中、域名解析过程结束。（这中间还有GTM负载均衡控制等）
- 可以用`nslookup`、`dig www.taobao.com`等命令，跟踪解析过程

CDN工作机制：

CDN = 镜像（Mirror）+ 缓存（Cache）+ 整体负载均衡（GSLB），主要缓存网站中的静态数据。

三种负载均衡架构：链路负载均衡、集群负载均衡、操作系统负载均衡。  
链路负载均衡就是通过DNS解析成不同的IP，用户根据这个IP来访问不同的目标服务器。  
集群负载均衡分为硬件和软件负载均衡。硬件负载均衡设备昂贵、如F5，性能非常好，但访问量超出极限时不能进行动态扩容。软件负载均衡成本低，缺点是一般一次访问请求要经过多次代理服务器，会增加网络延时，如LVS、HAProxy。  
操作系统负载均衡，是利用操作系统级别的软中断或硬中断，设置多队列网卡等来实现。

