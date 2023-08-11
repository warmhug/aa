# Mac

## 系统设置

- 点击和手势: 触控板。1 勾选 “轻点来点按” 2 启用词典：查询与数据检测器 - 选择三指轻点 3 更多手势 - 应用Expose。
- 三指拖移窗口: 辅助功能 -> 鼠标与触控板 -> 触控板选项 -> 启用拖移 -> 三指拖移。
- 触发角: 调度中心 -> 触发角 (左上角:启动台, 左下角:显示器睡眠, 右上角:调度中心, 右下角:桌面)。
- 快捷键: 键盘 -> 快捷键 -> 输入法 选择 `cmd+空格`，在 “服务” 里勾选或不选。另可修改 App 的快捷键。
- dock: 程序坞 -> 不勾选 “在程序坞中显示最近使用的应用程序”(最后一项) 显示隐藏 `cmd+alt+d`。
- 通知: 通知中心 -> 勾选 “当显示器进入睡眠状态时/当屏幕锁定时”
- 系统顶部菜单栏: 按住 `Command` 再拖动图标，改变右边图标顺序。Finder 工具栏: 按 `cmd + alt`，拖动 app 到工具栏。
- 文本替换: 键盘 -> 文本，「command + A」全选、拖拽到 Finder 会生成 “用户词典.plist” 的文件。
- m1 外接显示器分辨率低: 显示器 -> 按住 Option 键的同时点击“缩放”。
- 快捷指令: iOS -> Apple ID -> iCloud -> 使用iCloud的APP -> 显示全部 找到 快捷指令 勾选同步。
- QuickLook: 搜索下载 QLMarkdown / QLStephen / QuickLookJSON 并放到 `~/Library/QuickLook` 或 `/Library/QuickLook` 目录。如果不生效、`killall Finder` 重启 Finder。

- 查看ip地址: 设置 - wifi - 详细信息。查看域名路由 `traceroute developer.chrome.com` 或 `ping xxx`。
- 在启动系统登录后、添加自动打开的程序：System Preferences(系统偏好设置) > Users & Groups(用户与群组) > Login items(登录项) 点击"+"、找到自己写的可执行 bash 文件，加入即可。
- iBook 缓存位置 ~/Library/Containers/com.apple.BKAgentService/Data/Documents/iBooks

## 软件

macOS “安全性与隐私”里去掉了允许安装”任何来源“的软件设置，可以在终端里运行`sudo spctl --master-disable`打开，解决「xxx.app已损坏,打不开.你应该将它移到废纸篓」问题。
关闭 sip 方法：关机后、按住右上角电源键(非m1按下`Cmd + R`) 选择实用工具->终端，输入 `csrutil disable` 关闭 sip, 输入`csrutil status`查看状态。

- 系统: AppCleaner / afloatx (不可用) / iZip Unarchiver / Paste(收费) Clipy Maccy CopyClip / iStat-Menus / hidden-bar Vanilla Dozer / aria2 / Spectacle / ParagonNTFS / Smoothscroll / OmniDiskSweeper / https://u.tools

- 开发: MacDown / Marp / charles / Gas-Mask / whistle / color-note / meld / ngrok inlets(GitHub) / axure RP(公司) / npkill(删除node_modules) / httptoolkit.tech / porter.io / https://devtool.tech/html-md

