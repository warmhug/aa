# Mac

## 系统设置

- 点击和手势: 系统偏好设置 -> 触控板 -> 勾选 “轻点来点按” / 查询与数据检测器 - 选择三指轻点 / 更多手势 - 应用Expose。
- 三指拖移窗口: 系统偏好设置 -> 辅助功能 -> 鼠标与触控板 -> 触控板选项 -> 启用拖移 -> 三指拖移。
- 触发角: 系统偏好设置 -> 调度中心 -> 触发角 (左上角:启动台, 左下角:显示器睡眠, 右上角:调度中心, 右下角:桌面)。
- 快捷键: 系统偏好设置 -> 键盘 -> 快捷键，“输入法”选择 `cmd+空格`，“服务”里勾选或不选。
- dock: 显示隐藏 `cmd+alt+d`, 系统偏好设置 -> 程序坞 - 不勾选 “在程序坞中显示最近使用的应用程序”(最后一项)。
- Finder 工具栏: 按下 `cmd + alt`，拖动 app 到工具栏。
- QuickLook: 搜索下载 QLMarkdown / QLStephen / QuickLookJSON 并放到 `~/Library/QuickLook` 或 `/Library/QuickLook` 目录。如果不生效、`killall Finder` 重启 Finder。
- 系统顶部菜单栏: 按住 `Command` 再拖动图标，改变右边图标顺序。
- 文本替换: 系统偏好设置 -> 键盘 -> 文本，「command + A」全选、拖拽到 Finder 会生成“用户词典.plist”的文件。
- 通知: 禁止 Enhanced Notifications 在 “勿扰模式” -> 勾选 “当显示器进入睡眠状态时/当屏幕锁定时”
- Mac m1 外接显示器分辨率低：系统偏好设置 -> 显示器 -> 按住 Option 键的同时点击“缩放”

- 在启动系统登录后、添加自动打开的程序：System Preferences(系统偏好设置) > Users & Groups(用户与群组) > Login items(登录项) 点击"+"、找到自己写的可执行 bash 文件，加入即可。
- iBook 缓存位置 ~/Library/Containers/com.apple.BKAgentService/Data/Documents/iBooks

## 软件

macOS “安全性与隐私”里去掉了允许安装”任何来源“的软件设置，可以在终端里运行`sudo spctl --master-disable`打开，解决「xxx.app已损坏,打不开.你应该将它移到废纸篓」问题。

- 系统: AppCleaner / iZip Unarchiver / Paste / iStat-Menus / hidden-bar Vanilla Dozer / aria2 / imazing / Fenêtre Lite / Spectacle / ParagonNTFS / Smoothscroll / OmniDiskSweeper

