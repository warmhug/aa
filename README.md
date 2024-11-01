---
layout: default
title: "日常学习记录"
show_title: false
permalink: /
---

> [GitHub](https://github.com/warmhug/aa)
> GitHub 登录 https://codesandbox.io/s/zpjo211yp  https://codepen.io/

https://www.ruanyifeng.com/blog/2024/05/weekly-issue-299.html  https://www.oschina.net/
https://www.36kr.com/hot-list/catalog  https://www.geekpark.net  https://sspai.com/
人人PD http://www.woshipm.com  https://www.yuque.com/iscott
电影 https://www.dy2018.com/  蜻蜓 https://www.qingting.fm/
https://www.smzdm.com/  https://www.xinli001.com  爱优腾 热榜 https://tophub.today/

https://fast.com/  https://flickr.com  https://apps.apple.com  https://music.apple.com
https://archive.org  https://duckduckgo.com  https://evernote.com
https://time.com/  https://nytimes.com  https://www.wsj.com/
https://www.feng.com/  https://www.ifeng.com/  https://www.tianyancha.com/
https://amazon.com  https://android.com  https://youtube.com
https://facebook.com  https://instagram.com  https://whatsapp.com
奇绩创坛 https://www.miracleplus.com/  https://news.miracleplus.com/


# AI


## 场景

https://chatgpt.com/  https://www.doubao.com/chat/  https://kimi.moonshot.cn
https://tongyi.aliyun.com/qianwen/  https://duckduckgo.com/?q=DuckDuckGo&ia=chat
https://www.meta.ai/  https://llama3.dev/  https://www.perplexity.ai/  https://chathub.gg/
https://beta.character.ai

代码生成 对话式 https://bolt.new/
代码生成 https://www.ancodeai.com/  https://github.com/abi/screenshot-to-code
网易-海豹D2C https://music.163.com/st/seal
字节 编程助手 https://www.marscode.com/ 海外 https://www.coze.com

antd机器人 Peter Cat https://mp.weixin.qq.com/s/PnHVc1_yBPu2HiA2En9cAg
智能客服 https://github.com/cs-lazy-tools/ChatGPT-On-CS
智能客服/知识库问答 https://github.com/1Panel-dev/MaxKB
音乐 https://lamucal.ai/
手机助手 https://github.com/Skythinker616/gpt-assistant-android
手机助手 https://github.com/X-PLUG/MobileAgent

## 使用

------ 2024-10~12


------ 2024-06~09

bash 查找 packages 目录下二级 目录里存在的所有 config.ts congfig.tsx config.js 和 config 目录，排除掉 node_modules 目录。不查找子路径。查找结果 存放到数组里。
```sh
result=($(find packages/*/src -maxdepth 1 -type f \( -name "config.ts" -o -name "config.tsx" -o -name "config.js" \) -not -path "*/node_modules/*" -o -type d -name "config" -not -path "*/node_modules/*"))
```

帮我写 Chrome 插件代码，实现这样的功能：选中一些标签页、把他们的 URL以有序数组形式 存储到 chrome storage 里、同时关闭这些标签页，通过 popup  页面的一个按钮、从数组里恢复打开标签页，并把这些标签页移动到其他已存在标签页的后边。

使用 html modal 元素写一个类似 bootstrap 的 modal 功能，抽象成 js 组件、把 css 注入进去。
把类改为使用函数写法。
防止多次调用时，多次生成样式和元素。
返回 打开 关闭 toggleModal 的函数。
把 openModalBtn 元素放到 js 里。
把 modal-content 和 close-btn 也放到 js 里去。

npm version 怎么自动升级 monorepo 的 子包依赖版本号
pnpm 只检查并保持 workspaces 内部包 的最新版本，写成 bash 脚本

bash 处理 git ls-remote --tags origin 和 git tag -l 获取到的字符串列表，并正则匹配到字符串里 refs/tags/ 之后的部分

Chrome Native Messaging 使用 bash 文件的 shebang 地址有问题，怎么让 /usr/local/bin 和 /usr/bin 都能互相调用


## 学习

https://github.com/luban-agi/Awesome-AIGC-Tutorials

AI算法和传统算法的区别在于：
1.学习能力：AI算法具有学习能力，可以根据经验和数据自我改进，而传统算法则需要人为指导。
2.处理复杂问题：AI算法可以处理复杂的问题，如图像识别、语音识别等，而传统算法则很难处理这样的问题。
3.通用性：AI算法具有通用性，可以应用于多个领域，而传统算法则只适用于特定领域。
4.计算复杂度：AI算法的计算复杂度较高，需要大量的计算资源，而传统算法则具有较低的计算复杂度。
传统算法是：输入数据和规则，产生结果。人工智能是：输入数据和结果，产生规则。
传统算法需要算法设计者的专业能力（数据结构+算法+经验），而人工智能需要的是大量的数据和计算力，进行规则的输出。
普通算法：一个操作流程，扔个输入数据进去，最后会输出个结果。写普通算法之前已经知道对应的问题是如何求解的。经常关注算法的正确性(或者近似性能)如何、效率如何。机器学习算法：不仅是操作流程，一般还会和一个模型以及一个优化目标函数关联，把模型的输入数据和模型的输出数据(训练数据集)都扔进去，最后得到模型的具体样子(模型参数)，或者说是数据的分布“规律”。用机器学习解决的问题往往事先不知道该如何找到最优解(模型的真实样子)，只能是通过大量数据来“猜测”一下。经常关注模型训练效率如何、模型质量如何。
传统算法以代码形式获取一些输入和一些逻辑，并为您提供输出。这些都是确定的没有预测成分。此输出取决于算法中描述的步骤（代码）。
人工智能算法同时接受输入和输出，并使用预测模式开发逻辑，当它基于该逻辑接收到新输入时，它将为您提供新输出。
2024-03 普通算法和AI算法区别

作为一个计算机专业相关的人员（程序猿），无论你从事什么方向（前端、后端、机器学习等），最最基础的就是对排序和查找的算法原理理解与实现。如果连这个还没有烂熟于心，随手就来的话，只能说明你的发展比较堪忧，因为这个是最最初级但也是显示该专业的最最扎实基础的部分，所以本人专门详细整理了十大排序算法及七大查找算法。
二分查找法的思想看上去非常简单，不过实现起来需要注意很多的细节。值得一提的是，二分查找的思想在 1946 年被 John Mauchly 提出，直至 1962 年，才出现了第一个没有 bug 的二分查找算法的实现，中间整整隔了 16 年 ：）。
2024-02-29

基于邻域的算法是推荐系统中最基本的算法，该算法不仅在学术界得到了深入研究，而且在 业界得到了广泛应用。基于邻域的算法分为两大类，一类是基于用户的协同过滤算法，另一类是基于物品的协同过滤算法。
基于用户的协同过滤算法是推荐系统中最古老的算法。可以不夸张地说，这个算法的诞生标 志了推荐系统的诞生。该算法在1992年被提出，并应用于邮件过滤系统，1994年被 GroupLens用于新闻过滤。在此之后直到2000年，该算法都是推荐系统领域最著名的算法。
2020-02-15《推荐系统实践》 项亮

推荐系统：[microsoft/recommenders](https://github.com/microsoft/recommenders)、[NicolasHug/Surprise](https://github.com/NicolasHug/Surprise)、[NirantK/awesome-project-ideas](https://github.com/NirantK/awesome-project-ideas)、[guoguibing/librec](https://github.com/guoguibing/librec)、[grahamjenson/list_of_recommender_systems](https://github.com/grahamjenson/list_of_recommender_systems)、[Magic-Bubble/RecommendSystemPractice](https://github.com/Magic-Bubble/RecommendSystemPractice)
[三步搭建基础分析框架](http://www.woshipm.com/data-analysis/821704.html)、Lookup表(维度表)和数据表(事实表)，一般是Lookup表在上,数据表在下。

学习路线：
https://blog.csdn.net/han_xiaoyang/article/details/50759472
https://developers.google.com/machine-learning/crash-course/
https://academy.microsoft.com/en-us/professional-program/tracks/artificial-intelligence/
https://cn.udacity.com/course/deep-learning--ud730
机器学习入门 https://zhuanlan.zhihu.com/p/24339995 、http://www.cnblogs.com/subconscious/p/4107357.html 、 https://github.com/memect/hao/blob/master/awesome/machine-learning-guide.md
深度学习 https://github.com/exacity/deeplearningbook-chinese
https://ai.googleblog.com 李飞飞TED https://www.youtube.com/watch?v=40riCqvRoMs   斯坦福 vision lab http://vision.stanford.edu/
SIFT算法详解 http://blog.csdn.net/zddblog/article/details/7521424
[Python Data Science Handbook](https://jakevdp.github.io/PythonDataScienceHandbook/)

百度大脑 http://ai.baidu.com/ 微软 https://azure.microsoft.com/en-us/services/cognitive-services/ 、阿里 PAI (数据采集，数据处理，特征工程，建模，预测服务) xNN、AliNN
蚂蚁：分布式学习和系统：智能客服；Parameter Server架构；美国组：自然语言处理；推荐营销；小助手；商业产品架构：金融类，量化理财因子发现，金融知识图谱；AI 平台部：达尔文测试系统；底层的GPU，FPGA开发调度系统阿尔卑斯。

------ 2019 以前

2019-11 https://magi.com/
2019-10 https://github.com/ownthink/KnowledgeGraphData / https://www.ownthink.com/

[我要做一个什么样的程序员](http://blog.csdn.net/skyflying2012/article/details/41790899)
[算法工程师](https://www.zhihu.com/question/23869208)：算法牛逼了就能进化到科学家，别的牛逼了只能是工程师。
2019-05

<无法理解高等数学怎么办> 知乎 https://www.zhihu.com/question/24066773/answer/80124451

自然语言处理（NLP）：常用算法 crf，hmm，gbdt 。自然语言理解是认知智能的核心，也是人工智能里最难的问题。自然语言理解的最大难点在于人类语言的多样性和歧义性。
两大经典难题——机器翻译&自动问答。词嵌入技术和神经网络语言模型这两种自然语言处理中常见的深度学习技术。
图像相关问题有深度学习、推荐相关问题有专门的推荐算法、安全相关问题有异常检测模型等。
https://nlp.stanford.edu/projects/glove/

当我们处理现实世界中的数据时， 数据并不会以格式规范的特征向量的形式呈现在我们面前。 相反，呈现给我们的数据是数据库记录、 协议缓冲区或其他任何形式。 我们必须从各种各样的数据源中提取数据， 然后再根据这些数据创建特征向量。 现在，从原始数据中提取特征的过程称为特征工程。 实践中，机器学习从业人员将大约75%的时间花在特征工程方面了； 特征就是我们要的东西。
https://developers.google.com/machine-learning/crash-course/representation/video-lecture

学习过程与推理过程是紧密相连的，学习中使用的推理方法称为学习策略。学习策略主要分为三大类型：搜索型策略（如状态空间法、A*算法、BP 算法）、构造型策略（如多层反馈神经网络的 FP 学习和综合算法）、规划型策略（如支持向量机）。依据这三大学习策略，又可细分为几种基本学习方法，分别是机械学习（记忆学习、只是最简单记录）、传授学习（指导式或指点学习）、演绎学习（演绎推理）、归纳学习（又分为实例学习、观察与发现学习）和类比学习。人类学习往往同时使用多种策略。
学习类型主要包括四种：监督学习（也称为监督训练或有教师学习，神经网络和决策树最常采用监督学习作为训练的技术）、无监督学习（类似于聚类）、半监督学习（利用标注样本和未标注样本进行训练和分类）、强化学习（使用学习激励函数，如棋类游戏通过强化学习一遍遍玩、最后会变得超越人类棋手）。
机器学习算法：人工神经网络、决策树、高斯过程、线性判别分析、K 近邻算法、支持向量机、最大期望（EM）算法、贝叶斯网络、马尔可夫随机域、流形机器学习、增强学习、多实例学习、ranking 学习、数据流学习、主成分分析（PCA）、独立成分分析（ICA）、聚类分析、覆盖算法、集成学习、马尔可夫链-蒙特卡罗方法。
这种从大量的函数结果和自变量反推回函数表达式的过程就是回归。v=gt 就是线性回归的方法。

机器学习：收敛 ROC 曲线 AUC 欠拟合 过拟合 (监督/非监督学习  聚类 随机森林 KNN SVM )
神经元 (线性 非线性 多维 线代 牛顿法 偏导数 微积分 梯度下降，激励函数Softmax和Sigmoid，损失函数 交叉熵 MSE 最小平方差)  bp网络  CNN (卷积 池化 LeNet5 )  RNN (LSTM) GAN (图片生成)
2017《白话深度学习与Tensorflow》
八皇后问题，标准差，加权均值，众数 中位数，欧氏距离，曼哈顿距离，同比和环比，抽样，高斯分布，泊松分布，伯努利分布，信息论，香农公式，信息熵，向量和维度，矩阵，上卷和下钻，线性回归，拟合，残差分析 最小二乘法，过拟合 欠拟合，聚类 k-means算法，孤立点，余弦相似度，朴素贝叶斯，决策树，随机森林，隐马尔可夫模型，前向算法，svm，遗传算法，apriori算法，支持度和置信度，k近邻算法，ANN，
2017《白话大数据与机器学习》

数据类型：定量的「区间（日历日期、温度）、比率（质量、长度、计数）」或定性的「标称（邮编、雇员ID、性别）、序数（矿石硬度、街道号码）」。定性和定量之间的差别，是数据值之间是否有比值和联系。
数据集可以看做「数据对象」的集合，数据对象也叫记录、点、向量、模式、事件、案例、样本、观测或实体。数据对象用一组刻画对象基本特性（如物体质量或事件发生时间）的「属性」描述，属性也叫做变量、特性、字段、特征或维。
数据集的一般特性：维度、稀疏性、分辨率。
数据质量：数据挖掘要对数据质量问题检测和纠正（数据清理），使用可以容忍低质量数据的算法。
测量和收集方面的数据质量问题：测量误差问题有噪声、伪像、偏倚、精度和准确率。数据质量问题：离群点、遗漏、不一致的值、重复数据、数据时效性和相关性。
完全消除噪声是困难的，所以关注「鲁棒算法」即在噪声干扰下也能产生可以接受的结果。
理想情况下，数据集附有描述数据的文档，文档的质量好坏决定它是支持还是干扰其后的分析。
数据预处理：技术：聚集、抽样、维规约、特征子集选择、特征创建、离散化和二元化、变量变换。
数据预处理的一个重要动机就是减少维度，称为「维规约」(降维)。随着数据维度增加，数据在它所占据的空间中越来越稀疏，这意味着没有足够的数据对象来创建模型。
维规约的一些最常见方法是使用线性代数技术，将数据由高维空间投影到低纬空间，例如主成分分析（PCA）、奇异值分解（SVD）技术。
根据数据联系分析数据：相似性和相异性的度量。两个对象之间的邻近度是两个对象对应属性之间的邻近度函数。这包括相关和欧几里得距离度量，以及 Jaccard 和余弦相似性度量。
{poor, fair, ok, good, wonderful} 产品质量
2016-11-02《数据挖掘导论》 范明 范宏建 译

语音识别的基本原理：语音输入→预处理→特征提取→训练→模式库→模式识别→语音识别结果
在人工智能和智能系统的研究过程中，人们已开发出许多专用和通用的程序设计语言。大多数人工智能系统都采用 PROLOG 和 LISP 语言。
2015-03-08《人工智能基础》










#
#
# FE suffer


## 2024-07~09 组件 pro-components

### 流水线(pipeline/ci/cd)

问题：现在的方案、针对“单包/单项目”的开发，没有考虑到这种大型联合开发的场景，另外在功能的扩展性和产品细节等方面、存在不少优化空间。
需求：解决 monorepo 组件开发，对每个子包 有统一规范并需要强制Check的 情况。

流水线问题
- 自定义问题
  - 不能像是 GitHub action 一样，能完全自定义流水线。不支持自动生成 PR 供合并。
  - 默认运行 npm i，没考虑 pnpm 等工具，node 版本可选的少。
- 比如公共的 release / test 分支是由 feat1 2 3 合并而成，但流水线里没有提供 合并进来 分支名 信息。
  - 需求：在 feature 分支合并到 release 时，在 release 流水线里 想拦截检查 feature 分支是否规范：比如 commit message 规范性，是否 rebase 过 master，是否 commit 数量过多，是否修改了被保护的代码 等。
  - 现状：只能在 feature 分支流水线里检查，可以设置卡点 当 feature 流水线运行失败、则不能合并到 release 或 test 分支。
  - 问题：feature 分支代码是一周前的、一周前 feature 流水线运行结果也是成功的，这一周里 master 分支已经有很多新提交、但 feature 也没有跟 master 产生冲突、所以会自动和 master 代码合并起来生成 release 分支。但此时的 feature 分支没有 rebase 过最新的 master 不符合预期的规范。
  - 解法：一是在合并到 release 时，feature 流水线先自动运行一遍。更好的是在 release 流水线里提供合并进来的各个 feature 分支名、自定义脚本 检查这些 feature 分支是否都符合预期的要求。
- 使用 lerna 时、需要人工 配置模板，迁移或新建项目 不了解这个。
- 内置的 扫描过时风险依赖、安全检查 等任务不支持 loglevel 设置，影响查日志效率。
  - 不支持 内置任务 与 用户任务 的 log 文件拆分。
  - 成功时就提示个成功 就行、失败了再显示具体日志，不要一直都是显示一大堆。
  - 或者能 支持统一或单独配置 loglevel (silly verbose silent)。
  - 自定义的关键 log 信息，全被其他无用的 log 淹没了。协作同学、对这个流水线不熟悉，根本看不懂哪里是对的 哪里是错的。
- 不支持给 gitlab 打 annotated tags, 不支持 灵活调用 打 tag 的脚本。
  - 容器内不注入git的ssh key 。拉代码容器的key不会暴露给其他容器。
- 推送代码和权限
  - 安全要求、不能推送代码到 gitlab，也不支持在 feature 流水线里 推代码。
  - 使用者对 gitlab 代码只有 读权限、没有 写权限。

项管平台 brok 问题
- 各 feature 分支合并代码到 test 或 release，不支持检测是否 rebase 和 squash 代码。
- release 构建或发布成功的节点，不支持配置 通知人和群。
- 某个服务只能在某个brok项目使用。
- 右上角新建按钮、只能建项目 不能建任务直接，希望能基于 已有的项目、直接能 新建任务。
- [已解决] packman节点在 feature 流水线的 NPM_TAG 环境变量不支持设置。

流水线运行 lerna publish 问题
- lerna ERR! ENOGIT Detached git HEAD
  - 使用 `git checkout $PACKMAN_PUBLISH_BRANCH` 重新 tach 上
  - 如果没有 git ssh key 则没有对 remote 的操作权限，需要加上 `--no-push --no-git-tag-version` 参数，不然会报错。
  - [参考](https://github.com/lerna/lerna/issues/2443)
- lerna ERR! EUNCOMMIT Working tree has uncommitted changes
  - 如果是 M pnpm-lock.yaml 则确保开发阶段使用的 pnpm 版本一致
  - 如果是其他文件，使用 from-git 或 git commit https://github.com/lerna/lerna/issues/1591


### lerna

[lerna commands](https://lerna.js.org/docs/api-reference/commands)
[lerna实践](https://warmhug.github.io/2024/08/06/lerna-usage.html)
lerna version 命令除了能 自动升级版本号，还能 自动生成 changelog 文档，自动给 gitlab 打 tag。

更新 “有变更的包” 自身版本号 & 依赖的其他子包的版本号，修改 package.json 文件

```js
/**
利用 lerna exec + npm version 命令:
能升级每个包本身的 version 但其 dependencies 的 version 需要额外处理。
可以使用 pnpm up 命令，但升级后的 包的版本号为 "@afe/pro-form": "workspace:0.1.3" 类似这样，
需要 lerna/npm publish 命令再次处理。

await Promise.all(versionInfo.map(async ({ name, newVersion }) => {
  return await exec('node',[
    [lernaCli], 'exec', '--scope', name, '--', `pnpm version ${newVersion} --workspaces=false --no-git-tag-version --allow-same-version=true`
  ], { shell: false });
}));
*/

/**
// lerna version 只能根据当前文件的版本号升级，当前文件可能版本老旧
const lernaArgs = () => [
  '--message', `chore(release): auto version latest`, '--no-push',
  '--loglevel', 'silly', '--no-commit-hooks', '--yes',
  '--include-merged-tags', '--exact',
];
await exec('node',[
    [lernaCli], 'version', 'prerelease', '--preid', npmTag, ...lernaArgs(),
    '--git-tag-command', `git tag -a %s -f -m 流水线打标签%s`,
  ],
  { shell: false },
);

// 流水线提供的能直接打 tag 并推送到 gitlab 上的工具， 但 不建议业务使用
const proj = 'fe/pro-components';
await exec('./gitw', [
  '--company', 'xxx', '--option', 'tag', '--repo', proj, '--tag', tagName,
  '--branch', PACKMAN_PUBLISH_BRANCH,
]);
const gitwTag = `./gitw --company xxx --option tag --repo ${proj} --tag %s --branch ${PACKMAN_PUBLISH_BRANCH}`;
await exec('node',[
  [lernaCli], 'version', 'patch', ...lernaArgs(), '--conventional-commits',
  '--git-tag-command', gitwTag,
  ],
  { shell: false },
);
*/
```


总结
- lerna 子包之间互相依赖
  - 配置文件 lerna.json 的 `"version": "independent"` 模式，不强制同步所有子包的版本:比如 A子包依赖B子包 B没有更新 A有更新，A子包的 package.json 不会修改 它依赖的B子包的版本号。
  - 利用了 pnpm 的 `--link-workspace-packages=true` 设置，比如 A子包依赖B子包 B子包本地版本号为1.1.1(npm上不存在此版本号) 如果A子包dep里的B子包版本号也写死为1.1.1，则B子包如果有变更、使用 `lerna changed` 就会显示 B A 子包都会有变化，默认都会升级版本号。
  - 在 lerna publish / version / changed 设置 `--include-merged-tags` 会检测 master 外的其他分支发布的 release tags。公司通常为 feature / test / pre-release / release 研发模式、在分支上发布很常见，建议加上。
  - 在 lerna publish / version / changed 设置 `--scope` 不起作用 https://github.com/lerna/lerna/issues/1556
  - 子包怎么更新自身依赖 https://github.com/lerna/lerna/issues/2142
- lerna 根据什么检测变更
  - 如果你的项目使用了规范化的提交信息（例如，使用 commitizen 和 cz-lerna-changelog），Lerna 可以更准确地检测变更，因为它会根据提交信息中的标签来识别影响的包。
  - `lerna ls --since master` [since文档](https://lerna.js.org/docs/api-reference/commands#--since-ref) changed 不支持 since 参数
  - 如果 lerna publish 失败，使用 lerna publish from-git 重新发布，不用改版本号。
  - [lerna 发包原理浅析](https://zhuanlan.zhihu.com/p/392438222) lerna changed 判断如果没有 tag，则认为全部的包都需要发布。
- lerna 仅支持 git annotated tags:
  - [tag问题](https://juejin.cn/post/7114538970339344420)
  - 如果 lerna publish 打 tag 的 commit 被 squash，但 tag 仍然存在，会导致 lerna changed 检测错误。 pro-components commit/f3900b2e89dda3186223fbd09330d8306dd46576
  - https://lerna.js.org/docs/troubleshooting#publish-command
  - https://github.com/lerna/lerna/issues/1357#issuecomment-438162152
  - 如果是 annotated 使用 git show tag_name 会看到包含 tagger 标记
  - 或者使用 git tag -v tag_name 不出现 error: cannot verify a non-tag object
- lerna version 不支持 dry-run、lerna lite 支持 https://github.com/lerna/lerna/issues/51#issuecomment-2293358836



### 版本问题

确保依赖版本始终同步的一种常用方法是，在 package.json 中为工作区包的依赖项指定严格的版本号，而不是 ^ 或 ~ 这样的语义版本号范围。这样做可以避免依赖更新时出现的意外问题。

lockfile 出现合并冲突，主流的包管理工具都支持运行依赖安装命令（npm install/yarn/pnpm install）来自动解决冲突。
在 主分支 上合入 开发分支（git merge feat-branch），theirs 指的就是开发分支，ours 指的是主分支，如果两个分支同时更新同一模块的版本号、对 lockfile 进行合并的策略:
- npm：深合并，并以当前分支（ ours ）的为准
- yarn：浅合并，并以目标分支（theirs）的为准
- pnpm：深合并，以版本号大的为准 (认为 新版本出现的问题会比旧版本更少)
  - 关注直接依赖 搜素 specifiers 的版本变更，对于直接依赖引入的间接依赖，自动升级出错的概率较小（一旦出错影响的不只一个项目），且 review 成本太高，选择信任社区。
  - 支持在每个分支中生成锁文件 https://github.com/pnpm/pnpm/pull/4475 。
  - [@types/react 18.3.5 bug](https://github.com/DefinitelyTyped/DefinitelyTyped/discussions/70418) 在 package.json 设置 resolutions 锁定版本。

对于应用项目来说，可以直接使用固定版本；但是对于类库项目，不推荐固定版本，有以下原因：
- 依赖该类库的应用项目无法充分复用依赖：比如 ^1.0.0 和 ^1.1.0 可以合并成 ^1.1.0）
- 类库项目的间接依赖出现安全漏洞时，无法通过重新安装依赖直接修复
- 锁定直接依赖的版本也不完全有效，丢失 lock 后，直接依赖的间接依赖还是会进行升级，进而导致 BREAKING CHANGE
- 锁版本 就得信任其他依赖不会出现问题（听天由命）
- 尽量由开发流程保证，有冲突就复测，并做好充足的人工 review

在开发一个 npm包 时，你的 npm包 是需要被其他仓库依赖的，由于扁平安装机制，如果你锁定了依赖包版本，你的依赖包就不能和其他依赖包共享同一 semver 范围内的依赖包，这样会造成不必要的冗余。所以我们不应该把package-lock.json 文件发布出去（ npm 默认也不会把 package-lock.json 文件发布出去）。

npm 包的主版本号为 0 时，会被认为是一个不稳定版本，主版本号和次版本号都为 0: ^0.0.z、~0.0.z 都被当作固定版本，主版本号为 0: ^0.y.z 表现和 ~0.y.z 相同，只保持修订号为最新版本。
1.0.0 的版本号用于界定公共 API，对外部发布一个正式版本的npm包时，把它的版本标为1.0.0。

pre-release 预发布版本号的排序规则是：
不同预发布版本类型之间 alpha < beta < rc < release（即稳定版本，没有预发布标识符）。
同一预发布版本类型下，数字越大，版本越新，例如 1.0.0-alpha.1 < 1.0.0-alpha.2。
比如 rc-0..n > beta-0..n > alpha-2..


### git 冲突

Git 合并出现冲突的原因在于 两个分支版本对一个文件的同一区域 做了修改。
如果是不同区域，Git 会尝试自动合并（auto-merge，默认策略）解决冲突。

自动合并规则 (比如对 配置文件A(.npmrc) 的第12行 做修改):
> origin 和 origin1 是只有 .npmrc 等配置文件 有差异的 两个代码库 (用于部署到不同环境)，除了配置文件外 其他文件内容相同。
- origin/master 文件A 的第3行 后只有 2行 内容。
- origin1/master 文件A 的第3行 后有 5行 内容，并和 origin/master 文件A 的 后2行 内容完全不同。
- 当前在 origin/master 分支，需要合并 origin1/master 分支，运行 `git merge -X ours origin1/master --no-commit` 后 自动解决了冲突。
- 此时合并结果为：前两行(相同) + origin1文件A后5行 + origin文件A的第三行(有改动)和后2行。会发现 origin文件A后2行 不是想要的内容。

由此看来 git 自动合并冲突的方法是“不安全”的。

```sh
# 操作 https://stackoverflow.com/a/930495/2190503
git stash push lock.yaml  # 暂存 lock 文件，使用当前 lock 文件
git checkout --ours "*lock*" # 使用 当前或目标(--theirs) 的 lock 文件
# 在 .gitattributes 文件里配置 当 pnpm-lock.yaml 出现冲突时，将以当前分支为准
pnpm-lock.yaml merge=ours
```

### 业务配置

[plugin 和 tree-shaking](https://github.com/ant-design/ant-design/issues/23988)

### iframe 内页面操作父页面dom (不同域名)

问题：文档网站域名是 https://pro.xx.net 使用 iframe 引用了 https://cdn.xx.com/dist/index.html 这个放在cdn上的静态html页面（css/js也是放在cdn上）也就是文档的实际内容。
页面里的链接需要改变 URL 的 hash 地址，但这两个域名 完全不同、无法直接改变 pro.xx.net 这个 URL 的参数。几种方案:
- [window.postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage)
  - 注意收发消息的时机，比如需要等页面 onload
- [html proxy](https://juejin.cn/post/7174065483014995981) 会有 csp 等问题，不建议使用。
- 微前端 更复杂的方案。

跨域和同源政策:
> https://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html
- 同源: 协议、域名、端口都要相同；如果不同源，则 dom 和 storage 无法读取、Ajax 不能发送。
- 使用 document.domain (已被废弃)，要求“一级域名”必须要一样、否则不行，设置后端口变为null。
  - 能规避同源政策，两个网页可以共享Cookie、能够**互相获取和操作**对方的 dom 元素。
  - 但是 LocalStorage 和 IndexDB 无法通过这种方法共享。
- 设置 cors headers 解决的是 Ajax 问题，不能解决跨域 iframe 和父页面之间 dom 操作问题。

```js
// dumi 设置为 history: { type: 'hash' } 模式, 应用内链接改变 URL 的 hash:
// 但不会触发 window 自己绑定的 hashchange 事件, dumi 提供的 钩子函数 onRouteChange 会被触发, 为什么?
window.addEventListener('hashchange', (evt) => {
  console.log('evt ifr: ', evt.newURL, evt.oldURL, location.hash);
});
```

### antd

antd5 [发布日志](https://www.yuque.com/ant-design/ant-design/cy5nfvdo8oidvwmz)
- less到cssvar和design-token，不需要按需加载插件，使用day.js
- [releases/tag/5.0.0](https://github.com/ant-design/ant-design/releases/tag/5.0.0)
- [迁移 less 到 cssinjs](https://ant-design.github.io/antd-style/zh-CN/guide/migrate-less-codemod)

antd4 [发布日志](https://github.com/ant-design/ant-design/issues/21656)
- 暗色主题 无边框组件 图标按需加载 form/table重做 内置虚拟滚动
- [antd 3.x-stable](https://github.com/ant-design/ant-design/tree/3.x-stable)

### less/css

[less Playground](https://lesscss.org/less-preview)
[analyze-css](https://www.projectwallace.com/analyze-css)
```less
// dumi dark theme
@dark-selector: ~[data-prefers-color="dark"];
.some-container {
  color: #fff;
  @{dark-selector} & {
    color: #000;
  }
}
```

### pnpm i 报错

pnpm install 时 esbuild 报错

```sh
.../esbuild@0.21.5/node_modules/esbuild postinstall$ node install.js
xxx/node_modules/.pnpm/esbuild@0.21.5/node_modules/esbuild/install
throw new Error(`Expected ${JSON.stringify(versionFromPackageJSON)}
Error: Expected "0.21.5" but got "0.23.1"
at xxx/node_modules/.pnpm/esbuild@0.21.5/node_modules/esbuild
Node.js v18.20.4
node_modules/.pnpm/node-sass@4.14.1/node_modules/node-sass: Running install script...
ELIFECYCLE Command failed with exit code 1.
```

在 package.json 里对 esbuild 包设置 pnpm resolutions/overrides 都没用 https://github.com/evanw/esbuild/issues/3800 ，
发现 k.j 源的包信息、缺少了 `optionalDependencies` 部分 (原因猜测是 esbuild 这一个版本号有问题 修复后覆盖发包 而不是正常的升级版本号)，实际原因是 k.j 源“限制了字段长度”，把 optionalDependencies 字段删除了。负责的同学去掉了这个限制、这个问题被解决。但又出现以下新的报错:

```sh
.../node_modules/node-sass postinstall$ node scripts/build.js
node_modules/.pnpm/node-gyp@3.8
gyp ERR! configure error
gyp ERR! stack Error: Command failed: /usr/local/bin/python3.10 -c import sys; print "&s.%s.&s"
gyp ERR! cwd .../node_modules/.pnpm/node-sass@4.14.1/
gyp ERR! node -v v18.20.4
gyp ERR! node-gyp -v 3.8.0
gyp ERR! not ok
Build failed with error code: 1
```

这个错跟 [node-sass](https://www.npmjs.com/package/node-sass/v/8.0.0) 有关:
sass-loader需要用node-gyp构建，node18需要最低node-sass 8.0 版本。

在项目根目录使用 `npm ls node-sass` 查到 `style-loader@2.0.0 -> sass-loader@8.0.2 -> node-sass@4.14.1` 即 style-loader 依赖的依赖 含有 node-sass 4 版本，和 node18 环境不搭配。

解决方法: 在 package.json 里对 node-sass 包设置 resolutions/overrides 为固定的 `node-sass@8.x` 。

另外解决方法: 在 install 时 ignore-scripts 绕过，但这个方法无法在 npmrc 文件里做配置。

```sh
pnpm i --ignore-scripts esbuild@0.21.4
pnpm i --ignore-scripts node-sass@4.14.1
```


### 打包构建

- dumi 设置非根目录 [publicPath](https://github.com/umijs/dumi/issues/849)

- father 4 打包成 umd 产物时，lessLoader 设置 `math: 'always'` 配置项 https://github.com/umijs/father/issues/514#issuecomment-2222842879
  - [webpack chain 用法](https://juejin.cn/post/6947851867422621733)
- [father 2.x](https://github.com/umijs/father/tree/v2.9.0) 基于 [rollupjs](https://rollupjs.org/) 构建，采用 babel插件 编译 js/ts、采用 [rollup-plugin-postcss](https://github.com/egoist/rollup-plugin-postcss) 编译 less/css (不支持less配置项)。利用 [docz](https://www.docz.site/) 生成网站。
- [postcss](https://github.com/postcss/postcss): 处在 css 预处理器 less scss 等流程之后，解析 css 为 ast，并有 Autoprefixer 等知名插件。

- antd-style 只能和 antd@5 配合使用 https://github.com/ant-design/antd-style/issues/156

[rollup，vite以及webpack比较与介绍](https://juejin.cn/post/7097493230572273700)
- rollup 与 webpack 都是基于JavaScript依赖系统的一个打包构建工具，他们的共同点很多。 Rollup 默认打包为 ES6 格式、依靠插件生成 CommonJS 和 AMD 代码，静态分析代码中的 import 并排除任何未实际使用的代码。 Rollup 构建速度明显快于 webpack，生成的代码量很小。
- 不过在应用开发层面讲，如果开发一个Web应用webpack要比rollup有更大的优势，因为其天然继承了devServer以及hmr，这使得开发者可以快速的对应用进行调试开发。 Rollup 更加适合插件开发，而webpack更加适合应用开发。
- vite 号称是下一代的打包构建工具，主要体现在他从开发环境到生产环境的构建速度都能比webpack提升很多倍，原因就在于基于 rollup 和 esbuild 两个基础构建工具上。利用浏览器对ESM模块的支持，通过babel解决兼容性。将应用中的模块区分为 依赖 和 源码 两类，Vite使用esbuild预构建依赖、构建速度快 10-100 倍。在浏览器请求源码时、根据 router 按需以 原生 ESM方式提供 源码。利用 HTTP 头来加速整个页面的重新加载，源码模块的请求会根据 304 Not Modified 进行协商缓存，而依赖模块请求则会通过 Cache-Control: max-age=31536000,immutable 进行强缓存，因此一旦被缓存它们将不需要再次请求。
- esbuild 使用 go 编写，发挥多线程多核优势，不使用 AST。所以一些通过 AST 处理代码的 babel插件没有很好的方法过渡到 esbuild 中。


## 2024-06 pintu

体验问题: avi 对图的大小限制、下载大图时进度提示、重复点击和并发问题、下载低质量(宽高和分辨率不变)图片。

设计稿 设计倍率:
[摹客](https://help.mockplus.cn/p/504) 插件，可以自动匹配特定的尺寸为 2x 倍率、其他尺寸为 1x 倍率，可以手动修改指定。[摹客demo](https://app.mockplus.cn/app/z1pw7JNhn/develop/design/mmHsUz9q0)
蓝湖 待调研。

相关:
- [蓝湖](https://lanhuapp.com/)、[摹客](https://www.mockplus.cn/)、[moonvy](https://moonvy.com/)
- [缩小png](https://tinypng.com/) [changeDPI](https://github.com/shutterstock/changeDPI)

### sketch 插件

https://developer.sketch.com/plugins
[Sketch 插件开发实践](https://segmentfault.com/a/1190000020920371)

Sketch 和 Figma 插件都不支持 XMLHttpRequest 导致上传图片时 无法监听上传进度
fetch 只能监听下载进度 https://juejin.cn/post/7253969759191023675
https://forum.figma.com/t/cannot-make-a-post-request-in-figma-plugin/25039

[skpm](https://github.com/skpm/skpm) 通过 polyfill 方式支持 fetch FormData 如下代码
https://github.com/skpm/skpm/blob/master/packages/builder/src/utils/webpackConfig.js
```js
new webpack.ProvidePlugin({
   fetch: require.resolve('sketch-polyfill-fetch'),
   FormData: require.resolve('sketch-polyfill-fetch/lib/form-data'),
   Promise: require.resolve('@skpm/promise'),
}),
```

浏览器/node等环境的 宿主 判断如下，但 sketch 插件的宿主跟这些都不同
```js
// https://github.com/ladjs/superagent/blob/master/src/client.js
let root;
if (typeof window !== 'undefined') {
  // Browser window
  root = window;
} else if (typeof self === 'undefined') {
  // Other environments
  console.warn('Using browser-only version of superagent in non-browser environment');
  root = this;
} else {
  // Web Worker
  root = self;
}
```

### WebGL 图像查看器

能支持超大图 不卡顿。 https://www.photopea.com/ (Facebook [私信](https://www.facebook.com/photopea))

- [sketch demo](https://www.sketch.com/s/a00a5b36-d81a-4a55-8e78-ffac2894d292)
- [figma demo](https://www.figma.com/design/dknmxVeJpnOq5aD0K9WvUa/test?node-id=0-1&t=qfDYyfOJPjQe4SDo-0)

figma 不支持插入 大于 4096px 的图片，会被裁剪和降低清晰度，参考[文档](https://help.figma.com/hc/en-us/articles/360040028034-Add-images-and-videos-to-design-files)。

canvas 模糊问题：
[antialiasing](https://stackoverflow.com/questions/17861447/html5-canvas-drawimage-how-to-apply-antialiasing)
[canvas-blur](https://medium.com/wdstack/fixing-html5-2d-canvas-blur-8ebe27db07da)
[lines-are-blurry](https://stackoverflow.com/questions/8696631/canvas-drawings-like-lines-are-blurry)
[canvas drawimage blurry](https://stackoverflow.com/questions/31910043/html5-canvas-drawimage-draws-image-blurry)
[higher-dpi-graphics-with-html5-canvas](https://stackoverflow.com/questions/14488849/higher-dpi-graphics-with-html5-canvas)
[sketch points-vs-pixels](https://www.sketch.com/support/sketch-features/mac-app/points-vs-pixels/)
[Optimizing_canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas)

查看支持度: chrome://gpu  chrome://settings/system (图形加速)  https://get.webgl.org/
注意：
- 如果电脑只有一个显卡，比如 mac mini（m系列芯片）、Windows台式机、部分低配笔记本电脑，需要在 Chrome 浏览器设置里开启“图形加速”功能。
- Chrome 图形加速开启方法：手动打开“设置-系统”、或在浏览器地址栏输入`chrome://settings/system`，勾选“使用图形加速功能”，重启浏览器。
- Intel 电脑一般都有双显卡。
- 外接显示器没有GPU。因此，图形渲染由主 CPU 完成。
- 开启图形加速，可能使 Chrome cpu 占用一直高于 100%、风扇噪音大。

参考
- https://webglfundamentals.org/webgl/lessons/webgl-image-processing.html
- https://webglfundamentals.org/webgl/lessons/webgl-2d-scale.html
- https://webgl2fundamentals.org/webgl/lessons/webgl-cross-platform-issues.html
- https://elhigu.github.io/canvas-image-tiles/
- https://fengyuanchen.github.io/cropperjs/
- https://pettor.github.io/app-pixi-image-editor
- https://github.com/pixijs/pixijs/issues/6372
- https://css-tricks.com/building-an-images-gallery-using-pixijs-and-webgl/
- https://github.com/openseadragon/openseadragon

- canvas engines 性能测试 https://benchmarks.slaylines.io/webgl.html
- WebGL vs WebGPU https://www.infoq.cn/article/QwAwharqAwdrAgtCoXQv
- 360 viewer https://github.com/y-fujii/zuho
- 360 viewer https://github.com/Experience-Monks/360-image-viewer
- 医学图像查看 https://github.com/niivue/niivue
- https://www.wenjiangs.com/docs/webgl-docs-zh
- https://stackoverflow.com/questions/21603350/is-there-any-reason-for-using-webgl-instead-of-2d-canvas-for-2d-games-apps
- https://gamedev.stackexchange.com/questions/7927/should-i-use-textures-not-sized-to-a-power-of-2

不是 webgl 实现的 https://github.com/konvajs/konva


## 2023

代码写的要优美(卷)：分块用class类、赋值用lodash set。

代码坑：代码目录结构层级深。公共组件或公共状态复杂且难找。未用到的代码没删除，后期涉及到改动也不敢轻易删。

代码以前正常、现在不正常，如果前端没有改动，那就是后端数据变更导致。比如 布尔 判断这种情况、前端这么写：
`obj.id ? update() : create()`; 后端的 id 数据变更后存在 number 0 时，前端代码逻辑即出错。这就是 js 的弱类型导致的问题。

tailwindcss 的 text-danger 等 className 使用。


## 2022-01~04

arm aem 对任何请求（包括图片）都做埋点，导致业务接口被阻塞，页面性能下降一倍。采用合并、延迟上报埋点方式，把所有打点请求都延迟推入单独的队列维护，当页面完全加载完成后再从队列中依次取出数据进行上报。下掉非必要埋点。

- 一个组件里 点击触发请求、返回成功或失败，设置 isSuccess 的布尔值。另一个组件 需要监听 成功和重新点击 的状态，即 重新点击 isSuccess 不能为 true，但上次点击后 已经把它设置为了 true 怎么解决？
- useEffect 里监听的 多个状态、互相有影响，怎么解决？分别写 useEffect。
- antd 多层弹窗嵌套需要设置 [getPopupContainer](https://img.alicdn.com/imgextra/i3/O1CN01uK3oLs1dJyW9Y1sZJ_!!6000000003716-0-tps-1234-1166.jpg)

react-big-calendar 日历组件支持自定义的 EventWrapper 子组件，业务场景中 EventWrapper 组件需要根据某个业务 prop 调用接口获取数据。但 EventWrapper 可能会被 react-big-calendar 加载卸载或重复渲染很多次(次数不可控)，而只用在“第一次加载或卸载再加载”时调用接口一次即可。此时 useEffect 的监听 该怎么写？

```js
// EventWrapper 组件
const { param1, param2, mode } = props;
useEffect(() => {
  if (mode === 'a') {
    fetchData({ param1, param2 })
  }
  // 怎么确保只请求一次，同时监听 prop 变化？
}, []);
```


## 2021-08 使用 remaxjs 开发小程序
- 导入函数不能这样 `import _ from 'lodash';` 而要这样 `import groupBy from 'lodash/groupBy';` (踩坑0.5h+)，遇到这类错误无法定位、调试困难。
- 样式：单位要 x2、box-sizing 要设置到相应位置，伪元素无法定位。
- 元素：span 标签有嵌套时不起作用、样式不正确，i 标签等更多 html 标签不支持。
- 组件：
   - 功能不强：Picker 不支持两列，Tabs 功能和样式不好用，类似pc上 tooltip 的 Tips 组件位置难设置，有些组件 slot 必须要用 View 不灵活。
   - 封装不完善，FlexItem 不支持设置 className、没有 Row Col 等便捷组件。
- 图表组件 g2 不起作用，antd、react-dom 等引用内容要移除。
- 迁移额外成本：很多地方都要修改，架构调整(找到pc各模块代码、删减/重新组织)。
- 小程序：picker 和 optionsSelect 的使用场景区别？mobile table design patterns 用列表代替表格。


## 2021 navigator.geolocation

> gts周日报需求，需要定位功能。

定位技术：GPS定位技术、基站定位技术、利用Wifi在小范围内定位。
GPS定位搜索卫星初次定位时间过长而略显不便。另外，卫星信号覆盖不好时，比如室内，会导致无法定位。
手机定位的原理 https://www.sohu.com/a/76257016_335896

问题：
2021-09 Chrome 浏览器在 4G 热点和家里 WiFi 环境下，不会执行 getCurrentPosition 公司 WiFi 可以。网络翻墙问题。
如图 https://gw.alicdn.com/imgextra/i4/O1CN01c6wdMl1OuPlbjec3c_!!6000000001765-2-tps-1112-518.png
最优方案、使用 高德或百度 封装的定位功能，避开 googleapis 被墙的问题。

2012-01 三星gt-i9003(安卓2.3.5)、中兴ZTE-U880(安卓2.2.2) 浏览器不执行 getCurrentPosition 也没有是否允许定位的提示框弹出。

```js
if ("geolocation" in navigator) {
navigator.geolocation.getCurrentPosition((position) => {
   console.log('geolocation', position);
},
(error) => {
   console.log('geolocation error', error);
   if (error.PERMISSION_DENIED) {
      console.log('未开启定位权限');
   }
   if (error.POSITION_UNAVAILABLE) {
      // 在 Chrome 浏览器里，因为被墙、会返回 Network location provider at 'https://www.googleapis.com/ :ERR_TIMED_OUT.
      console.log('至少有一个内部位置源返回一个内部错误');
   }
   if (error.TIMEOUT) {
      console.log('超时');
   }
},
{
   timeout: 1000 * 15,
   // enableHighAccuracy: true, // 设为 true 移动端通过 gps 定位、费电
   // maximumAge: 1000 * 15, // 返回 15 秒内的 缓存位置，默认为 0
}
);
} else {
/* geolocation IS NOT available */
}
```


## 2020~2021

- waterfall 瀑布流 内容顺序 难保证 https://segmentfault.com/q/1010000009117246/
- flex 顺序正确的 布局 https://jessieji.com/2019/pure-css-masonry
- 多列 https://segmentfault.com/a/1190000017866549

框架的“双向绑定”意思是 view -> state -> view 变化的绑定，而不是 state1 <-> state2 变化的绑定、同样功能的 state 只用定义一个、有多个就会导致 state 变更检测的死循环。

dashboard 数据边界细节很多。

周日报遗留问题：
复制文字+多个图片、分别上传多个图片。
保存过期、前端存。大表格崩溃、大小极限。 编辑页 id 输错、结果处理。
一次性复制进去、还是会弹出事项选择框。导入上一篇 事项匹配错误。
断网再连上、报标题不能为空。新版日志编辑器：选中报错、任务样式问题。

- beforeunload 事件里有 ajax 等不到返回、页面就会关闭，怎么解决？
- 使用 `DOMParser().parseFromString(xml, 'text/xml');`解析 xml 时、需要把 xml 里的 `&` 等特殊符号 转义为 `&amp;` 不然会解析错误；参考 解答[一](https://stackoverflow.com/questions/17423495/how-to-solve-ampersand-conversion-issue-in-xml)、[二](https://stackoverflow.com/questions/11555890/how-to-parse-xml-with-special-character-specifically-for-ampersand)。
- 使用 `https://localhost` 或 umi 报 Disconnected from the devServer, trying to reconnect... 提示、设置 `chrome://flags/#allow-insecure-localhost` 能暂时解决。
- Chrome 无法访问非受信证书页面，方法1: 在页面上手工输入 `thisisunsafe` 。方法2: 打开 `chrome://net-internals/#hsts`在 Delete domain security policies 里删除相应域名。
- blocked:mixed-content 在 HTTPS 页面上有 HTTP 的请求，会被 Chrome 阻止、统一改为 HTTPS 即可。参考 [fixing-mixed-content](https://developers.google.com/web/fundamentals/security/prevent-mixed-content/fixing-mixed-content?hl=zh-cn)
- 绑定 host 访问 https 时 (`https://localhost`)、Chrome 可能会有 ERR_CERT_AUTHORITY_INVALID 证书错误，解决 [方法一](https://segmentfault.com/a/1190000021843971)、[方法二](https://blog.csdn.net/xujing19920814/article/details/53966948)。

- react 不会触发 keydown 事件，需要设置 focus 或 tabIndex="1"
- web excel 缺点：数据量大时页面死掉。
- 下载文件不能直接可点击下载，需要设置 csrf token 来避免安全问题。
- [大规格文件的上传优化](https://aotu.io/notes/2020/05/12/file-upload/index.html)

### antd
- Table 伸缩列 [bug多](https://github.com/ant-design/ant-design/commit/84c65582c71c66df9744177d337cfd3d4ce1a713)、性能[差](https://github.com/ant-design/ant-design/issues/28214)。
- Menu 和 Modal `<Menu.Item onClick={doSth} />` 里放子组件、子组件里有 `<Modal onCancel={cancel} />` 弹窗，cancel 事件会触发 menu item 的 click 事件；弹窗里嵌套弹窗问题。
- Select 组件
   - 下拉框和选择框样式分别自定义场景：比如 `mode="multiple"`、`labelInValue`、`options` 的 label 为定制的 jsx 时，可使用 `Select.Option` 组件 + `optionLabelProp="label"` 组合来避免 `onChange` 参数里的 label 是 jsx 、也能让选择框里 选项样式 能自定义。
   - 无尽列表翻页 [issues/12406](https://github.com/ant-design/ant-design/issues/12406)
   - 搜索框和单选选择框合并 [0.12 效果](https://012x.ant.design/components/select/#demo-search)、[1.x修改](https://github.com/ant-design/ant-design/issues/1390)、1.0 [changelog](https://github.com/ant-design/ant-design/issues/1050)
   - 数据项有重复时 会乱跳，如视频：[mp4](https://gw.alipayobjects.com/os/rmsportal/GxGqYTHnIXRioQTbtkok.mp4)
- Upload 组件
   - 多文件合并到一个 xhr 里上传 [issues/8579](https://github.com/ant-design/ant-design/issues/8579)
   - 使用内部的 UploadList 来[自定义进度条显示位置](https://github.com/ant-design/ant-design/issues/8387)
   - umi-request 基于 fetch 实现、不支持显示上传文件的进度，而 axios 可以支持。
   - 使用`beforeUpload`来限制上传文件大小、`customRequest`自定义上传接口和上传进度。
- Upload 上传文件/夹 (参考 语雀 或 teambition 上传资源)
   - 上传的文件或文件夹、都会存在一个`fileList`列表里，文件属性`webkitRelativePath`的值存在时、表示上传的是文件夹里的文件。`onChange`会在上传状态(上传中、已完成、失败等)变化时调用。
   - 多次点上传按钮时、可根据`fileList`里每个条目的`uid`标记来区分新旧。两次上传同一个文件夹时、需要 分别创建不同的文件夹名，比如后缀加上(1)。
   - 需要等待 所有文件都上传后 (即状态都是 done) 并且至少有一个文件上传成功，再创建目录。
   - 前端根据每个文件的`webkitRelativePath`值，循环构造出多层 文件夹 的层级数据，传给后端。
   - 后端一般需要起“异步”的任务、创建各级文件夹，前端轮询异步任务状态、判断是否成功。
   - 大文件分片上传和断点续传[原理](https://segmentfault.com/a/1190000040309502)，需要使用 oss 提供的 sdk。
   - 文件夹里包含超过 300 个小文件，上传起始会卡顿、上传失败的文件优先显示、上传过程并发数的浏览器限制。
- Popover 和 Tooltip 组件，children 如果不是元素、而是 {props.children} 不起作用。

### redux / dva / umi
- umi 某个 router 多处复用方案 [umi/1830](https://github.com/umijs/umi/issues/1830)、[umi/4569](https://github.com/umijs/umi/issues/4569)
- subscriptions 怎么获取到 model 中的 state [issues/1600](https://github.com/dvajs/dva/issues/1600)
- 多个请求并行发起 [redux-saga/issues/1800](https://github.com/redux-saga/redux-saga/issues/1800)、[redux-saga/pull/759](https://github.com/redux-saga/redux-saga/pull/759)、[dva/issues/1009](https://github.com/dvajs/dva/issues/1009)
- 如何请求多个数据源并渲染？如[图](https://img.alicdn.com/imgextra/i4/O1CN0150J8CS26jHFosJFF4_!!6000000007697-2-tps-476-266.png)

### 后端
2021-08 google 的 API 设计指南 https://google.aip.dev/general
2021-03-01 用户导入200万条数据、Java堆打爆 虚拟机退出、数据库连接满。
2020-07~10 账号、权限、越权漏洞、上传文件不成功、丢文件。
2020-04 vm修改了、刷新页面可能不会更新，因为有缓存、要重启机器。


## 2019-02 大安全移动业务开发
- 熄屏时 JS 倒计时变慢 
- H5软键盘兼容方案 [https://segmentfault.com/a/1190000018959389](https://segmentfault.com/a/1190000018959389)
- iOS 9.1 以下系统的 WKWebView 在 302 后的 document 地址可能不变更。
   - 比如当前域 (mobileic.alipay.com) 有相对地址的 post 请求 `ajax({ url: './verify.json', method: 'post' })`，但是这个页面是由 上个域 (securitycore.alipay.com) 的页面 302 跳转过来的，最终拼接出来的 ajax url 地址是上个域的 `securitycore.alipay.com/verify.json`导致错误，所以 post url 建议换成绝对地址。
- antd-mobile Carousel 在 iPhone 7/8 上有些情况下，卡住不会滚动、斜着滑动(同时导致页面上下滑动)时卡顿。[ant-design-mobile/issues?utf8=%E2%9C%93&q=is%3Aissue+carousel](https://github.com/ant-design/ant-design-mobile/issues?utf8=%E2%9C%93&q=is%3Aissue+carousel)
- Input 输入框 被键盘遮挡
   - 更多 [讨论和解法](https://juejin.im/post/59d74afe5188257e8267b03f)，部分 安卓机型 比如 moto 暂时无法解决。
- Android 4 白屏: `Set``Promise``Symbol` 未定义错误
- iOS webview 里 https 页面引入 http 的 js/css 不能加载？需要统一使用 https 协议。
- iOS 9 不支持 箭头函数


## 2018-2019 G2/G6 问题

- [G2] 时间横坐标在 mac 能显示 24 小时、正常，在 win7 上只能显示 12 小时。
- [G6] 绘制每个元素，都要自己设置 大小、填充、边框？挨个绘制多个元素时：要获取前一个元素的位置 + 当前元素尺寸，手工重新定位？
- [G6] API 文档没法搜索：支持哪些属性设置、文档难查找。比如 label 的 text 居中怎么设置？
- [G6] fixView: autoZoom 和 maxZoom: 2 会有兼容性问题
   - mac chrome 71 图不会自动居中，出现在左上角。
   - win7 chrome 55 看起来正常，但此浏览器版本太旧。
- [G6] 图表疑似绘制两次？



## 2017

tree shaking es6-modules in webpack-2
```js
// module.js
export const sayHello = name => `Hello ${name}!`;
export const sayBye = name => `Bye ${name}!`;
// index.js
import { sayHello } from './module';
sayHello('World');
// 构建后 sayBye 会被删除
```

## 2013-2017

### scroll

- 模拟滚动
  - iScroll 并没有监听原生`onscroll`事件，而是用 touch 事件模拟浏览器原生滚动效果。
  - 缺点：模拟的滚动结束后，不会自然触发“浏览器原生的滚动”，类似需求不容易满足。
- touch 事件 和 手势
  - 在某个元素的 touchmove 事件里如果有 e.preventDefault() 则会阻止包括 body 的整个页面滚动。
  - 手势是使用 touch 事件实现的，比如 https://github.com/hammerjs/hammer.js 。
  - 走马灯、下拉刷新、上拉刷新、Swipeable-Tabs、iOS swipe-to-show-actions 等都需要基于一个良好的“手势”库来实现。
- 原生 scroll 事件问题
  - ios 上 scroll 事件，只在 scroll 结束时触发（ios < 8），安卓会一直触发。
  - iOS < 8 pauses painting during scrolling.
  - 滚动过程中要「fixed标题栏」，在惯性滚动过程中不会触发 scroll 事件。
  - [iOS 与 惯性滚动](https://fe.ele.me/momentum-scrolling-on-ios/)


移动端 scroll 事件只在滚动结束时触发，用 touchmove 事件代替。

scrollTop/Left 变化会 多触发一次 scroll 事件。参考
https://stackoverflow.com/questions/1386696/make-scrollleft-scrolltop-changes-not-trigger-scroll-event

内滚动 demo

```html
<body style="height: 1000px; -webkit-overflow-scrolling: touch;">
  <div style="background-color: pink; padding: 20px 10px; height: 200px; overflow-y: scroll;">
    内滚动
    <div style="background-color: yellow; height: 400px; width: 50%;"></div>
  </div>
</body>
```

### touch

```js
// -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
/* touch 和 mouse 事件 执行顺序
  Android: touchstart -> touchend -> mouseenter -> mousemove -> mousedown -> mouseup -> click
  iOS: touchstart -> touchend -> mouseenter -> mousemove
  iOS 上如果注册了 mousemove 或 mouseenter 那么 mouse down up 事件不会触发。
  touchMove 只在 touchstart 元素上触发；mouseMove 在当前鼠标位置上触发。
  touch 结束后不会触发 mouseleave 需要再点击一下元素外边 才会触发。
*/
// http://zeptojs.com/zepto.js
var startTime, m = false;
function log(msg) {
  $('body').append('<div>' + (new Date().getTime() - startTime) + ': ' + msg + '</div>');
}
$('#test').bind('click', function () {
  log('click');
}).bind('mousedown', function (e) {
  e.preventDefault();
  startTime = startTime || new Date().getTime();
  m = true;
  log('mousedown');
}).bind('mousemove', function (e) {
  e.preventDefault();
  log('mousemove');
  if (!m) return;
  log('mousemove con');
}).bind('mouseup', function () {
  m = false;
  log('mouseup');
}).bind('mouseenter', function() {
  log('mouseenter');
}).bind('mouseleave', function() {
  log('mouseleave');
}).bind('touchstart', function () {
  startTime = new Date().getTime();
  log('touchStart');
}).bind('touchmove', function (e) {
  e.preventDefault();
  log('touchMove');
}).bind('touchend', function () {
  log('touchEnd');
});
```

touch-action: manipulation;
touch-action: none;
指针事件 (Pointer Events)：是一个新的 web 事件系列，相应的规范旨在使用一个单独的事件模型，
对所有输入类型，包括鼠标 (mouse)、触摸 (touch)、触控 (stylus) 等，进行统一的处理。
例如，你可以只去监听一个元素的 pointerdown 事件，无需分别监听其 touchstart 和 mousedown 事件。
有一个和点击延迟直接相关的实现 —— 一个名为 touch-action 的新 CSS 属性。
根据规范，touch-action 属性决定 “是否触摸操作会触发用户代理的默认行为。这包括但不限于双指缩放等行为”。
touch-action 的默认值为 auto，将其置为 none 即可移除目标元素的 300 毫秒点击延迟。
IE 11+ 可以用 touch-action: manipulation; 属性来阻止元素的双击缩放。

### [fastclick](https://github.com/ftlabs/fastclick)

Touch事件穿透，click事件被执行了两次：一次是touchend我们手动执行，一次是系统自建的click，这就是传说中的鬼点击 ghost-click 。
在 touchend 处阻止浏览器默认事件，避免 鬼点击，iOS 有效，android 无效。

```js
// #d1, #d2 {width: 100%; height: 50px;position: absolute;z-index: 1;top: 0; left: 0;}
// #d1 {background-color: blue; color: #fff;}
// #d2 {background-color: red;color: #fff; width: 60%; height: 70px;}
// d2 在 d1 上边
var touchStartTime = 0;
var d1 = document.getElementById('d1');
var d2 = document.getElementById('d2');
function hideD2() { d2.style.display = 'none'; }
function log(text) {
  var console = document.getElementById('console');
  console.innerHTML += '<br />' + text;
}
d1.addEventListener('touchstart', function () {
  log('blue div: touchstart');
})
d1.addEventListener('touchend', function () {
  log('blue div: touchend');
})
d1.addEventListener('click', function () {
  log('blue div: click');
})
d2.addEventListener('touchstart', function () {
  touchStartTime = new Date().getTime();
  log('red div: touchstart');
  // hideD2();
})
d2.addEventListener('touchend', function () {
  log('red div: touchend, ' + (new Date().getTime() - touchStartTime));
  hideD2();
})
d2.addEventListener('click', function () {
  log('red div: click, ' + (new Date().getTime() - touchStartTime));
  // hideD2();
})
```

设置 `<meta name="viewport" content="width=device-width, initial-scale=1">` 后，Chrome 32+ on Android 和 iOS 10 都不会再有 300ms 延迟，可以不使用 fastclick。

```js
// https://as.alipayobjects.com/g/component/fastclick/1.0.6/fastclick.js
window.addEventListener('load', function() {
  var logId = 0;
  var tsTime;
  document.getElementById('btn').addEventListener('touchstart', function() {
    tsTime = new Date().getTime();
    // console.log(tsTime)
  })
  document.getElementById('btn').addEventListener('click', function() {
    // console.log(new Date().getTime())
    document.getElementById('log').innerHTML =
      logId++ + ' 点击延迟：' + (new Date().getTime() - tsTime);
  })
  FastClick.attach(document.body);
}, false);
```

### webview

```js
document.write('<pre>');
document.writeln(navigator.userAgent);
var isIOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/i.test(navigator.userAgent);
document.writeln('is iOS: ', isIOS);

var isWebView = typeof navigator !== 'undefined' && /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent);
document.writeln('is WebView: ', isWebView);

// https://stackoverflow.com/questions/28795476/detect-if-page-is-loaded-inside-wkwebview-in-javascript
if (navigator.platform.substr(0,2) === 'iP') {
  //iOS (iPhone, iPod or iPad)
  var lte9 = /constructor/i.test(window.HTMLElement);
  var nav = window.navigator, ua = nav.userAgent, idb = !!window.indexedDB;
  if (ua.indexOf('Safari') !== -1 && ua.indexOf('Version') !== -1 && !nav.standalone){
    //Safari (WKWebView/Nitro since 6+)
    document.writeln('is UIWebView: false. is Safari');
  } else if ((!idb && lte9) || !window.statusbar.visible) {
    //UIWebView
    document.writeln('is UIWebView: true');
  } else if ((window.webkit && window.webkit.messageHandlers) || !lte9 || idb){
    //WKWebView
    document.writeln('is WKWebView: true');
  }
}
```

浏览器内核区别：手机系统官方浏览器、Chrome、UC、QQ、android控件里的webview、自己开发的APP里引用的 Webview，内核都不一样。


## 2013-08 兼容性问题
- IE8及以下，ajax请求地址和参数相同时，会在一段事件内，读取浏览器缓存的ajax返回文件数据，而不去重新请求。-- 解决：请求参数加时间戳
- JSON.stringify 只支持IE8\9\10标准文档模式，考虑到文档设置有兼容性视图模式（IE67模式）需要对此方法做兼容（参考json2.js）
- input、textarea的blur事件中删改页面元素，会影响作用区域周围的元素事件处理。例如：点提交btn，先触发了blur事件，改变btn周围的元素，使得btn位置变动，此时btn的事件处理函数不会触发，再点才可触发。
- IE8里在某个元素上设置`background: transparent;`，给此元素添加事件，并不会触发事件，像click mousedown事件
- IE9什么原因能导致input file框点击没反应？


## 2012

[Template-Engine-Chooser!](http://garann.github.io/template-chooser/)
模板引擎一般需要：预编译，运行时两个阶段。

- [mustache](https://github.com/janl/mustache.js) --不能预编译，轻逻辑，有各种语言(eg. java)版本
- [Hogan](https://github.com/twitter/hogan.js) -- mustache的编译器，使用基本没问题
- [handlebars](http://handlebarsjs.com/) -- 有runtime版本，基本能保证高性能；有扩展支持if else等，
- [artTemplate](https://github.com/aui/artTemplate?source=c) -- 国内出品，特性比较全面；有预编译工具；但是- 模板语法不通用，没有服务端语言支持。
- [ejs](http://embeddedjs.com/) --有些古老，使用不便


## 2011
- https://www.cnblogs.com/huajs/
- http://images.cnblogs.com/cnblogs_com/bluedream2009/201609/o_mm.jpg
- https://os.alipayobjects.com/rmsportal/EylTaSCtqXQRiTK.jpg
- 2011.5.11google首页动画 - 现代舞先驱玛莎·葛兰姆 117 周年诞辰
- [html5 snooker club](http://www.codeproject.com/Articles/217626/Html-Snooker-Club)
- [粒子系统](http://spielzeugz.de/html5/liquid-particles.html)
- [simulation of a cube that rotates](http://stackoverflow.com/questions/1401311/could-someone-explain-the-math-behind-how-this-cube-rotating-script-works?tab=active#tab-top)
- [三维旋转矩阵](http://wenku.baidu.com/view/58b1f64cf7ec4afe04a1df73.html)

`$('xx').data()` 使用地方 - [jQuery.data](http://www.cnblogs.com/silin6/p/jQuery_data.html)
在实际应用中我们要给我们的 DOM 添加数据，如果我们给一个 DOM 添加的数据太多的话，会存在循环引用的风险，例如我们添加的数据恰好引用了这个 DOM 元素，就会存在内存的泄露。
jquery 使用了数据缓存的机制就解决或者说避免这一问题。在 DOM 上扩展了一个属性 expando，数据都存在了 $.cache 中，利用 expando 这个属性建立 DOM 和缓存对象之间的联系。无论我们添加多少的数据都会存储在缓存对象中，而不是直接挂在 DOM 上。
es6 WeakMap 解决类似问题。











#
#
# FE 收集

国内有哪些靠谱的 Javascript 库 CDN可用？ https://www.zhihu.com/question/20227463
https://unpkg.com/
https://cdnjs.com/
https://jshub.com/
https://cdnjs.cloudflare.com/
https://www.bootcdn.cn/
https://cdn.bytedance.com/
https://www.webcache.cn/
https://www.staticfile.org/

http://cdn.bootcss.com/placeholder.js/3.1.0/placeholder.js
qrcode.js https://gw.alipayobjects.com/os/rmsportal/lRHmUpUMSTHDNMnENjeD.js
less.js https://gw.alipayobjects.com/os/rmsportal/OKOpSSqWebCoOQQXdLVG.js
http://cdn.staticfile.org/angular.js/1.2.16/angular.js
http://cdn.staticfile.org/angular.js/1.2.16/angular-animate.min.js
http://cdn.staticfile.org/angular-ui-router/0.2.11/angular-ui-router.js

bootstrap.css v3.3.7 https://gw.alipayobjects.com/os/rmsportal/SaEqgaEyUazqSndgTxGj.css
bootstrap.js v3.3.7 https://gw.alipayobjects.com/os/rmsportal/MoeUXzBfoEONHwCbBvXl.js
https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css
https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap-theme.min.css
https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/js/bootstrap.min.js
https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.css

http://cdn.staticfile.org/jquery/1.11.1/jquery.min.js
https://a.alipayobjects.com/jquery/jquery/1.11.1/jquery-debug.js
https://upcdn.b0.upaiyun.com/libs/jquery/jquery-2.0.3.min.js
jQuery v1.12.4 https://gw.alipayobjects.com/os/rmsportal/YbGjMuYEbXdIGJRsqOSA.js
https://code.jquery.com/ui/1.13.0/jquery-ui.js
https://code.jquery.com/ui/1.13.0/themes/base/jquery-ui.css
http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.js

https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js
https://gw.alipayobjects.com/os/lib/jquery/3.6.0/dist/jquery.min.js


2023年前端技术盘点与2024年技术展望 https://mp.weixin.qq.com/s/LiygBJqMN8U_vSpAjxMibQ
gmtc https://gmtc.infoq.cn/2022/beijing/schedule
重庆前端交流会 https://zhuanlan.zhihu.com/p/581717444
[2021 大前端技术回顾及未来展望](https://mp.weixin.qq.com/s/HfZDrrqDNUVpnU-aegKxcg)
[2021 年 Rust 生态版图调研报告](https://zhuanlan.zhihu.com/p/458046979)
[Stack Overflow Developer Survey](https://insights.stackoverflow.com/survey)、
[JavaScript risingstars](https://risingstars.js.org)、
[awesome-react](https://github.com/enaqx/awesome-react)、
[awesome-react-components](https://github.com/brillout/awesome-react-components)、
[react-china](http://react-china.org/)。
[uxtools.co](https://uxtools.co/tools/design)、
[2018前端技术清单](https://juejin.im/post/5bdfb387e51d452c8e0aa902)、[2019中国开源软件榜](https://www.oschina.net/project/top_cn_2019)。

云原生应用市场 https://hub.grapps.cn/
https://coolshell.cn/
[前端领域的 “干净架构”](https://zhuanlan.zhihu.com/p/458410158)
徐飞 - [业务中的前端组件化体系](https://zhuanlan.zhihu.com/p/383129585)
2022 近几年新技术：微前端、bundless vite 构建、低代码、IDE、serverless。


## 研发平台/工具

monorepo (one code base)
* [monorepo.tools](https://monorepo.tools/)
* [monorepo-vs-polyrepo](https://github.com/joelparkerhenderson/monorepo-vs-polyrepo)
* [Awesome-monorepo](https://github.com/korfuri/awesome-monorepo)
* [advantages of monorepo](https://medium.com/@suman.maity112/is-it-the-era-of-mono-repo-671e6dee387)
* [Misconceptions about Monorepos](https://blog.nrwl.io/misconceptions-about-monorepos-monorepo-monolith-df1250d4b03c)
https://github.com/facebook/react/tree/main/packages
https://github.com/vuejs/core/tree/main
https://github.com/angular/angular

研发流程/前端工程化: 评审系分, 研发平台, 脚手架, 数据 mock, 组件库, 微前端, 质量, 测试, 埋点监控。
https://gw.alipayobjects.com/mdn/security_c/afts/img/A*z-C8SpqQo08AAAAAAAAAAABjARQnAQ
[蚂蚁研发过程图](https://gw.alipayobjects.com/mdn/security_c/afts/img/A*jRrGSYNyLqIAAAAAAAAAAABjARQnAQ)
工具的易用和完善度: 业务团队的基础工具，很难按 文档说明 一次性 的就能做好跑起来。 产物不一致、本地没问题 线上有问题。

研发平台
https://www.rspack.dev/
阿里def、蚂蚁雨燕 / just / 优酷hub / 菜鸟cone。 飞冰ice / form builder / FormRender。
[jsfuck 代码混淆](http://www.jsfuck.com/)、[frNatural language detectionanc](https://github.com/wooorm/franc)、[docz](https://www.docz.site/)、[wiki.js](https://wiki.js.org/)、docusaurus
https://github.com/zh-lx/code-inspector
gulp 手册 http://p.tb.cn/rmsportal_127_gulp_E6_89_8B_E5_86_8C1.pdf
http://p.tb.cn/rmsportal_127_gulp_E6_89_8B_E5_86_8C2.pdf
Webpack 5 module federationtion 联邦模块 https://juejin.cn/post/6844904187147321352

数据 mock
[postman](https://www.getpostman.com/) ([paw](https://paw.cloud/) [hoppscotch](https://hoppscotch.io/))。 [mockjs](https://github.com/nuysoft/Mock) oneapi / dummy-mock / dip。
Mock工具在产品“初始化/初版”时比较有用，但之后“非常”容易腐烂，原因：API 接口名称、内容结构“很容易”会改变。 接口之间有依赖性、比如 修改/保存之后、再重新获取，数据不会变动。 mock 的数据、对不同人权限问题。 迭代中，绝大多数接口线上都有、少部分是新接口 mock 可直接在相应接口初临时 mock 即可。

前后端
[zeit/swr](https://github.com/zeit/swr)、[web-servers](https://gist.github.com/willurd/5720255)、[swagger](https://swagger.io/)、[json-server、](https://github.com/typicode/json-server)[miragejs](https://miragejs.com/)、[browser-functions](https://medium.com/@richardyoung00/browser-functions-a-new-serverless-platform-using-web-browser-execution-engines-31d2293e650b)、[isomorphic-git](https://isomorphic-git.org/en/)、[onedev](https://github.com/theonedev/onedev)(DevOps平台)。

营销/游戏/大屏: 魔石 / 魔切 / 喵动 / 犸良 / sherry / 幻鹦-大屏。
[多媒体](https://www.yuque.com/books/share/6487738a-085c-4a82-98b3-834f87859a2a)

## 框架/库

脚手架
企业级前端开发框架：[redux](https://redux.js.org/)、
[dvajs](https://dvajs.com/)、[umijs](https://umijs.org/)、[bigfish](https://bigfish.alipay.com/) qiankun [子应用嵌套](https://github.com/umijs/qiankun/issues/960) ,
阿里[rax](https://rax.js.org/)跨容器的渲染引擎, [primereact](https://www.primefaces.org/primereact/), [蚂蚁前端框架和工程化](https://github.com/sorrycc/blog/issues/85), oneconsole.
使用于某 BU 范围内的“业务脚手架”、内置含 BU 特色的插件，基于“开源脚手架”定制，既提升效率又有开放性，是较好的选择。
微前端
bigfish-onex / icestark([介绍](https://mp.weixin.qq.com/s/L-6ygB2CpdGO1hXRCx5QuQ)) / microx(克军)
微应用注册、路由管控(统一菜单/权限)、发布版本管控、发布灰度控制、多环境(日常/预发/线上)、预加载、应用组件。 子应用样式丢失。
request 组件: csrf-token 处理、gateway domain 网关域名、登录、返回异常、返回json结果格式化、上传/下载

UI
https://ui.shadcn.com/
[全新的 React 组件设计理念 Headless UI](https://mp.weixin.qq.com/s/1SlLWmZmQch0W3WSqlc4GA)
[bit 介绍](https://juejin.cn/post/6844903872108953607),
antd, [react-data-grid](https://github.com/adazzle/react-data-grid)、[moveable](https://github.com/daybrush/moveable)、[react-grid-layout](https://github.com/STRML/react-grid-layout)、[Re-Flex](https://github.com/leefsmp/Re-Flex)、[react-mosaic](https://github.com/nomcopter/react-mosaic)、[ScrollTrigger](https://github.com/terwanerik/ScrollTrigger)、[react-virtualized](https://github.com/bvaughn/react-virtualized)、[元素定位tether](https://github.com/shipshapecode/tether)、[tailwindcss](https://github.com/tailwindcss/tailwindcss)、分步指引([shepherd](https://github.com/shipshapecode/shepherd)/[driver.js](https://github.com/kamranahmedse/driver.js))、[react-trello](https://github.com/rcdexta/react-trello)。[css 图标集](http://livicons.com/)
[material-design-lite](https://github.com/google/material-design-lite)、[jQuery miniui](http://www.miniui.com/)、[toast ui](https://ui.toast.com/)、[goodui](https://goodui.org/)

图表
antv、[alibaba/GGEditor](https://github.com/alibaba/GGEditor)、[workflow 设计器 wfd](https://github.com/guozhaolong/wfd/)、[amcharts](http://www.amcharts.com/demos/)。

日历
[fullcalendar](https://fullcalendar.io/)、[webix/scheduler](https://webix.com/scheduler/)、[react-big-calendar](https://github.com/jquense/react-big-calendar)、[tui.calendar](https://github.com/nhn/tui.calendar)

地图
antv [L7](https://l7.antv.vision/zh)、饿了么 [react-amap](https://elemefe.github.io/react-amap/)。数据源 [datav data](http://datav.aliyun.com/tools/atlas/#&lat=33.50475906922609&lng=104.2822265625&zoom=4)、[hcharts.cn/mapdata](https://img.hcharts.cn/mapdata/)，高德点聚合 [markerclusterer](https://lbs.amap.com/api/javascript-api/example/marker/markerclusterer)。

IDE
[eclipse-theia](https://github.com/eclipse-theia/theia)、[coding.腾讯、](https://coding.net/)[stackblitz](https://stackblitz.com/)、[gitpod](https://www.gitpod.io/) (蚂蚁 cloudIDE)。

编辑器
[sheetjs Excel 解析](https://sheetjs.com/)、web-Excel
[slate](https://github.com/ianstormtaylor/slate)、[trix](https://github.com/basecamp/trix)、[braft-editor](https://github.com/margox/braft-editor)、[edtr-io](https://github.com/edtr-io)、[svg-editors](https://css-tricks.com/browser-based-svg-editors/)、[各种编辑器](https://github.com/JefMari/awesome-wysiwyg)、数学公式[编辑器](https://www.mathcha.io/)、[zebra-editor-core](https://github.com/acccco/zebra-editor-core)、[tui-editor](https://ui.toast.com/tui-editor/)、[craft.js](https://github.com/prevwong/craft.js)、[react-visual-editor](https://github.com/anye931123/react-visual-editor)、[stylojs](https://stylojs.com/)。

截图
[dom-to-image和html2canvas原理](https://github.com/zhangyu0414/notebook-to-record-learning)、[各设备截图服务](https://screendump.techulus.com/)、录制回放 [rrweb](https://github.com/rrweb-io/rrweb) (内网 xreplay)、[screen-share-party](https://ba.net/screen-share-party/#9730179072993984)。

文件管理
[top10-javascript-file-managers](https://hackernoon.com/top-10-javascript-file-managers-8o2p34vw)、[file-browser](https://reactjsexample.com/tag/file-browser/)、[file-manager](https://js.plus/products/file-manager)、[OpusCapita](https://demo.core.dev.opuscapita.com/filemanager/master/?currentComponentName=FileManager&maxContainerWidth=100%25&showSidebar=false)、[dxFileManager](https://js.devexpress.com/Documentation/ApiReference/UI_Components/dxFileManager/)、[dhtmlxFileManager](https://dhtmlx.com/docs/products/dhtmlxFileManager/)、[syncfusion/file-manager](https://www.syncfusion.com/blogs/post/introducing-new-javascript-file-manager-control.aspx)、[webix/filemanager](https://webix.com/filemanager/)。


## h5 小程序

手机端transform闪动问题：
-webkit-backface-visibility : hidden;
-webkit-transform-style : preserve-3d;
-webkit-transform : translate3d(0,0,0)；

2018-12-24
- butian线下面的，除非特殊情况，否则都是优先小程序，如果要走h5的话，需要走审批。(@hanseng - 支付宝)
- 只会在一些小需求上试点，目前主要还是 h5。(@yuanfei - 微贷)
- 核心的链路，容易出 bug 的用 h5，比如我们这边的通用业务，通用投保，理赔，一些新业务会考虑小程序。(@chengwu - 保险)
考虑到一期的重要性、和直接面向 C 端用户，采用 h5 方式开发。
h5 套壳？参考：小程序『套壳』指南

小程序 API
```js
const { Ali } = window;
const { isAlipay } = Ali;
window.AlipayJSBridge;
document.addEventListener('AlipayJSBridgeReady', callback, false);
Ali.httpRequest({ url: '', method: 'POST' }, (result) => {});
Ali.rpc({ operationType: '', requestData: [] }, (result) => {});
Ali.call('imageViewer', { enablesavephoto: true, images: [], init: index });
Ali.showLoading(param);
Ali.hideLoading();
Ali.showToast({ content: '' });
Ali.showActionSheet({ content: '' }, (result) => {});
Ali.popWindow();
AlipayJSBridge.call('getSystemInfo', { }, (result) => {});
AlipayJSBridge.call('popWindow');
AlipayJSBridge.call('setTitle', { title: 'xxx' });
```

采用了虚拟 DOM 的思想。小程序的渲染层和逻辑层分别由2个线程管理：渲染层的界面使用了 WebView 进行渲染；逻辑层采用 JsCore 线程运行JS脚本。一个小程序存在多个界面，所以渲染层存在多个 WebView 线程，这两个线程的通信会经由微信客户端做中转，逻辑层发送网络请求也经由 Native 转发。
目的：安全可控，沙箱隔离，限制 DOM 和 BOM 能力。逻辑层和渲染层是独立的，二者不会互相阻塞，因此性能更优（小程序限制了 JS 操作 DOM 的能力，因此不用担心二者的不同步问题）在浏览器网页中，虽然 JS 执行和 UI 渲染也是处于两个线程，但是 JS 线程和 UI 线程是互斥的。

小程序采用的是混合架构，可通过 html 里的 a 标签启动新的 webview 窗口、调用 popWindow 关闭窗口。基本页面元素是 html 渲染，弹窗类 loading toast ActionSheet 和 本地存储、系统或用户信息，使用客户端原生实现。

而 react-native 只是采用 js/html 写法，背后完全是 客户端原生 渲染。
微信小程序和 RN 的区别：双线程架构，渲染层一个主要是 webview 一个完全 native。
微信的支付 小程序云等开放API、小程序安全管控。

小程序框架
[taro](https://taro.aotu.io/)、[remax](https://github.com/remaxjs/remax)、[alibaba/rax](https://github.com/alibaba/rax)、[flutter](https://github.com/flutter/flutter)。

- 编译时：约定了一套自己的 DSL ，在编译打包的过程中，利用 babel 工具通过 AST 进行转译，生成符合小程序规则的代码。
  - 容易出现 BUG、开发限制过多、跟不上 react vue 更新。早期的 Taro 1/2 采用的这种方案。
- 运行时：在小程序的逻辑层中运行起来 React 或 Vue 的运行时，然后通过适配层，实现自定义渲染器。
  - 有天然优势，remax taro3 这样实现。

React component -> React Reconciler(调和器、实现了 Diff/Fiber 算法) -> React Renderer(可以是dom也可以是js对象等)。
跨端小程序框架 remax taro3 自己实现了一套可以在 React 中用的，且能渲染到小程序页面的自定义渲染器。
在 react reconciler resetAfterCommit 函数中、调用小程序的 setData 方法。
小程序环境中，不支持直接创建DOM、仅支持模板渲染，用递归模板的方式，用相对静态的小程序模板语言实现了动态的模板渲染的特性。


## 监控 & 性能

[heavy tasks on the main thread](https://github.com/astoilkov/main-thread-scheduling)

Headless BI https://cube.dev/
https://github.com/GoogleChromeLabs/quicklink
https://superset.apache.org/

ICBU前端性能度量 https://mp.weixin.qq.com/s/XAdNOovCQxh5xuGVOSEz3w

https://web.dev/articles/vitals?hl=zh-cn
[Web vitals](https://www.cnblogs.com/constantince/p/15237915.html)、
[thresholds](https://web.dev/i18n/en/defining-core-web-vitals-thresholds/)、
[Chrome的First Paint触发的时机探究](https://cloud.tencent.com/developer/article/1124484)、
[window.onload vs document.onload](https://stackoverflow.com/questions/40193553/load-event-on-script-with-async-and-or-defer)

[如何根治 Script Error.](https://mp.weixin.qq.com/s/6v_X0vtM5EZThF0odwJmTw)
[JavaScript Errors Handbook](https://github.com/mknichel/javascript-errors/blob/master/README.md)、
[如何捕获前端错误](https://mp.weixin.qq.com/s/E51lKQOojsvhHvACIyXwhw)、[搞定前端错误捕获和上报](https://juejin.cn/post/7031876097390149645)、[错误监控总结](https://segmentfault.com/a/1190000014672384)

为什么大厂前端监控都在用GIF做埋点？ https://mp.weixin.qq.com/s?__biz=MzAxODE4MTEzMA==&mid=2650099077&idx=1&sn=813d2c96cd940dc95b0f47585b989c2f

AEM [表单分析](https://img.alicdn.com/imgextra/i3/O1CN01x1xSNj26XMy1xUikf_!!6000000007671-0-tps-2934-1678.jpg)
AEM: 稳定性(脚本/接口/资源异常)、流畅性(加载/卡顿/动画掉帧)、用户流量(pv uv 活跃用户 新用户/点击率 点击热点 / 停留黏性/来源去向/设备)、行为分析(页面流/操作流/留存跳失率/访问链路/表单分析)、满意度(问卷/反馈/录屏/主观分析)。告警/多维指标(用户纬度年龄性别籍贯)/自定义看板/乐高搭建报表页。

[chrome-performance-devtool](https://github.com/Sanotsu/web-beginner/blob/master/documents/11-others/web-base-chrome-performance-devtool.md)
Google [lighthouse](https://developers.google.com/web/tools/lighthouse/)、类似服务 [web.dev/measure](https://web.dev/measure)、[webpagetest](https://www.webpagetest.org/)、[pagespeed insights](https://developers.google.com/speed/pagespeed/insights/)

arms / quick a+ / spm / aplus / retcode / clue。

性能和体验
弹窗 modal 里高度需要设置、内容长时“内滚动”。 一行多列 card 卡片，每个卡片 高度需要设置成一样。
某个操作 触发多次 ajax 请求、再 setState 页面，导致卡顿？ 一个页面有多个“富文本实例”同时初始化、比较耗时？导致页面卡顿？


## 质量 & 测试

测试
CI/CD、JS 覆盖率工具 [istanbul](https://istanbul.js.org/)。测试-漏测率。 阿里MTC无线测试中心、蚂蚁云测平台[Solomon]
基础理论: [前端测试体系建设与最佳实践](https://mp.weixin.qq.com/s?__biz=MzI5MjYyODYyNQ==&mid=2247483987&idx=1&sn=132aea5d5185a1e4fa2fab5037a2fb3e)、[测试金字塔](https://martinfowler.com/bliki/TestPyramid.html)
[codecov.io](https://codecov.io/) 覆盖率分析对比工具 支持所有语言，对 GitHub commit 的覆盖率做记录、前后对比。
[代码测试覆盖率分析](https://blog.rsuitejs.com/2017/08/20/test-coverage/)
Statements 与 Lines 的区别：一行可能有多个语句
[百分百测试覆盖率真的有意义吗？](https://www.zhihu.com/question/29528349) 各种 corner cases(比如除0、IO error handling) 很难做到 100% 覆盖。 覆盖率数据只能代表你测试过哪些代码，不能代表你是否测试好这些代码。 不能盲目追求代码覆盖率，而应该想办法设计更多更好的案例，哪怕多设计出来的案例对覆盖率一点影响也没有。

质量
[iceworks-doctor](https://marketplace.visualstudio.com/items?itemName=iceworks-team.iceworks-doctor)
[vscode-codemetrics](https://marketplace.visualstudio.com/items?itemName=kisstkondoros.vscode-codemetrics)
[jsinspect](https://github.com/danielstjules/jsinspect)、[jscpd](https://github.com/kucherenko/jscpd)
[代码圈复杂度Cyclomatic Complexity](http://kaelzhang81.github.io/2017/06/18/%E8%AF%A6%E8%A7%A3%E5%9C%88%E5%A4%8D%E6%9D%82%E5%BA%A6/)
[研发效能度量引发的血案](https://mp.weixin.qq.com/s/h9zIg2e8iHn3qgxlUGObbQ)、[10 倍程序员神话](https://www.simplethread.com/the-10x-programmer-myth/)、[代码质量](https://stackoverflow.blog/2021/10/18/code-quality-a-concern-for-businesses-bottom-lines-and-empathetic-programmers/)

git 三板斧
一板基础斧 add，commit，pull/push，checkout，revert
二板合作斧 merge，rebase，stash，cherry-pick
三板优雅斧 commit --amend，rebase -i


## 生成 & 搭建

https://www.wix.com/
https://soloist.ai/

[无代码nocobase](https://cn.nocobase.com/) [博客](https://blog-cn.nocobase.com/posts/nocobase-opensource-income-3years/)

[阿里低代码引擎LowCodeEngine正式开源](https://mp.weixin.qq.com/s/rQ-X9OBFRvhI16KrWwIT6w)
[官网](https://lowcode-engine.cn/)、[github](https://github.com/alibaba/lowcode-engine)

[网易云音乐低代码体系建设思考与实践](https://mp.weixin.qq.com/s/9yo-Au3wwsWErBJfFjhxUg)

[从实现原理看LowCode](https://zhuanlan.zhihu.com/p/452251297)

https://github.com/imcuttle/mometa

AECP 开发平台架构 https://img.alicdn.com/imgextra/i2/O1CN01VFIoNq1E0PCIklFol_!!6000000000289-2-tps-2482-1410.png

[2020/01/13/the-no-code-delusion](https://www.alexhudson.com/2020/01/13/the-no-code-delusion/)、[无代码编程介绍](https://mp.weixin.qq.com/s/eKvSxOvSyEZEr3BLloCXdw)
[antd-lowcode](http://g.alicdn.com/code/npm/@ali/antd-lowcode/0.5.1/example/index.html)

Markdown + 卡片 [可视化搭建](https://zhuanlan.zhihu.com/p/164558106)、
宜搭、[云凤蝶](https://www.yunfengdie.com/home)、[阿里云外网建站](https://ac.aliyun.com/jianzhan)。微软 Power [Platform](https://yuque.antfin-inc.com/chenyu/articles/skei6i)。AWS [honeycode](https://www.honeycode.aws/)、[mendix](https://www.mendix.com/)。

[SaaS（科技）行业导航](http://www.allsaas.cn/)、SaaS 平台：[氚云](https://h3yun.com/index.php?g=Chuanyun&m=Scene&a=index)、[搭搭云](https://www.dadayun.cn/)、[明道云](https://blog.mingdao.com/13061.html)、[appsheet](https://www.appsheet.com/)、[fibery](https://fibery.io)、[openchakra](https://openchakra.app/)、[百度amis](https://baidu.github.io/amis/#/docs/getting-started)、[tumult](https://tumult.com/)(YC投资)、
[grapesjs](https://grapesjs.com/)、[noflojs](https://noflojs.org/)、[pagedraw](https://pagedraw.io/)、Google Web Designer (类似 Dreamweaver) 2013 发布 2017 停止更新。

[What's Salesforce?](https://tryretool.com/blog/salesforce-for-engineers/) 、Salesforce [Lightning](https://www.salesforce.com/cn/campaign/lightning)

云上[编排](https://blog.csdn.net/devcloud/article/details/93175186)([cloudcraft](https://app.cloudcraft.co/)/阿里[ros](https://cn.aliyun.com/product/ros)/华为云[aos](https://www.jianshu.com/p/2301a1729fcc)/[Terraform](https://blog.csdn.net/yejingtao703/article/details/80574363)/[PAD图](https://baike.baidu.com/item/PAD%E5%9B%BE))、[图编排(](https://www.atatech.org/articles/170866)[相关](https://www.atatech.org/articles/174875/))

GUI 研发：[umi-ui](https://umijs.org/guide/umi-ui.html)、[angular-console](https://angularconsole.com/)

表单: [formily](https://github.com/alibaba/formily)、[build forms from JSON Schema](https://github.com/mozilla-services/react-jsonschema-form)、[react-final-form](https://github.com/final-form/react-final-form)、[AForm模型驱动生成表单](http://xiehuiqi220.github.io/AForm/doc/book/index.html)。

AI图转码: 西安交大[设计图转代码](https://mp.weixin.qq.com/s?__biz=MzUxMzcxMzE5Ng==&mid=2247489854&idx=1&sn=4828d5d36c3becdf8b1f46490b5ce708)、[Microsoft Sketch2Code](https://github.com/Microsoft/ailab/tree/master/Sketch2Code)、[sketch2code](https://azure.microsoft.com/en-us/blog/turn-your-whiteboard-sketches-to-working-code-in-seconds-with-sketch2code)、[pix2code](https://github.com/tonybeltramelli/pix2code)、[Screenshot-to-code](https://github.com/emilwallner/Screenshot-to-code)。

AI Design: Google [AutoDraw](https://www.autodraw.com/) (原理[介绍](https://research.googleblog.com/2017/04/teaching-machines-to-draw.html))、鲁班、[sketch-rnn](https://github.com/tensorflow/magenta/blob/master/magenta/models/sketch_rnn/README.md)、[机器作艺术画](https://robotart.org/artworks/)、设计与人工智能[系列报告](http://sheji.ai/#/?_k=twxxpk)、[lobe.ai 生成表情](https://lobe.ai/)。

AI 编码/代码推荐: [为什么难](https://www.outsystems.com/blog/posts/ai-machine-learning-future-low-code/)、Facebook [Aroma](https://code.fb.com/developer-tools/aroma/)、[Would-AI-be-able-to-write-code](https://www.quora.com/Would-AI-be-able-to-write-code)。
imgcook(控件识别) / dumbo / 闲鱼UI2Code / 视觉稿还原比对-蒙娜丽莎。

JS 实现神经网络、[天猫精灵](https://open.bot.tmall.com/)、机器人工厂、阿里文娱 [AI 视频智能](https://ailab.youku.com/#/)、JS IM / [botui](https://github.com/moinism/botui)


低代码平台：源码不可维护 git diff 不起作用。
物料(模板、页面、区块、基础组件、业务组件、布局组件)

区块（Block）：一系列业务组件、布局组件等组合而成的代码片段，不对外提供可配置的属性；区块内部具备完整的内部样式、事件、生命周期管理、状态管理、数据流转机制，能独立存在和运行，通过代码片段的复制实现跨页面、跨应用的快速复用，保障功能和数据的正常。
模板（Template）：特定垂直业务领域内的业务组件、区块可组合为单个页面，或者是再配合路由组合为多个页面集，统称为模板。

Microsoft Power Apps 中，页面的生产过程是由字段的布局来决定的，字段对应的组件可以切换。在 Mendix、OutSystems 中。页面虽然是基于模型来生产的，但整体开发体验，依然是面向页面和组件视角的。组件可以绑定字段。
从前端对低代码提效本质的分析来看，可视化搭建本质上是通过可视化手段降低了前端开发的上手门槛，但开发思路和源码开发基本是一样的。其提高开发效率的主要手段是，通过丰富的静态模板让页面开发少写一些代码。没有元数据的支持，其对开发效率的提升至多是线性的，而我们需要的是数量级的提升。
由于模型元数据驱动和可视化搭建在本质思路上的不同，在可视化搭建基础上，集成模型驱动的能力，会让整个产品的复杂性增加，产品定位不清晰，扩展性差。与其这样，不如从0开始打造一个纯净的模型驱动低代码开发工具。


## 文档 / 在线 office

[活文档](https://mp.weixin.qq.com/s/Tkc_eisDB3SFwWLaWktB2Q)、2020-11 孟方(游圣) [aliyun/cadt](https://www.aliyun.com/product/developerservices/cadt)

Roam Research [介绍](https://www.zhihu.com/question/384453977)、[介绍1](https://baijiahao.baidu.com/s?id=1669749949965240303)、[foam](https://foambubble.github.io/foam/)

​[Notion 编辑器原理](https://zhuanlan.zhihu.com/p/359122473)、[腾讯在线 Excel 技术](https://mp.weixin.qq.com/s/f1vwzuPryc8ag6nd5Ngr5A)
[语雀 实时保存 方案](https://klab.yuque.com/docs/share/0e3ee249-d977-492b-82f2-6b44d26bd4af) (平侠/遇春 2021-01)、[语雀后端技术](https://mp.weixin.qq.com/s/VM61gkZuYYqE4pVhpba3nQ)、[隆昊《富文本编辑器的技术演进》](https://myslide.cn/slides/21863)、[有道云笔记富文本编辑器技术演进](https://mp.weixin.qq.com/s/9gDI1r9aAu6dHJhXg34eIg)。

[飞书在线文档协同](https://mp.weixin.qq.com/s?__biz=MzkzNTIwNTAwOA==&mid=2247496795&idx=1&sn=5edf65ebf8609ada7981a9a804b072d3)、
实时协作技术 [ot-vs-crdt](https://www.tiny.cloud/blog/real-time-collaboration-ot-vs-crdt/) / [xi-editor-CRDTs](https://xi-editor.io/docs/rope_science_08.html) / [are-crdts-suitable](https://blog.kevinjahns.de/are-crdts-suitable-for-shared-editing/)、[vs code 多人协作](https://docs.microsoft.com/en-us/visualstudio/liveshare/reference/connectivity)、[CKEditor 多人协作](https://ckeditor.com/collaborative-editing/)、[automerge](https://github.com/automerge/automerge)、[crdt](https://wiki.nikitavoloboev.xyz/distributed-systems/crdt)。

[文档协同的三元结构-浩初](https://www.yuque.com/docs/share/92faca9c-2162-4fe2-974d-193164650b11)、[resume生成](https://github.com/visiky/resume)

- 阿里云[媒体管理](https://help.aliyun.com/document_detail/63273.html)、[微软](https://support.microsoft.com/en-us/office/embed-a-presentation-in-a-web-page-or-blog-19668a1d-2299-4af3-91e1-ae57af723a60)、[Google/微软](https://gist.github.com/tzmartin/1cf85dc3d975f94cfddc04bc0dd399be)、Google [示例](https://docs.google.com/viewer?embedded=true&url=http%3A%2F%2Fhomepages.inf.ed.ac.uk%2Fneilb%2FTestWordDoc.doc)、转换 [sheetson](https://sheetson.com/)
- 生成/查看 PPT: [PptxGenJS](https://github.com/gitbrent/PptxGenJS)、[apache_poi_ppt](https://www.w3cschool.cn/apache_poi_ppt/apache_poi_ppt_presentation.html)(java)、[nodeppt](https://github.com/ksky521/nodeppt)。[ViewerJS](https://github.com/webodf/ViewerJS)、[office sdk](https://www.pdftron.com/office-sdk/office-document-viewer/)。

微软: [office](https://products.office.com/zh-cn/home) ([task](https://techcommunity.microsoft.com/t5/microsoft-365-blog/connecting-tasks-experiences-across-microsoft-365/ba-p/1522069))、[teams](https://teams.microsoft.com/)

Google: [gsuite](https://gsuite.google.com/) ([google-forms](https://docs.google.com/forms/u/0/)/[教程](https://youtu.be/RoA65-vLV_0)) [alerts](https://www.google.com/alerts) [classroom](https://classroom.google.com/h)

[notion](https://www.notion.so/)、[craft.do](https://www.craft.do/)、[airtable](https://airtable.com/)、[quip](https://quip.com/about/product)、[coda.io](https://coda.io/t/Welcome-to-Coda_tvbBdpE72Lq#)、slack。 [wolai](https://www.wolai.com/) ([介绍](https://www.zhihu.com/question/407132273/answer/1352638849))。 [mathigon](https://mathigon.org/)(互动教程)。

腾讯文档 [docs.qq.com](https://docs.qq.com/desktop/)、头条 [larksuite](https://www.larksuite.com/) ([lark 出海](https://zhuanlan.zhihu.com/p/58585005))、[teambition](https://www.teambition.com/)、[wps](https://www.wps.cn/) (稻壳模板[docer](http://www.docer.com/))、[xiezuocat](https://xiezuocat.com/#/)(AI纠错)、[sheetui](https://sheetui.com/)(表格转网页)、[Luckysheet](https://github.com/mengshukeji/Luckysheet)、[handsontable](https://handsontable.com/)、[prezi](https://prezi.com/dashboard/next/#/presentations)、[milanote](https://app.milanote.com/1KeUXu1ElqNVrw/home)、[logseq](https://github.com/logseq/logseq)、

产品设计工具: 白板([mural](https://mural.co/)、[miro](https://miro.com/))、原型([xiaopiu](https://www.xiaopiu.com)、[xiaopiu/prd](https://www.xiaopiu.com/prd)、[justinmind](https://www.justinmind.com/))、[知乎](https://www.zhihu.com/question/23004570)([invision](https://www.invisionapp.com/)、[modao](https://modao.cc/)、[会议桌](https://www.huiyizhuo.com/))、[流程图和图表](https://zhuanlan.zhihu.com/p/111990866)、在线[培训工具](https://segmentfault.com/a/1190000021793283)。

其他: [mubu](https://mubu.com/)、[slides.com](https://slides.com/)、[ppt.baomitu](https://ppt.baomitu.com/)、[zoho](https://www.zoho.com/)、[visme](https://www.visme.co/templates/)、[deckdeckgo](https://deckdeckgo.com/)、[witeboard](https://witeboard.com/)、[wireflow](https://wireflow.co/)、[presenta](https://play.presenta.cc/#s0)。
[batnoter](https://github.com/batnoter/batnoter)


## 画图(web/客户端)

[SVG-to-Canvas (canvas-to-SVG) Parser](https://github.com/fabricjs/fabric.js)

[skeditor](https://github.com/skeditor/skeditor) [canvaskit-wasm](https://zhuanlan.zhihu.com/p/432454443)

[figma](https://www.figma.com/) ([FigmaToCode](https://github.com/bernaferrari/FigmaToCode))
[figma 技术](https://madebyevan.com/figma/) / [figma c++](https://madebyevan.com/figma/building-a-professional-design-tool-on-the-web/) / [figma 插件技术](https://zhuanlan.zhihu.com/p/357724347)

[react-sketchapp](https://github.com/airbnb/react-sketchapp)

[drawio](https://github.com/jgraph/drawio)([mxgraph](https://github.com/jgraph/mxgraph))、[cloudskew](https://www.cloudskew.com/)、[diagram-js](https://github.com/bpmn-io/diagram-js)、[excalidraw](https://github.com/excalidraw/excalidraw)、[draw2d](https://github.com/freegroup/draw2d)([demo](http://freegroup.github.io/draw2d_js.app.shape_designer/))、[plantuml](https://plantuml.com/zh/)、[planttext](https://www.planttext.com/)、[diagram.codes](https://www.diagram.codes/)、[jsplumb](https://github.com/jsplumb/jsplumb)([jsplumb-vs-mxgraph](https://www.npmtrends.com/jsplumb-vs-mxgraph))、[mermaid-js](https://github.com/mermaid-js/mermaid)、[nomnoml](https://github.com/skanaar/nomnoml)、[visjs](https://github.com/visjs)([timeline](https://visjs.github.io/vis-timeline/examples/timeline/))、[react-diagrams](https://github.com/projectstorm/react-diagrams)、[roughjs](https://roughjs.com/)、[rete.js/](https://rete.js.org/#/)[flume](https://flume.dev/)/[nodered](https://nodered.org/)(可视化节点)、[diagrams](https://github.com/mingrammer/diagrams)([graphviz](https://www.graphviz.org/))、[vscode-drawio](https://github.com/hediet/vscode-drawio)、[text-to-diagram](https://smusamashah.github.io/text-to-diagram)、[isoflow](https://isoflow.io/)、[reactflow](https://reactflow.dev/)、[diagram-maker](https://github.com/awslabs/diagram-maker)。

平台/端: [processon](https://www.processon.com/)、visio、mindnode lite、[visual-paradigm](https://online.visual-paradigm.com/diagrams/features/aws-architecture-diagram-tool/)、[ithoughts](https://www.toketaware.com/ithoughts-osx)、[gliffy](https://www.gliffy.com/)、[terrastruct](https://terrastruct.com/)、[edrawsoft](https://www.edrawsoft.cn/)、[freedgo](https://www.freedgo.com/)、[websequencediagrams](https://www.websequencediagrams.com/)、[chartmage](http://chartmage.com/intro.html)、[thebrain](https://www.thebrain.com/)、[asciiflow](https://asciiflow.com/#/)([textik](https://textik.com/#9fe9a0bacdcf4a9a))、[omnigraffle](https://www.omnigroup.com/omnigraffle/)、[flowchart](https://flowchart.fun/)、[photopea](https://www.photopea.com/)​、[PPTist](https://github.com/pipipi-pikachu/PPTist)

收费: [gojs](https://gojs.net/latest/samples/index.html)、[jointjs](https://www.jointjs.com/)、[jsplumbtoolkit](https://jsplumbtoolkit.com/)、[yworks](https://www.yworks.com/products/yfiles/demos)、[mindfusion-diagram](https://mindfusion.eu/javascript-diagram.html)

系统: [drawio-aws-cloudcraft](https://www.diagrams.net/blog/drawio-aws-cloudcraft)、([placeholder](https://www.diagrams.net/blog/placeholder-scope)、[mermaid](https://www.diagrams.net/blog/mermaid-diagrams)、[network](https://www.diagrams.net/blog/network-diagrams)、[org](https://www.diagrams.net/blog/org-charts))



## react & redux

react 使用注意事项 https://github.com/mithi/react-philosophies
React 技术揭秘 https://react.iamkasong.com/
React Fiber 架构 https://xueshiming.cn/2021/05/08/React%20%E4%B9%8B%20Fiber%20%E6%9E%B6%E6%9E%84/
react 渲染器了解一下？ https://juejin.cn/post/6844903753242378248
React16、17、18版本新特性 https://blog.csdn.net/momei1942/article/details/129699873
React18: 并发控制的更好更灵活，定时器等异步函数setState批处理、Suspense 流式 html SSR、useTransition 延迟/过渡更新。

React Hooks
- 不优雅的 React Hooks https://zhuanlan.zhihu.com/p/455317250
- React Hooks 使用误区 https://zhuanlan.zhihu.com/p/450513902
- React Hooks 陷阱 https://mp.weixin.qq.com/s?__biz=MzIzMjcxNzE5MA==&mid=2247488097&idx=1&sn=e8a6d71d1c05c8be04c25b32af43fb09
- useLayoutEffect 和 useEffect 的区别 https://zhuanlan.zhihu.com/p/348701319
- [useReducer callback](https://github.com/facebook/react/issues/15344)

[PureComponent](https://reactjs.org/docs/react-api.html#reactpurecomponent)
- 父组件是 pure component，子组件也需要是 pure component。因为父组件的 state 和 props 保持不变时是不会重新渲染的，子组件也就不会重新渲染了。
- 除非碰到了性能问题，不然不要用 PureComponent。遇到性能问题，也可以通过自己定制 shouldComponentUpdate 来控制。
- 如果预期到某个组件的 props 或是 state 会「频繁变动」会导致多次对比，不用使用 PureComponent，因为这样反而会变慢。示例：
<!--
render() {
  // 每次传入的 style 都是一个新对象，Post 组件每次都需要 rerender
  return <Post item={item} style={{ 'width': 120 }} />;
} -->

- react 需要遍历或修改 children，要使用`React.Children.forEach / React.Children.map` 方法，而不要用`Array.isArray(children) / children.forEach`等方法。
- setState 是异步的 [示例](https://stackoverflow.com/a/45249445/2190503) 会引起不必要的 render。
- [3 Reasons why I stopped using React.setState](https://medium.com/@mweststrate/3-reasons-why-i-stopped-using-react-setstate-ab73fc67a42e#.o2lwoysxh) 


- [虚拟DOM Diff算法解析](http://www.infoq.com/cn/articles/react-dom-diff)
- [Dynamic Children - Why the Keys are Important](http://blog.arkency.com/2014/10/react-dot-js-and-dynamic-children-why-the-keys-are-important/)
- [真实 DOM 和 react 虚 dom 讨论](http://www.zhihu.com/question/31809713)
dom 对象是很庞大的（上边有很多属性），其创建的开销比较大，已有的 dom 对象上做更新开销并不大，众多框架都在围绕此做优化，比如用`key`是否变化来判断对 dom 的操作是 “更新” 还是 “销毁重建”。
dom批量更新：dom操作如，1.删除一个元素，2.增加一个元素，3.在增加的元素上改变一个属性。如果用 dom-api，会有多次 repaints reflows 比较耗性能。 如果放到「虚拟 dom」上操作，会把这三个过程最终的结果，一次更新到实际 dom 树上，只用操作一次实际 dom。 virtual-dom 里一次 digest 中的 diff 只需一次，但是会随着 ui 的规模复杂度，性能损耗严重。


redux

- reactive :: Action -> Model -> Model（Model, Side Effects(异步消息)）[elm-architecture](https://github.com/evancz/elm-architecture-tutorial/)
- React.js 本质：`(state, props) => state` (render :: Model -> UI)
- flux 本质：`(state, action) => state` (redux 的 reducer)。 不同的 component 维护许多各自不同 state，导致数据碎片化，flux 模式利用顶层 store 能解决这个问题。

- actions 其实就是 mutations，即 ui 或者 server 的 response。
- action creator 调用 dispatcher (passive)，传递 mutations。
    - dispatcher 是一个 pub-sub systems。
- store 监听 actions 再去 mutate data。
    - Only Store gets to decide how to update the data。
- component 监听 store。Views subscribe to the stores that contain the data that it needs。

[概念和数据流](https://cn.redux.js.org/tutorials/fundamentals/part-2-concepts-data-flow/)
[不可变的数据更新模式](https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns)

[UI state应该放到哪里？](https://github.com/rackt/redux/issues/595)
[Smart and Dumb Components](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0)、[Reactive programming vs Passive programming](https://vaibhavgupta.me/2017/12/31/reactive-programming-vs-passive-programming/)

redux & redux-saga 典型流程:
form 表单提交，触发 FORM_POST action，saga 里 `yield put` POST_SUCCESS 触发 action，改变页面状态或拉取新数据，触发 UI CHANGE 的 action，过程中用 `yield select` 从 state 里选取需要的参数。



## html css

https://httparchive.org/reports/page-weight [chromestatus](https://www.chromestatus.com/features)、[webkit](https://webkit.org/)、[chrome-experiments](https://experiments.withgoogle.com/collection/chrome)、[stateofjs](https://stateofjs.com/)、[stateofcss](https://stateofcss.com/)
html 规则检测 https://validator.w3.org 、 http://infohound.net/tidy
head 里能放什么 https://github.com/joshbuchea/HEAD
33-js-concepts https://github.com/leonardomso/33-js-concepts
tailwindcss https://tailwindcss.com/  https://www.iconfont.cn/
语言性能 jsperf / benchmarks
- css 时间函数 http://www.smashingmagazine.com/2014/04/15/understanding-css-timing-functions
- css 长度 https://css-tricks.com/the-lengths-of-css
  - 绝对长度: px inch cm mm。 rem: 相对 root 的 font-size 大小  em: 基于大写字母 M 的尺寸  ex: 基于 x 字母高度  1vh 等于 1/100 的视口高度
- [ua 检测](https://github.com/ded/bowser) / [特性检测](https://github.com/barisaydinoglu/Detectizr)
- https://github.com/Lissy93/web-check / [togetherjs](https://togetherjs.com/)
- https://developer.chrome.com/blog/introducing-popover-api/   Web Authentication 在Web上使用Touch ID和Windows Hello登录
- [URL 编码，为什么要编码？](http://anjia.github.io/2015/04/15/jsURIEncode/)
- 浏览器在自动选择编码方式的时候不会优先根据 html 源码中的所展示的`<meta charset="utf-8" />`代码来决定选择什么编码方式，而是优先根据“响应标头-response header”中的键为“Content-Type”的值来自动选择判断。


## browser

- [WebAssembly](https://juejin.im/entry/5b20d09d6fb9a01e242490b1)
不是一门编程语言，而是一份字节码标准。 各种复杂的计算：图像处理、3D运算(大型 3D 网页游戏)、语音识别、音视频编码解码。区块链合约。
[madewithwebassembly](https://madewithwebassembly.com/)、
eBay 的[条形码扫描](https://www.infoq.cn/article/vc*q7psQqWMaVU8igJeD)、
[Google earth web](https://earth.google.com/web/) 版、
[autocad](https://web.autocad.com/login) web 版

- [PWA](https://developers.google.com/web/progressive-web-apps/)
Service Worker 需要运行于 HTTPS 或本地 localhost 环境，是继 Web Worker 后又一个新的线程。来实现离线页面功能。 Service Worker 是独立于页面的一个运行环境，它在页面关闭后仍可以运行。Web Worker 在页面关闭后不再运行。

iframe 那些事 https://afantasy.ninja/2018/07/15/dive-into-iframe/
存在的问题：
- 移动端页面、打开(全屏)嵌入的 iframe 页面，点浏览器返回、返回不到业务页面、需要销毁 iframe。
- 浏览器刷新 iframe url 状态丢失、后退前进按钮无法使用。
- 里边 弹出框 的位置、难居中，浏览器 resize 时自动居中 更难处理。
- 主文档和 iframe 文档如果不同域、免登录处理麻烦，涉及 cookie 透传。
- 需要完全重新加载，比较慢。
- iframe 自适应高度：给定高度、内部滚动

https://github.com/es-shims/es5-shim
shim、sham 和 polyfill 之间的区别？
- es5-shim 完美模拟了所有 ES5 中可以被完美模拟的方法。就是说 ES5 中有些方法，是可以在旧 JS 引擎中完美模拟了，那么 shim 就完美模拟了它们。shim 不局限与浏览器环境，只要 JavaScript 引擎支持，代码即可运行。
- es5-sham 只承诺你用的时候代码不会崩溃，至于对应的方法是不是起作用它就不保证了。如果你要用的方法在 shim 中都包含了，那么就不需要 sham。sham 能不引用就不引用。sham 依赖 shim。
- IE8：只支持 ES3。

drag 事件 不支持 ie8、Safari 5.1 https://msdn.microsoft.com/library/hh673539(v=vs.85).aspx
ie<=9 只能对 a href="" 、img、文本 添加drag事件。 ie9上通过 selectstart hack方法对任何元素添加事件。
在ie<=8版本上，需要把dragenter/drageover/drop事件绑定到具体的元素上，而不能绑定到document做委托处理。
使用 drag-drop API的优势（相对于用mousedown/mousemove）：
- 如果拖动元素所在的容器尺寸小，拖动过程产生滚动条、会自动触发滚动条移动。
- 不用再clone出一个要拖动的元素；不用计算涉及到的元素的位置和尺寸。
传统拖动
- 在 touchstart / mousedown 中记录起始位置，并开始监听 touchmove touchend / mousemove mouseup
- 在 touchmove mousemove 中计算当前位置和起始位置之间的 offset，并进行拖拽操作
- 在 touchend mouseup 中取消监听 touchmove 和 touchstart，并进行释放操作

浏览器解析和CSS（GPU）动画优化 https://segmentfault.com/a/1190000008015671
- css 动画中尽量只使用 transform 和 opacity ，这不会发生重排和重绘。
- 有动画的元素样式，给定尺寸、设置为 display block（如果设置 display flex 子元素尺寸会动态变化、影响动画效果）







#
#
# 系统设置 / 软件

- 点击和手势: 触控板。1 勾选 “轻点来点按” 2 启用词典：查询与数据检测器 - 选择三指轻点 3 更多手势 - 应用Expose。
- 三指拖移窗口: 辅助功能 -> 鼠标与触控板 -> 触控板选项 -> 启用拖移 -> 三指拖移。
- 触发角: 调度中心 -> 触发角 (左上角:启动台, 左下角:显示器睡眠, 右上角:调度中心, 右下角:桌面)。
- 快捷键: 键盘 -> 快捷键 -> 输入法 选择 `cmd+空格`，在 “服务” 里勾选或不选。另可修改 App 的快捷键。
- dock: 程序坞 -> 不勾选 “在程序坞中显示最近使用的应用程序”(最后一项) 显示隐藏 `cmd+alt+d`。
- 通知: 通知中心 -> 勾选 “当显示器进入睡眠状态时/当屏幕锁定时”
- 系统顶部菜单栏: 按住 `Command` 再拖动图标，改变右边图标顺序。
- 文本替换: 键盘 -> 文本，「command + A」全选、拖拽到 Finder 会生成 “用户词典.plist” 的文件。
- Finder 设置
  - 列表视图 `cmd + 2` 展开所有子文件夹 `alt + 左边箭头`。
  - 按 `cmd + alt`，拖动 app 到工具栏。
- m1 外接显示器分辨率低: 显示器 -> 按住 Option 键的同时点击“缩放”。
- 快捷指令: iOS -> Apple ID -> iCloud -> 使用iCloud的APP -> 显示全部 找到 快捷指令 勾选同步。
- QuickLook: 搜索下载 QLMarkdown / QLStephen / QuickLookJSON 并放到 `~/Library/QuickLook` 或 `/Library/QuickLook` 目录。如果不生效、`killall Finder` 重启 Finder。
- [添加快捷键](https://superuser.com/a/1260437)
- 查看ip地址: 设置 - wifi - 详细信息。

- AppCleaner / iZip Unarchiver / Paste(收费) Clipy Maccy CopyClip / iStat-Menus / hidden-bar Vanilla Dozer / Smoothscroll / ngrok inlets(GitHub) / webtorrent-desktop / https://snapdrop.net / https://archive.org/web / https://github.com/CrossPaste/crosspaste-desktop

- xnip snipaste lightshot (snip) / licecap (kap gifify) / UPDF(pdf编辑) / Readiris-ocr / any-video-converter(在线 online-audio-converter.com) / XnConvert(图像处理) / Movist (IINA) / ExifRenamer(重命名图片) / ExifTool [exifr](https://mutiny.cz/exifr/) / HandBrake / MKVToolnix(mkv字幕抽取) / perian(QuickTime 插件) / aria2 / NeatDownloadManager / extract-video-ppt

- 欧路词典: 修改 ~/Library/Preferences/ com.eusoft.eudic.plist 修改 MAIN_TimesLeft：允许使用次数(任意改) 10000000 重启 （更新 [notion](https://www.notion.so/Eudic-Mac-0b5e993809794576868714f613f637ff)、百度网盘下载 再升级）
- 视频字幕类型有三种：内嵌字幕、外挂字幕、封装软字幕。可以视频转为音频、再提取字幕。 字幕下载 https://subhd.tv  剪映 / 钉钉闪记 / B站必剪 / 迅捷文字转语音。 Subtitle Edit / Aegisub / Subtitle Workshop / HandBrake / FFmpeg
- 如何下载HLS视频到本地？https://www.zhihu.com/question/35564371/answer/694240638  https://www.downloadhelper.net

- 文件传输: https://snapdrop.net/  https://easychuan.cn/  https://www.wenshushu.cn/  https://github.com/schollz/croc
- Mac smb 文件共享(速度约1M/s较慢): 在需要共享文件的 Mac 上打开「系统偏好设置-共享-文件共享」会显示类似 smb://192.168.1.9 的共享地址。在另一台 Mac 上打开访达，在菜单栏选择「前往-连接服务器」。在 iPhone 或 iPad 打开「文件」App，点击右上角选项图标，选择「连接服务器」。 另外搭建 ftp 服务器共享文件。

- virtualbox win7 [如图](https://gw.alipayobjects.com/zos/rmsportal/auNTgeEEHVFfWklRjRsK.png)、在家里网络正常，但很奇怪在公司内网不能连接？？
- [虚拟机里的 win 键盘是用的 ctrl 键](https://forums.virtualbox.org/viewtopic.php?f=8&t=63567&hilit=keyboard)

- Android软件: MX播放器(VLC不能播放加密文件)  微动手势(允许后台弹出界面和显示悬浮窗), automate, quick cursor, kwgt, popup widget, macrodroid, tasker(收费), easytouch, anywhere。
- Android 反编译 apk 工具：apktool / dex2jar / jd-gui / <http://www.javadecompilers.com/> (在线工具)
- iOS快捷指令 朗读的 声音大小和siri一样，不受设置里声音大小的控制，通过设置 Siri 的声音来控制。

- 小米多看电纸书[一代](https://item.jd.com/100010633100.html)、安装app[方法](https://www.bilibili.com/video/av893445949/)
- 支持 Mac + Win 读写的U盘格式: exFAT FAT32 NTFS(软件 ntfstool / ParagonNTFS )。
- 2024-04 [Win系统安装盘](https://zhuanlan.zhihu.com/p/273305963)、系统[下载地址](https://hellowindows.cn/)，电脑开机(按F12)设置U盘优先启动。

[macOS Sierra 安装 opencv 最简单方法](http://www.pyimagesearch.com/2016/12/19/install-opencv-3-on-macos-with-homebrew-the-easy-way/)

[Bookmarklet](https://en.wikipedia.org/wiki/Bookmarklet)
- https://make-bookmarklets.com/
- 需要保存为书签 `javascript:(function(){var baseUrl="https://web.archive.org/web/*/",urlmod=document.URL;window.location.href=baseUrl+urlmod;}());`

markdown 表情 :+1: :smile: :smiley: :laughing:
- 可直接复制 https://emoji8.com/zh-hans/
- [emoji-cheat-sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet/)
- [Emoji Unicode Tables](http://www.unicode.org/emoji/charts/full-emoji-list.html)
- [asciiart](https://asciiart.website) [figlet](http://www.figlet.org/examples.html) [text-to-ascii-art](https://www.asciiart.eu/text-to-ascii-art)
[学英语](https://earthworm.cuixueshe.com/)

多设备共享vpn网络：
- 代理模式 https://www.youtube.com/watch?v=xTzubV8-PwM
- 手机当网关路由 https://www.youtube.com/watch?v=H4g1y3ZMWaw
- [安卓手机充当软路由](https://www.youtube.com/watch?v=r6nXCgYkXTQ) [网络链路](https://how-did-i-get-here.net/)


## 终端代理
> 2015 ~ 2024

```sh
# 直接在 ClashX 菜单里复制
export https_proxy=http://127.0.0.1:7890 http_proxy=http://127.0.0.1:7890 all_proxy=socks5://127.0.0.1:7890
# 设置别名
alias proxy="export http_proxy=http://127.0.0.1:1087;export https_proxy=http://127.0.0.1:1087;"
```

测试代理是否成功: `curl -v x.com` 不能用 ping
> ping 使用的是ICMP协议，ICMP处于网络层(第三层)，而SOCKS5是传输层代理协议(第四层)，HTTP和HTTPS是应用层协议(第五层或者第七层)，协议层不同是无法代理的。

> 可选: 终端代理 `brew install proxychains-ng` 修改 /usr/local/etc/proxychains.conf 配置文件“末尾”部分内容 `#socks4  127.0.0.1 9050` 改为 `socks5  127.0.0.1 1080`。 使用 `proxychains4 -q curl https://www.google.com` 测试是否成功，不成功则需要关闭 sip
> SwitchyOmega 自动刷新后 二次访问成功，[问题跟踪](https://github.com/FelisCatus/SwitchyOmega/issues/1511#issuecomment-433313269)


## clash

[clash文档](https://a76yyyy.github.io/clash/zh_CN/)
> 远程控制：菜单 -> 控制台 -> 右键 -> 检查元素 -> 查看网络 -> 端口和秘钥 (或者 设置 -> Api端口/秘钥)
> 在浏览器打开 `http://127.0.0.1:58147/ui/#/proxies`

绕过微信客户端网络限制/相关域名ip走proxy:
- 先设为“全局模式”,点击Clash“控制台”,查看“日志”。
- 在微信客户端里 发送文字和图片，查看抓包的相关域名和ip，用 https://db-ip.com 验证微信ip网段
  - 登录和收发文字: qq.com / wechat.com / tenpay.com
  - 收发图片: 43.153.165.235:80 / 43.175.127.21:443
  - 豆包搜索"xx.0到xx.255怎么配置IP-CIDR"，或者[ip网段计算器](https://www.calculator.net/ip-subnet-calculator.html)
  - 最终规则类似 `SRC-IP-CIDR,43.175.127.0/24,Proxy`
- 在Clash配置文件"rules"添加规则。


获取 DNS服务器 设置:
```sh
scutil --dns
cat /etc/resolv.conf
networksetup -getdnsservers Wi-Fi
networksetup -getdnsservers Ethernet
```

code ~/.config/clash/config.yaml

```yaml
# port: 7890
# socks-port: 7891
mixed-port: 7890
allow-lan: false
mode: Rule
log-level: info
external-controller: 127.0.0.1:9090
secret: ""
dns:
  enable: true
  ipv6: false
  use-hosts: true
  default-nameserver: [223.5.5.5, 119.29.29.29]
  nameserver: ['https://doh.pub/dns-query', 'https://dns.alidns.com/dns-query']
  enhanced-mode: fake-ip
  fake-ip-range: 198.18.0.1/16
  # 集合 fallback 配置 公司内网 DNS服务器 地址，通过 cat /etc/resolv.conf 获取
  fallback: ['https://doh.dns.sb/dns-query', 'https://dns.cloudflare.com/dns-query', 'https://dns.twnic.tw/dns-query', 'tls://8.8.4.4:853']
  fallback-filter: { geoip: true, ipcidr: [240.0.0.0/4, 0.0.0.0/32] }
  # nameserver:
  #   - 180.76.76.76
  #   - 117.50.11.11
  #   - 117.50.10.10
  #   - 114.114.114.114
  #   - https://dns.alidns.com/dns-query
  #   - https://doh.360.cn/dns-query
  # fallback:
  #   - 8.8.8.8
  #   - tls://dns.rubyfish.cn:853
  #   - tls://1.0.0.1:853
  #   - tls://dns.google:853
  #   - https://dns.rubyfish.cn/dns-query
  #   - https://cloudflare-dns.com/dns-query
  #   - https://dns.google/dns-query
  # fallback-filter:
  #   geoip: true
  #   ipcidr:
  #     - 240.0.0.0/4
  #     - 0.0.0.0/32
  #     - 127.0.0.1/32
  #   domain:
  #     - +.google.com
  #     - +.facebook.com
  #     - +.youtube.com
  #     - +.xn--ngstr-lra8j.com
  #     - +.google.cn
  #     - +.googleapis.cn
  #     - +.gvt1.com
rules:
  # 微信客户端
  - DOMAIN-SUFFIX,weixin.qq.com,Proxy
  - DOMAIN-SUFFIX,qq.com,Proxy
  - DOMAIN-SUFFIX,wechat.com,Proxy
  - DOMAIN-SUFFIX,tenpay.com,Proxy
  - SRC-IP-CIDR,43.175.127.0/24,Proxy
  - SRC-IP-CIDR,43.153.165.0/24,Proxy
  # 其他
  - DOMAIN-SUFFIX,yuque.com,Proxy
  - DOMAIN-SUFFIX,baidu.com,DIRECT
  - DOMAIN-SUFFIX,local,DIRECT
  - DOMAIN-SUFFIX,cn,DIRECT
  - DOMAIN-SUFFIX,stat.com,REJECT
  - 'DOMAIN-KEYWORD,google,Proxy'
  - DOMAIN-KEYWORD,umeng,REJECT
  - DOMAIN-KEYWORD,-cn,DIRECT
  - DOMAIN-KEYWORD,amazon,Proxy
  - DOMAIN-KEYWORD,android.com,Proxy
  - DOMAIN-KEYWORD,google,Proxy
  - DOMAIN-KEYWORD,gmail,Proxy
  - DOMAIN-KEYWORD,youtube,Proxy
  - DOMAIN-KEYWORD,facebook,Proxy
  - DOMAIN-KEYWORD,github,Proxy
  - DOMAIN-KEYWORD,twitter,Proxy
  - DOMAIN-KEYWORD,instagram,Proxy
  - DOMAIN-KEYWORD,whatsapp,Proxy
  - DOMAIN,e.crashlytics.com,REJECT
  - DOMAIN,safebrowsing.urlsec.qq.com,DIRECT
  - DOMAIN,cdn.hockeyapp.net,DIRECT
  - IP-CIDR,91.108.4.0/22,Proxy,no-resolve
  - IP-CIDR,91.108.8.0/22,Proxy,no-resolve
  - IP-CIDR,91.108.12.0/22,Proxy,no-resolve
  - IP-CIDR,91.108.16.0/22,Proxy,no-resolve
  - IP-CIDR,91.108.56.0/22,Proxy,no-resolve
  - IP-CIDR,149.154.160.0/22,Proxy,no-resolve
  - IP-CIDR,149.154.164.0/22,Proxy,no-resolve
  - IP-CIDR,149.154.168.0/22,Proxy,no-resolve
  - IP-CIDR,149.154.172.0/22,Proxy,no-resolve
  - IP-CIDR,127.0.0.0/8,DIRECT
  - IP-CIDR,172.16.0.0/12,DIRECT
  - IP-CIDR,192.168.0.0/16,DIRECT
  - IP-CIDR,10.0.0.0/8,DIRECT
  - IP-CIDR,100.64.0.0/10,DIRECT
  - IP-CIDR,17.0.0.0/8,DIRECT
  - GEOIP,CN,DIRECT
  - MATCH,Proxy
proxies:
  - name: 有效期2025/07/03,剩余:94.71GB
    type: trojan
    server: iplc-hk-beta1.trojanwheel.com
    port: 5001
    password: t35s7HJckbpEZb7N6t
    alpn:
      - h2
      - http/1.1
    skip-cert-verify: true
  - name: 香港-IPLC-HK-BETA1-流量倍率:1.0
    type: trojan
    server: iplc-hk-beta1.trojanwheel.com
    port: 5001
    password: t35s7HJckbpEZb7N6t
    alpn:
      - h2
      - http/1.1
    skip-cert-verify: true
  - name: 香港-IPLC-HK-BETA2-流量倍率:1.0
    type: trojan
    server: iplc-hk-beta2.trojanwheel.com
    port: 5002
    password: t35s7HJckbpEZb7N6t
    alpn:
      - h2
      - http/1.1
    skip-cert-verify: true
  - name: 香港-IPLC-HK-BETA3-流量倍率:1.0
    type: trojan
    server: iplc-hk-beta3.trojanwheel.com
    port: 5003
    password: t35s7HJckbpEZb7N6t
    alpn:
      - h2
      - http/1.1
    skip-cert-verify: true
proxy-groups:
  - name: Proxy
    type: select
    proxies:
      - Auto
      - 有效期2025/07/03,剩余:94.71GB
      - 香港-IPLC-HK-BETA1-流量倍率:1.0
      - 香港-IPLC-HK-BETA2-流量倍率:1.0
      - 香港-IPLC-HK-BETA3-流量倍率:1.0
  - name: Auto
    type: url-test
    url: http://www.gstatic.com/generate_204
    interval: 300
    proxies:
      - 有效期2025/07/03,剩余:94.71GB
      - 香港-IPLC-HK-BETA1-流量倍率:1.0
      - 香港-IPLC-HK-BETA2-流量倍率:1.0
      - 香港-IPLC-HK-BETA3-流量倍率:1.0
```


## ttyd

安装 web shell [ttyd](https://github.com/tsl0922/ttyd) 基于 xtermjs

```sh
brew install ttyd
# http://localhost:7681 默认端口 打开 zsh/bash
ttyd -W -a zsh / bash
# http://localhost:9999 自动运行 top 命令
ttyd -p 9999 -W top
ttyd -p 9999 -W --once top  # 网页关闭 命令也自动停止
# 测试参数
ttyd -p 9999 -W -a ./test.sh
# http://localhost:9999/?disableLeaveAlert=true&arg=aa&arg=bb
ttyd -p 9999 -W -a zsh
# http://localhost:9999/?disableLeaveAlert=true&arg=./test.sh&arg=aa&arg=bb
```

使用 nohup 和 & 后台运行命令

```sh
#!/bin/sh
# nohup long_running_command &
nohup ttyd -p 9999 -W top &  # 后台运行
timeout 3600 some-command
```

进程守护工具 supervisor
> https://soulteary.com/2023/03/12/stable-web-terminal-services-using-docker-nginx-and-ttyd.html
> https://gist.github.com/fadhlirahim/78fefdfdf4b96d9ea9b8
> https://gist.github.com/Pezhvak/297b058d9c449b39d321409cd041899c
> https://github.com/Supervisor/supervisor/issues/1514

- `mkdir /usr/local/etc/supervisor.d && touch $_/my_conf.ini`
- `(open -e)code /usr/local/etc/supervisor.d/my_conf.ini` 文件内容如下：
```sh
[program:ttyd]
directory = /Users/hua/
command = ttyd -W -a zsh
autostart = true
startsecs = 10
autorestart = true
startretries = 100000
stdout_logfile = /tmp/ttyd.log
```
- 运行 `sudo supervisorctl reread && sudo supervisorctl update`
- 验证 `ps -ef | grep ttyd`
- 电脑重启后运行 `sudo supervisord -c /usr/local/etc/supervisord.conf`


## scrcpy adb

电脑控制手机 https://www.zhihu.com/question/46795475 、 anydesk 体验不错、但不能远程操作iPhone，国产抄袭版 todesk 会卡死，Wormhole虫洞 利用 iPhone 的辅助功能-触控 能被三方控制功能实现远程操作、但体验很差。

- https://github.com/Genymobile/scrcpy/blob/master/doc/shortcuts.md
- https://github.com/Genymobile/scrcpy/blob/master/doc/connection.md#tcpip-wireless
- 第一次电脑和手机需要usb线链接，手机打开“开发者选项和usb调试”。
- 手机开发者选项: 建议打开 停用adb授权超时功能(disable ADB authorization timeout)。

```sh
# scrcpy --tcpip  # 插入usb线时、先设置无线连接，之后不用插入usb线、通过具体ip地址链接。
# scrcpy --tcpip=10.94.62.181  # 如果ip正确但也连不上 删掉ip 插上线。
scrcpy --shortcut-mod=lctrl --stay-awake --turn-screen-off -m1024 -b2M --tcpip=10.94.62.181
```

- 其他选项 --select-usb  --max-fps 15 --max-size 960
- 快捷键: ctrl p(开电源) o(关屏幕) h(主屏幕) ↑(音量) nn(通知/设置)
- 其他 https://github.com/Uj947nXmRqV2nRaWshKtHzTvckUUpD/ethernally

adb 自动化: https://blog.ferstar.org/post/use-tasker-do-some-funny-things/

```sh
adb -s emulator-5554 shell input text 'my%stext'
# 如果有空格、特殊字符等, 会报错: Error: Invalid arguments for command: text usage: input ...
# 对这些字符 ( ) < > | ; & * \ ~ " ' 加上反斜杠 \ 转义, 空格用 %s 转义

# adb 解锁 android 手机
# https://stackoverflow.com/questions/30402582/how-to-verify-android-device-screen-on-or-off-using-adb-shell-command

screenState=$(adb shell dumpsys nfc | grep -e 'mScreenState=' -e 'Screen State:' | tr : = | cut -d '=' -f2)
if [ "$screenState" == "OFF_LOCKED" ] ; then
  echo "Screen is off. Turning on."
  adb shell input keyevent 26 # wakeup
  sleep 0.8
  adb shell input touchscreen swipe 540 1000 540 500 # unlock bottom->top
  sleep 0.8
  adb shell input text 0000 # pin
  echo "OK, should be on now."
else
  echo "Screen is already on. Locking."
  adb shell input keyevent 26
fi
```


## Apache

出现 403 You dont have permission to access 错误， 修改 路径下 各级目录 权限 everyone 为 “只读”，再重启。
默认设置，不能浏览目录、只能访问目录下的文件，比较安全。

生成自签名证书
```sh
sudo mkdir /etc/apache2/ssl
cd /etc/apache2/ssl
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout localhost.key -out localhost.crt
```

操作
```sh
httpd -v # 查看版本号
sudo apachectl restart / start / stop   # 开关重启
code /etc/apache2/httpd.conf  # 编辑 Apche 的配置文件
# http://localhost  https://localhost
```

httpd.conf 文件配置
```sh
# Apache 通过 <Directory> 指令控制特定目录的访问权限。
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
    Header set Access-Control-Allow-Methods "GET, POST, OPTIONS, PUT, DELETE"
    Header set Access-Control-Allow-Credentials: true
</Directory>
<VirtualHost *:80>
  <FilesMatch "\.(md|cpp|php)$">
    AddDefaultCharset utf-8
    Header always set Content-Type "text/plain; charset: utf-8"
  </FilesMatch>
</VirtualHost>

# 打开 https://localhost 支持
# 取消注释 LoadModule ssl_module libexec/apache2/mod_ssl.so
Listen 443
<VirtualHost *:443>
    ServerName localhost
    DocumentRoot "/Users/hua/inner"
    SSLEngine on
    SSLCertificateFile "/etc/apache2/ssl/localhost.crt"
    SSLCertificateKeyFile "/etc/apache2/ssl/localhost.key"
    ErrorLog "/private/var/log/apache2/error_log"
    CustomLog "/private/var/log/apache2/access_log" common
</VirtualHost>

Listen 9999
<VirtualHost *:9999>
  ServerName me.com
  DocumentRoot "/Users/hua/Downloads"
  <Directory "/Users/hua/Downloads">
      Options Indexes FollowSymLinks MultiViews
      MultiviewsMatch Any
      AllowOverride None
      Require all granted
  </Directory>
</VirtualHost>
```

如果目录中存在 .htaccess 文件，检查其中是否有配置禁止访问。比如有 Deny from all


## git 配置

生成 ssh key 推拉代码
```sh
ssh-keygen -t ed25519 -C hualei.hl@xx-inc.com
ssh-add ~/.ssh/id_ed25519
# 再把 ~/.ssh/id_ed25519.pub 文件内容添加到 gitlab

# 配置 ssh 走 clash 代理， code ~/.ssh/config
Host github.com
  ProxyCommand nc -X connect -x 127.0.0.1:7890 %h %p
```

全局默认设置 code ~/.gitconfig  内部 name email
```sh
[alias]
  st = status
  co = checkout
  ci = commit
  br = branch
[user]
  name = 然则
  email = hualei.hl@xx-inc.com
[includeIf "gitdir:~/inner/-/"]
    path = .gitconfig-github
```
code ~/.gitconfig-github 文件 给特定目录 设置个人 name email
```sh
[user]
  name = warmhug
  email = hualei5280@gmail.com
```

## zsh(rc)

`code ~/.zshrc` 文件

- zsh模版 https://github.com/robbyrussell/oh-my-zsh/blob/master/templates/zshrc.zsh-template
- 参考 git 插件 https://github.com/ohmyzsh/ohmyzsh/blob/master/plugins/git/git.plugin.zsh
- 覆盖内部命令 https://github.com/ohmyzsh/ohmyzsh/wiki/Customization#overriding-internals
  - 比如 lib/directories.zsh 里的 alias 1='cd -1' 不需要

```sh
#export PS1="\u \w$"
ZSH_DISABLE_COMPFIX="true"
export ZSH=$HOME/.oh-my-zsh
ZSH_THEME="ys"  # Look in ~/.oh-my-zsh/themes/
# plugins=(git)  # Look in ~/.oh-my-zsh/plugins/*
source $ZSH/oh-my-zsh.sh
# brew install autojump
# [ -f /usr/local/etc/profile.d/autojump.sh ] && . /usr/local/etc/profile.d/autojump.sh

export PATH=$HOME/bin:/usr/local/bin:$PATH
export EDITOR='vim'

export HOMEBREW_BOTTLE_DOMAIN=http://7xkcej.dl1.z0.glb.clouddn.com  # homebrew 加速
export PATH="/usr/local/opt/ruby/bin:$PATH"

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

# 不建议用 source https://github.com/ohmyzsh/ohmyzsh/wiki/FAQ
# alias sz='source ~/.zshrc'
alias sz='exec zsh'
alias cz='code ~/.zshrc'
[ -s "$HOME/inner/-/aa/_sh" ] && \. "$HOME/inner/-/aa/_sh"
```


## Charles whistle
> 2019 2024

[whistle](https://wproxy.org/) 规则配置: `https://aa.bb.xx 127.0.0.1:28064 excludeFilter://^/service`

Charles

- 注意
  - 公司里默认安装的vpn软件、公司wifi的代理选项默认会打开“自动发现代理”的配置，需要关闭后、才能使用Charles代理。
  - 使用没有 被设置代理的 浏览器（比如 Chrome **翻墙代理需要关掉**）
- HTTPs 支持：
   - Help -> SSL Proxying -> Install Charles Root Certificate (挨着的 **模拟器** / **手机 **证书都装)
      - 注意：**手机上安装的 证书 和 连接的 mac 电脑要匹配。使用新电脑需要重新给手机安装证书。**
   - 在 macOS 钥匙串访问 里信任证书，iOS 设置里信任证书。
   - 菜单 Proxy -> Proxy Setting -> Port: 8888 /
   - 菜单 Proxy -> SSL Proxying Settings -> SSL Proxying -> add -> Host: *  Port: 443
   - 在 iOS (**不用连数据线**) WiFi 设置 HTTP 代理，服务器输入 电脑 ip、端口 8888
- 其他：
   - 关闭 mac 端包的抓取：菜单 Proxy 将 maxOS Proxy 取消选中 （这样 iOS 模拟器里也抓不了）
   - 抓取支付宝 RPC 请求：支付宝 可切换环境包 设置关闭 mmtp 开关
   - 映射本地 js 文件、调试代码：菜单 Tools -> Map Remote / Map Local…
   - 拦截请求：菜单 Tools -> Rewrite -> 勾选 Enable Rewrite -> Add -> Add -> Rewrite Rule -> Type 选 URL, Where 勾选 Request, Match Value 填 `http(s?):\/\/aa.bb.xx\/(?!(service)\/)`勾选Regex , Replace value 填 `https://127.0.0.1:28064/` 勾选 Replace all
   - （点击配置框的问号、发现是使用的 Perl-style regular expressions）


# archive

- 2022 ~ 2024
  - 2024 ByteDance & P.D
  - 2022/2023 ByteDance Slardar / Argos
- 2019 ~ 2022
  - 2021 worklog calendar
  - 2019/2020 tfox / react-hooks
- 2014 ~ 2019
  - 2018/2019 focus biz
  - 2017 python / cpp / AI
  - 2015/2016 android / java / web-api / linux / php-ksweb
  - antd antd-mobile / react typescript webpack jest node / anta
  - 2014 Laputa / angular
- 2012 music_app: underscore backbone less / zepto mustache seajs arale
- 2011 game / jQuery / 兼职:广告公司/方远房产

> antd-mobile 旧 demo 备份
> - antd_custom_ui move from https://github.com/warmhug/__/tree/master/_react/antd_custom_ui to > https://github.com/ant-design/antd-mobile-samples/tree/master/web-custom-ui
> - antd-mobile + TypeScript move from https://github.com/warmhug/__/tree/master/_react/antd-ts > to https://github.com/ant-design/antd-mobile-samples/tree/master/web-typescript
> - antd-mobile demo move to https://github.com/ant-design/antd-mobile-samples/tree/master/web-webpack
