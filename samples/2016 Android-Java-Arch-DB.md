# Android

> 2016-06

> 使用了 Android 最新支持的 ConstraintLayout 布局。
>
> 注意点: app/build.gradle 里的`targetSdkVersion`要和预览的手机设备 skdVersion 一样。

官方文档：https://developer.android.com/training/index.html

优化

- [优化布局性能](https://developer.android.com/training/improving-layouts/optimizing-layout.html#Inspect)
- [滚动怎么更顺滑](https://developer.android.com/training/improving-layouts/smooth-scrolling.html)

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

#### mysql 启动错误

启动 `系统偏好设置 -> MySQL` 时，提示`is not owned by the mysql or _mysql user`。
解决：`sudo chown -R  _mysql:wheel  /usr/local/mysql/data`












# Arch 后端 基础
---

google 的 API 设计指南 https://google.aip.dev/general 2021-08
用户导入200万条数据、Java堆打爆 虚拟机退出、数据库连接满。2021-03-01
账号、权限、越权漏洞、上传文件不成功、丢文件。2020-07~10
vm修改了、刷新页面可能不会更新，因为有缓存、要重启机器。 2020-04


编程语言分类：<http://hyperpolyglot.org/>

[正向代理与反向代理有什么区别](http://mp.weixin.qq.com/s/ikrI3rmSYs83wdSWqq2QIg)
代理（proxy）是一种路由请求方式，将不同源的请求通过同一个服务器处理，原因可能有很多：缓存、安全，甚至是故意模糊请求的来源。有转发代理、反向代理等。反向代理用于控制请求如何被发送到服务器，例如现在有五个服务器，但有四个不希望有用户直接访问。因而将所有的请求转发到第五个服务器，然后再代理给其他服务器。反向代理也被用于平衡负载和通过缓存请求改进系统的整体表现。


## 架构 / 云
> 系统初期既不能过度设计，又不能没有设计。

系统设计 https://github.com/donnemartin/system-design-primer
[我在系统设计上犯过的14个错](https://mp.weixin.qq.com/s?__biz=MjM5MzYzMzkyMQ==&mid=2649826281&idx=1&sn=9c80215f5ee4b9fcf3be91012ad13608#rd)


如何画出一张合格的技术架构图？ https://yq.aliyun.com/articles/697661
让你的程序更可读 - node / java AOP https://github.com/frontend9/fe9-library/issues/36
[egg 早期架构图手绘图](https://gw.alipayobjects.com/mdn/security_content/afts/img/A*M3XeTKo_eAUAAAAAAAAAAABjATonAQ/original)


### DDD 与 事件风暴
《识别领域事件》https://insights.thoughtworks.cn/recognize-domain-event
对问题域有深刻见解的主题专家称为领域专家，在大多数组织中没有这个角色，当DDD建模需要领域专家支持时，组织往往找业务部门的业务人员，BA，产品经理或在这个领域有多年开发经验的DEV来充当。
这些一线业务人员和开发团队都清楚有什么功能，但往往不清楚为什么有这些功能。举个例子：如果我们的问题是打开一瓶红酒，你去调研每天都会打开酒瓶的waiter, 给你的答案是：开瓶器。但换做领域专家的视角来看，会回归问题的本质，如果我们希望打开酒瓶，需要把瓶塞移除，移除瓶塞的方式有多种，包括推，撬与拉拽，对于拉拽可能基于吸力或螺旋拉拽，下面右图的开瓶器只不过是螺旋拉拽的一种解决方案。领域专家应该对问题域及其中的各种可行方案有更深入的理解。


《DDD、EventStorming与业务中台》https://insights.thoughtworks.cn/ddd-eventstorming-zhongtai
提到中台（尤其是业务中台）的构建方法论，就不得不提另两个同样伴随着微服务和中台概念兴起的工具：Domain-Driven Design（DDD，领域驱动设计）和EventStorming（事件风暴）。
在各种讲中台落地规划，尤其是业务中台的共性能力识别和微服务划分的时候，总是能看到这两位的身影。不过相信好多朋友对于这两个相对陌生的面孔还是感觉云里雾里，搞不清楚到底是什么，以及与中台的关系。


事件风暴（Event Storming）于2013年首次被提出，2015年被ThoughtWorks技术雷达添加到“实验”阶段，2018年被ThoughtWorks技术雷达添加到“采纳”阶段。事件风暴[案例](https://juejin.im/post/5dde595a5188256ea364efbf)。


《事件风暴将掀起一场新革命》https://www.jdon.com/artichect/eventstorm.html
DDD 是静态结构分析，主要以产出类图为主、顺序图或状态图。是将一个动态的流程活生生切割成不同静态的状态。如果用这种方法去分析设计一个复杂大型系统，大量间接的模拟表达会造成系统过于复杂晦涩，如果一个程序员在未完全掌握状态切换规则情况下，却更改了状态数据，就会影响一大片流程功能。
使用静态方法去分析动态事物，是方法论出现了误用。
积累事件驱动系统的分析设计开发经验，状态和事件其实是有内在因果关系的，状态为什么会发生变化，那是因为发生了事件，过去我们是把状态作为主角，事件才是背后真正的英雄啊。比如，你的手机正在处于播放音乐状态，那是因为你之前按了播放键，本质是由于动作事件的发生。
事件建模本质就是要抓住一系列事件动作，寻找贯穿业务领域中的事件流向。这是一种动态建模方式，这种动态方式能够直截了当地反映业务流程，无需借助状态来间接表达。
发布者-订阅者(pub-sub)模型其实代表对象之间调用的新模式，会迅速渗透进业务分析设计领域，而事件则可以说是发布者-订阅者模型的抽象体现，当我们使用多个事件来表达复杂业务流程时，事件之间的联系是通过发布者-订阅者模型实现先后流程节点连接，从另外一个角度看，发布者-订阅者模型实际被隐含在事件流背后了。
事件建模为什么称为事件风暴建模呢？这是取自于头脑风暴，意味着参与者需要在一起通过头脑风暴才能实现较为成功的事件建模。
事件风暴建模从组织形式上看很简单，相关专家和技术人员集中到一个会议室，在一面墙上贴上白纸，然后使用不同颜色的便签表达不同事件，以此表达各种业务流程，事件风暴的价值是沟通，而不仅仅是粘贴在墙上的便条。
事件建模不是对所有事件都进行关注建模，而只是关注领域事件。
领域事件的重要特征是能够引起反应，不是所有事件都值得我们关注或记录，最引人注目的是那些引起反应的事件。由此，领域事件将事件与事件反应或者称事件响应联系起来了，这种方式符合我们前面讨论的发布者-订阅者(pub-sub)模型，所以，事件风暴不只是找出孤立的一个事件，而是要找出“事件/响应”这样的组合，唯有如此，我们才能拼凑出一个事件发生的序列因果集合，从而完整地表达业务流程。



## 编解码

- [URL 编码，为什么要编码？](http://anjia.github.io/2015/04/15/jsURIEncode/)
- 浏览器在自动选择编码方式的时候不会优先根据 html 源码中的所展示的`<meta charset="utf-8" />`代码来决定选择什么编码方式，而是优先根据“响应标头-response header”中的键为“Content-Type”的值来自动选择判断。（老IE浏览器相反）

计算机中存储信息的最小单元是一个字节，即 8 个 bit，所以能表示的字符范围是 0~255 个。

- ASCII 码：单字节编码，一共 128 个字符，用一个字节的低 7 位表示。
- ISO-8859-1：单字节编码，扩展了 ASCII，总共能表示 256 个字符，涵盖了大多数西欧语言字符。
- GB2312：双字节编码，编码范围 A1~F7，包含 6763 个汉字。
- GBK：兼容并扩展了 gb2312，编码范围是 8140~FEFE(去掉 XX7F)，总共有 23940 个码位，能表示 21003 个汉字。
- utf-8、utf-16

## HTTP
### SPDY / HTTP 2

核心优势就是多路复用，简单说来就是将多个请求通过一个 TCP 连接发送。浏览器能不能将 100 个请求通过一个 TCP 连接发送？会出现什么问题？那就是 TCP 协议的 head of line blocking,队头阻塞。
设想这样一个场景，一个页面有 100 个请求，第 99 个请求时，TCP 丢了一个包，TCP 自然会重传，重传时间是 T1，重传成功后，浏览器才能获取到完整页面的响应内容，然后渲染和展示整个页面。也就是说整个页面的加载时间延迟了 T1 时间。在此之前，用户没有得到任何内容。

[http2讲解](http://http2-explained.haxx.se/content/zh/index.html)、
[htt2 and UDP](http://2014.jsconf.eu/speakers/iliyan-peychev-http-20-and-quic-protocols-of-the-near-future.html)

### HTTP 1

在网络体系结构中，TCP 是运输层而 HTTP 是应用层。HTTP 增加了技术复杂性，是因为它需要支持「分块传输编码」。分块传输编码可以在响应数据未完全生成时进行数据传输，此时还无法确定响应信息的具体大小。如果分块中所包含信息的长度为 0，则表示响应信息的结束。

HTTP 协议根本没有长短连接这一说，HTTP 协议是基于请求 / 响应模式的，因此只要服务端给了响应，本次 HTTP 连接就结束了。

HTTP 分为长连接和短连接，其实本质上是说的 TCP 连接。TCP 连接是一个双向的通道，它是可以保持一段时间不关闭的，因此 TCP 连接才有真正的长连接和短连接这一说。HTTP 协议说到底是应用层的协议，而 TCP 才是真正的传输层协议，只有负责传输的这一层才需要建立连接。

HTTP1.1 默认是长连接，也就是默认 Connection 的值就是 keep-alive。好处是：长连接情况下，多个 HTTP 请求可以复用同一个 TCP 连接，这就节省了很多 TCP 连接建立和断开的消耗。

对于客户端来说，不管是长轮询还是短轮询，客户端的动作都是一样的，就是不停的去请求，不同的是服务端，短轮询情况下服务端每次请求不管有没有变化都会立即返回结果，而长轮询情况下，如果有变化才会立即返回结果，而没有变化的话，则不会再立即给客户端返回结果，直到超时为止。但是长轮询也是有坏处的，因为把请求挂起同样会导致资源的浪费，假设还是 1000 个人停留在某个商品详情页面，那就很有可能服务器这边挂着 1000 个线程，在不停检测库存量，这依然是有问题的。　因此，从这里可以看出，不管是长轮询还是短轮询，都不太适用于客户端数量太多的情况，因为每个服务器所能承载的 TCP 连接数是有上限的，这种轮询很容易把连接数顶满。

一种轮询方式是否为长轮询，是根据服务端的处理方式来决定的，与客户端没有关系。轮询的长短，是服务器通过编程的方式手动挂起请求来实现的。

发起一个 HTTP 请求的过程就是建立一个 socket 通信的过程。可以模拟浏览器发起 HTTP 请求，如用 HttpClient 发起；Linux 中的 `curl` 命令，通过 `curl+url` 就可以发起 HTTP 请求。

- 搞清楚 `Expires`、`Last-Modified`、`Etag` 等
- Content-type in a request refers to the type of the data you are sending!
  - [Do I need a content type for http get requests](http://stackoverflow.com/questions/5661596/do-i-need-a-content-type-for-http-get-requests)：Get requests should not have content-type
- Accept：Content-Types that are acceptable for the response.

HTTP 协议本身是一种面向资源的应用层协议，但对 HTTP 协议的使用实际上存在着两种不同的方式：一种是 RESTful 的，它把 HTTP 当成应用层协议，比较忠实地遵守了 HTTP 协议的各种规定；另一种是 SOA 的，它并没有完全把 HTTP 当成应用层协议，而是把 HTTP 协议作为了传输层协议，然后在 HTTP 之上建立了自己的应用层协议。

幂等性并不属于特定的协议，它是分布式系统的一种特性；所以，不论是 SOA 还是 RESTful 的 Web API 设计都应该考虑幂等性。（幂等性是数学中的一个概念，表达的是 N 次变换与 1 次变换的结果相同）

- HTTP GET 方法用于获取资源，不应有副作用，所以是幂等的。（不会改变资源的状态，但不是每次 GET 的结果相同）
- HTTP DELETE 方法用于删除资源，有副作用，但它应该满足幂等性。
- HTTP POST 和 PUT 的区别容易被简单地误认为 “POST 表示创建资源，PUT 表示更新资源”；而实际上，二者均可用于创建资源，更为本质的差别是在幂等性方面。
- POST 所对应的 URI 并非创建的资源本身，而是资源的接收者。比如：POST `http://www.forum.com/articles` 的语义是在这里创建一篇帖子，HTTP 响应中应包含帖子的创建状态以及帖子的 URI。两次相同的 POST 请求会在服务器端创建两份资源，它们具有不同的 URI；所以，POST 方法不具备幂等性。
- 而 PUT 所对应的 URI 是要创建或更新的资源本身。比如：PUT `http://www.forum/articles/4231` 的语义是创建或更新 ID 为 4231 的帖子。对同一 URI 进行多次 PUT 的副作用和一次 PUT 是相同的；因此，PUT 方法具有幂等性。

HTTP 的 get 方式请求的 QueryString 与 post 方式请求的表单参数都是作为 `Parameters` 保存的，都通过 `request.getParameter` 获取参数值，对它们的解码也是在该方法第一次被调用时进行的（注意：要在第一次调用 request.getParameter 方法之前就设置 request.setCharacterEncoding(charset)，否则 post 表单提交上来的数据可能出现乱码）。浏览器根据 ContentType 的 charset 编码格式对之进行编码，然后提交到服务器，服务端同样也是用 ContentType 中的字符集进行解码的。

[合并 HTTP 请求是否真的有意义？](http://www.zhihu.com/question/34401250)

浏览器针对每个域名并发建立的最大 TCP 连接数基本都是 6 个，然后每个连接上串行发送若干个请求。HTTP1.1 协议规定请求只能串行发送。

- 100 个请求下：在 http1.1，keep-alive 是默认的，现代浏览器都有 DNS 缓存，DNS 寻址时间可忽略。
  - 寻址还是会花很少量时间，考虑个别情况下 DNS 缓存失效时需要更多点时间（10ms 左右）。另外 url 检查时间，一般可忽略。
- 3 次握手由于有 keep-alive，一条和一百条都只需一次 TCP 握手 -- 无差别。
- 发送报文 -- 增多了 99 次的 http 请求头，请求之间有停顿（网络延迟 RTT），如果合并后节省延迟时间 RTT*(n-1)。网络延迟低或请求数 n 比较小时，可忽略不计。（4G 以上网络延迟很低）。
  - PC 上的 RTT 大概是 50ms, wifi 为 100ms， 3G 为 200ms，2G 为 400ms。例如：一个 200M 带宽、2000ms 延迟的网络，和一个 2M 带宽，20ms 延迟的网络。
  - 无线环境下头部大小每减少 100 个字节，速度能够提升 20~30ms。因为：上下行带宽严重不对称，上行带宽太小。假设一个请求头部是 800 个字节，如果上行带宽是 100 个字节，那至少得传 8 次才能将一个请求传完。
- 考虑丢包（比如移动网络），合并请求会更有优势。
  - 丢的是 tcp 包？服务器怎么知道丢了，丢了哪些内容 (如 get 请求内容一部分丢了)？浏览器会重新发送，还是自动重发？
- 据说 keep-alive 在经过代理或者防火墙的时候可能会被断开。

[http pipelining](https://en.wikipedia.org/wiki/HTTP_pipelining) pipeline 原理是 客户端可以并行发送多个请求，但是服务器的响应必须按次序返回。一些服务器和代理不支持 pipeline；在 pipeline 中的前一个链接可能会阻塞后边的链接；减缓页面加载速度。Chrome 默认禁止了 pipelining。[原因](https://www.chromium.org/developers/design-documents/network-stack/http-pipelining)

-----

## DNS域名解析

- 输入域名并按下回车后
- 第一步，浏览器会检查缓存中有没有这个域名对应的解析过的 IP 地址，有就结束，没有进入下一步
- 第二步，浏览器查找操作系统缓存中是否有。操作系统也有一个域名解析过程，在 hosts 文件里设置可以将任何域名解析到任何能够访问的 IP 地址。如果指定了，浏览器会使用这个 IP 地址。（早期 Windows 中的域名被入侵黑客劫持问题）
- 前两步都是在本机完成的，如果无法完成解析，就会请求域名服务器了。我们的网络配置中都会有「DNS 服务器地址」，操作系统会把域名发送给 LDNS，也就是本地区的域名服务器。大约 80% 的域名解析到这里完成。
- 第四步，如果 LDNS 没命中，就到 Root Server 域名服务器请求解析。然后 `gTLD Server`，`Name Server 域名服务器`，返回该域名对应的 `IP 和 TTL 值` 被 Local DNS Server 缓存，解析结果返回给用户、缓存到本地系统缓存中、域名解析过程结束。（这中间还有 GTM 负载均衡控制等）
- 可以用 `nslookup`、`dig www.taobao.com` 等命令，跟踪解析过程

CDN 工作机制：CDN = 镜像（Mirror）+ 缓存（Cache）+ 整体负载均衡（GSLB），主要缓存网站中的静态数据。

三种负载均衡架构：链路负载均衡、集群负载均衡、操作系统负载均衡。
链路负载均衡就是通过 DNS 解析成不同的 IP，用户根据这个 IP 来访问不同的目标服务器。
集群负载均衡分为硬件和软件负载均衡。硬件负载均衡设备昂贵、如 F5，性能非常好，但访问量超出极限时不能进行动态扩容。软件负载均衡成本低，缺点是一般一次访问请求要经过多次代理服务器，会增加网络延时，如 LVS、HAProxy。
操作系统负载均衡，是利用操作系统级别的软中断或硬中断，设置多队列网卡等来实现。















# DB

- [数据库深度解析 | 从NoSQL历史看未来](https://mp.weixin.qq.com/s?__biz=MzAwMDU1MTE1OQ==&mid=209753217&idx=1&sn=d3a021a7bd959cbf92ffc658336b2387)

MapReduce 是一种分布式的程序设计模型，专门用来在集群里处理大量的数据。主要由两部分组成：mapper 和 reducer。mapper 读取一部分数据，运算后输出成一系列的中间（intermediate）数据；而 reducer 将 mapper 的输出数据查核、合并，产生最后输出。最常被使用的就是Hadoop。Hadoop 是以 Java 实现的，但是可以支持许多其他语言写成的 mapper 和 reducer。
Hadoop 是设计用来处理大量数据和运算的，所以如果只有少量数据时，就会比关系型数据库还要慢了。

## 问题、优化

实质是锁和并行
读写锁，隔离
数据一致性，数据完整性
MVCC：读写并行

单机事务，分布式事务
死锁检测：碰撞检测

orm会有1+n查询问题如：学生表和老师表，查出所有学生(n个)的数据（结果要包含老师名字），每一条学生数据里关联某一个老师的id，通过这个id要从老师表里查出老师的名字，所以需要查n次老师表。在有数据分页和索引的情况下，1+n的性能还是很好的，虽然看起来发了很多sql查询，相对join的方式性能要好些。

数据库连接数问题：连接利用率低

一致性hash要解决的问题

Hibernate 比 iBATIS 性能低？因为每次都要编译sql语句？

------


### Hibernate

Hibernate not only takes care of the mapping from Java classes to database tables (and from Java data types to SQL data types), but also provides data query and retrieval facilities. It can significantly reduce development time otherwise spent with manual data handling in SQL and JDBC. Hibernate’s design goal is to relieve the developer from 95% of common data persistence-related programming tasks by eliminating the need for manual, hand-crafted data processing using SQL and JDBC. However, unlike many other persistence solutions, Hibernate does not hide the power of SQL from you and guarantees that your investment in relational technology and knowledge is as valid as always.

联合主键构成类时，需要重写类的equal hashcode，实现序列化接口。

list 和 iterate 的区别，什么状况下需要延迟获取对象、具体业务场景？

@basic


### Mybatis
MyBatis是支持普通SQL查询，存储过程和高级映射的优秀持久层框架。MyBatis消除了几乎所有的JDBC代码和参数的手工设置以及对结果集的检索。MyBatis可以使用简单的XML或注解用于配置和原始映射，将接口和Java的POJO（Plain Old Java Objects，普通的Java对象）映射成数据库中的记录。


- 一对一：mapper xml 里 resultMap 里 association 。
- 一对多：mapper xml 里 resultMap 里 collection 。


### 关系映射
对象之间的关系：一对一、一对多、多对多。另外，关联分为单向、双向两种，例如可以通过老师找到学生是单向，如果也可以通过学生能找到老师那就是双向。

- 一对一：一个学生对应一个学生证（可以记录到一张表里，不需要中间表）。一对一关系实际应用里比较少，用外键映射。

- 一对多(多对一)：一个组对应多个用户，每个用户只能属于一个组。一个人有多辆车，每个车只属于一个人。一个人有多个梦想，每个梦想属于一个人。
    - 表设计：在多方加外键。

- 多对多：一个老师对应多个学生，但每个学生可被多个老师教。多对多比较少用，双向关联的多对多关系更加少用。
    - 表设计：加中间表。例如：学生、课程、分数表设计，分数表作为中间表，里边有学生id/课程id、分数，中间表的主键可以为：
    - 联合主键(学生id和课程id)、并且不能是自动生成的(需要从学生表id和课程表id获得)。问题：操作不方便
    - 也可单独设置分数表id作为主键。分数表和学生或课程表是多对一的关系。比联合主键简单


### 表设计

三范式：

- 要有主键，列不可分。
- 联合主键，不能存在部分依赖。
- 不能存在传递依赖。



------


### 事务
ACID（原子性Atomicity、一致性Consistency、隔离性Isolation和持久性Durability)

事务隔离级别：1 read-uncommitted，2 read-committed，4 repeatable read，8 serializable 。级别越高，越安全但效率越低。一般设置为 read-committed ，不会出现 dirty-read 问题，会等另一个事务提交了才能读到结果、不会读出中间状态，但还会有 non-repeatable read（不可重复读）和 phantom read（幻读）的问题，可以用悲观锁或乐观锁解决。

- 悲观锁：获取到数据后加锁，防止别人更新。使用的是数据库的锁。
- 乐观锁：所有对数据的更新带上版本号，对照不同版本判断是否被更新过。不在获取数据后加锁。


### sql语句
用 in 还是 exists ？后者效率更高。


### mysql
> 默认账户root，密码为空。
> 命令行命令以`;`结尾

```sh
mysql -uroot  #登陆root账户
show databases;
show tables;
show tables from database_name;

drop database <数据库名>;  #删除数据库

select a.pwd, a.username, b.name from t_user a right join company b on a.companyId = b.id;
select * from t_user where pwd is not null;

show columns from t_user;
show create table t_user;

alter table t_user add i int;
alter table t_user drop i;
alter table t_user modify username varchar(100);

SHOW INDEX FROM t_user;

create temporary table temp_table (t_name varchar(50) not null, t_sales decimal(12,2) not null default 0.00);
insert into temp_table (t_name, t_sales) values ('t_name', 99.99);
select * from temp_table;

select version();
select database();
select user();
show status;
show variables;

SELECT * FROM t_user INTO OUTFILE '/Users/hua/Downloads/t_user_table.txt';
```

约束: https://gw.alipayobjects.com/zos/rmsportal/PDMVJVKZwvVWWGNaKvsK.png

### 数据库

从存储上来说，数据库主要分为几类：

- Key/Value形式，典型的产品如tair。NoSql数据库，在NoSql分类中，有一种基于键值对（key/value pairs）的结构化数据类型，它通常被存储在内存中以支持快速访问。三种最流行的基于内存键值对的存储系统是：Memcached，Cassandra和Redis。
- Schema-free, 典型的如mongoDB，阿里云的OTS，这一类产品的特点是使用灵活简单，但如果有二级索引的需求，会比较麻烦。
- SQL,关系型数据库，比如MySQL、OceanBase，特点是有较高的使用成本，schema变更较为麻烦，但功能强大，特别是OceanBase解决了扩展性和性能问题。

业界 HBase 的二级索引已经有很多产出了，不知道 OTS 目前对于二级索引有什么新进展。


对数据库进行读写分离。 让主数据库处理事务性的增，删，改操作(Insert,Update,Delete)操作，让从数据库处理查询操作(Select操作)，数据库复制被用来将事务性操作导致的变更同步到集群中的从数据库。

当访问量大的时候（数据库连接数不够）：

- 业务垂直拆分，拆分后就需要远程服务调用框架hsf
    - 淘宝业务类型：商品、交易、评价、属性
    - 拆分为“商品中心、用户中心”等，不同团队分别负责
- 中间加一层，这层下边的机器要减少，作为proxy
- 数据库切分：单个商品库切分为多个

IDC(interne data center)数据中心，数据中心里的Linux服务器用什么牌子？Dell/HP/huawei/ibm。


- 建立与数据库的连接很耗时（花接近一秒），实质是建立了socket连接，用“连接池”来解决。
- `java.sql.Statement`用来执行sql语句并返回结果，很容易造成“sql注入”风险，例如执行了`delete from xx where id=`，用户输入的id为`5 or 1=1`，这条语句就会删掉表上所有数据。所以，不要用这个，改用`java.sql.PreparedStatement`


名词：`可滚动和可更新的结果集`、`JNDI`

除了数字、字符串和日期之外，许多数据库还可以存储大对象，例如图片或其他数据。在sql中，二进制大对象称为BLOB，字符型大对象称为CLOB。

存储过程是在数据库中执行的用数据库相关的语言编写的过程。

在SQL中，描述数据库或其组成部分的数据称为元数据（区别于那些存在数据库中的实际数据）。我们可以获得三类元数据：关于数据库的元数据、关于结果集的元数据以及关于预备语句参数的元数据。

可以将多个语句(sql语句？)组合成「事务(transaction)」。当所有语句都顺利执行之后，事务可以被提交。否则，如果其中某个语句遇到错误，事务将被回滚，就好像没有任何语句被执行过一样。

数据库连接是有限的资源，如果用户要离开应用一段时间，那么他占用的连接就不应该保持开放状态；另一方面，每次查询都获取连接并在随后关闭它的代价也是相当高的。
解决办法是建立「数据库连接池（pool）」。这意味着数据库连接在物理上并未被关闭，而是保留在一个队列中并被反复重用。连接池是一种非常重要的服务，JDBC规范为实现者提供了用以实现连接池服务的手段。不过，JDK本身并未实现这项服务，数据库供应商提供的JDBC驱动程序中通常也不包含这项服务。相反，web容器和应用服务器的开发商通常会提供连接池服务的实现。
连接池的使用对程序员来说是「完全透明的」，可以通过获取数据源并调用getConnection方法来得到连接池中的连接。使用完连接后，需要调用close方法。该方法并不在物理上关闭连接，而只是告诉连接池已经使用完该连接。



## 《七周七数据库》
实际应用中，不会只使用一种数据库，更多是多种数据库的组合使用，分别解决不同类型的问题。

### PostgreSQL
RDBMS 基于集合理论的一个分支，名为关系代数，它包括选择（WHERE...）、投影（SELECT...）、笛卡尔积（JOIN...）等操作。

索引是一个特殊的数据结构，目的是避免执行查询时进行全表扫描。PostgreSQL自动在主键上创建索引。B-树，是一个很好的标准索引，值存储为一个平衡树数据结构，非常灵活。

关系数据库对于灵活查询是一个很好的选择，但分区不是强项。如果需要水平扩展而不是垂直扩展（多个并行的数据库而不是单个强大的机器或集群），可能最好寻找别的解决方案。如果数据要求过于灵活，不是很容易融入关系数据库严格的数据模式要求，或者需要进行非常大量的键值对读写操作，或只需存储二进制大对象数据，那么其他的数据存储技术可能更好。

### Riak
Riak的优势之一就是它致力于避免单点故障，设法支持最大的正常运行时间，并且增加（或者缩小）规模以适应变化的需求（横向扩展）。

Riak 规避了 CAP 施加于所有分布式数据库上的约束。Riak 允许以每个操作为基础来实现 CAP。

### HBase
HBase 看起来很像关系数据库，其实不是。如果你的数据不是多少GB来衡量，就不需要用 HBase，它擅长的事情是扫描巨大的数据集，处理 “大数据” 问题，对于真正巨大的查询，HBase通常胜于其他数据库，常用于大公司的后台日志和查询系统。HBase 有一些其他数据库没有的内置特性：版本管理、压缩、垃圾回收、内存表。

虽然 HBase 的设计目的是可伸缩性，但它不能缩小。另外，HBase 几乎从来不会单独部署，它是一些可伸缩模块构成的生态系统中的一部分。这包括 Hadoop、Hadoop 分布式文件系统（HDFS）和 Zookeeper。

在 CAP（consistency、Availability、Partition Tolerance，即一致性、可用性和分区容错性）方面，HBase 肯定是 CP。

### MongoDB
主要优势在于，它能够通过复制和横向伸缩，处理大量的数据（以及大量的请求）。它有非常灵活的数据模型，不需要遵从某个模式，可以简单地嵌套任何值，而这在RDBMS中通常需要使用SQL进行联接。

### CouchDB
CouchDB 是 NoSQL 社区中，健壮且稳定的一员。网络是不可靠的，而硬件故障总是迫在眉睫，CouchDB就是基于这种哲学建立的，于是，提供了一种尽可能分散的数据存储方式。但 CouchDB 不能执行关系数据库中的数据分片，它的复制策略也不总是正确的选择。

### Neo4j
Neo4j 是一种新型的 NoSQL 数据存储，称为图数据库，同时它也称为 “白板友好” 的数据库，也就是说，如果能在白板上设计一些框和线条，就可以用 Neo4j 把它保存起来。Neo4j 的重点是数据间的关系。图数据库经常用在社交网络应用中，例如 Facebook。

图数据库一般不适合网络分区，不能很好地向外扩展。可能的情况是，如果你使用图数据库，它会是一个较大系统的一部分，大容量数据存储在其他地方，而在图中只保存关系。

[告诉大家我所知道的Neo4j(一) ——基本概念](http://han-zw.iteye.com/blog/1847030)
[图形数据库、NOSQL和Neo4j
](http://www.infoq.com/cn/articles/graph-nosql-neo4j)


### Redis
Redis 的明显优势是速度快，很大程度是因为它驻留在内存中。它已经成为很多系统的组成部分。



## 《自己动手设计数据库》

在关系数据库模型出现之前，常用层次数据库模型（hierarchical database model）和网状数据库模型（network database model）。

层次数据库模型是按照层次结构组织的，通常图解为倒置的树状结构，其中一个表作为倒置树状图的“根”，其他表则是由根生发的枝条。层次数据库中的关系由术语「父/子（parent/child）」代表，父表可以与一个或多个子表相连，而子表却只能和一个父表相连。访问这个模型中数据的方式是，从根表开始，一直沿着树状结构到达目标数据。这种访问方式要求用户对数据库的结构非常熟悉。优点是可以迅速检索到数据，因为表结构之间有明确的联系。但是当用户需要在子表中存储一个记录，而该记录与父表中的任何记录都没有联系时，就会出现问题。这种数据库不能支持复杂的关系，而且往往涉及冗余数据的问题，例如表之间存在“多对多”关系时，两个表中都需要引进冗余数据；可以使用两个层次数据库来解决多对多关系。但随着数据间关系更加复杂，层次数据库仍不能很好的解决各种问题。

很大程度上，网状数据库就是为了解决层次数据库出现的一些问题。网状数据库的结构用术语「节点（node）」和「集合结构（set structrue）」表示。用户可以在网状数据库内部访问数据，从任意节点开始，沿着相关集合正向或反向访问网状数据库中的数据，能够快速的访问数据，相比层次数据库可以创建更为复杂的查询。缺点是用户必须熟悉数据库的结构，才能通过集合结构来访问。另一个缺点就是，很难在不影响与之交互的应用程序的条件下，改变数据结构，改变一个集合结构，就必须同时改变应用程序中所有对该结构的引用。

1970年6月，科德博士在其题为“大型共享数据库的关系数据模型（A Relational Model of Large Shared Databanks）” 这一里程碑式的作品中，提出了新式关系数据模型。关系模型基于两个数学分支：集合论（set theory）和一阶谓词逻辑（first-order predicate logic）。实际上模型本身的名称取自“关系（relation）”这个术语，他是集合论的一部分。（一个误解是，关系数据模型是因为关系数据库中的表可以彼此联系而得名）

关系数据库将数据存储在关系中，用户则将关系视为表。每个关系由元组（或记录）以及属性（或字段）组成。关系模型将关系分为一对一、一对多和多对多，两个表之间的关系是通过匹配一个共享字段的值来隐性建立的。只要用户熟悉表之间的关系，就既可以从直接相关联的表访问数据，也可以从间接相关联的表访问数据。

关系数据库具有这些优点：内置多层次完整性；逻辑和物理数据独立于数据库应用程序（即数据能够不依赖于它在计算机中的物理存储方法而存在）；有保障的数据一致性和准确性；便捷数据检索。


键是一个表中用以标识记录的逻辑结构，而索引则是用以优化数据处理的物理结构。

表中不要有「复合字段」和「多值字段」，分解复合字段会产生新字段，分解多值字段则会产生新的表。

子集表表示特定数据表的一个从属主题，子集表和对应数据表之间有一种独特的关系。子集表与对应数据表必须共享同一主键。

一对一关系的两张表可以合并到一张表中，但不少情况还是分开的，会牵涉到一个子集表。

多对多关系的表，必须要建立中间表？建立中间表后，原始多对多关系被分解，多对多的两表之间不再有直接关系，而是被两个一对多关系（两个表分别与中间表是一对多）所取代。

自联结（自引用，也叫递归）关系：这种特殊类型的关系并不存在于两表之间，而是存在于同一表中记录之间的一种关系。也分为一对一，一对多和多对多。也使用主键和外键，但主键和外键存在同一表中。

表层次完整性：表中无重复字段；无计算字段；无多值字段；无复合字段；无重复记录；每个记录都通过一个主键值识别。

在需要提升处理性能时，可以打破上述建议的规则（比如允许冗余等），但最好对遵守良好设计规则的设计有个备份。。



## 《数据库系统概念》第六版

数据库系统体系结构图：
![](https://os.alipayobjects.com/rmsportal/MMmEvpOcrbmXqar.png)

数据库结构的基础是数据模型（data model）：一个用于描述数据、数据之间的联系、数据语义和数据约束的概念工具的集合。关系数据模型是最广泛使用的将数据存储到数据库中的模型。其他的数据模型有面向对象模型、对象-关系模型和半结构化数据模型。

关系数据库由表（table）的集合构成，每个表有唯一的名字。如instructor 表有 Id、name、dept_name、salary 四个列，考察这个表，表中的行可被认为是代表了从一个特定的 Id 到相应的 name、dept_name、salary 值之间的联系。由于一个表就是这种联系的一个集合，表这个概念和数学上的关系这个概念是密切相关的，这也正是关系数据模型名称的由来。在数学术语中，元祖（tuple）只是一组值的序列，在 n 个值之间的一种联系可以在数学上用关于这些值的一个 n 元组（n-tuple）来表示，n 元组对应于表中的一行。这样，在关系模型的术语中，关系（relation）用来指代表，而元组（tuple）用来指代行，属性（attribute）指代表中的列。对于关系的每个属性，都存在一个允许取值的集合，称为该属性的域（domain）。

实体-联系（E-R）数据模型使用一组称作实体的基本对象，以及这些对象间的联系。数据库中实体通过属性集合来描述，例如属性 dept_name、building 与 budget 可以描述大学中的一个系，类似地，属性Id、name、salary 可以描述 instructor 实体。

联系（relationship）是几个实体之间的关联。例如，member 联系将一位教师和她所在的系关联在一起。同一类型的所有实体的集合称作实体集（entity set），同一类型的所有联系的集合称作联系集（relationship set）。

数据库的总体逻辑结构（模式）可以用 实体-联系 图（entity-relationship diagram，E-R 图）进行图形化表示。最常用的方法是采用统一建模语言（Unified Modeling Language，UML）来画这样的图。

-----

数据操纵语言（Data-Manipulation Language，DML）是使得用户可以访问和操纵数据的语言。当今广泛使用的是非过程化的DML，它只需要用户指明需要什么数据，而不需指明如何获得这些数据。

数据定义语言（Data-Definition Language，DDL）是说明数据库模式和数据的其他特性的语言。数据库设计主要包括数据库模式的设计，实体-联系（E-R）数据模型是广泛用于数据库设计的数据模型，它提供了一种方便的图形化的方式来观察数据、联系和约束。

查询语言（query language）是用户用来从数据库中请求获取信息的语言。可以分为过程化的和非过程化的。在过程化语言（procedural language）中，用户指导系统对数据库执行一些列操作以计算出所需的结果。在非过程化的语言（nonprocedural language）中，用户只需描述所需信息，而不用给出获取该信息的具体过程。


### sql
sql语言有以下几个部分：

- 数据定义语言（Data-Definition Language，DDL）：SQL DDL 提供定义关系模式、删除关系以及修改关系模式的命令。
- 数据操纵语言（Data-Manipulation Language，DML）：SQL DML 提供从数据库中查询信息，以及在数据库中插入元组、删除元组、修改元组的能力。
- 完整性（integrity）：SQL DDL 包括定义完整性约束的命令，保存在数据库中的数据必须满足所定义的完整性约束。
- 视图定义（view definition）：SQL DDL 包括定义视图的命令。
- 事务控制（transaction control）：SQL 包括定义事务的开始和结束的命令。
- 嵌入式SQL和动态SQL（embedded SQL and dynamic SQL）：定义SQL语句如何嵌入到通用编程语言，如C、C++、Java中。
- 授权（authorization）：SQL DDL 包括定义对关系和视图的访问权限的命令。

SQL 标准支持多种固有类型，包括：

- char(n)：固定长度为n的字符串。如果长度不足补充存入空格，使其达到n的长度。
- varchar(n)：可变长度的字符串，最大长度为n。
    - 建议使用 varchar 而不是 char
- int、smallint、numeric、float 等等。

使用 create table 命令建立表（即关系），通用形式是：

    create table r
        (A1 D1,
        A2 D2,
        ...,
        An Dn,
        <完整性约束1>,
        ...,
        <完整性约束n>);

其中 r 是关系名，每个 A 是关系 r 模式中的一个属性名，D 是属性 A 的域(指定了属性的类型以及可选的约束)

SQL重点内容：

- 基本语句：select/insert/update/delete、from、where、as、order by、in、on、join、函数avg/count/sum/min/max。其他语句：union、group by、unique、with、having、lateral。重点应用：子查询。
- 连接表达式：内连接inner join、外连接outer join、左外连接left outer join、右外连接right outer join、全外连接full outer join。外连接实际上产生了两个关系(表)的笛卡尔积。

视图：

让所有用户都看到数据库中的关系是不合适的，可能需要向用户隐藏特定的数据。考虑一个职员需要知道教师的标识、姓名和所在系名，但没权限看到教师的工资值。可以用 select 语句查询出允许看到的列，但对查询结果进行计算并存储不是一个好的方式，因为一旦底层数据发生变化，之前查询的结果就会无效。所以，SQL允许通过查询来定义“虚关系”，它在概念上包含查询的结果。但虚关系并不预先计算并存储，而是在使用虚关系的时候才通过执行查询被计算出来。像这种不是逻辑模型的一部分，但作为虚关系对用户可见的关系称为「视图」(view)。

视图定义命令：`create view v as <query expression>;` v表示视图名，<query expression> 可以是任何合法的查询表达式。示例：`create view faculty as select ID, name, dept_name from instructor;`这个视图屏蔽了 salary 列。

特定数据库系统允许存储视图关系，它们保证，如果用于定义视图的实际关系改变，视图也跟着修改，这样的视图被称为物化视图（materialized view）。

对查询而言，视图是一个有用的工具，但如果我们用它们来表达更新、插入或删除，它们可能带来严重的问题。困难在于，用视图表达的数据库修改必须被翻译为对数据库逻辑模型中实际关系的修改。就像对上边的`faculty`视图插入数据，实际数据表中还必须要插入 salary 列的数据，此时 salary 列就不能为非空约束，不然修改视图会失败。

一般来说，如果定义视图的查询对下列条件都能满足，我们称SQL视图是可更新的（即视图上可以执行插入、更新或删除）：1. from子句中只有一个数据库关系。 2. select子句中只包含关系的属性名，不包含任何表达式、聚集或 distinct 声明。 3. 任何没有出现在select子句中的属性可以取空值；即这些属性上没有not null约束，也不构成主键的一部分。 4. 查询中不含有group by或having子句。

事务：

事务（transaction）由查询或更新语句的序列组成。SQL标准规定当一条SQL语句被执行，就隐式地开始了一个事务。但事务被提交（commit）或被回滚（rollback）时，该事务结束。在很多SQL实现中，默认方式下每个SQL语句自成一个事务，且一执行完就提交。如果一个事务要执行多条SQL语句，就必须关闭单独SQL语句的自动提交。如何关系自动提交也依赖于特定的SQL实现，在诸如JDBC或ODBC那样的应用编程接口中存在标准化方式来完成这项工作。

数据库系统保证在发生诸如某条SQL语句错误、断电、系统崩溃这些故障的情况下，如果一个事务还没有完成commit work，其影响将被回滚。在断电和系统崩溃情况下，回滚会在系统重启后执行。

索引：

许多查询只涉及少量记录，例如找出id为221的学生的tot_cred值，只涉及学生记录中的一小部分。如果数据库读取每条记录并一一检查，这样是很低效的。

在关系的属性上所创建的「索引(index)」是一种数据结构，它允许数据库系统高效地找到关系中那些在索引属性上取给定值的元组，而不用扫描关系中的所有元组。很多数据库支持这样创建索引：`create index studentID_index on student(ID);` 在 student 关系的属性 ID 上创建了一个名为 studentID_index 的索引。


存储过程，创建示例：

    create procedure dept_proc(in name varchar(20), out count integer)
        begin
            select count(*) into d_count
            from instructor
            where instructor.name = dept_proc.name
        end

sql1999 支持在存储过程的begin...end之间包含 declare、while、repeat、for、if-then-else、case、signal exception、continue 等语句。


触发器（trigger）是一条语句，当对数据库作修改时，他自动被系统执行。触发器可以用来实现未被SQL约束机制指定的某些完整性约束，用来当满足特定条件时对用户发警报或自动开始执行某项任务。创建方式：`create trigger xx after update ...`。 触发器是很有用的工具，但是如果有其他候选方法就最好别用触发器。很多触发器的应用都可以用适当的存储过程来替换。


SQL允许使用命令`create temporary table`来创建临时表；这些表仅在执行查询的事务内部才可用，并随事务的完成而被删除。

递归查询：用迭代来计算传递闭包，使用repeat循环；SQL中的递归，使用递归视图，任何递归视图都必须被定义为两个子查询的并，即一个非递归的基查询(base query)和一个使用递归视图的递归查询(recursive query)，递归查询必须是单调的(monotonic)。从SQL1999开始用`with recursive`子句来支持有限形式的递归，还允许使用`create recursive view`代替`with recursive`来创建递归定义的永久视图。

SQL支持一些高级的聚集特性，包括排名(range)和分窗查询，这些特性简化了一些聚集操作的表达方式，并提供了更高效的求值方法。

联机分析处理（OLAP）工具帮助分析人员用不同的方式查看汇总数据，使他们能够洞察一个组织的运行。OLAP工具工作在以维属性和度量属性为特性的多维数据之上。数据立方体由以不同方式汇总的多维数据构成，预先计算数据立方体有助于提高汇总数据的查询速度。交叉表的显示允许用户一次查看多维数据的两个维及其汇总数据。下钻、上卷、切片和切块是用户使用OLAP工具时执行的一些操作。从SQL1999标准开始，SQL提供了一系列的用于数据分析的操作符，其中包括cube和rollup操作，有些系统还支持pivot子句，可以很方便地生成交叉表。

关系代数（relational algebra）定义了一套在表上运算且输出结果也是表的代数运算。这些运算可以混合使用来得到表达所希望查询的表达式。关系代数定义了关系查询语言中使用的基本运算。关系代数是一种简洁的、形式化的语言，不适合于那些偶尔使用数据库系统的用户。因此商用数据库系统采用有更多“语法修饰”的语言，如SQL，它是基于关系代数的。
关系演算是简洁的、形式化的语言，并不适合于那些偶尔使用数据库系统的用户。这两种形式化语言构成了两种更易使用的语言 QBE 和 Datalog 的基础。


### 数据存储和查询
绝大多数数据库将数据存储在磁盘上（越来越多地在闪存上），并将数据取入内存用于处理。存储设备的物理特性影响很大，磁盘上随机数据片段的访问比内存访问慢得多：磁盘访问需要几十毫秒，而内存访问只需十分之一微秒。

缓冲区（buffer）：缓冲区管理，被钉住的块，块的强制写出。缓冲区替换策略：最近最少使用（LRU），立即丢弃，最近最常使用（MRU）。

当数据库系统中的程序需要磁盘上的块(数据)时，它向缓冲区管理器发出请求（即调用），如果这个块已经在缓冲区中，缓冲区管理器将这个块在主存储器中的地址传给请求者。如果这个块不在缓冲区中，缓冲区管理器首先在缓冲区中为这个块分配空间，如果需要的话，会把其他块移出主存储器，为这个新块腾出空间。然后缓冲区管理器把请求的块从磁盘读入缓冲区，并将这个块在主存储器中的地址传给请求者。

如果你熟悉操作系统的概念，你会发现缓冲区管理器几乎和大多数操作系统中的虚拟存储管理器是一样的它们的一点区别是数据库的大小会比机器的硬件地址空间大得多，因此存储器地址不足以对所有磁盘块进行寻址。此外为了更好地为数据库系统服务，缓冲区管理器必须使用比典型的虚拟存储器管理策略更加复杂的技术：缓冲区替换策略（buffer replacement strategy）；被钉住的块（pinned block）；块的强制写出（forced output of block）。

因为数据以块为单位在磁盘存储器和主存储器之间传输，所以采取用一个单独的块包含相关联的记录的方式，将文件记录分配到不同的块中是可取的。如果我们能够仅使用一次块访问就可以存取我们想要的多个记录，就能节省磁盘访问次数。因为磁盘访问通常是数据库系统性能的瓶颈，所以仔细设计块中记录的分配可以获得显著的性能提高。

数据字典也称为系统目录，用于记录元数据，即关于数据的数据，例如关系名、属性名和类型、存储信息、完整性约束和用户信息。

减少磁盘访问数量的一种方法是在主存储器中保留尽可能多的块。因为在主存储器中保留所有的块是不可能的，所以需要为块的存储而管理主存储器中可用空间的分配。缓冲区是主存储器的一部分，可用于存储磁盘块的拷贝。负责分配缓冲区空间的子系统称为缓冲区管理器。




### 数据挖掘与信息检索
数据挖掘（data mining）这个术语指半自动地分析大型数据库并从中找出有用的模式的过程。和人工智能中的知识发现（也称为机器学习（machine learning））或者统计分析一样，数据挖掘试图从数据中寻找规则或模式。但是，数据挖掘和机器学习、统计分析不一样的地方在于它处理大量的主要存储在磁盘上的数据。也就是说，数据挖掘就是在数据库中发现知识。

从数据库中发现的某些类型的知识可以用一套规则（rule）表示。下面是一条规则的例子，非形式化地描述为：“年收入高于50 000美元的年轻女性是最可能购买小型运动车的人群”。当然这条规则并不是永远正确的，但它有一定的“支持度”和“置信度”。其他类型的知识表达方式有联系不同变量的方程式，或者通过其他机制根据某些已知的变量来预测输出。

通常在数据挖掘中还需要人参与，包括数据预处理使数据变为适合算法的格式，在已发现模式的后处理中找到新奇的有用模式。给定一个数据库，可能有不止一种类型的模式，需要人工交互挑选有用类型的模式。由于这个原因，现实中的数据挖掘是一个半自动的过程。

目前有几种技术和工具可用于帮助做决策支持。一些数据分析的工具让分析人员能够从不同的角度观察数据。其他的分析工具提前计算出大量数据的汇总信息，以更快响应查询。现在的SQL标准也增加了支持数据分析的成分。

大型企业有各种不同的可用于业务决策的数据来源。要在这些各种各样的数据上高效地执行查询，企业建立了数据仓库（data warehouse）。数据仓库从多个来源收集数据，建立统一的模式，驻留在单个节点上。于是，就为用户提供了单个统一的数据界面。

文本数据也爆炸式增长。文本数据是非结构化的，与关系数据库中严格的结构化数据不同。查询非结构化的文本数据被称为信息检索（information retrieval）。信息检索系统和数据库系统很大程度上是相同的——特别是基于辅助存储器的数据存储和检索。但是信息系统领域与数据库系统所强调的重点是不同的，信息系统重点强调基于关键词的查询，文档与查询的相似度，以及文档的分析、分类和索引。

## JDBC、Hibernate、iBATIS 使用区别

Java应用传统上使用JDBC（Java Database Connectivity）API来把数据持久到关系数据库中。JDBC API使用SQL语句来完成创建（create）、读取（read）、更新（update）和删除（delete）（CRUD）操作。JDBC代码内嵌在Java类中——换句话说，这类代码与业务逻辑紧密耦合在一起。这类代码还在很大程度上依赖于SQL，而SQL并非是跨数据库的标准；这使得从一种数据库移植到另一种数据库变得困难起来。

对象-关系映射（ORM）使用直接映射来生成内部的JDBC或是SQL代码。然而对于一些应用场景来说，你需要对SQL查询做更加直接的控制。在编写涉及了一系列更新查询的应用时，直接编写自己的SQL查询比依赖于ORM生成的SQL来得更有效一些。另外，在对象模型和数据模型之间存在失配时，ORM是不能够使用的。

iBATIS最好是用在你需要全面地控制SQL的时候，在需要对SQL查询做微调的时候也很有用。当你在应用和数据库设计两方面都有完全的控制权的时候，就不应该使用iBATIS，因为在这样的情况下，应用可能会做出修改以适应数据库，或是反过来。在这种情形中，你可以构建一个完全的对象-关系应用，其他的ORM工具更适于使用，因为iBATIS较为以SQL为中心，其通常被称作反转的——功能齐全的ORM工具生成SQL，而iBATIS直接使用SQL。iBATIS也不适合于非关系型的数据库，因为这类数据库不支持事务和其他iBATIS用到的键特性。

JPA为Java SE应用和Java EE应用提供了一个标准的基于POJO的ORM解决方案，其使用实体类、实体管理器和持久单元来映射和持久领域对象和数据库中的表。JPA应该用在需要标准的基于Java的持久性解决方案的时候。JPA支持继承和多态这两种面向对象编程特性。JPA的缺点是其需要一个实现了其自身的提供程序。此外，JPA被定义成只能在关系数据库上工作。如果你的持久化解决方案需要扩展到其他类型的数据存储上，比如XML数据库上的话，则JPA就不能够用来解决你的持久性问题了。

JPA是需要Provider来实现其功能的，Hibernate就是JPA Provider中很强的一个，应该说无人能出其右。从功能上来说，JPA就是Hibernate功能的一个子集。Hibernate 从3.2开始，就开始兼容JPA。Hibernate3.2获得了Sun TCK的JPA(Java Persistence API) 兼容认证。

只要熟悉Hibernate或者其他ORM框架，在使用JPA时会发现其实非常容易上手。例如实体对象的状态，在Hibernate有自由、持久、游离三种，JPA里有new，managed，detached，removed，明眼人一看就知道，这些状态都是一一对应的。再如flush方法，都是对应的，而其他的再如说Query query = manager.createQuery(sql)，它在Hibernate里写法上是session，而在JPA中变成了manager，所以从Hibernate到JPA的代价应该是非常小的

同样，JDO，也开始兼容JPA。在ORM的领域中，看来JPA已经是王道，规范就是规范。在各大厂商的支持下，JPA的使用开始变得广泛。

像Hibernate和JPA一类的传统的ORM解决方案应该用来作为一种完全的对象-关系映射手段。Hibernate和JPA直接把Java对象映射到数据库表上，而iBATIS则是把Java对象映射到SQL查询的结果上。在某些应用中，领域模型中的对象是根据业务逻辑来设计的，可能不完全与数据模型匹配，在这种情况下，iBATIS是合适的选择。

总是会存在精通Java的人和更信任SQL的人这样的一种划分，对于一个熟练的Java程序员来说，他想使用一个无需与SQL有太多交互的持久性框架，那么Hibernate是最好的选择，因为它会在运行时生成高效率的SQL查询。但是，如果你想要使用存储过程来对数据库查询做各方面的控制的话，则iBATIS是推荐的解决方案。JPA还可通过EntityManager的createNativeQuery()方法来支持SQL。

iBATIS大力支持SQL，而Hibernate和JPA则是使用它们自己的查询语言（分别是HQL和JPQL），这些语言与SQL类似。

一个应用要成功的话需要具备良好的性能。Hibernate通过提供缓存设施来提高性能，这些缓存设施有助于更快地从数据库中检索数据。iBATIS使用SQL查询，这些查询可通过微调来获得更佳性能。JPA的性能则取决于供应商的实现，根据每个应用的特有情况做选择。

有时候，你需要改变应用使用的关系数据库，如果你使用Hibernate来作为持久化解决方案的话，那么这一问题很容易解决，因为Hibernate在配置文件中使用了一个数据库方言属性。从一个数据库移植到另一个数据库上仅是把dialect属性修改成适当值的事。Hibernate使用这一属性来作为生成特定于某种给定数据库的SQL代码的指南。

如前所述，iBATIS要求你编写自己的SQL代码，因此，iBATIS应用的可移植性取决于这些SQL。如果查询是使用可移植的SQL编写的话，那么iBATIS也是可在不同的关系数据库之间做移植的。另一方面，JPA的移植性则取决于其正在使用的供应商实现。JPA是可在不同的实现之间做移植的，比如Hibernate和TopLink Essentials之间。因此，如果应用没有用到某些提供商特有的功能特性的话，那么移植性就不是什么大问题。














# Java

- [Java SE & Java EE](./se_ee.md)
- [数据操作(Hibernate/Mybatis/..)和数据库(表/事务/..)](./data-db.md)

- QPS、RT、CPU 性能监控
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
- DRM：分布式资源管理，DRM框架即提供了这样一种能力，可以在运行时动态、即时地改变应用系统内存中的资源值，并且已经解决多机房问题。
- zookeeper：可以充当一个服务注册表（Service Registry），让多个服务提供者形成一个集群，让服务消费者通过服务注册表获取具体的服务访问地址（ip+端口）去访问具体的服务提供者。zookeeper提供了“心跳检测”功能，它会定时向各个服务提供者发送一个请求（实际上建立的是一个 socket 长连接），如果长期没有响应，服务中心就认为该服务提供者已经“挂了”，并将其剔除


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


[Serverless：云时代的软件架构核心思想](https://www.atatech.org/articles/131723)

BaaS、FaaS、Serverless:
BaaS后端即服务 - 概念篇 <https://yq.aliyun.com/articles/8521>
BaaS、FaaS、Serverless都是什么馅儿？ <https://yq.aliyun.com/articles/224403>
对Serverless架构的一点体验和思考: <https://www.jianshu.com/p/51a19ef5f8cf>
LeanCloud 与阿里云到底有什么区别？ <https://blog.leancloud.cn/4645/>
AWS Lambda: <https://aws.amazon.com/cn/lambda/>

- 对业务开发团队来说，他们的开发能力更专注前端，交互，需要掌握的技术栈里就只需要javascript 和 Restful API 就够了，他们可以更专注去理解业务模型和逻辑，快速构建业务系统，进行业务创新。
- 而对于后端团队，将跟专注做平台和服务，后者需要他们将 J2EE 时代的开发架构，比如 MVC， RPC等架构向微服务，EDA，CQRS等云时代的架构升级，更好的将系统复杂性解构，利用服务化来构建满足业务团队的需要。

### 微服务

[微服务架构的几种模式](http://microservices.io/patterns/index.html)、
[浅谈命令查询职责分离(CQRS)模式](http://www.cnblogs.com/yangecnu/p/Introduction-CQRS.html)、
[DDD CQRS架构和传统架构的优缺点比较](http://www.cnblogs.com/netfocus/archive/2016/02/06/5184182.html)、
什么是微服务架构：<https://os.alipayobjects.com/rmsportal/OzCkwPWAvRGwqXv.png>、
[stateless-authentication-for-microservices](http://www.slideshare.net/alvarosanchezmariscal/stateless-authentication-for-microservices)

Matt 在对微服务的总体介绍中是这样说的：经过分离的组件可以各自拥有独立的生命周期，并且按需进行扩展。不仅如此，这种方式也打破了组件之间的技术依赖，这就允许每个服务各自选择最适合的技术进行实现。通过将较大的问题分解为几个较小的问题，让每个问题更易于进行分析，也更利于开发者选择最适合的解决方案。

soa 是 Service-Oriented Architecture 的首字母简称，面向服务架构。开发人员很容易理解为是一个 Web Service，但是这绝对不是 SOA，那顶多只能算是 SOA 的一种实现方法。
微服务只是一种为经过良好架构设计的 SOA 解决方案、实现面向服务的交付方案。SOA 提供了上下文的框架，同时也提供了微服务所坚持的大部分规则。不仅如此，SOA 还提供了一种更宽泛的上下文，使微服务能够在复杂的企业中符合这些上下文。许多人在不断地抱怨 SOA 中的各种 WS-* 协议、ESB 的庞大以及各种极端复杂的项目，其实这只是面临的挑战不同而已。

当前业界比较成熟的微服务框架有 Netflix 的 Karyon/Ribbon，Spring 的 Spring Boot/Cloud，阿里的 Dubbo 等。配置中心比较成熟的开源方案有百度的 Disconf，360 的 QConf，Spring 的 Cloud Config 和阿里的 Diamond 等。

通常来说，RESTful 服务最适合于为某个数据模型提供 CRUD 操作，而微服务架构中的服务往往能够被轻易地分解为这些 CRUD 类型的服务，因此它与 RESTful 就能够很好地结合在一起。而对于其他类型的服务来说，类 RESTful 风格的服务通常也是一种良好的选择，这种类 RESTful 的风格也会使用 HTTP 作为传输协议，但服务本身并不一定要 100% 地符合 RESTful 的原则。

## 书
《java并发编程实战源码》

《Effective Java Examples》
This are the souces from the book "Effective Java Second Edition", written by Joshua Bloch.、
They are unmodifed, except the package names.
The original source are downloaded from http://java.sun.com/docs/books/effective/index.html, but are no longer provided.

尚学堂 爱慕课

- [Java 征途：行者的地图](http://www.cnblogs.com/mindwind/p/5251430.html)
- [Java工程师成神之路~](http://www.hollischuang.com/archives/489)
- [算法 with Java](https://github.com/pedrovgs/Algorithms)
- [Java 设计模式](https://www.programcreek.com/java-design-patterns-in-stories/)


## spring

> 2016-01

视频地址：http://www.imooc.com/learn/196

[Spring基础知识汇总](http://www.imooc.com/article/1309)、
[SpringMVC学习笔记](http://www.imooc.com/article/1392)

[文档](http://docs.spring.io/spring-framework/docs/current/spring-framework-reference/html/index.html)

In Spring, the objects that form the backbone of your application and that are managed by the Spring IoC container are called beans. A bean is an object that is instantiated, assembled, and otherwise managed by a Spring IoC container. Otherwise, a bean is simply one of many objects in your application.

@Component is a generic stereotype for any Spring-managed component. @Repository, @Service, and @Controller are specializations of @Component for more specific use cases, for example, in the persistence, service, and presentation layers, respectively.

When @Configuration classes are provided as input, the @Configuration class itself is registered as a bean definition, and all declared @Bean methods within the class are also registered as bean definitions.

When @Component and JSR-330 classes are provided, they are registered as bean definitions, and it is assumed that DI metadata such as @Autowired or @Inject are used within those classes where necessary.


spring是一个轻量级的 IOC 和 AOP 容器框架，通过其核心的依赖注入机制，以及AOP的声明式事务管理，与持久层框架整合，以及与其他的MVC框架整合，为企业应用提供一个轻量级的解决方案。

非侵入式设计：从框架角度可以这样理解，无需继承框架提供的类，这种设计就可以看作是非侵入式设计，如果继承了这些框架类，就是侵入设计，如果以后想更换框架之前写过的代码几乎无法重用，如果非侵入式设计则之前写过的代码仍然可以继续使用。

POJO：POJO（Plain Old Java Objects）简单的Java对象，它可以包含业务逻辑或持久化逻辑，但不担当任何特殊角色且不继承或不实现任何其它Java框架的类或接口。

AOP：AOP是Aspect Oriented Programming的缩写，意思是面向切面编程，提供从另一个角度来考虑程序结构以完善面向对象编程（相对于OOP），即可以通过在编译期间、装载期间或运行期间实现在不修改源代码的情况下给程序动态添加功能的一种技术。通俗点说就是把可重用的功能提取出来，然后将这些通用功能在合适的时候织入到应用程序中；比如安全，日记记录，这些都是通用的功能，我们可以把它们提取出来，然后在程序执行的合适地方织入这些代码并执行它们，从而完成需要的功能并复用了这些功能。

灵活的Web层支持：Spring本身提供一套非常强大的MVC框架，而且可以非常容易的与第三方MVC框架集成，比如Struts等。

spring由以下几个模块组成：

1. 核心容器和支持工具
核心容器主要组成部分就是 BeanFactory 类，它采用工厂模式实现反转控制，把应用程序的配置和依赖性与实际的应用程序代码分离。
2. Application context 模块
它扩展了 BeanFactory，提供了对国际化、系统生命周期事件的支持。
3. AOP模块
直接集成了面向切面编程的功能，通过使用AOP，不用依赖EJB，可以在应用系统中使用声明式的事务管理策略。
4. JDBC 和 DAO模块
提供了数据库操作中的模板代码，简化数据库操作工作。
5. ORM映射模块
不提供对ORM映射的实现，而提供了对其他ORM工具的支持。支持的工具包括：JDO、Hibernate、ibatis等
6. web模块
该模块建立在 Application context模块的基础上，为基于web的应用程序提供了上下文，提供常见的web任务处理功能，提供了对 struts 的支持。
7. MVC模块
它是一个完整的MVC实现，也可以和其他MVC框架集成，支持各种视图技术如JSP、velocity、Tiles等

IoC就是Inversion of Control，控制反转还有一个名字叫做依赖注入（Dependency Injection），就是由容器控制程序之间的关系，而非传统实现中，由程序代码直接操控。IoC意味着将你设计好的类交给系统去控制，而不是在你的类内部控制。IoC很好的体现了面向对象设计法则之一—— 好莱坞法则：“别找我们，我们找你”；即由IoC容器帮对象找相应的依赖对象并注入，而不是由对象主动去找。


### Struts、Hibernate(orm框架)

- Struts的目的是为了分离视图层和控制层
- Spring是为了让你养成用接口编程的好习惯 提高程序的重用率还有可维护性（健壮性）
- Hibernate的目的是为了实现用面向对象的思想来管理数据库实现与数据库之间的低耦合

- 模型层，用Hibernate框架让来JavaBean在数据库生成表及关联，通过对JavaBean的操作来对数据库进行操作；
- 控制层，用Struts框架来连接数据层和视图层的，接收、处理、发送数据并控制流程；
- 视图层，用JSP模板把页面展现给用户以及提供与用户的交互。

Struts2 整合 Hibernate 开发：分层思想，从上到下：表现层 → 业务逻辑层 → 持久层 → 数据库层

广义上持久层包括 DAO设计模式 和 Hibernate持久化操作两部分。
三个重要部分：DAO接口、DAO实现类(实现DAO接口)、DAO工厂类(用来负责实例化DAO实现类)。

业务逻辑组件的开发和持久层类似，包含三个部分：业务逻辑组件接口、业务逻辑组件实现类、业务逻辑组件工厂类。


### Velocity

- JSP是编译执行，而Velocity是解释执行
- 编译执行的效率明显好于解释执行
- JSP的执行必须要有Servlet的运行环境，也就是需要ServletContext、HttpServletRequest、HttpServletResponse类。而渲染Velocity不需要，所以Velocity不只应用在Servlet环境中。

Velocity优化实践：改变Velocity的解释执行，变为编译执行。



# se / ee

类型转换（cast）的原意是“模型铸造”，在适当时候，Java会将一种数据类型转换为另一种。

Java不允许将一个数字作为布尔值使用，这在c/c++里是允许的(真是非零，假是零)。在Java中`if(a){}`，需要先用一个条件表达式将a转换为布尔值，例如`if(a!=0){}`。

switch语句要求使用一个选择因子，并且必须是int或char那样的整数值。假如将一个字符串或浮点数作为选择因子使用，它们在switch语句里是不会工作的。或者用enum和switch语句协调工作。

假定你的对象（并非使用new）获得了一块“特殊”的内存区域，由于垃圾回收器只知道释放那些经由new分配的内存，所以它不知道如何释放这块“特殊”内存。这种情况下，Java允许在类中定义一个名为`finalize()`的方法，垃圾回收器会首先调用这个方法（但尽量不要用这个方法）。Java中对象可能不被垃圾回收，垃圾回收并不等于c++中的析构。

看来之所以要有`finalize()`，是由于在分配内存时可能采用了类似C语言中的做法，而非Java中的通常做法。这种情况主要发生在使用"本地方法"的情况下，本地方法是一种在Java中调用非Java代码的方式。

在非Java代码中，也许会调用C的`malloc()`函数系列来分配存储空间，而且除非调用了`free()`函数，否则存储空间将得不到释放，从而造成内存泄露。当然，`free()`是C和C++中的函数，所以需要在`finalize()`中用本地方法调用它。

Java中垃圾回收器并不是采用“引用计数”方式来进行。引用记数是一种简单但速度很慢的垃圾回收技术。每个对象都含有一个引用记数器，当有引用连接至对象时，引用计数加1。当引用离开作用域或被置为null时，引用计数减1。虽然管理引用记数的开销不大，但这项开销在整个程序生命周期中将持续发生。垃圾回收器会在含有全部对象的列表上遍历，当发现某个对象的引用计数为0时，就释放其占用的空间(但是，引用记数模式经常会在记数值变为0时立即释放对象)。这种方陆有个缺陷，如果对象之间存在循环引用，可能会出现"对象应该被回收，但引用计数却不为零"的情况。对垃圾回收器而言，定位这样的交互自引用的对象组所需的工作量极大。

Java中垃圾回收器是"自适应的、分代的、停止-复制、标记-清扫"式垃圾回收器。

Java虚拟机中有许多附加技术用以提升速度。尤其是与加载器操作有关的，被称为"即时" (Just-In-Time，JIT)编译器的技术。这种技术可以把程序全部或部分翻译成本地机器码(这本来是Java虚拟机的工作)，程序运行速度因此得以提升。从不会被执行的代码也许就压根不会被JIT所编译。新版JDK中的Java HotSpot技术就采用了类似方法，代码每次被执行的时候都会做一些优化，所以执行的次数越多，它的速度就越快。

总结一下对象的创建过程，假设有个名为Dog的类:

1. 即使没有显式地使用static关键字，构造器实际上也是静态方法。因此，当首次创建类型为Dog的对象时，或者Dog类的静态方法/静态域首次被访问时， Java解释器必须查找类路径，以定位Dog.class文件。
2. 然后载入Dog.class(这将创建一个Class对象)，有关静态初始化的所有动作都会执行。因此，静态初始化只在Class对象首次加载的时候进行一次。
3. 当用`new Dog()`创建对象的时候，首先将在堆上为Dog对象分配足够的存储空间。
4. 这块存储空间会被清零，这就自动地将Dog对象中的所有基本类型数据都设置成了默认值 (对数字来说就是0，对布尔型和字符型也相同)，而引用则被设置成了null。
5. 执行所有出现于字段定义处的初始化动作。
6. 执行构造器。这可能会牵涉到很多动作，尤其是涉及继承的时候。

类既不可以是private的(这样会值得除该类之外，其他任何类都不可以访问它)， 也不可以是protected的。所以对于类的访问权限，仅有两个选择：包访问权限或public。如不希望其他任何人对该类拥有访问权限，可以把所有的构造器都指定为private，从而阻止任何人创建该类的对象，但是有一个例外，就是你在该类的static成员内部可以创建。

可以为每个类都创建一个`main()`方法。这种在每个类中都设置一个`main()`方法的技术可使每个类的单元测试都变得简便易行。而且在完成单元测试之后，也无需删除`main()`，可以将其留待下次测试。

由导出类转型成基类，在继承图上是向上移动的，因此一般称为向上转型。由于向上转型是从一个较专用类型向较通用类型转换，所以总是很安全的。也就是说，导出类是基类的一个超集。它可能比基类含有更多的方法，但它必须至少具备基类中所含有的方法。在向上转型的过程中，类接口中唯一可能发生的事情是丢失方法，而不是获取它们。这就是为什么编译器在"未曾明确表示转型"或"未曾指定特殊标记"的情况下，仍然允许向上转型的原因.

在面向对象编程中，生成和使用程序代码最有可能采用的方法就是直接将数据和方法包装进一个类中，井使用该类的对象。也可以运用组合技术使用现有类来开发新的类，而继承技术其实是不太常用的。因此，尽管在教授OOP的过程中我们多次强调继承，但这并不意味着要尽可能使用它。相反，应当慎用这一技术，其使用场合仅限于你确信使用该技术确实有效的情况。到底是该用组合还是用继承，一个最清晰的判断办法就是问一问自己是否需要从新类向基类进行向上转型。如果必须向上转型，则继承是必要的，但如果不需要，则应当好好考虑自己是否需要继承。只要记得自问一下"我真的需要向上转型吗?"就能较好地在这两种技术中做出决定。

对于基本类型，final使数值恒定不变;而用于对象引用，final使引用恒定不变。一且引用被初始化指向一个对象，就无法再把它改为指向另一个对象。然而，对象其自身却是可以被修改的。

编写构造器时有一条有效的准则:"用尽可能简单的方法使对象进入正常状态；如果可以的话，避免调用其他方法"。在构造器内唯一能够安全调用的那些方法是基类中的final方法(也适用于private方法，它们自动属于final方法)，这些方法不能被覆盖，也就不容易出现怪异问题。




## 集合
集合有两个基本的接口：Collection和Map。还有Set、ListIterator接口等。实在这些接口的类有很多。

Collection接口扩展了Iterable接口，因此对于标准类库中的任何集合都可以使用「for each」循环。

泛型集合接口有一个很大的优点，即算法只需要实现一次。标准的C++类库已经有了几十种非常有用的算法，每个算法都是在泛型集合上操作的。Java类库中的算法没有如此丰富，但是也包含了基本的排序、二分查找等实用算法。

数组可以存放对象，也可以存放基本类型。数组是容器吗？

## 多线程
线程和进程的区别: https://gw.alipayobjects.com/zos/rmsportal/sPHJvmeyIHeUBcQqOmVO.png

操作系统的多任务：在同一时刻运行多个程序的能力。计算机有多个CPU，但是并发执行的进程数目并不是由CPU数目制约的。操作系统将CPU的时间片分配给每一个进程，给人并行处理的感觉。

通常，结程只是一种为单一处理器分配执行时间的手段。但是如果操作系统支持多处理器，那么每个任务都可以被指报给不同的处理器，并且它们是在真正地并行执行。在语言级别上，多钱程所带来的便利之-便是程序员不用再操心机器上是有多个处理器还是只有一个处理器.由于程序在逻辑上被分为钱程，所以如果机器拥有多个处理器，那么程序不需要特殊调整也能执行得更快。

可以同时运行一个以上线程的程序称为多线程程序。多进程与多线程本质区别在于每个进程拥有自己的一整套变量，而线程则共享数据。但共享变量使线程之间的通信比进程之间的通信更有效、更容易。

一些名词：`中断线程`，`线程状态`，`线程属性`，`同步：竞争条件、锁对象、条件对象、死锁`，`阻塞队列`，`线程安全的集合`，`线程池`，`同步器`

构建一个新的线程是有一定代价的，因为涉及与操作系统的交互。如果程序中创建了大量的生命周期很短的线程，应该使用「线程池」。一个线程池中包含许多准备运行的空闲线程。


## Java I/O
I/O操作的都是字节而不是字符。字符到字节必须要经过编码转换，而这个编码又非常耗时，而且会经常出现乱码问题。

访问文件的方式：内核缓存访问、磁盘访问、同步与异步方式访问、内存映射方式访问。

Java序列化就是将一个对象转化成一串二进制表示的字节数组。需要持久化，对象必须继承`java.io.Serializable`接口。反序列化则是相反的过程，将这个字节数组再重新构造成对象（反序列化必须有原始类作为模板，才能将这个对象还原）。

影响网络传输的因素：网络带宽，传输距离（数据在光纤中移动并不是走直线的、会有一个折射率、导致速度减小为光速的约2/3 产生传输延时），TCP拥塞控制。

主机A的应用程序要能和主机B的应用程序通信，必须通过Socket建立连接。建立TCP连接需要底层的IP协议(网络层)来寻址网络中的主机。但一台主机上可能运行着多个应用程序，需要通过TCP和UDP的地址也就是「端口」来指定某个应用程序。

### I/O调优
- 磁盘I/O优化
    - 性能检测
    - 增加缓存，减少磁盘访问次数
    - 优化磁盘管理系统
    - 设计合理的磁盘存储数据块，以及访问策略
    - 应用合理的RAID策略提升磁盘I/O
- TCP网络参数调优
    - 增大端口数
    - 让Tcp连接复用
- 网络I/O优化
    - 减少网络交互次数（如js文件的combo请求）
    - 减少网络传输数据量的大小（如web页面gzip压缩）


## Javac编译原理
Javac是一种编译器，能将一种语言规范转成另一种语言规范，通常编译器都是将便于人理解的语言规范转化成机器容易理解的语言规范，如C、C++或者汇编语言都是将源码直接编译成目标机器码，这个目标机器码是CPU直接执行的指令集合。Javac的任务就是将Java源代码先转换成jvm能够识别的一种语言（从.java文件转为.class文件），然后由jvm将jvm语言再转换成当前这个机器能够识别的机器语言。

Javac主要有四大模块：词法分析器、语法分析器、语义分析器、代码生成器。词法分析的结果就是把Java源文件中的字符流转换成对应的符合规范的token流。语法分析的结果是形成一个符合Java语言规范的抽象语法树，它的作用是把语言的主要词法用一个结构化的形式组织在一起。语义分析的结果是将复杂的语法转化成最简单的语法、如将foreach转换成for循环结构，形成一个注解过后的抽象语法树，更接近目标语言的语法规则。代码生成器的结果是生成符合Java虚拟机规范的字节码。

## 深入class文件结构
Java是跨平台的，一次编译到处运行。这个编译好的class文件到底是什么样？为何它能够到处运行？

## 深入分析ClassLoader工作机制
ClassLoader就是类加载器，负责将class加载到JVM中；还能审查每个类应该由谁加载、它是一种父优先的等级加载机制；还有一个任务就是将class字节码重新解析成JVM统一要求的对象格式。

内容比较复杂，一些关键词：`defineClass()`、`findClass()`、`loadClass()`、`ExtClassLoader`、`AppClassLoader`、`URLClassLoader`、`ClassNotFoundException`、`NoClassDefFoundError`、`StandardClassLoader`、`WebappClassLoader`、

查看classloader：

    //《深入分析Java Web技术内幕》p166
    ClassLoader classLoader = this.getClass().getClassLoader();
    while(classLoader != null){
        System.out.print(classLoader.getClass().getCanonicalName());
        classLoader = classLoader.getParent();
    }

#### ClassLoader能完成的事情如下：
- 在自定义路径下查找自定义的class类文件，也许我们需要的class文件并不总是在已经设置好的ClassPath下面，那么需要自己实现一个ClassLoader来找到这个类。
- 对我们自己的要加载的类做特殊处理，如保证通过网络传输的类的安全性，可以将类经过加密后再传输，在加载到JVM之前需要对类的字节码再解密，就可以在自定义的ClassLoader中实现。
- 我们可以检查已经加载的class文件是否被修改，如果修改了，可以重新加载这个类，从而实现类的热部署。

#### Java应不应该动态加载类
用Java的一个痛处就是，如果修改一个类，必须要重启一边，很费时。于是能否来个动态类的加载而不需要重启JVM？不应该这样。

Java的优势正是基于共享对象的机制，达到信息的高度共享，也就是通过保存并持有对象的状态而省去类信息的重复创建和回收。对象一旦被创建，这个对象就可以被人持有和利用。

对象的引用关系只有对象的创建者持有和使用，JVM不可以干预对象的引用关系，因为JVM并不知道对象是怎么被使用的，这就涉及JVM并不知道对象的运行时类型而只知道编译时类型。假如一个对象的属性结构被修改，但是运行时其他对象可能仍然引用该属性。

前面分析的造成不能动态提供类对象的关键是，对象的状态被保存了，并且被其他对象引用了，一个简单的解决办法就是不保存对象的状态，对象被创建使用后就被释放掉，下次修改后，对象也就是新的了。这就是`JSP`，它难道不是可以动态加载类吗？其实所有其他解释型语言都是如此。


## JVM
以计算为中心看计算机的体系结构可分为几部分：指令集；计算单元；寻址方式；寄存器定义；存储单元。指令集就是CPU中用来计算和控制计算机系统的一套指令的集合，指令集的先进与否关系到CPU的性能发挥，体现CPU性能的一个重要标志。当前计算机中指令集主要分为：精简指令集（RISC）和复杂指令集（CISC），桌面操作系统中普遍使用CISC。

机器如何执行代码？JVM为何选择基于栈的架构？（p183-185）

JVM的结构基本由4部分组成：类加载器；执行引擎；内存区；本地方法调用。执行引擎是核心部分，用来解析JVM字节码指令，得到执行结果。在《Java虚拟机规范》中规定了执行引擎执行字节码时应该处理什么、得到什么结果，但并没有规定执行引擎应该采取什么方式处理而得到这个结果，具体采取什么方式由JVM的实现厂家自己去实现、如SUN的hotspot是基于栈的执行引擎，而Google的Dalvik是基于寄存器的执行引擎。

每一个Java线程就是一个执行引擎实例，一个JVM实例中就会同时有多个执行引擎在工作，这些执行引擎有的在执行用户的程序，有的在执行JVM内部的程序（如Java垃圾收集器）。

### 内存管理
堆栈图: https://gw.alipayobjects.com/zos/rmsportal/VpwONqGFCQIOuJLLFbvu.png

通常操作系统管理内存的申请空间是按照进程来管理的，每个进程拥有一段独立的地址空间，每个进程之间不会相互重合，操作系统也会保证每个进程只能访问自己的内存空间。

几个名词：`物理内存和虚拟内存`、`RAM`、`地址总线与总线宽度`、`内核空间与用户空间`、`静态/动态内存分配和回收`

Java堆是用于存储Java对象的内存区域，堆的大小在JVM启动时就一次向操作系统申请完成，一旦分配完成，堆的大小就不能再改变。Java堆中内存空间的管理由JVM控制，对象创建由Java应用程序控制，但对象所占的空间释放由管理堆内存的垃圾收集器来完成。
堆是被所有Java线程所共享的，所以对它的访问需要注意同步问题，方法和对应的属性都需要保证一致性。

JVM运行实际程序的实体是线程，每个线程创建时JVM都会为它创建一个堆栈，堆栈的大小根据不同的JVM实现而不同。一个线程的方法的调用和返回对应于这个Java栈的压栈和出栈。

栈中主要存放一些基本类型的变量数据（int、short、long、byte、float、double、boolean、char）和对象句柄（引用），方法执行结束此处变量也就会消失。存取速度比堆要快，仅次于寄存器，栈数据可以共享。缺点是，存在栈中的数据大小与生存期必须是确定的，这样导致缺乏了其灵活性。

每一个Java应用都唯一对应一个JVM实例，每一个实例唯一对应一个堆。应用程序在运行中所创建的所有类实例或数组等对象都放在这个堆中，并由应用程序所有的线程共享（方法执行完成后不一定就消失、可能仍被别的线程对象引用）。在建立一个对象时两个地方都要分配内存，在堆中分配的内存实际建立这个对象，而在栈中分配的内存只是一个指向这个堆对象的指针（引用）而已。

new一个对象的内部过程，在内存的栈中的操作过程？
一个方法里边的局部变量等分别占用多少内存空间？
内存泄露分析实例

从堆和栈的功能和作用来通俗地比较，堆主要用来存放对象，栈主要用来执行程序，这种不同主要是由堆和栈的特点决定的。

淘宝正在开发一种技术用于在JVM中分配另外一个内存存储区域，它不需要GC回收期来回收，但是可以和其他内存中对象一样来使用。


## Servlet工作原理解析
servlet 其实就是一个 Java 类，所有的servlet类都必须继承 HttpServlet 类。
生命周期：服务器会在启动或第一次请求servlet时初始化一个servlet对象，然后使用该对象处理客户端的请求，当服务器关闭时销毁该对象。

Servlet容器有：Tomcat、Jetty等。Tomcat的容器分为四个等级，真正管理Servlet的容器是Context容器，一个Context对应一个web工程。

与Servlet主动关联的三个类：ServletConfig、ServletRequest、ServletResponse，这三个类都是通过容器传递给Servlet的，其中ServletConfig在Servlet初始化时就传给Servlet了，而后两个是在请求到达时调用Servlet传递过来的。

用户浏览器向服务器发起一个请求通常会包含如下信息：http://hostname:port/contextpath/servletpath/。hostname和port用来与服务器建立TCP链接，而后面的URL才用来选择服务器中哪个子容器服务用户的请求。

Filter也是在web.xml中的另一个常用配置项，可以通过`<filter>和<filter-mapping>`组合来使用Filter。它可以完成与Servlet同样的工作，甚至比Servlet使用起来更加灵活。（是否类似中间件？）

现在的Web应用很少直接将交互全部页面都用Servlet来实现，而是采用更加高效的MVC框架来实现。这些MVC框架的基本原理是将所有的请求都映射到一个Servlet，然后去实现service方法，这个方法也就是MVC框架的入口。


## 深入理解Session与Cookie
Session 默认有效期是关闭浏览器，为什么session会消失，主要原因是浏览器端cookie内保存的 sessionID 失效了，因为session是基于cookie的，所以关闭浏览器会失效。浏览器关闭，session是不会马上消失的。如何延长session声明周期，解决方案：延长cookie 和 session 的生存时间

Cookie可以让服务端程序跟踪每个客户端的访问，但是每次客户端的访问都必须传回这些Cookie，如果数量很多，这就增加了客户端与服务端的数据传输量，而Session解决了这个问题。

同一个客户端每次和服务端交互时，不需要都传回所有的Cookie值，而是只要传回一个id，这个id是客户端第一次访问服务器时生成的，而且每个客户端是唯一的。这个id通常是name为JSESIONID的一个Cookie。

由于Cookie是存储在客户端浏览器里的，不安全很容易被修改。相比之下，Session是将数据保存在服务端，只是通过Cookie传递一个SessionID而已，所以Session更适合存储用户隐私和重要的数据。

分布式Session框架可以解决的问题：Session配置的统一管理；Cookie使用的监控和统一规范管理；Session存储的多元化；Session配置的动态修改；Session加密key的定期修改；充分的容灾机制，保持框架的稳定性；Session各种存储的监控和报警支持；Session框架的可扩展性；跨域名Session与Cookie的共享。

由于应用是一个集群，所以不可能将创建的Session都保存在每台应用服务器的内存中，因为如果每台服务器有几十万的访问用户，服务器的内存肯定不够用，即使够用，这些Session也无法同步到这个应用的所有服务器中。所以要共享这些Session必须将他们存储在一个分布式缓存中，可以随时写入和读取，而且性能要很好才能满足要求，如MemCache、淘宝的Tair。

跨域名共享Cookie问题，Cookie是有域名限制的，一个域名下的Cookie不能被另一个域名访问。所以，如果在一个域名下已经登陆成功，如何访问到另外一个域名的应用且保证登陆状态仍然有效呢？

Cookie被盗问题？表单重复提交问题？



## JavaBean
> JavaBean与EJB（Enterprise JavaBean）没什么关系。JavaBean是为Java语言设计的软件组件模型，具有可重复使用和跨平台的特点。EJB是服务器端的构件，提供对事务、持久化、复制以及安全问题的支持。
> Enterprise Bean 与 JavaBean 不同。JavaBean 是使用 java.beans 包开发的，它是 Java 2 标准版的一部分。JavaBean 是一台机器上同一个地址空间中运行的组件。JavaBean 是进程内组件。Enterprise Bean 是使用 javax.ejb 包开发的，它是标准 JDK 的扩展，是 Java 2 Enterprise Edition 的一部分。Enterprise Bean 是在多台机器上跨几个地址空间运行的组件。因此 Enterprise Bean 是进程间组件。JavaBean 通常用作 GUI 窗口小部件，而 Enterprise Bean 则用作分布式商业对象.

一个bean就是一个可重用的软件构件，并且能够在开发工具中可视化地操作。（类似VB里的控件）bean就是一个在开发工具中可操作的类。
如果你的bean中的方法使用了标准的命名模式，那么开发工具就可以使用反射机制来确定bean的特征，例如属性以及事件。如果你需要更灵活的方式来描述有关bean的信息，可以定义一个实现了BeanInfo接口的对象。只要提供了这样的对象，开发工具就会通过询问它来识别你的bean具有的特性。

1. 它是一个简单的Java类，有Java类的一切特性，可使用封装、继承、多态等特性。
2. 必须是一个公开的类，访问权限为public。
3. 必须具有一个无参数的构造方法。
4. 一般将属性设置为私有的，通过使用 getXXX() 方法 和 setXXX() 方法进行属性的取得和设值。

    //一个简单的Javabean示例
    public class UserBean {
         private String username;
         public String getUsername() {
              retrun username;
         }
         public void setUsername(String username) {
              this.username = username;
         }
    }

在jsp中调用JavaBean：

    <jsp:useBean id="对象名称” scope=“存储范围" class=“类名”></jsp:useBean>

JavaBean的任务就是: “Write once, run anywhere, reuse everywhere”，即“一次性编写，任何地方执行，任何地方重用”。

JavaBean的持久化：用JavaBean的属性来将bean存储到流中，并在之后的某个时刻，或者在另一个虚拟机中再将它们读出来。它适合于长期存储。可以使用该机制存储任意对象的集合，只要遵守一些简单的规则即可。

在Java web 开发方面，几乎用不到多线程！因为有多线程的地方 servlet 容器或者其他开发框架都已经实现掉了。

推出JSP+BEAN，用JSP写presentation layer,用BEAN写business layer。



## 基础知识

[java使用场景](http://solonote.iteye.com/blog/414170)

java跨平台，是因为jvm做了跨平台实现。Java代码都要写到class中。

Java中JDK,JRE和JVM之间的关系：![](https://t.alipayobjects.com/images/rmsweb/T1bNxiXeRcXXXXXXXX.png)

过程型语言：数据定义和函数调用。这些程序总是容易把人搞糊涂，因为它们使用的表示术语更加面向计算机而不是你要解决的问题。

因为OOP在你能够在过程型语言中找到的概念的基础上，又添加了许多新概念，所以你可能会很自然地假设：由此而产生的Java程序比等价的过程型程序要复杂得多。但是，编写良好的Java程序通常比过程型程序要简单得多，而且也易于理解得多。你看到的只是有关下面两部分内容的定义:用来表示问题空间概念的对象(而不是有关计算机表示方式的相关内容)，以及发送给这些对象的用来表示在此空间内的行为的消息。


设计方法(js叫函数)的原则：方法是实现某个功能的语句块的集合，设计方法的时候最好保持方法的「原子性」，即一个方法只完成一个功能，利于后期的扩展。

实例变量可以不用初始化而会被赋上默认值，局部变量(方法内定义的变量)必须要进行初始化。

用`static`修饰的方法叫做“类方法”，修饰的变量叫做“类变量”。类的对象上不存在static变量或方法。静态方法(static方法)里不能调用“非静态”的变量或方法；但非静态方法里可以调用静态变量或方法。

重写(override)和重载(overload)没有关系，重写是子类方法对父类同名方法的覆盖，重载是同一个类中几个同名方法有不同数目或类型的参数。

所有的类“构造器”第一句话都是`super()`，没有明确写则会默认加上，直到祖宗类`Object`没父类也就没super。普通的类方法里，也有隐式super参数供调用父类同名方法，但不必是方法的第一句话。

多态：举例，丈母娘：男朋友长得怎么样？女儿：有点象港台明星，丈母娘：哇！好明天带回家看看。女儿把男朋友带回家，丈母娘一看，疯了！原来是象“曾志伟”！

多态的存在要有3个必要条件：要有继承、要有方法重写、父类引用指向子类对象。

接口中只有：常量、抽象方法。

Map的底层结构是：数组 + 链表


### 内存
基本类型一旦声明就会被分配内存空间，而普通类型需要使用new关键字来分配内存空间。

在 Java中，所有的(普通)对象都储存在堆上。因此，new关键字的完整含义是，在堆上创建对象。

基本类型(primitive type)的对象，比如int, double，保存在栈上。当我们声明基本类型时，不需要new。一旦声明，Java将在栈上直接存储基本类型的数据。所以，基本类型的变量名表示的是数据本身，不是引用。

在JVM的一个进程空间中，一个栈(stack)代表了方法调用的次序。对于多线程来说，进程空间中需要有多个栈，以记录不同线程的调用次序。多个栈互不影响，但所有的线程将共享堆(heap)中的对象。


### 面向对象OOP
Java是完全的面向对象的语言，它使用`类和对象`、遵从`封装、继承、多态`的设计原则。类定义了对象的类型或种类、是定义对象的样板；同一个类的所有对象都有`相同的行为、相同种类的数据`(即有相同的方法和属性、但具体数据不同)

面向对象的3个基本要素：封装、继承、多态

面向对象的5个基本设计原则：

- 单一职责原则（Single-Resposibility Principle）
    - 一个类，最好只做一件事，只有一个引起它的变化。
- 开放封闭原则（Open-Closed principle）
    - 对扩展开放，对修改封闭的
- 里氏替换原则（Liskov-Substituion Principle）
    - 子类必须能够替换其基类。
    - 子类可以扩展父类的功能，但不能改变父类原有的功能。
- 依赖倒置原则（Dependecy-Inversion Principle）
    - 高层模块不依赖于低层次模块，二者都同依赖于抽象接口。
    - 抽象接口不应该依赖于具体实现;而具体实现则应该依赖于抽象接口。
- 接口隔离原则（Interface-Segregation Principle）
    - 使用多个小的专门的接口，而不要使用一个大的总接口。

#### 类设计技巧：
- 一定要保证数据私有。
- 一定要对数据初始化。Java不对局部变量进行初始化，但对对象的实例域进行初始化；但最好要自己去显式地初始化所有的数据。
- 不要在类中使用过多的基本类型。用其他的类代替多个相关的基本类型的使用。
- 不是所有的域都需要独立的域访问器和域更改器。
- 将职责过多的类进行分解。
- 类名和方法名命名要恰当、能体现他们的职责。

#### 封装：
类的数据域应该标记为`private`，以达到封装的目的，对其操作时，提供`公有的访问器方法(get)`、`公有的更改器方法（set）`。这样的好处是：可以改变内部实现，不影响其他代码；更改器方法可以执行错误检查。

注意不要编写返回引用可变对象的访问器方法（如Date类对象），要对它进行克隆（xx.clone()），返回克隆后的对象(存放在另一位置上的副本)。

final 修饰符大都应用于`基本类型`或`不可变类型(类中的每个方法都不会改变其对象，如String类)`，对于可变的类如`private final Date hiredate;`仅仅意味着存储在hiredate变量中的`对象引用`在对象构造之后不能改变，而并不意味着hiredate对象是一个常量，任何方法都可以对hiredate引用的对象调用setTime更改器。

#### 继承：
Java不支持多重继承，即派生类只能有一个基类。

Java中每个类都从类Object派生出。但来自object类的`equals()、toString()`不好用、需要被覆盖重写掉。

能够将派生类的对象赋值给任何祖先类型的变量，但相反方向的赋值不成立（例如：Student类构造为Person类的派生类，那么student是person，但person不一定是student）。student与person的关系为：「是其中一个关系（is-a relationship）」；象类MechanicalArm（机器人手臂）被类Robot（机器人）拥有，他们就是「拥有关系（has-a relationship）」；这就是术语「is-a 、has-a」的概念。

「is-a」关系是继承的一个明显特征，它可用来判断是否应该将类设计为继承关系。

> super 不是一个对象的引用，不能将 super 赋给另一个对象变量，它只是一个指示编译器调用超类方法、或超类的构造器的特殊关键字。

子类方法不能低于父类方法的可见性，例如：父类方法是public、子类也要是public。

当父类对象要调用子类中的方法时，要检查下父类的设计是否合理，在父类里添加上子类的方法。虽然能够但不该通过强制类型转换将父类对象类型转为子类类型；一般情况下、应该尽量少用类型转换和instanceof运算符。

在标准Java库中包含150多个equals方法的实现，他们使自己陷入困境。(Java核心技术第九版第5章172页)，给了编写完美 equals 方法的建议。


#### 多态
多态和「动态绑定」或「后期绑定」是相同的东西。例如Person类的数组，可以包含其派生类Student的对象。当调用`person[0].xx()`方法时，如果`person[0]`中存放的是Student类的对象，则`xx`方法是Student类中的实例方法，而不是Person类的实例方法。

在早期的Java中，有些人为了避免动态绑定带来的系统开销而使用final关键字声明方法。如果一个方法没有被覆盖并且很短，编译器就能够对它进行优化处理，这个过程称为内联。


### 数据类型：
- 类类型(String等)
- 基本类型(byte int float double char boolean等)。

byte → short → int → long → float → double 左边类型的值 能赋给 右边类型的变量，能自动转换类型。但右边类型的值 想要赋给 左边类型的变量、需要强制类型转换。


### 内部类
内部类对象可以访问它所依附的外部类对象的成员(即使是private的成员)。从另一个角度来说，内部类对象附带有创建时的环境信息，也就是其他语言中的闭包(closure)特性。


### 反射
反射库（reflection library）提供了一个工具集，以便编写能够动态操纵Java代码的程序，这项功能被大量地应用于 JavaBeans 中。

#### 能够分析类能力的程序称为反射（reflective），反射可以用来：
- 在运行中分析类的能力
- 在运行中查看对象
- 实现通用的数组操作代码
- 利用 Method 对象，这个对象很像C++中的函数指针

### 泛型
使用泛型机制编写的程序代码要比那些杂乱地使用Object变量，然后再进行强制类型转换的代码具有更好的安全性和可读性，泛型对于集合类尤其有用，在表面上看来，泛型很像C++中的模板。

一个泛型类就是具有一个或多个类型变量的类, 如`public class Pair<T, U>{ ... }`。类型变量使用大写形式，且比较短，在Java库中，使用变量E表示集合的元素类型，K和V分别表示表的关键字与值的类型。T(需要时还可以用临近的字母U/S)表示「任意类型」。泛型类可看做普通类的工厂。

泛型方法，如`public static <T> T getMiddle(T... a){ }` 可以定义在普通的类中，也可以定义在泛型类中。

#### Java虚拟机泛型转换事实：
- 虚拟机中没有泛型，只有普通的类和方法
- 所有的类型参数都用它们的限定类型替换
- 桥方法被合成来保持多态
- 为保持类型安全性，必要时插入强制类型转换


## 流与文件
与C语言只有单一类型的 FILE* 包打天下不同，Java有一个流家族，包含各种流类型，其数量超过60个！把家族成员按使用方法来划分，就形成了处理「字节」和「字符」的两个单独层次结构。

在保存数据时，可以选用二进制格式或文本格式。例如，整数1234存储成二进制数时，它被写为由字节`00 00 04 D2`构成的序列（十六进制表示法），而存储成文本格式时，它被存成了字符串“1234”。尽管二进制格式的I/O高速且高效，但是不宜人来阅读。

RandomAccessFile 类可以在文件中的任何位置查找或写入数据。磁盘文件都是随机访问的，但是从网络而来的数据流却不是。随机访问文件有一个表示下一个将被读入或写出的字节所在位置的文件指针。

Path和Files是在Java SE 7中新添加进来的类，它们用起来比jkd1.0以来就一直使用的File类要方便得多。

多个同时执行的程序需要修改同一个文件的时，这些程序需要以某种方式进行通信，不然这个文件很容易被破坏。文件锁可以解决这个问题，它可以控制对文件或文件中某个范围的字节的访问。但文件加锁机制是依赖于操作系统的。

## 网络
几个名词：`TCP`、`UDP`、`套接字Socket`、`ip`、`URI`、`URL`、`URN`

IP地址和端口号组成了所谓的Socket，Socket是网络上运行的程序之间双向通信链路的终结点，是TCP和UDP的基础。

一个因特网地址由4个字节组成（ipv6中是16个字节），如`132.163.4.102`。一些访问量较大的主机名通常会对应于多个因特网地址，以实现负载均衡，如`google.com`一般会对应10几个不同的地址。

我们希望有多个客户端同时连接到我们的服务器上，就可以在程序建立一个新的套接字连接时，启动一个新的「线程」来处理服务器和客户端之间的连接，而主程序将立即返回并等待下一个连接。由于每一个连接都会启动一个新的线程，因而多个客户端就可以同时连接到服务器了。但每个连接生成一个单独的线程，这种方法并不能满足高性能服务器的要求。

半关闭提供了这样一种能力：套接字连接的一端可以终止其输出，同时仍旧可以接收来自另一端的数据。该协议只适用于一站式（one-shot）的服务，如http服务。

Java servlet、asp、CGI等统一称为「服务器端程序脚本」，可以让web服务器实现对程序的调用，用来对用户的输入进行处理。
在向web服务器发送信息时，通常会用到get或post方式。使用get方式时、只需把参数附在URL的结尾处即可，但有一个重要局限性：大多数浏览器都对get请求中可以包含的字符数做了限制。


## 安全
几个名词：`类加载器与安全管理器类`、`对类文件进行加密`、`字节码校验与校验器`、`安全策略文件`、`JAAS（Java认证和授权服务）`、`消息摘要和数字签名`、`RSA算法`、`DSA`、`认证问题`、`证书签名`、`代码签名`、`AES密匙`、`GSS-API`、`SASL`、`SSL`

一旦某个类被加载到虚拟机中，并由校验器检查过之后，Java平台的第二种安全机制「安全管理器」就会启动，它是一个负责控制具体操作是否允许执行的类。

消息摘要（message digest）是数据块的数字指纹。例如，SHA1（安全散列算法#1）可以将任何数据块，无论其数据有多长，都压缩为160位（20字节）的序列。消息摘要具有两个基本属性：

1. 如果数据的1位或者几位改变了，那么消息摘要也将改变。
2. 拥有给定消息的伪造者不能创建与原消息具有相同摘要的假消息。

用于计算这些消息摘要的最著名的两种算法是SHA1和MD5. 但由于一些规律的发现，密码人员建议最好避免使用MD5. Java已经实现了这两种算法。

如果消息和它的指纹(消息摘要)是分开传送的，那么接收者就可以检查消息是否被篡改过。但是如果消息和指纹同时被截获了，对消息进行修改，再重新计算指纹，就很容易，因为消息摘要算法是公开的。在这种情况下，假消息和新指纹的接收者永远不会知道消息已经被篡改，数字签名解决了这个问题。

公共密匙加密技术是基于「公共密匙」和「私有密匙」这两个基本概念。设计思想是可以将公共密匙告诉任何人，但只有自己才持有私有密匙，要保护你的私有密匙、不将它泄露给任何人。


## 脚本、编译与注解处理
#### 脚本API、脚本引擎
脚本API使你可以调用诸如`javascript`、`groovy`这样的脚本语言代码。脚本引擎是一个可以执行用某种特定语言编写的脚本的类库，当虚拟机启动时，它会发现可用的脚本引擎（引擎有`Rhino`、`Groovy`、`SISC Scheme`等）。脚本引擎可以直接调用脚本，可以调用脚本的函数和方法，可以编译脚本。

#### 编译器API
有许多工具都需要调用Java编译器，例如`开发环境`，`自动化构建和测试工具`、`处理Java代码段的模板工具（如JSP）`等。JSP引擎将HTML里混杂的Java代码编译到Servlet中。

#### 使用注解
注解是哪些插入到源代码中使用其他工具可以对其进行处理的标签。注解不会改变程序的编译方式。注解的使用范围还是很广泛的，如：`附属文件的自动生成，例如部署描述符或者bean信息类`，`测试、日志、事务语义等代码的自动生成`。Java EE使用注解极大地简化了编程模型。

除了能注解方法外，还可以注解类、成员以及局部变量，这些注解可以存在于任何可以放置一个象`public`或者`static`这样的修饰符的地方。每个注解都必须通过一个`注解接口`进行定义。关于注解语法......


## 分布式对象
几个名词：`代理（proxy）`、`CORBA与SOAP`、`远程方法调用（RMI）`、`远程对象激活`、


## 本地方法
Java平台有一个用于和本地C代码进行互操作的API，称为Java本地接口（JNI）。

从Java程序中调用C函数：`javah xxx`命令。Java与C不同的数据类型匹配。字符串参数的处理。访问域。编码签名。错误处理。


## 图形界面swing、awt
- 图形界面编程(java.awt、javax.swing)，并不是java的强项， vc++、delphi更适合。

### swing框架组件运用了典型的mvc「模型-视图-控制器」模式。还应用了另外几种模式：
- 容器和组件是「组合（composite）」模式
- 带滚动条的面板是「装饰器（decorator）」模式
- 布局管理器是「策略（strategy）」模式

对于组件如：JList、Jtree、JTable等，都采用了mvc模式，将可视化的外观（view）和底层数据（model 一个对象集合）进行了分离。


图形界面程序也大量用到了「内部类」。

组件的设计示例：对于JList组件，从理论上讲，把列表框的显示和滚动条机制隔离开来是优雅的设计，但在实际应用中却很难受，因为我们遇到的所有列表框基本上都需要滚动功能，所以每次都要手动将滚动条插入进来，比较麻烦。

有时为了查找树中的一个节点，必须从根节点开始，遍历所有子节点直到找到相匹配的节点。breadthFirstEnumeration方法和depthFirst Enumeration方法分别使用广度优先或深度优先的遍历方式，返回枚举对象。

JSpinner类似于html的input number控件。JSplitPane分割面板。

Graphics类和Java 2D API用来绘图。

有些文件，特别是gif动画文件，都包含了多个图像。ImageIO类的read方法只能够读取单一的图像文件。为了读取多个图像，应该将输入源（例如，输入流或输入文件）转换成一个ImageInputStream。
