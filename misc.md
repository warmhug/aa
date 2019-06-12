
# misc

[SaaS（科技）行业导航](http://www.allsaas.cn/)
SaaS 平台：[氚云](https://h3yun.com/index.php?g=Chuanyun&m=Scene&a=index)、[搭搭云](https://www.dadayun.cn/)

S.O.L.I.D 原则：

```txt
S：单一职责原则
O：开闭原则
L：里氏替换原则
I：接口隔离原则
D：依赖倒置原则
```

[Rest / graphql / falcor / swagger](https://github.com/warmhug/web-api)

<https://github.com/donnemartin/system-design-primer> /
<https://github.com/MaximAbramchuck/awesome-interview-questions>

you can't bind to ports <1024 if you are not root.

- 注意：mac不区分文件名的大小写，类名及文件名大小写改变后，不会自动刷新。编译时可能抛出“找不到类”的错误，要重新删除相应文件，再下载下来
- Docker 镜像加速地址：登录阿里云、找到 Docker Hub 镜像站点，拷贝专属加速器地址。

编程语言分类：<http://hyperpolyglot.org/>

[我在系统设计上犯过的14个错](https://mp.weixin.qq.com/s?__biz=MjM5MzYzMzkyMQ==&mid=2649826281&idx=1&sn=9c80215f5ee4b9fcf3be91012ad13608#rd)

uuid 全宇宙单独id。guid 一定范围内单独id，比 uuid 范围小。

[正向代理与反向代理有什么区别](http://mp.weixin.qq.com/s/ikrI3rmSYs83wdSWqq2QIg)
代理（proxy）是一种路由请求方式，将不同源的请求通过同一个服务器处理，原因可能有很多：缓存、安全，甚至是故意模糊请求的来源。有转发代理、反向代理等。反向代理用于控制请求如何被发送到服务器，例如现在有五个服务器，但有四个不希望有用户直接访问。因而将所有的请求转发到第五个服务器，然后再代理给其他服务器。反向代理也被用于平衡负载和通过缓存请求改进系统的整体表现。

采用虚拟化技术可降低 Linux 使用硬件的成本，虚拟化技术有：VMWare / KVM / XEN / Microsoft Hyper-V 。如 CPU16 核 / 内存 24G / 硬盘 300G 的 Linux 服务器，可以 “一虚三”、即虚拟出三个虚拟机来。

计算机中存储信息的最小单元是一个字节，即 8 个 bit，所以能表示的字符范围是 0~255 个。

- ASCII 码：单字节编码，一共 128 个字符，用一个字节的低 7 位表示。
- ISO-8859-1：单字节编码，扩展了 ASCII，总共能表示 256 个字符，涵盖了大多数西欧语言字符。
- GB2312：双字节编码，编码范围 A1~F7，包含 6763 个汉字。
- GBK：兼容并扩展了 gb2312，编码范围是 8140~FEFE(去掉 XX7F)，总共有 23940 个码位，能表示 21003 个汉字。
- utf-8、utf-16

URL 中包含中文时需要进行编码，但 URL 中 `?` 前后部分（分别是 uri 和 QueryString 查询字符串）编码方式不同，后端相应的解码方式也不同。

- 对 uri 部分进行解码的字符集是在 connector 的 `<Connector URIEncoding="UTF-8" />` 中定义的，如果没有定义，将以默认编码 ISO-8859-1 解析，所以最好设置为 utf-8 编码。
- 而 HTTP 的 get 方式请求的 QueryString 与 post 方式请求的表单参数都是作为 `Parameters` 保存的，都通过 `request.getParameter` 获取参数值，对它们的解码也是在该方法第一次被调用时进行的（注意：要在第一次调用 request.getParameter 方法之前就设置 request.setCharacterEncoding(charset)，否则 post 表单提交上来的数据可能出现乱码）。浏览器根据 ContentType 的 charset 编码格式对之进行编码，然后提交到服务器，服务端同样也是用 ContentType 中的字符集进行解码的。

## 环境

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

> 安装 JDK 后，如何确认 mac java 安装路径，并设置`JAVA_HOME`环境变量：<http://chessman-126-com.iteye.com/blog/2162466>
> 根据苹果的官方说明，Mac OS X 10.5 及以后的版本应该使用 /usr/libexec/java_home 命令来确定 JAVA_HOME

安装 [Android Studio 和 Android SDK](https://developer.android.com/studio/index.html)
(安装好 studio 后会提示安装 sdk， Google 已不直接让单独安装 sdk 了！！)

Android NDK 下载：<https://developer.android.com/ndk/downloads/index.html>

添加环境变量：`export ANDROID_HOME=/../android-sdk` 至 `~/.bashrc` 或 `~/.zshrc` 。

[解决](http://blog.kuoruan.com/24.html) Android SDK Manager 下载慢无法更新：

- 方法一：打开地址：<http://ping.chinaz.com/> 分别测试 dl.google.com 和 dl-ssl.google.com 的IP地址，将获取到的IP写入hosts文件。
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

Android 反编译 apk 工具：apktool / dex2jar / jd-gui / <http://www.javadecompilers.com/> (在线工具)

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
python -m http.server [port]  # Python 3 起服务器
python -m SimpleHTTPServer 3435  # python2 起服务器

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
另外搭配 cmake 的方法：<http://stackoverflow.com/a/38716337/2190503>

> 不建议用 Clion (直接集成了 cmake 工具)，收费、开的时间长有内存泄露问题。

## Go

编程哲学的重塑是Go语言独树一帜的根本原因，其它语言仍难以摆脱OOP或函数式编程的烙印，只有Go完全放弃了这些，对编程范式重新思考，对热门的面向对象编程提供极度简约但却完备的支持。Go是互联网时代的C语言，不仅会制霸云计算，10年内将会制霸整个IT领域。
