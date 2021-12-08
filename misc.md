
# misc

- [Most Starred](https://github.com/search?q=stars:%3E1&s=stars&type=Repositories)
- [Most Forks](https://github.com/search?o=desc&q=stars:%3E1&s=forks&type=Repositories)
- [github-rank](http://github-rank.com/star)
- [搜 issue](https://help.github.com/articles/searching-issues/)
  - 搜索“某repo”里有“某个评论者”参与的包含的“某个词”的 issue: [warmhug + ant-design-mobile](https://github.com/search?utf8=%E2%9C%93&q=xxxx+commenter%3Awarmhug+repo%3Aant-design%2Fant-design-mobile&type=Issues)
  - 搜索“某user”里有“某个评论者”参与的包含的“某个词”的 issue: [warmhug + xxxx](https://github.com/search?utf8=%E2%9C%93&q=xxxx+commenter%3Awarmhug+user%3Aant-design&type=Issues)
  - 搜索“某人”创建的在“body”里包含“某个词”的 issue: [warmhug + xx](https://github.com/search?utf8=%E2%9C%93&q=xx+in%3Abody+author%3Awarmhug&type=Issues)


```sh
# node & npm
npm install tnpm -g --registry="http://registry.npm.xx.com" # 使用 cnpm 加速

node hello.js &  # 后台运行程序
ps -ef | grep node  # 找到进程对应的ID
kill 3747(进程id)  # 杀掉后台进程

# 自动安装某 npm 包的 shell 命令：
node -e "$(curl -fsSL https://a.alipayobjects.com/u/localhost/js/201406/2u6LQfOLhF.js)"
```

Excel 模糊匹配 <http://club.excelhome.net/thread-1048885-1-1.html>

系统设计 https://github.com/donnemartin/system-design-primer
[我在系统设计上犯过的14个错](https://mp.weixin.qq.com/s?__biz=MjM5MzYzMzkyMQ==&mid=2649826281&idx=1&sn=9c80215f5ee4b9fcf3be91012ad13608#rd)
编程语言分类：<http://hyperpolyglot.org/>

- 注意：mac不区分文件名的大小写，类名及文件名大小写改变后，不会自动刷新。编译时可能抛出“找不到类”的错误，要重新删除相应文件，再下载下来
- Docker 镜像加速地址：登录阿里云、找到 Docker Hub 镜像站点，拷贝专属加速器地址。

uuid 全宇宙单独id。guid 一定范围内单独id，比 uuid 范围小。

[正向代理与反向代理有什么区别](http://mp.weixin.qq.com/s/ikrI3rmSYs83wdSWqq2QIg)
代理（proxy）是一种路由请求方式，将不同源的请求通过同一个服务器处理，原因可能有很多：缓存、安全，甚至是故意模糊请求的来源。有转发代理、反向代理等。反向代理用于控制请求如何被发送到服务器，例如现在有五个服务器，但有四个不希望有用户直接访问。因而将所有的请求转发到第五个服务器，然后再代理给其他服务器。反向代理也被用于平衡负载和通过缓存请求改进系统的整体表现。

采用虚拟化技术可降低 Linux 使用硬件的成本，虚拟化技术有：VMWare / KVM / XEN / Microsoft Hyper-V 。如 CPU16 核 / 内存 24G / 硬盘 300G 的 Linux 服务器，可以 “一虚三”、即虚拟出三个虚拟机来。

- [URL 编码，为什么要编码？](http://anjia.github.io/2015/04/15/jsURIEncode/)
- 浏览器在自动选择编码方式的时候不会优先根据 html 源码中的所展示的`<meta charset="utf-8" />`代码来决定选择什么编码方式，而是优先根据“响应标头-response header”中的键为“Content-Type”的值来自动选择判断。（老IE浏览器相反）

计算机中存储信息的最小单元是一个字节，即 8 个 bit，所以能表示的字符范围是 0~255 个。

- ASCII 码：单字节编码，一共 128 个字符，用一个字节的低 7 位表示。
- ISO-8859-1：单字节编码，扩展了 ASCII，总共能表示 256 个字符，涵盖了大多数西欧语言字符。
- GB2312：双字节编码，编码范围 A1~F7，包含 6763 个汉字。
- GBK：兼容并扩展了 gb2312，编码范围是 8140~FEFE(去掉 XX7F)，总共有 23940 个码位，能表示 21003 个汉字。
- utf-8、utf-16

URL 中包含中文时需要进行编码，但 URL 中 `?` 前后部分（分别是 uri 和 QueryString 查询字符串）编码方式不同，后端相应的解码方式也不同。

- 对 uri 部分进行解码的字符集是在 connector 的 `<Connector URIEncoding="UTF-8" />` 中定义的，如果没有定义，将以默认编码 ISO-8859-1 解析，所以最好设置为 utf-8 编码。
- 而 HTTP 的 get 方式请求的 QueryString 与 post 方式请求的表单参数都是作为 `Parameters` 保存的，都通过 `request.getParameter` 获取参数值，对它们的解码也是在该方法第一次被调用时进行的（注意：要在第一次调用 request.getParameter 方法之前就设置 request.setCharacterEncoding(charset)，否则 post 表单提交上来的数据可能出现乱码）。浏览器根据 ContentType 的 charset 编码格式对之进行编码，然后提交到服务器，服务端同样也是用 ContentType 中的字符集进行解码的。



# git

git-tips: https://github.com/git-tips/tips

[Git Aliases](https://git-scm.com/book/en/v2/Git-Basics-Git-Aliases)、[git-open](https://github.com/paulirish/git-open) 自动打开 git 远程仓库地址

```sh
# code ~/.gitconfig
git config                # 配置个人信息
git config --global alias.st status
```

```sh
# 分支
git checkout -b xx   # 新建并直接切换到xx分支
git checkout -b xx origin/xx    # 新建xx分支，并跟踪远程xx分支

git branch -d xx       # 删除分支xx
git push origin :xx    # 删除远程分支xx
git push origin xx:xx  # 上传我本地的xx分支到远程仓库中去，仍称它为xx分支

# diff & log
git diff [version1] [version2]   # 查看版本差异
git diff --stat --color branch1..branch2  # 查看本地分支区别
git diff branch1...remotes/origin/branch2  # 查看本地和远程分支区别
git diff master origin/master   # 比较本地的 master 和远程的 master 分支差异
git shortlog branch1...remotes/origin/branch2  # 查看本地和远程分支区别，信息少
git log -p -2   # 显示最近的两次更新

# pull
git pull --rebase       # 同 git fetch + git rebase
git pull -p # remove all your local branches which are remotely deleted.

# fetch merge remote
git fetch   # 同步远程repos, 更新本地仓库的所有 origin/* 分支信息
git merge origin/xx    # 远程上有 xx 分支，并且 git fetch origin 执行此命令，将合并此分支
git merge --no-ff xx   # 不执行"快进式合并"，始终多产生 merge 信息，便于追踪
git merge --squash dev
git merge upstream/master  # 合并进来

# 合并/删除多个 commit 为一个 https://www.jianshu.com/p/4a8f4af4e803
git log   # 找到要删除/合并 commit 之前一个 commit_id
git rebase -i [commit_id]
# (vi操作：方向键 + i + 需要修改的 + :wq)
# 将需要删除的 commit_id 前的 pick 改为 d | drop
# 将需要合并的 commit_id 前的 pick 改为 s | squash
# (一般保留以上列表中第一条 pick 不变，其他做相应修改)
git push -f  # 强制提交

# 使用 rebase 代替 merge 避免生成类似 merge branch “branch_name” 历史记录
# 公共仓库不建议使用 rebase https://www.fossil-scm.org/fossil/doc/trunk/www/rebaseharm.md
# https://robots.thoughtbot.com/git-interactive-rebase-squash-amend-rewriting-history
git checkout feature
git rebase master  # 把 master 分支当 feature 分支的基点
git pull --rebase origin master  # 在开发分支上 rebase 主分支.
git rebase --continue
git rebase --abort
# merge 和 rebase 的问题：
#- 如果用 rebase ，需要经常 reapply 其他提交的改动， commit 的时间顺序也会乱掉。
#- 如果用最直接的 merge ，会产生重复无用的比如 Merge pull request pull_id from xx_branch 或者 Merge branch “branch_name” 信息，不利于 review 提交记录。

# 回退恢复：

## working tree (add之前，原始状态)
git checkout .
git clean -df  # Remove untracked directories in addition to untracked files.
git clean -xdf # 删除所有 .gitignore 里指定的文件或目录，包括新建文件、node_modules 等
git clean -f

## index 内的回滚 (add后 commit之前，暂存区)
git reset [file | 057d]    # 回退文件、或回退到某个版本  
git reset HEAD^    # 回退所有内容到上一个版本
git reset HEAD^ a.py    # 回退 a.py 这个文件的版本到上一个版本

## commit 之后的回滚
git reset --soft HEAD^   # 撤销 commit # --soft 不修改本地文件
git reset --hard 057d    # 回退到某个版本 # --hard 本地的文件修改都被丢弃
git reset --hard origin/master   # 将本地的状态回退到和远程的一样

git checkout HEAD~1 -- file   # 运行 git merge xx 后，想撤销其中某个文件的 merge
git reflog   # 生成某个串，例如 98abc5a 再 git reset --hard 98abc5a

## 增加某个 commit 方法 cherry-pick
git checkout develop   # 切换到 dev 分支，也可以新建个 feature 分支
git cherry-pick 62ecb3 # pick 到 develop 上，一般用于将 bugfix commit pick 到不同版本上

## 修改提交信息 修改注释 https://help.github.com/articles/changing-a-commit-message/
git commit --amend  # 修改 most recently commit 比如加 --reset-author

## git head caret tilde 区别 https://scarletsky.github.io/2016/12/29/tilde-and-caret-in-git/

# 回滚远程主干代码，并且 不抹掉 提交记录，使用 revert
git revert -n commit_id..  # (注意 ..) 把从 commit_id 到 head 的所有提交 revert 掉，-n 表示只产生一条记录

# stash
git stash                   # 暂存未提交的修改
git stash pop               # 恢复上次未提交的修改
git stash list              # 列出各个 stash 版本
git stash clear / drop <stash@{n}>     # 清除所有或某个stash版本

# remote
git remote add origin git@xxx.git    # 加入服务器
git remote -v  # 列出现有的远程地址
git remote set-url origin xxx  # 改变远程地址为 xxx

# submodule  http://linlexus.com/git-submodule-usage

# 操作tag
git tag 0.0.1       # 打轻量标签
git tag -a 0.0.1 -m 'Release version 0.0.1'
git push origin v1.5
git push [origin] --tags    # 推送所有标签到服务器
```

## git 实践

```sh
# git 三板斧
# 一板基础斧 add，commit，pull/push，checkout，revert
# 二板合作斧 merge，rebase，stash，cherry-pick
# 三板优雅斧 commit --amend，rebase -i
```

业内成熟的 GIT 分支模型 https://cloud.githubusercontent.com/assets/36899/7315642/015f534c-eaa2-11e4-9882-b7cc7535fb72.png

图中共有五种分支，这五种分支可分为两大类：

- 只读分支：`master` 和 `develop`，不可直接 commit/push，只能 merge，会长久存在远程仓库中；
- 开发分支：`feature`, `release` 和 `hotfixes`，可以直接 commit/push，不会长久存在远程仓库中。

* master: 线上部署的分支，是最稳定的，只接受来自 `release` 和 `hotfixes` 的 MR。
* develop: 处于开发状态的最新分支，接受来自 `feature` 和 `release` 的 MR。
* feature: 分支为功能开发分支，一个功能对应一个 feature。

1. 需要发布一个版本时，基于 develop 分支创建一个 `release-` 前缀的分支；
2. 在 release 分支上，可以切一些 `bugfix-` 分支修复一些 bug，提 MR 至对应 release 分支；
3. 当 release 分支稳定没有问题后，发一个 MR 到 master，并且同时发一个 MR 到 develop 分支；
4. 合并 MR 后，master 可以打一个 tag，标记版本号；删除 release 分支。

1. 基于 master 创建一个 `hotfix-` 前缀的分支；
2. 开发完成并且测试通过后，提一个 MR 到 master，并且同时发一个 MR 到 develop 分支；
3. 合并两个 MR 后，master 可以打一个 tag 做标记；删除 hotfix 分支。

commit 规范

1. 每个功能点或 bug 务必创建 issue，并在 commit 信息中加上 issue 信息，比如：`git commit -m "feat: 支持新功能 #210"`，`closes #214, #215`，当合并 MR 时，可以自动关闭关联的 issue。

```sh
# https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y
git commit -m "feat(schema): 支持枚举类型 #210"    <- 表明是属于 schema 模块的功能点
git commit -m "chore(style): 修复文字换行问题 #213" <- 表明是针对样式的修复
git commit -m "fix: closes #222"                 <- 表明是修复 #222 的一个 bug
git commit -m "refactor(activity): ..."          <- 表明是针对活动的一些重构
git commit -m "docs: 说明如何支持枚举类型"           <- 表明是文档相关的 commit
git commit -m "test: remove only"                <- 表明是修复测试用例的 commit
```

issue

- 开发任务的 issue ，一般都已经明确目标，格式：`[功能模块]功能描述` 功能模块表明这个 issue 是属于哪个模块。
- 非开发任务的 issue，比如：需求、讨论、方案、系分。标题应尽量简明，描述中可详细展开说明，可以 `cc @xx`。
- 每个 issue 看情况加上 labels，labels 类型（[示例](http://024028.oss-cn-hangzhou-zmf.aliyuncs.com/uploads/fengdie/fengdie-web/2483775ac8f9f7f113f3611cabe3ffbc/Snip20151016_29.png)）：`BUG` 缺陷 `IMPROVEMENT` 功能优化点 `TODO` 待排需求 `需求` 待讨论的需求和议题 `文档` 包含使用说明、发布日志，可以移入 wiki。


# linux 学习

```sh
# man 查看命令帮助文档。 例如：使用 man ascii 来查看 ASCII 表。
ctrl + w      # 删除前一个单词
ctrl + u / k  # 清除光标到 行首 / 行尾 的内容
ctrl + a / e  # 移动到所在 行首 / 行尾
esc + b / f   # 移动到所在单词的 词首 / 词尾
ctrl + c      # 退出某进程（不是 command）
ctrl + r      # 查找输入过的命令
cammand + k / ctrl + l / clear  # 清屏

d  # 向后滚动 n 行，比如 `git diff` / `man less` 显示很多内容、可快速查看
u  # 向前滚动 n 行
G  # 直接跳到最后一行
h  # 显示帮助

mv ./filename ./filename  # 移动文件/目录，重命名文件
echo ttt > ./file.txt  # 覆盖文件原内容并重新输入内容，若文件不存在则创建文件
echo ttt >> ./file.txt  # 向文件追加内容，原内容将保存
true > ./file.txt  # 清空 file.txt 文件内容
> file.txt  # 创建一个空文件，比 touch 短
cat error.txt >> acc.txt  # 把 error.txt 文件内容输出到 acc.txt 文件中

cat [-n] filename  # 由第一行开始显示档案内容, n 显示行号
more filename # 一页一页的显示档案内容. less 与 more 类似，而且可以往前翻页
history 10 # 列出最近执行过10条的命令，默认放在 .bash_history 文件中，默认保存1000条(可以修改)
history | more # 逐屏列出所有的历史记录，!99 执行历史清单中的第99条命令

head/tail filename  # 只看 头/尾 几行(默认10行)
head/tail -n 20 ~/.bashrc  # 显示头二十行

which java  # 查看 java bin 所在的路径，如果是 `/usr/bin/..` 说明是软连接、再运行 ls -l `which java` 即可
lsof -i:8087   # 查找出占用了某个端口的程序和其对应的PID
kill -9 *pid*  # 强制杀掉进程
chmod u+x test.sh    # 修改权限，脚本可执行
chmod +x demo.py    # 修改权限，脚本可执行

dig [IP地址/域名] +short  # 查询 DNS 包括 NS 记录，A 记录，MX 记录等相关信息的工具
nslookup [IP地址/域名]  # 查询一台机器的 IP 地址和其对应的域名
# 诊断路由节点问题，如丢包、网站访问慢、结合了 "traceroute" 和 "ping" 功能。下载地址 http://rudix.org/packages/mtr.html
# 以报告模式显示：从我的主机到目标主机经过的路由节点以及到各节点数据包的丢包率和 ping 命令的最短/最长时间和标准偏差。
# mtr 详细：https://meiriyitie.com/2015/05/26/diagnosing-network-issues-with-mtr/
mtr -r [IP地址/域名]

top  # 统计进程状态，和 Mac 的 活动监视器 功能类似
brew install htop  # top 高级版，支持鼠标点击、方向键切换

alias # 查看系统里别名
w / who # 列出当前登录的所有用户
whoami # 显示当前正进行操作的用户名
tty # 显示终端或伪终端的名称
last # 查看系统最后登录
date # 显示系统的当前日期和时间
say hello world  # 说话

# 软连接可以跨文件系统，硬连接不可以。软连接可以对一个不存在的文件名进行连接。软连接可以对目录进行连接。硬链接下修改源文件或者连接文件任何一个的时候，其他的文件都会做同步的修改。
ln -s source_file dist        # 建立软连接 #若权限不足加 sudo
ln -s ../source/*.bar .        # 建立软连接，在当前目录
ln source_file dist           # 建立硬连接
# 在桌面生成软连接（快捷方式）
ln -s /Applications/Xcode.app/Contents/Developer/Applications/Simulator.app ~/Desktop
ln -sv ~/Library/Mobile\ Documents/com~apple~CloudDocs/ ~/iCloud\ Drive
# 或者加入到 zsh/bash 中
alias simulator='open /Applications/Xcode.app/Contents/Developer/Applications/Simulator.app'
```

### ssh & scp

scp -r ~/Downloads/build/ root@118.31.47.xx:/home/admin/nginx/
ssh root@118.31.47.xx xyxyxy
cd /home/admin/nginx/
cp -r ./build ./build-back1

### curl

与服务器交互数据的工具，支持 http,https,ftp,ftps,telnet 等多种协议，常被用来抓取网页和监控Web服务器状态。
[命令详解](http://aiezu.com/article/linux_curl_command.html)

格式：`curl [-i带header | -I只输出header ] [URL...]`

```sh
curl https://twitter.com/  # 直接打印内容
curl 'https://api.github.com/user/repos?page=2&per_page=100'  # 有特殊字符需要用引号包裹

curl https://www.baidu.com -o xx.html  # 下载页面到 xx.html 里
# 下载文件并显示简单进度条
curl -# -o centos6.8.iso http://mirrors.aliyun.com/centos/6.8/isos/x86_64/CentOS-6.8-x86_64-minimal.iso
# 断点续传：继续完成上次终止的未完成的下载
curl -# -o centos6.8.iso -C - http://mirrors.aliyun.com/centos/6.8/isos/x86_64/CentOS-6.8-x86_64-minimal.iso

curl https://api.github.com?callback=foo   # jsonp
curl -i "https://api.github.com/repos/vmg/redcarpet/issues?state=closed"  # 输出 header + 内容
curl -i https://api.github.com -H "Origin: http://example.com"  # 设置 CORS
```

### grep

[grep](http://www.cnblogs.com/peida/archive/2012/12/17/2821195.html) 搜索文件内容，会对文件的每一行按照给定的 pattern 进行匹配查找。

格式：`grep [-r递归 -n行号 -i忽略大小写 -I忽略二进制文件] 搜索字符串/正则表达式 [filename]`

```sh
grep -rn 'grep' *  # 以 字符串 grep 来搜索 当前目录及子目录 的所有文件内容
grep grep$ she*.md  # 以 正则表达式 grep$ 来搜索 当前目录下 文件名匹配 she*.md 的内容

# 注意，-r 递归搜索时，使用 *.md 的 filename 无效。
grep -r --include=\*.{cpp,h} pattern ./
grep -rn --include="*.js" pattern *

grep -r --exclude-dir=node_modules pattern /path
grep -r --exclude-dir=node_modules --exclude-dir=dev pattern /path
grep -rI --exclude-dir="\.svn" "pattern" *   # 忽略二进制文件和svn隐藏目录
grep -r --color --exclude-dir={custom,lib,scripts} --exclude={*.xml,error_log} "beta" *

cat test.txt | grep ^u   # 找出以 u开头 的行内容
cat test.txt | grep hat$  # 输出以 hat结尾 的行内容
cat test.txt | grep -E "ed|at"  # 显示包含 ed或者at 字符的内容行
```

### find

[find](http://www.binarytides.com/linux-find-command-examples/) 命令是根据文件的属性进行查找，如文件名，文件大小，所有者，所属组，是否为空，访问时间，修改时间等。
[exclude directory](https://stackoverflow.com/questions/13460482/exclude-a-sub-directory-using-find)

```sh
find  # 在 当前目录以及子目录 列出所有文件
find /etc -name httpd.conf  # 在 /etc 目录下文件 httpd.conf
find . -name '*bash*'    # 在 当前目录以及子目录 下查找文件名中含有字符串 bash 的文件
find . -name "*.js" -not -path "*node_modules*"  # 排除路径中含有 node_modules 的文件
find . -name "*.js" -not -path "*node_modules*" -not -path "*js-css-html*" # 排除多个路径
find . \( -name "*.py" -o -name "*.js" \) -not -path "*node_modules*"  # 查找多个文件类型

find / -amin -10   # 查找在系统中最后10分钟访问的文件(access time)
find / -mmin -5   # 查找在系统中最后5分钟里修改过的文件(modify time)
find / -size -1000k   #查找出小于1000KB的文件

find . -name '*.DS_Store' -type f -delete   # 删除某目录及子目录下的 .DS_Store 文件
```

vim 是 vi 的增强版本。相比vi添加了显示颜色等功能。
![vim 键盘图](https://zos.alipayobjects.com/rmsportal/MOPJrAnojdFvAToZkESi.gif)

```sh
# 编辑模式
输入 i 再输入其他字符。 按 esc 退出，切回命令模式

# 命令模式
导航：h j k space键 
ctrl-f  上翻一页
ctrl-b  下翻一页
^     跳至行首
$     跳至行尾
gg    跳至文件的第一行
G     到文件的最后一行
:w   保存
:wq  :x  shift zz 保存修改并退出
:q!  强制退出，放弃修改
u     撤销
ctrl+r   重做（撤销一个撤销）
.     重复上一个编辑命令
==     自动缩进当前行
dd 删除光标所在行， dw 删除一个字(word) ，D 删除到行末
x 删除当前字符，  X 删除前一个字符
yy 复制一行，此命令前可跟数字，标识复制多行，如6yy，表示从当前行开始复制6行
yw 复制一个字 ， y$ 复制到行末
p 粘贴内容到当前行的下面 ，P 粘贴内容到当前行的上面
复制 粘贴（如果粘贴外部内容，在i模式下，直接cmd+v）
按 v 进入可视模式；移动光标键选定内容！w选择单词，y复制(或gy)，p粘贴，x删除，d删除后边

tail -n10 path/filename 查看文件最后10行
?pattern  /pattern     向前后搜索字符串pattern
:s/vivian/sky/g 替换当前行所有 vivian 为 sky
:%s/source_pattern/target_pattern/g  全局替换

[vi编辑器使用color-scheme](http://alvinalexander.com/linux/vi-vim-editor-color-scheme-colorscheme)
```

Unix 遵循的原则是 KISS (Keep it simple, stupid) do one thing and do it well。
Linux 分为内核版、发行版。比较常用的发行版有 redhat、ubuntu 等。服务器端大多使用 redhat\centos，没有图形界面，因为图形界面占用更多系统资源，造成不稳定，被攻击的可能性更大。

- Linux 严格区分大小写。所有内容以文件形式保存，包括硬件。如：键盘 /dev/stdin 显示器 /dev/stdout
- Linux 不靠扩展名区分文件类型，靠权限区分。（.gz .tgz .sh等文件扩展名只是为了方便管理员查看）

shell 是一个命令行解释器。shell 是壳，kernel 是内核。shell 把用户敲进去的命令、翻译为 linux 内核能识别的语言。
linux 下有些命令是 shell 自带的，有些命令是别人写好装进来的(如 ls )，用 `whereis ls` 来区别。
sh: Bourne Shell 的缩写，可以说是目前所有 Shell 的祖先。 bash : Bourne Again Shell 的缩写，是 sh 的一个进阶版本。bash 是目前大多数 Linux 发行版和苹果的 Mac OS X 操作系统的默认 Shell。
[bash-guide](https://github.com/Idnan/bash-guide)
[mac-shell 介绍](http://ntop001.github.io/2015/06/06/mac-shell/)、
[Zsh 和 Bash 的不同](https://xshell.net/shell/bash_zsh.html)，在 zsh 的 terminal 里运行 bash 脚本，可能有兼容问题，需要用 `emulate bash/sh` 切换为仿真模式。
安装 CentOS (min 版) 后，登录系统会显示 `localhost login:` 填入 root 、然后输入安装时设置的密码。

```sh
# shell 变量声明：
变量名=变量值 (等号前后不能有空格) # 例如 NODE_ENV='PRODUCTION' gulp build
echo $变量名
echo $PATH  # 查看PATH环境变量
echo $SHELL # csh 是 C Shell。bash，sh，zsh 是 Bourne Shell 的变种。
env / printenv JAVA_HOME  # 打印环境变量

>  >>  &>  &>>  2>&1  # 输出重定向
# 管道符 |

# shell 变量叠加：
x=123
x="$x"456  (或 x=${x}456)
echo $x

$n $* $@ $#    # 位置参数变量
$? $$ $!   # 预定义变量

符号：单引号、双引号、反引号、$()、$、#、\
通配符、正则表达式 是不同的东西。正则是包含匹配，通配符是完全匹配。正则匹配文件内容字符串，通配符匹配文件名。

#!/bin/sh  # 如果文件开头的 shebang 为 `#!/bin/bash` 会使用 bash 执行命令，而不管系统默认的 shell 是否为 bash。如果没写 shebang，那么此脚本文件会被用户当前的 Shell 所执行。

echo "进行 xx 操作 \n\r" \
&& cd ~/my/work/project/xx \
&& spm build && spm deploy \
# 对引号进行转义
expect -c "spawn ssh admin@xx.net
expect \"password:\"
send \"password22\r\"
send \"cd ccbin && ./ccupdate.sh \n\"
interact "
```

```sh
# Windows Dos cmd 里操作技巧： 命令帮助 /? 例如：md /? ，for /?

echo ... > A.txt    # 重定向输出，此时创建文本文件 A.txt;
echo ... >> A.txt   # 向 A.txt 文件中追加信息...
del *.txt # 删除文件

chcp 65001  # 换成UTF-8代码页
chcp 936 # 可以换回默认的GBK

# 环境变量
set  # 查看当前可用的所有环境变量（=系统变量+用户变量）
set PATH  # 查看某个环境变量，如PATH
set xxx=aa  # 添加环境变量，如xxx=aa
set PATH=%PATH%;d:\xxx  # 在某个环境变量（如PATH）后添加新的值（如d:\xxx）

echo %cd%  # %cd% 可用在 批处理文件中 或 命令行中，其内容为命令的执行路径或批处理文件的执行路径
%0  # 代指批处理文件自身  
%~d0   # 是指批处理所在的盘符  
%~dp0   # 是盘符加路径，只可以用在批处理文件中，由它所在的批处理文件的目录位置决定
cd %~dp0  # 进入批处理所在目录
```




---------

# 环境

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

#### mysql 启动错误

启动 `系统偏好设置 -> MySQL` 时，提示`is not owned by the mysql or _mysql user`。
解决：`sudo chown -R  _mysql:wheel  /usr/local/mysql/data`

## hybrid app

[Apache Cordova - 前身是 PhoneGap](https://cordova.apache.org/) 是移动 hybrid 开发方式先驱，
其他公司内部部署的 bridge 等，大都效仿于它。

一般 hybrid 应用流程：用户从click开始，到 launch WebView , WebView 去加载 CDN 上的 HTML 文件，页面 loading 起来后才会去获取 JSON 数据。但在 launch WebView 的时候网络处于空等状态，这会浪费时间。Android 机器 launch WebView 大概需要1秒以内（客户端如果是多进程的架构，WebView 在另一个进程内部，launch 一次 WebView 除了进程 loading 还有浏览器内核的加载）。
[Tencent/VasSonic](https://github.com/Tencent/VasSonic) /

大体优化思路就是：缓存/预加载/并行，缓存一切网络请求，尽量在用户打开之前就加载好所有内容，能并行做的事不串行做。这里有些优化手段需要做好一整套工具和流程支持，需要跟开发效率权衡，视实际需求优化。

### js 引擎

[JavaScriptCore全面解析](https://cloud.tencent.com/developer/article/1004875)

Safari 由 WebKit 和 JavaScriptCore 组成。
WebKit是个渲染引擎，简单来说负责页面的布局，绘制以及层的合成，javascript 引擎是 JavaScriptCore (JSC) 它包括了2部分：解释器和简单方法JIT, 解释器即解释执行 js 文件；JIT在java虚拟机中应用比较多，针对执行较多次的热点方法进行编译为本地方法，执行效率更高，JSC中的JIT同理。
iOS 或 android 上能够运行的JavaScript 引擎有4个： JavaScriptCore, SpiderMonkey, V8 and Rhino. 支持程度见表：
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




---------

## plantuml

@startgantt
/'
单行注释、放在 单引号之间，多行注释前后加斜杠
[正式上线] lasts 1 day and starts at 2020/03/20
'/
'skinparam classFontSize 10'

scale 2
project starts the 2019/12/16
saturday are closed
sunday are closed
2020/01/01 is closed
2020/01/22 to 2020/02/02 is closed
2019/12/16 to 2019/12/30 are named [十二月]
2020/01/01 to 2020/01/31 are named [一月]
'2020/02/01 to 2020/02/30 are named [二月]'

-- 开发阶段（灰色背景是节假日、不计入总时间） --
[环境准备] as [hj] lasts 2 days and is colored in Lavender/LightBlue
then [首页 3d] lasts 3 days
[流程管理 4d] as [lc] lasts 4 days
[hj] -> [lc]

[<size:13><b>交付中心 <color:red>11d] as [jf] lasts 11 days
[jf] starts at [lc]'s end and is colored in Yellow/Green
[列表 3d] lasts 3 days and starts at [jf]'s start 
[大图 3d] lasts 3 days and starts at [jf]'s start
[明细 3d] lasts 3 days and starts at [jf]'s start
[大图 3d] lasts 3 days and starts at [jf]'s start
[任务 3d] lasts 3 days and starts at [jf]'s start
[权限 5d] as [qx] lasts 5 days and starts at [jf]'s end

-- 测试阶段 --
[集成测试 5d] as [jc] lasts 5 days and is colored in Fuchsia/FireBrick 
[qx] -> [jc]

@endgantt


## markdown 语法

:+1: :smile: :smiley: :laughing:
- [emoji-cheat-sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet/)
- [Emoji Unicode Tables](http://www.unicode.org/emoji/charts/full-emoji-list.html)

任务 `- [] 跑步` 或 `- [x] 吃饭`；普通链接 [test](http://example.net "optional") 。图片 ![img | center | 100x100](https://zos.alipayobjects.com/rmsportal/lcLKYXUWPbqkavfJbMGx.png "optional")。

| Item      |    Value | Qty  |
| :-------- | --------:| :--: |
| Computer  | 1600 USD |  5   |

<details>
  <summary>Is this production ready?</summary>
  Next.js has been powering `https://zeit.co` since its inception.
</details>