- 图像: xnip snipaste lightshot (snip) / licecap (kap gifify) / UPDF / Readiris-ocr / any-video-converter (在线 online-audio-converter.com) / XnConvert(图像处理) / Movist (IINA) / ExifRenamer(重命名图片) / ExifTool [exifr](https://mutiny.cz/exifr/) / HandBrake / MKVToolnix(mkv字幕抽取) / perian(QuickTime 插件) / NeatDownloadManager / extract-video-ppt

- 其他: vivaldi / webtorrent-desktop / Kotobee Author / Remote Mouse / https://archive.org/web
- chrome 同步: Switchy Omega 添加 `*.google*` proxy 规则到前边，打开 `chrome://sync` 看 Local State - Server Connection 是否成功。参考 [1](https://hellodk.cn/post/185)、[2](https://github.com/FelisCatus/SwitchyOmega/issues/1599)。 其他方法：代理软件和浏览器都设为“系统代理”。
- Chrome cmd+t在右侧标签打开 https://superuser.com/a/1260437
- Chrome tab卡死: 菜单 - 窗口 - 任务管理器 - 找到相应tab名 查看内存占用空间排序为空 - 结束进程。
- Chrome 地址栏搜索 无法在新标签页打开结果 https://www.runningcheese.com/tabs
- Chrome extensions: 一键切换(Jomic) 搜索拐杖 下一页(空格键自动翻到下一页) XSwitch Tamper / Disable Content-Security-Policy / Talend API Tester / Web Developer / Neat URL / Copy Tab Info / Open Multiple URLs / 沙拉查词 / User JavaScript and CSS / Wayback Machine / Memex / 一叶 / grammarly.com / Tampermonkey gitpod npmhub / screenity / ChatGPT for Google / Language Reactor

- zip加密: `zip -e output.zip ~/xx.txt` / [zip解密](https://www.jianshu.com/p/bf4a6244180f)
- rar[工具](https://www.rarlab.com/download.htm): `rar a test.rar test/` 压缩 test 目录内容生成 test.rar 文件。
- https://www.keka.io 压缩解压 7z zip 等。mac 选中文件右键 -> 压缩生成zip 或者 服务“使用keka压缩”。
- [zip、rar、7z文件密码破解](https://github.com/jaredsburrows/rarcrack)、[7zcrack](https://github.com/tp7309/tt7zcrack)
- 如何下载HLS视频到本地？https://www.zhihu.com/question/35564371/answer/694240638 / https://www.downloadhelper.net
- 欧路词典: 修改 ~/Library/Preferences/ com.eusoft.eudic.plist 修改 MAIN_TimesLeft：允许使用次数(任意改) 10000000 重启 （更新 [notion](https://www.notion.so/Eudic-Mac-0b5e993809794576868714f613f637ff)、百度网盘下载 再升级）

- 手机软件: zfuse, DVR Link, big hunter, brain dots, Scriptable, [捷径汇总](https://www.jianshu.com/p/ec131155c58d)
- iPhone 恢复出厂设置后，系统软件版本是 iOS 最新版、不是出厂时的旧版本。 在最新 beta 版系统软件做备份后、不能恢复到旧稳定版本！ https://apple.stackexchange.com/q/328535/228571
- iPhone 连接数据线恢复备份的文件后，各个第三方app仍然需要重新下载、发现卡死状态 用手机网络 优先下载重要app 其他的暂停并排队，app内本地的聊天记录还是会丢失 要提前备份并立即恢复！
- iPhone 查看连接过的所有WiFi：进入设置-“无线局域网” -右上角“编辑”。
- iOS快捷指令 朗读的 声音大小和siri一样，不受设置里声音大小的控制，通过设置 Siri 的声音来控制。
- 小米多看电纸书[一代](https://item.jd.com/100010633100.html)、安装app[方法](https://www.bilibili.com/video/av893445949/)

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
# defaults help  /  man defaults
defaults read com.apple.screencapture  # 查看系统截图设置
defaults write com.apple.screencapture type jpg  # 将系统截屏后图片保存为 jpg 格式
defaults write com.apple.screencapture location ~/Downloads/  # 修改截屏图片保存路径
defaults delete com.apple.screencapture name  # 撤销修改截图名
defaults write com.apple.helpviewer DevMode -bool TRUE  # 系统的帮助窗口设置为不前置
```


---------

> [国外程序员生产力装备](https://blog.stephenwolfram.com/2019/02/seeking-the-productive-life-some-details-of-my-personal-infrastructure/)

安装 git & gcc `xcode-select --install`

## oh-my-zsh & iTerm2(不需要)

```sh
# Mac shell 修改方法 https://support.apple.com/zh-cn/HT208050
chsh -s /bin/zsh  # 修改 shell 为 zsh ，系统默认使用 /bin/bash
zsh --version  # Mac 系统自带了 zsh
```

- iTerm2 设置 HotKey 和 Profiles > Keys 里点 + 弹出输入 ⌥→ / ⌥← Action 设置为 Send Escape sequence , f / b
- [cdto](https://github.com/jbtule/cdto) 使用 [2.6 版本](https://github.com/jbtule/cdto/issues/46) 能在 ITerm (不是系统默认 terminal) 里打开当前 Finder 路径.
- 安装 [oh-my-zsh](https://github.com/ohmyzsh/ohmyzsh#manual-installation)、使用 manual install 方式、不需要翻墙，它有很多 Plugins 和 Themes。注意：会在 用户目录 生成新的 `.zshrc`

`.zshrc` 文件

```sh
# bin 目录加入环境变量
export PATH=$HOME/bin:/usr/local/bin:$PATH

# 使用 homebrew 安装的 python2 覆盖 “系统默认的” python2
# export PATH="$(brew --prefix python)/libexec/bin:$PATH"
export HOMEBREW_BOTTLE_DOMAIN=http://7xkcej.dl1.z0.glb.clouddn.com  # homebrew 加速
### brew install autojump 后提示需要添加的内容
[ -f /usr/local/etc/profile.d/autojump.sh ] && . /usr/local/etc/profile.d/autojump.sh

export EDITOR='vim'
#export PS1="\u \w$"

# 以下 zshrc 模板去掉了很多没用到的命令和注释
# 完整模板看这里：https://github.com/robbyrussell/oh-my-zsh/blob/master/templates/zshrc.zsh-template
#
# Path to your oh-my-zsh installation.
export ZSH=$HOME/.oh-my-zsh
# Set name of the theme to load. Look in ~/.oh-my-zsh/themes/
ZSH_THEME="ys"
# Which plugins would you like to load? (plugins can be found in ~/.oh-my-zsh/plugins/*)
# Add wisely, as too many plugins slow down shell startup.
plugins=(git)
source $ZSH/oh-my-zsh.sh

# 运行 alias 查看所有别名
alias cz="code ~/.zshrc"
alias sz="source ~/.zshrc"

## java  参考：http://chessman-126-com.iteye.com/blog/2162466
#export JAVA_6_HOME=`/usr/libexec/java_home -v 1.6` # Mac默认 JDK 6（Mac默认自带了一个jdk6版本）
#export JAVA_7_HOME=`/usr/libexec/java_home -v 1.7` # 设置 JDK 7
# export JAVA_8_HOME=`/usr/libexec/java_home -v 1.8` # 设置 JDK 8
#alias命令动态切换JDK版本
#alias jdk6="export JAVA_HOME=$JAVA_6_HOME"
#alias jdk8="export JAVA_HOME=$JAVA_8_HOME"
# export JAVA_HOME=$JAVA_8_HOME #默认JDK
# export CLASSPATH=.:$JAVA_HOME/lib:
# export PATH=$PATH:$JAVA_HOME/bin
```


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
brew install ruby
# 过程中有些依赖出错、就相应单独安装，比如 brew install libyaml / readline / ...
ruby -v   # 在 .zshrc 里加入 ruby@3 的 bin 路径，新打开 terminal 查看
which ruby / gem  # 查看目录
gem env # 查看更详细信息

gem install jekyll bundler  # 安装在 /opt/homebrew/lib/ruby/gems 目录
gem install --user-install bundler jekyll  # 安装在 ~/.gem 目录

# jekyll 是在 /opt/homebrew/opt/ruby/bin/ 不是在 /usr/local/bin 里
# jekyll 是在 /opt/homebrew/lib/ruby/gems/3.1.0/gems/jekyll-4.2.2
jekyll serve   # 启动报错 缺少 webrick
bundle add webrick   # 报错 Could not locate Gemfile
bundle init  # 生成 Gemfile 之后再运行 bundle add webrick 随后 jekyll serve 成功

gem install jekyll-feed / jekyll-paginate  # 安装 jekyll plugins
```


## 代理

命令行代理 `brew install proxychains-ng` 修改 /usr/local/etc/proxychains.conf 配置文件“末尾”部分内容 `#socks4  127.0.0.1 9050` 改为 `socks5  127.0.0.1 1080`。使用 `proxychains4 -q curl https://twitter.com` 测试是否成功，不成功则需要关闭 sip。

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

- 安装 code 命令：`cmd + shift + p` Shell Command: Install 'code' command in PATH
- 在查找(替换)框里按 ctrl + enter 支持多行
- 设置 [tab group](https://github.com/microsoft/vscode/issues/100335#issuecomment-964358943)

```js
// 快捷键
[
  { "key": "cmd+d", "command": "editor.action.copyLinesDownAction" },
  // 安装 Terminal 扩展后
  { "key": "alt+`", "command": "terminal.open" }
]
```

配置 multiple root 方便一次性编辑多个项目：创建 `xx.code-workspace` 文件，内容为
> 注意避免多个项目不同编译配置的互相干扰
```js
{
  "folders": [
    { "name": "ROOT", "path": "./" },
    { "name": "slardar", "path": "./slardar" },
  ],
  // 不使用公共的，而使用 某个项目 本地配置的 typescript 编译器
  "settings": {
    "typescript.tsdk": "slardar/node_modules/typescript/lib"
  }
}
```

项目做单独的设置、比如 `xxProj/.vscode/settings.json` 内容
```json
{
  "editor.tabSize": 2,
  "editor.formatOnSave": true,
  "prettier.singleQuote": true,
  "typescript.tsdk": "node_modules/typescript/lib",
  "search.exclude": {
    "**/node_modules": true,
    "**/dist": true,
    "yarn.lock": true
  }
}
```

[推荐](https://github.com/viatsko/awesome-vscode) 的扩展:
plantuml(设置指定server) / Auto Hide / Live Preview / Markdown All in One / marp / filesize / EditorConfig / GitLens / Indent 4-to-2 / SVG Viewer / pangu / Hungry Delete / javascript console utils / Template String Converter


---------

## Git / Npm

[Git Aliases](https://git-scm.com/book/en/v2/Git-Basics-Git-Aliases)、[git-open](https://github.com/paulirish/git-open) 自动打开 git 远程仓库地址

`.gitconfig` 文件

```sh
[alias]
	st = status
	co = checkout
	ci = commit
	br = branch
[user]
	name = warmhug
	email = hualei5280@gmail.com
```

```sh
# 生成 ssh key
ssh-keygen -t rsa -C "email@example.com"
# 再把 ~/.ssh/id_rsa.pub 文件内容添加到 github

# 如果报错 Permission denied (publickey,gssapi-with-mic). 使用另一种生成方式
# https://confluence.atlassian.com/bitbucketserverkb/ssh-rsa-key-rejected-with-message-no-mutual-signature-algorithm-1026057701.html
ssh-keygen -t ed25519 -C hualei.hl@xx.com
ssh-add ~/.ssh/id_ed25519
# 再把 ~/.ssh/id_ed25519.pub 文件内容添加到 gitlab

# 内部仓库、设置内部邮箱
git config user.name "然则"
git config user.email "hualei.hl@xx-inc.com"
# github 设置单独的 name email, 在 .gitconfig 里新增以下命令
[includeIf "gitdir:~/inner/-/"]
  	path = .gitconfig-github
# 再新建 - 目录 和 .gitconfig-github 文件

# 全局默认设置 code ~/.gitconfig
git config --l
git config --global alias.st status

# 以下对 pnpm yarn 同样生效
# node-sass 需要单独设置国内源
npm config set sass_binary_site=https://npm.taobao.org/mirrors/node-sass
npm config get registry # 查看源
npm config list
npm login --registry=https://registry-cnpm.xx.work  # 命令行登录 registry
npm install tnpm -g --registry="http://registry.npm.xx.com" # 使用 cnpm 加速
yarn install --registry https://registry.npm.taobao.org/  #指定源
yarn config set registry <url-to-your-registry>
npm view lerna
npx lerna list  # 免全局安装

node hello.js &  # 后台运行程序
ps -ef | grep node  # 找到进程对应的ID
lsof -i:8087   # 查找出占用了某个端口的程序和其对应的PID
kill 3747(进程id)  # 杀掉后台进程
kill -9 $(lsof -ti:3000,3001)  # 杀掉端口占用的进程
kill -9 *pid*  # 强制杀掉进程
```

head caret tilde 区别 https://scarletsky.github.io/2016/12/29/tilde-and-caret-in-git/

```sh
# 分支
git checkout -b xx origin/xx    # 新建xx分支，并跟踪远程xx分支
git branch -d xx       # 删除分支xx
git push origin :xx    # 删除远程分支xx
git push origin xx:xx  # 上传我本地的xx分支到远程仓库中去，仍称它为xx分支

git diff [version1] [version2]   # 查看版本差异

git pull -p # remove all your local branches which are remotely deleted.
git pull --rebase       # 同 git fetch + git rebase

git fetch origin  # 同步远程repos, 更新本地仓库的所有 origin/* 分支信息
git merge origin/xx    # 远程上有 xx 分支，并且 git fetch  执行此命令，将合并此分支
git merge --no-ff xx   # 不执行"快进式合并"，始终多产生 merge 信息，便于追踪

# 合并/删除多个 commit 为一个 https://www.jianshu.com/p/4a8f4af4e803
# 修改已提交的 commit message 修改后，其后续的 commit hash 将全部改变、会影响协作同学 https://stackoverflow.com/questions/5032374/accidentally-pushed-commit-change-git-commit-message/5032614#5032614
git log   # 找到要删除/合并 commit 之前一个 commit_id
git log -p fileName
git rebase -i [commit_id]
git rebase -i HEAD~2  #
git rebase -i --root  # rebase 第一个提交
git rebase origin/master  # 把远程 master 更新作为当前分支基线，达到撤销之前 rebase 的目的
git rebase --continue  # 先 git add --all 再 continue、有多个 commit 依次执行。
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

```sh
httpd -v  # find the Apache version
sudo apachectl restart / start / stop   # 开关重启
code /etc/apache2/httpd.conf  # 编辑 Apche 的配置文件

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

> 出现 403 You dont have permission to access 错误，
> 修改 路径下 各级目录 权限 everyone 为 “只读”，再重启 Apache

访问：<http://localhost> / <http://localhost:9999/>

有些 https 环境下生效，ssl 证书自行生成。结合 nginx https 设置、来全面支持。

---------

## nginx

```sh
brew install nginx  # 安装过程比如缺少 pcre2 ca-certificates 单独 brew install xx 安装
sudo nginx  # 启动
sudo nginx -s stop  # 关闭
sudo nginx -s stop && sudo nginx  # 重启

code /usr/local/etc/nginx/nginx.conf  # intel 打开配置文件
code /opt/homebrew/etc/nginx/nginx.conf # m1

# 更改 http / HTTPS → server 区块里的配置为：
location / {
    #root   html;
    autoindex on;
    root    /Users/hua/inner;
    index  index.html index.htm;
    add_header 'Access-Control-Allow-Origin' '*';
    add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS, PUT, DELETE';
    add_header 'Access-Control-Allow-Headers' 'Content-Type';
}

http://localhost:8080  # 重启并测试
https://localhost  # 测试 https
```


---------

## 虚拟机

- virtualbox win7 [如图](https://gw.alipayobjects.com/zos/rmsportal/auNTgeEEHVFfWklRjRsK.png)、在家里网络正常，但很奇怪在公司内网不能连接？？
- [虚拟机里的 win 键盘是用的 ctrl 键](https://forums.virtualbox.org/viewtopic.php?f=8&t=63567&hilit=keyboard)
- 安装后重启，或点击菜单 Devices -> Insert Guest Additions CD image… 使能访问 host 电脑并自动调整分辨率
- 设置 Shared Folders

> 注意：当 virtualBox 运行时，Android 官方安装的虚拟机、开不起来！
> 虚拟机里查看 ip 地址可以看到，例如 10.0.2.2 可访问 host 主机的 localhost , Genymotion android emulator 相应ip为 10.0.3.2
