
## 安全
[a 标签中 target="_blank" 的安全漏洞](https://www.tutorialdocs.com/article/html-opener-blank.html) 详细地解释了该漏洞的攻击方法和原理。并在文末给出了防范该漏洞的解决办法：给 a 标签增加 rel="noopener noreferrer nofollow"。

cors跨域：http头可以伪造，所以跨域的时候记得带上sessionId做身份验证；防止允许跨域的站点被入侵；不要对 Access–Control-Allow-Origin 使用`*`

[csrf 详解](https://tech.meituan.com/fe_security_csrf.html)、[csrf漏洞](http://www.cnblogs.com/hyddd/archive/2009/04/09/1432744.html)、[wiki中文](http://zh.wikipedia.org/wiki/%E8%B7%A8%E7%AB%99%E8%AF%B7%E6%B1%82%E4%BC%AA%E9%80%A0)
XSS 利用的是用户对指定网站的信任，CSRF 利用的是网站对用户网页浏览器的信任。
跨站请求攻击，简单地说，是攻击者通过一些技术手段欺骗用户的浏览器去访问一个自己曾经认证过的网站并执行一些操作（如发邮件，发消息，甚至财产操作如转帐和购买商品）。由于浏览器曾经认证过，所以被访问的网站会认为是真正的用户操作而去执行。这利用了web中用户身份验证的一个漏洞：简单的身份验证只能保证请求发自某个用户的浏览器，却不能保证请求本身是用户自愿发出的。
为防止csrf漏洞，传统表单里默认有生成了随机token的隐藏input，同步提交表单时能自动提交上去，同步提交后刷新页面会再次更新token。
但使用Ajax异步提交时，提交时要从Cookie里(或页面上)获得token值（这里假设攻击者不能获得第三方的Cookie，但用户的Cookie很容易由于网站的XSS漏洞而被盗取），另外要考虑在提交后是否需要手动更新Cookie里(或页面上)的token。
> [ajax里如何更新csrf token](http://www.v2ex.com/t/82751) ，最后的一段评论提到：csrf-token的目的是，让攻击者不能伪造请求（如通过img发起的请求会带上cookie）。因此，csrf-token不需要每个请求都改变，只需要确保对于每个session不一致即可，同一个session内不变没有问题。

jsonp请求也需要「防止csrf漏洞」，例如可以用jsonp获取通讯录列表。
ajax 方式的 csrf token 放到 post 提交的 body 里、随其他数据一起提交。


反爬虫 https://segmentfault.com/a/1190000017899193
循序渐进学加密 https://segmentfault.com/a/1190000019437132

蚂蚁内容风险识别接口服务 https://docs.alipay.com/pre-open/api_pre/alipay.security.risk.content.analyze
撞库 https://baike.baidu.com/item/%E6%92%9E%E5%BA%93/16480882?fr=aladdin
人机识别服务接口 RDS https://apires.alipay.com/isp/previewDetail.htm?apiId=4967
IFAA 生物认证 https://tech.antfin.com/products/IFAA

安全资讯网站博客
- 先知社区 https://xz.aliyun.com
- freebuf https://www.freebuf.com/articles/web
- 安全客 https://www.anquanke.com/vul
- 台湾217战队 http://blog.orange.tw/
- 腾讯云牵头制定首个IEEE业务安全风控全球标准 https://www.toutiao.com/i6681138895255503374 
- 蚂蚁研发者门户 安全&风控 专题
- 2019 RSAC 对安全技术领域发展的思考
- RSA原理浅析
- OTP动态付款码(仟墨)、数字证书(万佛)、支付盾、安全控件(文同)
