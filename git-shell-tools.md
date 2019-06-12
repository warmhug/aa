
# github

- [搜索 issue 方法](https://help.github.com/articles/searching-issues/)
  - 搜索“某repo”里有“某个评论者”参与的包含的“某个词”的 issue: [warmhug + ant-design-mobile](https://github.com/search?utf8=%E2%9C%93&q=xxxx+commenter%3Awarmhug+repo%3Aant-design%2Fant-design-mobile&type=Issues)
  - 搜索“某user”里有“某个评论者”参与的包含的“某个词”的 issue: [warmhug + xxxx](https://github.com/search?utf8=%E2%9C%93&q=xxxx+commenter%3Awarmhug+user%3Aant-design&type=Issues)
  - 搜索“某人”创建的在“body”里包含“某个词”的 issue: [warmhug + xx](https://github.com/search?utf8=%E2%9C%93&q=xx+in%3Abody+author%3Awarmhug&type=Issues)
- [github-rank](http://github-rank.com/star)
- [Most Starred](https://github.com/search?q=stars:%3E1&s=stars&type=Repositories)
- [Most Forks](https://github.com/search?o=desc&q=stars:%3E1&s=forks&type=Repositories)

# git

> git-tips: https://github.com/git-tips/tips

```sh
# branch
git branch xx        # 新建分支xx  
git checkout xx      # 切换到分支xx（HEAD指向此分支）
git checkout -b xx   # 新建并直接切换到xx分支
git checkout -b xx origin/xx    # 新建xx分支，并跟踪远程xx分支

git branch -d xx       # 删除分支xx
git push origin :xx    # 删除远程分支xx
git push origin xx:xx  # 上传我本地的xx分支到远程仓库中去，仍称它为xx分支
git push origin xx     # 推送到xx分支

# diff & log
git diff [version1] [version2]   # 查看版本差异
git diff --stat --color branch1..branch2  # 查看本地分支区别
git diff branch1...remotes/origin/branch2  # 查看本地和远程分支区别
git shortlog branch1...remotes/origin/branch2  # 查看本地和远程分支区别，信息少
git log -p -2   # 显示最近的两次更新
git log --stat  # 显示文件更改的统计结果

# pull
git pull                # 同 git fetch + git merge
git pull --rebase       # 同 git fetch + git rebase
git pull -p # remove all your local branches which are remotely deleted.

# fetch merge remote
git fetch   # 同步远程repos, 更新本地仓库的所有 origin/* 分支信息
git diff master origin/master   # 比较本地的 master 和远程的 master 分支差异
git merge origin/master  # 合并远程的 repos 到本地的 master 分支上

# merge
git merge xx           # 合并xx分支到某分支（例如：合并到主分支，先切到 master 再git merge xx）
git merge origin/xx    # 远程上有 xx 分支，并且 git fetch origin 执行此命令，将合并此分支
git merge --no-ff xx   # 不执行"快进式合并"，始终多产生 merge 信息，便于追踪
git merge --squash dev

git fetch upstream         # merge remote 获取原始代码库的更新
git merge upstream/master  # 合并进来

# 合并/删除多个 commit 为一个 https://www.jianshu.com/p/4a8f4af4e803
git log   # 找到要删除/合并 commit 之前一个 commit_id
git rebase -i [commit_id]
# (vi操作：方向键 + i + 需要修改的 + :wq)
# 将需要删除的 commit_id 前的 pick 改为 d | drop
# 将需要合并的 commit_id 前的 pick 改为 s | squash
# (一般保留以上列表中第一条 pick 不变，其他做相应修改)
git reflog  # 查看操作过程
git push -f  # 强制提交

# 使用 rebase 代替 merge 避免生成类似 merge branch “branch_name” 历史记录
git pull --rebase origin master  # 在开发分支上 rebase 主分支.
git rebase --continue
git rebase --abort
# merge 和 rebase 的问题：
#- 如果用 rebase ，需要经常 reapply 其他提交的改动， commit 的时间顺序也会乱掉。
#- 如果用最直接的 merge ，会产生重复无用的比如 Merge pull request pull_id from xx_branch 或者 Merge branch “branch_name” 信息，不利于 review 提交记录。

# 回退恢复：

## working tree (add之前，原始状态)
use "git checkout -- <file>..." to discard changes in working directory
git checkout .

git clean -df  # Remove untracked directories in addition to untracked files.
git clean -xdf # 删除所有 .gitignore 里指定的文件或目录，包括新建文件、node_modules 等
git clean -f  # 删除 untracked files（即远程仓库没有这个文件，新加的文件）
git clean -f -n

## index 内的回滚 (add后 commit之前，暂存区)
git reset file
git reset HEAD^    # 回退所有内容到上一个版本
git reset HEAD^ a.py    # 回退 a.py 这个文件的版本到上一个版本  
git reset 057d    # 回退到某个版本  

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
git push --force  # 强制提交 most recently pushed commit

## git head caret tilde 区别 https://scarletsky.github.io/2016/12/29/tilde-and-caret-in-git/

# 回滚远程主干代码，并且 不抹掉 提交记录，使用 revert
git revert -n commit_id..  # (注意 ..) 把从 commit_id 到 head 的所有提交 revert 掉，-n 表示只产生一条记录

# stash
git stash                   # 暂存未提交的修改
git stash pop               # 恢复上次未提交的修改  
git stash list              # 列出各个 stash 版本  
git stash apply stash@{1}   # 恢复到某个stash版本
git stash clear / drop <stash@{n}>     # 清除所有或某个stash版本

# remote
git remote add origin git@xxx.git    # 加入服务器
git remote -v  # 列出现有的远程地址
git remote set-url origin xxx  # 改变远程地址为 xxx

# submodule
> [submodules 基础操作](http://linlexus.com/git-submodule-usage/)

git submodule add git@github.com:user/repoName repoName # 只用一次，添加进主仓库
git clone --recursive git@github.com:user/repoName.git # 下载主仓库、并一起下载 submodule
## 首次需要；并且在 git clone 时没有 recursive 下载 submodule 也需要
git submodule init  
git submodule update  
git submodule status # 其他一些命令

## 更新 submodule
cd submodule_dir
git checkout master  # 注意：建议先切换到指定的分支、如 master ，然后再修改
git pull origin master
## 更新主 module 对 submodule 的引用
cd ..
git commit -am 'update submodule'
git push
## 移除 submodule
rm -f .gitmodules  # 移除 .gitmodules 文件
vim .git/config  # 编辑 .git/config 删除相应的 submodule 配置
git rm --cached submodule_dir  # 清除缓存

带有 submodule 的某个仓库里，其中自己的分支 branch1 合并来自其他分支 branch2 的修改，
发现两个分支的 submodule 的 HEAD 引用不同：
  要使用 branch1，则不进行操作
  要使用 branch2 分支的 submodule，需运行：`git submodule update`
  如果这两个分支的 submodule 引用都不是最新的；则进入 submodule 目录，运行`git pull origin master`拉取 submodule 最新版本。
然后在主仓库`git add [submodule path]`，再推送

# 操作tag
git tag 0.0.1       # 打轻量标签
git tag -a 0.0.1 -m 'Release version 0.0.1'
git tag [-l]               # 列出全部的tag清單
git push origin v1.5
git push [origin] --tags    # 推送所有标签到服务器
git tag -d 0.0.1   # 删除本地标签
git push origin :refs/tags/0.0.1   # 删除远程标签
git checkout tag_name  # 检出标签

```

## git 实践

```sh
# git 三板斧
# 一板基础斧
add，commit，pull/push，checkout，revert
# 二板合作斧
merge，rebase，stash，cherry-pick
# 三板优雅斧
commit --amend，rebase -i
```

遵循业内比较成熟的 GIT 分支模型，整个概况如下图所示：

![git-model 2x](https://cloud.githubusercontent.com/assets/36899/7315642/015f534c-eaa2-11e4-9882-b7cc7535fb72.png)

图中共有五种分支，这五种分支可分为两大类：

- 只读分支：`master` 和 `develop`，不可直接 commit/push，只能 merge，会长久存在远程仓库中；
- 开发分支：`feature`, `release` 和 `hotfixes`，可以直接 commit/push，不会长久存在远程仓库中。

* master: 线上部署的分支，是最稳定的，只接受来自 `release` 和 `hotfixes` 的 MR。
* develop: 处于开发状态的最新分支，接受来自 `feature` 和 `release` 的 MR。
* feature: 分支为功能开发分支，一个功能对应一个 feature。

```sh
# 创建 feature 分支：基于最新的 develop 分支创建一个以 `feature-` 为前缀的分支
git checkout -b feature-sth
```

> 一个 commit 应该是具有原子性的，不要将多个小功能点混杂在一个 commit 中

```sh
# 开发完成后，需要 rebase 到 develop 的最新状态
git fetch
git rebase -i origin/develop
```

rebase 时，报冲突时需要本地解决好，可对各个 commit 进行合并、调整、修改信息等，具体参考[git-interactive-rebase](https://robots.thoughtbot.com/git-interactive-rebase-squash-amend-rewriting-history)。保证测试用例全部通过后，`git push origin feature-sth` 提交至远程仓库。

提 MR 至 develop 分支并 assign 给 CR 者。

  - MR 中，写明功能描述，这样 CR 者就能快速了解这个 feature 做的事情；
  - 关联对应的 issue 及 milestone（如有）；修复 CR 反馈的问题。

待 MR 合并后，删除本地及远程 feature 分支（远程的 feature 分支一般在 MR 时勾选删除）。

#### release 分支

需要发布一个版本时，创建 release 分支。

1. 基于 develop 分支创建一个 `release-` 前缀的分支；
2. 在 release 分支上，可以切一些 `bugfix-` 分支修复一些 bug，提 MR 至对应 release 分支；小改动也可直接在 release 上改；
3. 当 release 分支稳定没有问题后，发一个 MR 到 master，并且同时发一个 MR 到 develop 分支；
4. 合并 MR 后，master 可以打一个 tag，标记版本号；
5. 删除 release 分支。

#### hotfixes 分支

> 线上有问题需要紧急修复时，需要在 master 上切分支修复。

1. 基于 master 创建一个 `hotfix-` 前缀的分支；
2. 开发完成并且测试通过后，提一个 MR 到 master，并且同时发一个 MR 到 develop 分支；
3. 合并两个 MR 后，master 可以打一个 tag 做标记；
4. 删除 hotfix 分支。

注意：hotfix 到 develop 分支可能会冲突，需要本地解决，然后提交到远程。

#### 遵循 commit 规范

1. 每个功能点或 bug 务必创建 issue，并在 feature , hotfix 中的 commit 信息中加上 issue 信息，比如：`git commit -m "feat: 支持新功能 #210"` 。
    - 相关的 MR 描述中，也可以关联 issue，比如 `closes #214, #215`，当合并 MR 时，可以自动关闭关联的 issue。

2. commit 信息尽量 `见名知意`，可遵循 [Google 的规范](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit)。

```sh
git commit -m "feat(schema): 支持枚举类型 #210"    <- 表明是属于 schema 模块的功能点
git commit -m "chore(style): 修复文字换行问题 #213" <- 表明是针对样式的修复
git commit -m "fix: closes #222"                 <- 表明是修复 #222 的一个 bug
git commit -m "refactor(activity): ..."          <- 表明是针对活动的一些重构
git commit -m "docs: 说明如何支持枚举类型"           <- 表明是文档相关的 commit
git commit -m "test: remove only"                <- 表明是修复测试用例的 commit
```

#### milestone

> milestone 分为项目及日常迭代。一个项目或迭代对应一个 milestone。

- 两位版本号为项目发布
- 三位版本号为日常小迭代和 bugfix 类的发布

#### issue

> issue 分为开发任务和非开发任务。

- 开发任务的 issue ，一般都已经明确目标
  - 命名格式：`[功能模块]功能描述` 功能模块表明这个 issue 是属于哪个模块。

- 非开发任务的 issue，比如：需求、讨论、方案、系分
  - 标题应保持一句话，尽量 `见名知意`，描述中可详细展开说明，适当附图，需要他人一起讨论的，可以 `cc @xx`。

- 每个 issue 看情况加上 labels，labels 类型（[示例](http://024028.oss-cn-hangzhou-zmf.aliyuncs.com/uploads/fengdie/fengdie-web/2483775ac8f9f7f113f3611cabe3ffbc/Snip20151016_29.png)）：

  - `BUG` 缺陷
  - `IMPROVEMENT` 功能优化点
  - `TODO` 待排需求，已明确功能，但还没排期开工
  - `需求` 待讨论的需求和议题
  - `文档` 包含使用说明、发布日志、项目系分，后续可以移入 wiki

---------

### 常用

> man 查看命令帮助文档。 例如：使用 man ascii 来查看 ASCII 表。

```sh
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
mtr
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
```

### 软/硬连接

连接有软连接和硬连接(hard link)之分的，软连接(symbolic link)又叫符号连接。
符号连接相当于Windows下的快捷方式。不可以对文件夹建立硬连接，我们通常用的还是软连接比较多。
（注意：软连接和mac上的制作替身不同）

```sh
# 格式
ln [option] source_file dist_file/dist_dir

#若权限不足加 sudo
ln -s source_file dist        # 建立软连接
ln -s ../source/*.bar .        # 建立软连接，在当前目录

# 在桌面生成软连接（快捷方式）
ln -s /Applications/Xcode.app/Contents/Developer/Applications/Simulator.app ~/Desktop
ln -sv ~/Library/Mobile\ Documents/com~apple~CloudDocs/ ~/iCloud\ Drive
# 或者加入到 zsh/bash 中
alias simulator='open /Applications/Xcode.app/Contents/Developer/Applications/Simulator.app'

ln source_file dist           # 建立硬连接
rm -rf symbolic_name    # 注意不是rm -rf symbolic_name/
```

软连接可以 跨文件系统，硬连接不可以。软连接可以对一个不存在的文件名进行连接。软连接可以对目录进行连接。
硬链接下修改源文件或者连接文件任何一个的时候，其他的文件都会做同步的修改。

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

---------

# linux 学习

安装 CentOS (min 版) 后，登录系统会显示 `localhost login:` 填入 root 、然后输入安装时设置的密码。

Unix 遵循的原则是 KISS (Keep it simple, stupid) do one thing and do it well。

Linux 分为内核版、发行版。比较常用的发行版有 redhat、ubuntu 等。服务器端大多使用 redhat\centos，没有图形界面，因为图形界面占用更多系统资源，造成不稳定，被攻击的可能性更大。

- Linux 严格区分大小写。
- Linux 所有内容以文件形式保存，包括硬件。如：键盘 /dev/stdin  显示器 /dev/stdout
- Linux 不靠扩展名区分文件类型，靠权限区分。（.gz .tgz .sh等文件扩展名只是为了方便管理员查看）

shell 是一个命令行解释器。shell 是壳，kernel 是内核。shell 把用户敲进去的命令、翻译为 linux 内核能识别的语言。
linux 下有些命令是 shell 自带的，有些命令是别人写好装进来的(如 ls )，用 whereis ls 来区别。

- sh : Bourne Shell 的缩写，可以说是目前所有 Shell 的祖先。
- bash : Bourne Again Shell 的缩写，是 sh 的一个进阶版本。

bash 是目前大多数 Linux 发行版和苹果的 Mac OS X 操作系统的默认 Shell。需要重点学习！
[bash-guide](https://github.com/Idnan/bash-guide)
[mac-shell 介绍](http://ntop001.github.io/2015/06/06/mac-shell/)、
[Zsh 和 Bash 的不同](https://xshell.net/shell/bash_zsh.html)，在 zsh 的 terminal 里运行 bash 脚本，可能有兼容问题，需要用 `emulate bash/sh` 切换为仿真模式。

```sh
echo $PATH  # 查看PATH环境变量
echo $SHELL
# 如果输出的是：csh或者是tcsh，那么你用的就是C Shell。
# 如果输出的是：bash，sh，zsh，那么你的用的可能就是Bourne Shell的一个变种。

NODE_ENV='PRODUCTION' gulp build   # 设置并运行
env / printenv JAVA_HOME  # 打印环境变量

>  >>  &>  &>>  2>&1  # 输出重定向
&> 文件    # 正确和错误的输出都保存到同一个文件中
> 文件 2>&1   # 正确和错误的输出都保存到同一个文件中
> 文件1 2>文件2  # 正确的输出放到文件1，错误的输出放到文件2

# 管道符：
;   # 几个命令并行执行，不管有无报错
&&   # 几个命令依次执行，报错就停止
||   # 前一条命令报错，后一条命令才会执行，否则不执行。 如：ls && echo yes || echo no
|   # 管道符，很重要

# shell 变量声明：
变量名=变量值 (等号前后不能有空格)
echo $变量名
# shell 变量叠加：
x=123
x="$x"456  (或 x=${x}456)
echo $x

$n $* $@ $#    # 位置参数变量
$? $$ $!   # 预定义变量

符号：单引号、双引号、反引号、$()、$、#、\
通配符、正则表达式 是不同的东西。正则是包含匹配，通配符是完全匹配。正则匹配文件内容字符串，通配符匹配文件名。
```

### 应用示例

```sh
#!/bin/sh
## 如果文件开头的 shebang 为 `#!/bin/bash` 会使用 bash 执行命令，而不管系统默认的 shell 是否为 bash。
## 如果你没有写 shebang，那么此脚本文件会被用户当前的 Shell 所执行。

node -v
npm -v
ping -c 5 taobao.com

echo "进行 xx 操作 \n\r" \
&& cd ~/my/work/project/xx \
&& spm build && spm deploy \

echo "进行 xx 操作 \n\r" \
&& cd ~/my/work/daily/project \
&& svn st  \

echo "登陆服务器，进行 ccupdate 操作" \
# 对引号进行转义
expect -c "spawn ssh admin@xx.net
expect \"password:\"
send \"password22\r\"
send \"cd ccbin && ./ccupdate.sh \n\"
interact "
```

---------

# Windows Dos

`.bat`是 dos 下的批处理文件。`.cmd`是nt内核命令行环境的另一种批处理文件。

cmd 里操作技巧：

- 鼠标选择需要复制的部分，右键选中则会自动复制。
- 拖拽文件 到命令提示符中，完整的文件路径也就输入了。

```sh
命令帮助 /? 例如：md /? ，for /?
常用命令: dir / copy

type [drive:][path]filename  # 读取文件

# 创建文件
echo ... > A.txt    # 重定向输出，此时创建文本文件 A.txt;
echo ... >> A.txt   # 向 A.txt 文件中追加信息...

# 删除文件
del [C:][path]filename.ext  
del *.txt # 采用通配符

# 创建 删除 目录
mkdir/md a\b\c  
rmdir/rd /q/s a (/q静默模式，不提示是否删除，可以不要)

@echo off
ping www.taobao.com
ipconfig
pause & exit

chcp 65001  # 换成UTF-8代码页
chcp 936 # 可以换回默认的GBK

# 环境变量
set  # 查看当前可用的所有环境变量（=系统变量+用户变量）
set PATH  # 查看某个环境变量，如PATH
set xxx=aa  # 添加环境变量，如xxx=aa
set PATH=%PATH%;d:\xxx  # 在某个环境变量（如PATH）后添加新的值（如d:\xxx）

# 有两个环境变量可以跟当前路径有关，一个是%cd%, 一个是%~dp0
echo %cd%  # %cd% 可用在 批处理文件中 或 命令行中，其内容为命令的执行路径或批处理文件的执行路径
%0  # 代指批处理文件自身  
%~d0   # 是指批处理所在的盘符  
%~dp0   # 是盘符加路径，只可以用在批处理文件中，由它所在的批处理文件的目录位置决定
cd %~dp0  # 进入批处理所在目录
```

---------

## vim

vim 是 vi 的增强版本。相比vi添加了显示颜色等功能。
![vim 键盘图](https://zos.alipayobjects.com/rmsportal/MOPJrAnojdFvAToZkESi.gif)

```sh
# 编辑模式
输入 i 再输入其他字符。 按 esc 退出，切回命令模式

# 命令模式
按：h j k space键 导航方向
ctrl-f  上翻一页
ctrl-b  下翻一页
^     跳至行首
$     跳至行尾
gg    跳至文件的第一行
G     到文件的最后一行

tail -n10 path/filename 查看文件最后10行

:w   保存
:wq  :x  shift zz 保存修改并退出
:q!  强制退出，放弃修改

u     撤销  
ctrl+r   重做（撤销一个撤销）
.     重复上一个编辑命令
>>     将当前行右移一个单位
<<     将当前行左移一个单位(一个tab符)
==     自动缩进当前行

/pattern     向后搜索字符串pattern  n继续搜索下一个  shift+n
?pattern     向前搜索字符串pattern  #继续搜索上一个
:s/vivian/sky/ 替换当前行第一个 vivian 为 sky
:s/vivian/sky/g 替换当前行所有 vivian 为 sky
:%s/source_pattern/target_pattern/g  全局替换

复制 粘贴（如果粘贴外部内容，在i模式下，直接cmd+v）
dd 删除光标所在行， dw 删除一个字(word) ，D 删除到行末
x 删除当前字符，  X 删除前一个字符
yy 复制一行，此命令前可跟数字，标识复制多行，如6yy，表示从当前行开始复制6行
yw 复制一个字 ， y$ 复制到行末
p 粘贴内容到当前行的下面 ，P 粘贴内容到当前行的上面

# visual模式

按 v 进入可视模式；移动光标键选定内容！w选择单词，y复制(或gy)，p粘贴，x删除，d删除后边

[vi编辑器使用color-scheme](http://alvinalexander.com/linux/vi-vim-editor-color-scheme-colorscheme)
cd /usr/share/vim/vim72/colors
ls -- 找出需要的color名字
然后 in a vi editor session 输入 :colo delek
```

---------

## Marp 示例

```html
<!-- page_number: true -->
<!-- footer: mobile.ant.design -->
<!-- prerender: true -->
![bg](https://zos.alipayobjects.com/rmsportal/casYcIzdKMnTUsvBLlnn.png)

## First page

---

## Second page

:+1: :smile: :smiley: :laughing:

<br><br>

- [emoji-cheat-sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet/)
- [Emoji Unicode Tables](http://www.unicode.org/emoji/charts/full-emoji-list.html)

<br><br><br>
```

## markdown 语法

- 标题 ( h1~h6 ) 格式为使用相应个数的 “#” 作前缀
- 行末加两个或多个空格才是真正的换行 br 标签。
- 空一行（两个回车）分段生成 p 标签
- 引用 ">" 记号直接借鉴邮件标准
- 使用 “-” “+” “*” 开头、来表示无序列表，使用 数字 + “.” 开头表示有序列表
- 使用 * 或 _ 包裹文本产生 strong 效果：__strong__ **strong**

- 使用 [test](http://example.net "optional title") 来标记普通链接。
- 使用 ![img](https://zos.alipayobjects.com/rmsportal/lcLKYXUWPbqkavfJbMGx.png "optional title") 来标记图片。可以使用相对路径。

![image.png | center | 100x100](https://gw.alipayobjects.com/zos/skylark/fde8686e-e453-4ea4-bbee-054fe00bdb1e/2018/png/c2d8456c-dd28-48a3-876d-1841b290f1e8.png)

| Item      |    Value | Qty  |
| :-------- | --------:| :--: |
| Computer  | 1600 USD |  5   |
| Phone     |   12 USD |  12  |

<details>
  <summary>Is this production ready?</summary>
  Next.js has been powering `https://zeit.co` since its inception.
</details>
<details>
  <summary>Is this production ready?</summary>
  Next.js has been powering `https://zeit.co` since its inception.
</details>