- 开发: MacDown / Marp / charles / Gas-Mask / whistle / color-note / meld / ngrok inlets(GitHub) / axure RP(公司) / npkill(删除node_modules) / httptoolkit.tech / [XSwitch](https://github.com/yize/xswitch) / porter.io

- 图像: lightshot (snip) / licecap (kap gifify) / Readiris-ocr / any-video-converter (在线 online-audio-converter.com) / XnConvert(图像处理) / Movist (IINA) / ExifRenamer(重命名图片) / ExifTool [exifr](https://mutiny.cz/exifr/) / HandBrake / MKVToolnix(mkv字幕抽取) / perian(QuickTime 插件) / NeatDownloadManager

- 其他: webtorrent-desktop / Kotobee Author / Remote Mouse / [web 历史](https://archive.org/web)
- Chrome: 一键切换(Jomic) 搜索拐杖 / Tamper / Wayback Machine / Memex / 一叶 / grammarly.com / Tampermonkey gitpod npmhub / screenity
- zip加密: `zip -e output.zip ~/xx.txt` / [zip解密](https://www.jianshu.com/p/bf4a6244180f)
- rar[工具](https://www.rarlab.com/download.htm): `rar a test.rar test/` 压缩 test 目录内容生成 test.rar 文件。
- https://www.keka.io 压缩解压 7z zip 等。mac 选中文件右键 -> 压缩生成zip 或者 服务“使用keka压缩”。
- [zip、rar、7z文件密码破解](https://github.com/jaredsburrows/rarcrack)、[7zcrack](https://github.com/tp7309/tt7zcrack)
- 如何下载HLS视频到本地？https://www.zhihu.com/question/35564371/answer/694240638 / https://www.downloadhelper.net

- 手机软件: 今日热榜, 白描, Stream, 无忧电话录音, DVR Link, Splashtop, andromouse. 游戏：big hunter, brain dots。
  - 查看 app URL scheme: 下载 ipa 文件，修改后缀为 .zip 解压缩，进入 Payload/xx.app 右键显示包内容、找到直接根目录下的 info.plist 文件 xcode 打开、找到 Bundle identifier 再搜索相应的 URL Schemes 即可。Android 下载 apk 文件，通过 在线反编译工具 查看`AndroidManifest.xml`文件内容里的 intent-filter scheme 值。 [iOS12捷径汇总](https://www.jianshu.com/p/ec131155c58d) / [捷径盒](https://jiejinghe.com/) / [查看某个 app 的更新频率](https://www.applyzer.com/)

- U盘格式
  - 支持 Mac + Win 的读写格式: exFAT、FAT32、NTFS(在Mac上读写需要额外装支持软件)。支持大于 4G 的文件: exFAT、NTFS (FAT32不支持)。 在 Win 上格式化时、选择 exFAT 格式即可，并且勾选“快速格式化”(不勾选可能不行)。
  - 重装 Win 系统用老毛桃制作“U盘启动工具”，另外在此 <http://msdn.itelly.net/> 下载 Win 系列纯净系统 ISO 镜像文件 (可以是不同U盘))。开机(比如按F12)设置U盘优先启动、重启会自动进入PE模式，再点击“老毛桃PE装机工具”，选择U盘中的系统镜像、选择分区C、确定后，勾选“格式化分区[NTFS自动]”和“添加引导[C]”，勾选“完成后重启”、点击确定。

快捷键

```sh
pmset noidle  # 阻止电脑睡眠。 同时按住 shift、control、电源键，关闭显示器
单词自动补全：在内置的文本编辑器里，输入几个字母后，点击 Escape 键，OS X 就会提示多个单词。

cmd + shift + . / G / D / F # 在 finder 切换显示“隐藏文件” / 跳转 / 桌面 / 最近使用的全部文件
cmd + shift + 3/4  # 截图保存成文件，加 control 只是保存在剪贴板

sips -z height width [file]   # 修改图片的宽和高为指定值
sips -Z 640 *.jpg   # 批量修改图片的 宽或高 为指定值(最大值变为 640)，保持原来宽高比例
# http://apple.stackexchange.com/questions/102452/can-i-undo-changes-made-via-defaults-write
defaults read com.apple.screencapture  # 查看系统截图设置
defaults write com.apple.screencapture type jpg  # 将系统截屏后图片保存为 jpg 格式
defaults write com.apple.screencapture location ~/Downloads/  # 修改截屏图片保存路径
defaults delete com.apple.screencapture name  # 撤销修改截图名

## Chrome
Command + L  # 光标定位到地址栏，输入搜索词 并按 Alt + Enter 键在 新标签页中
Command + 1/2/3  # 跳到相应标签
Command + Alt + →/←  # 选择 上/下 一个标签
```

---------

> [国外典型程序员：生产力装备](https://blog.stephenwolfram.com/2019/02/seeking-the-productive-life-some-details-of-my-personal-infrastructure/)

安装 git & gcc `xcode-select --install`

## iTerm2 & oh-my-zsh

```sh
# Mac shell 修改方法 https://support.apple.com/zh-cn/HT208050
chsh -s /bin/zsh  # 修改 shell 为 zsh ，系统默认使用 /bin/bash
zsh --version  # Mac 系统自带了 zsh
```

- iTerm2 的 Preferences > Keys 里 HotKey 设置为 Command + `
- iTerm2 的 Profiles > Keys 里点 + 弹出输入 ⌥→ / ⌥← Action 设置为 Send Escape sequence , f / b
- iTerm2 的 Profiles > Window - Transparency 设置透明度 / Style 设置为 `Full-Width Top of Screen`
- [cdto](https://github.com/jbtule/cdto) 使用 [2.6 版本](https://github.com/jbtule/cdto/issues/46) 能在 ITerm (不是系统默认 terminal) 里打开当前 Finder 路径.
- 只在 iTerm2 里修改 shell : `Preferences -> Profiles -> Default -> General -> Command`
- 安装 [oh-my-zsh](https://github.com/ohmyzsh/ohmyzsh#manual-installation)、使用 manual install 方式、不需要翻墙，它有很多 Plugins 和 Themes。注意：会在 用户目录 生成新的 `.zshrc`


## homebrew & ruby & jekyll

```sh
# https://brew.sh/
# brew 国内源 https://www.jianshu.com/p/bea984d27cd2
cd "$(brew --repo)"
cd "$(brew --repo)/Library/Taps/homebrew/homebrew-core"
git remote -v
brew update / list
```

```sh
# mac 自带的 ruby 在运行 jekyll 时有问题，需要新安装 ruby@3
brew install ruby   # 过程中有些依赖出错、就相应单独安装，比如 brew install libyaml / readline / ...
ruby -v   # 在 .zshrc 里加入 ruby@3 的 bin 路径，新打开 terminal 查看
which ruby / gem  # 查看目录
gem env # 查看更详细信息

gem install jekyll bundler  # 安装在 /opt/homebrew/lib/ruby/gems 目录
gem install --user-install bundler jekyll  # 安装在 ~/.gem 目录
jekyll serve   # 启动报错 缺少 webrick
bundle add webrick   # 报错 Could not locate Gemfile
bundle init  # 生成 Gemfile 之后再运行 bundle add webrick 随后 jekyll serve 成功

gem install jekyll-feed / jekyll-paginate  # 安装 jekyll plugins
```


## 代理

命令行代理 `brew install proxychains-ng` 修改 /usr/local/etc/proxychains.conf 配置文件“末尾”部分内容
`#socks4  127.0.0.1 9050` 改为 `socks5  127.0.0.1 1080`。使用 `proxychains4 -q curl https://twitter.com` 测试是否成功，不成功则需要重启 Mac，按下 `Cmd + R` 选择实用工具->终端，输入 `csrutil disable` 关闭 sip, 输入`csrutil status`查看状态。

疑问：有些代理服务器、用 SwitchyOmega 首次加载 需要代理的网页 会失败、然后自动刷新 访问成功，[问题跟踪](https://github.com/FelisCatus/SwitchyOmega/issues/1511#issuecomment-433313269)

```txt
[SwitchyOmega Conditions]
@with result

*.github.com +proxy
*.icloud.com +direct

* +direct
```

---------

## vs code

- 配置文件路径: `~/Library/Application\ Support/Code/User`
- 安装 code 命令：`cmd + shift + p` Shell Command: Install 'code' command in PATH
- 配置项: Preferences > Settings > settings.json
- 在查找(替换)框里按 ctrl + enter 支持多行

```js
// 快捷键
[
  { "key": "cmd+d", "command": "editor.action.copyLinesDownAction" },
  // 安装 Terminal 扩展后
  { "key": "alt+`", "command": "terminal.open" }
]
```

扩展，安装目录: `~/.vscode/extensions`

Terminal / Live Server / markdownlint / filesize / EditorConfig / GitLens / Settings Sync /
Indent 4-to-2 / beautify react-beautify Auto Close(Rename) Tag / SVG Viewer /
pangu / Hungry Delete / javascript console utils
[https://github.com/viatsko/awesome-vscode](https://github.com/viatsko/awesome-vscode) /
Task Explorer / sftp / Web Template Studio


---------

## Git / Npm

[Git Aliases](https://git-scm.com/book/en/v2/Git-Basics-Git-Aliases)、[git-open](https://github.com/paulirish/git-open) 自动打开 git 远程仓库地址

npm & git 工作环境设置

```sh
# 命令行登录 registry
npm login --registry=https://registry-cnpm.xx.work

# 内部仓库、设置内部邮箱
git config user.name "然则"
git config user.email "hualei.hl@xx-inc.com"

# 全局默认设置 code ~/.gitconfig
git config --list
git config --global alias.st status
git config --global alias.ci commit

# yarn 源设置
yarn/npm config get registry # 查看源
# node-sass 需要单独设置国内源
npm config set sass_binary_site=https://npm.taobao.org/mirrors/node-sass
yarn install --registry https://registry.npm.taobao.org/  #指定源
```


```sh
# node & npm
npm install tnpm -g --registry="http://registry.npm.xx.com" # 使用 cnpm 加速

node hello.js &  # 后台运行程序
ps -ef | grep node  # 找到进程对应的ID
kill 3747(进程id)  # 杀掉后台进程
```

head caret tilde 区别 https://scarletsky.github.io/2016/12/29/tilde-and-caret-in-git/

```sh
# 分支
git checkout -b xx origin/xx    # 新建xx分支，并跟踪远程xx分支
git branch -d xx       # 删除分支xx
git push origin :xx    # 删除远程分支xx
git push origin xx:xx  # 上传我本地的xx分支到远程仓库中去，仍称它为xx分支

git diff [version1] [version2]   # 查看版本差异

git pull --rebase       # 同 git fetch + git rebase
git pull -p # remove all your local branches which are remotely deleted.

git fetch origin  # 同步远程repos, 更新本地仓库的所有 origin/* 分支信息
git merge origin/xx    # 远程上有 xx 分支，并且 git fetch  执行此命令，将合并此分支
git merge --no-ff xx   # 不执行"快进式合并"，始终多产生 merge 信息，便于追踪

# 合并/删除多个 commit 为一个 https://www.jianshu.com/p/4a8f4af4e803
git log   # 找到要删除/合并 commit 之前一个 commit_id
git rebase -i [commit_id]
git push -f  # 强制提交

# 使用 rebase 代替 merge 避免生成类似 merge branch “branch_name” 历史记录
# 公共仓库不建议使用 rebase https://www.fossil-scm.org/fossil/doc/trunk/www/rebaseharm.md
# https://robots.thoughtbot.com/git-interactive-rebase-squash-amend-rewriting-history
# merge 和 rebase 的问题：
#- 如果用 rebase ，需要经常 reapply 其他提交的改动， commit 的时间顺序也会乱掉。
#- 如果用最直接的 merge ，会产生重复无用的比如 Merge pull request pull_id from xx_branch 或者 Merge branch “branch_name” 信息，不利于 review 提交记录。

# 回退恢复：
## working tree (add之前，原始状态)
git checkout .
git clean -xdf # 删除所有 .gitignore 里指定的文件或目录，包括新建文件、node_modules 等

## index 内的回滚 (add后 commit之前，暂存区)
git reset [file | 057d]    # 回退文件、或回退到某个版本  
git reset HEAD^    # 回退所有内容到上一个版本
git reset HEAD^ a.py    # 回退 a.py 这个文件的版本到上一个版本

## commit 之后的回滚
git reset --[soft | hard] [HEAD^ | 057d]  # --soft 不修改本地文件 --hard 本地的文件修改都被丢弃
git reset --hard origin/master   # 将本地的状态回退到和远程的一样

## 回滚远程主干代码，并且 不抹掉 提交记录，使用 revert
git revert -n commit_id..  # (注意 ..) 把从 commit_id 到 head 的所有提交 revert 掉，-n 表示只产生一条记录

## 增加某个 commit 方法 cherry-pick
git cherry-pick 62ecb3 # 一般用于将 bugfix commit pick 到不同版本上

## 修改提交信息 修改注释 https://help.github.com/articles/changing-a-commit-message/
git commit --amend  # 修改 most recently commit 比如加 --reset-author

git stash [pop | list | drop]   # 暂存未提交的修改

# remote
git remote add origin git@xxx.git    # 加入服务器
git remote -v  # 列出现有的远程地址
git remote set-url origin xxx  # 改变远程地址为 xxx

# 操作tag
git tag 0.0.1       # 打轻量标签
git tag -a 0.0.1 -m 'Release version 0.0.1'
git push origin v1.5
git push [origin] --tags    # 推送所有标签到服务器
```

### git 实践

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



---------

## Apache

[Get Apache, MySQL, PHP and phpMyAdmin working on OSX](https://coolestguidesontheplanet.com/get-apache-mysql-php-phpmyadmin-working-osx-10-10-yosemite/) 、
[apache_virtualhosts](http://lowagie.com/apache_virtualhosts)

[设置 CORS 跨域访问](https://stackoverflow.com/questions/40178363/request-header-field-x-requested-with-is-not-allowed-by-access-control-allow-hea)

```sh
httpd -v  # find the Apache version
sudo apachectl restart / start / stop   # 开关重启
code /etc/apache2/httpd.conf  # 编辑 Apche 的配置文件

找到 "#LoadModule php5_module libexec/apache2/libphp5.so"  去掉前边的`#`号，打开php

改变 localhost 目录指向：

#DocumentRoot "/Library/WebServer/Documents"
# 在 index template 里插入自定义 meta. http://httpd.apache.org/docs/2.4/mod/mod_autoindex.html
IndexHeadInsert "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />"
DocumentRoot "/Users/hua/inner"
<Directory "/Users/hua/inner">
    Options Indexes FollowSymLinks MultiViews
    MultiviewsMatch Any
    AllowOverride None
    Require all granted
    Header set Access-Control-Allow-Origin "*"
    Header set Access-Control-Allow-Headers "Origin, X-Requested-With, Content-Type, Accept"
    Header set Access-Control-Allow-Credentials: true
</Directory>
<VirtualHost *:80>
  <FilesMatch "\.(md|cpp|php)$">
    AddDefaultCharset utf-8
    Header always set Content-Type "text/plain; charset: utf-8"
  </FilesMatch>
</VirtualHost>

Listen 9999
<Directory "/Users/hua/Downloads">
    Options Indexes FollowSymLinks MultiViews
    MultiviewsMatch Any
    AllowOverride None
    Require all granted
</Directory>
<VirtualHost *:9999>
    DocumentRoot "/Users/hua/Downloads"
    ServerName me.com
</VirtualHost>
```

> 如果出现 403 You dont have permission to access 错误，修改目录权限 everyone 为“只读”，再重启 Apache

访问：<http://localhost> / <http://localhost:9999/>

有些 API 比如 html5 getUserMedia / geolocation 必须要在 https 环境下生效，参考配置如下(ssl 证书另外自行生成)：

- <http://www.jianshu.com/p/bd016015efe7>
- <http://www.cnblogs.com/y500/p/3596473.html>

结合以下 nginx https 设置、来全面支持。

---------

## nginx

```sh
brew install nginx  
sudo nginx  # 启动
sudo nginx -s stop  # 关闭
sudo nginx -s stop && sudo nginx  # 重启

code /usr/local/etc/nginx/nginx.conf  # 打开配置文件

# 更改 http / HTTPS → server 区块里的配置为：
location / {
    #root   html;
    root    /Users/hua/inner;
    autoindex on;
    index  index.html index.htm;
}

https 设置: https://www.jianshu.com/p/fe0fadb38600
https 设置: https://www.jianshu.com/p/fc1e81efc867

http://localhost:8080  # 重启并测试
https://localhost  # 测试 https
```


---------

## 虚拟机

- virtualbox win7 网络设置为 bridged adapter (name: wifi) [如图](https://gw.alipayobjects.com/zos/rmsportal/auNTgeEEHVFfWklRjRsK.png)、在家里网络正常，但很奇怪在公司内网不能连接？？
- [虚拟机里的 win 键盘是用的 ctrl 键](https://forums.virtualbox.org/viewtopic.php?f=8&t=63567&hilit=keyboard)
- 安装后重启，或点击菜单 Devices -> Insert Guest Additions CD image… 使能访问 host 电脑并自动调整分辨率
- 设置 Shared Folders

> 注意：当 virtualBox 运行时，Android 官方安装的虚拟机、开不起来！  
> 虚拟机里查看 ip 地址可以看到，例如 10.0.2.2 可访问 host 主机的 localhost , Genymotion android emulator 相应ip为 10.0.3.2

---------

## 路由器设置

windows下 ipconfig 查出的 “默认网关” 地址一般就是 “路由器ip” 地址；对应 mac 上的 “偏好设置－网络－高级－TCP／ip下的路由器”。

> 路由器不需要链接网线到电脑上。遇到问题，先路由器复位

tplink-WR720N 迷你型无线路由器(跟普通路由器不同)
默认管理IP: 192.168.1.253 子网掩码: 255.255.255.0 账号密码: admin，默认模式为 AP 模式（其他有 3G / Router 模式）

路由器直接通电，不用插入网线，电脑/手机连接上“路由器名称（不带密码）”，浏览器输入“默认管理IP”、找到“无线设置”-“基本设置”-“SSID号”-“无线网络安全设置” 设置完毕即可。

- AP 模式：一般用于“租房/宾馆”等有网线（电脑能直接连网线上网）但没有无线网的地方。用网线直接连到路由器 LAN 端口，即可直接使用路由器的无线网。
- Router 模式：需要确保路由器 “LAN 网段” 和 “WAN 网段” 不在一个段内。可以在 AP 模式下，查看 IP和DNS地址，如果此时 IP地址 是 192.168.1.xx ，那么切到 Router 模式下，WAN 口的地址填上刚才的 IP和DNS地址，LAN 口的 IP地址 改为 192.168.2.253(xx) ，这样就不在一个网段了。再用网线直接连到路由器 WAN 端口，DHCP 可以打开，然后可上网。
