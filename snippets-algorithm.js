
/**
  base
*/
// 冒泡排序 时间复杂度 O(n²)
function bubbleSort(arr) {
  let _count = 1;
  for (let i = arr.length - 1; i > 0; i--) {
    for (let j = 0; j < i; j++) {
      console.log('for _count', _count++);
      if (arr[j] > arr[j + 1]) {
        // 交换次数 最多 n(n-1)/2
        // swap(arr, j, j + 1);
        [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]];
      }
    }
  }
  return arr;
}
// 冒泡排序优化 对已排序的做标记、只排序未排的部分
function bubbleSort1(arr) {
  let _count = 1;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i; j++) {
      // 循环次数
      console.log('for _count', _count++);
      if (arr[j] < arr[j + 1]) {
        // 交换次数 最多 n(n-1)/2
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];//交换位置
      }
    }
  }
  return arr;
}
// test
var arr = [91, 60, 96, 7, 35, 65, 10];
console.log(bubbleSort(arr));

// 快排 https://juejin.cn/post/6844903938290876430
function quickSort(rawArr = []) {
  if (rawArr.length <= 1) { return rawArr; }
  // 排除掉分界点元素
  const leftArray = rawArr.filter((item, i) => item >= rawArr[0] && i !== 0);
  const rightArray = rawArr.filter(item => item < rawArr[0]);
  console.log('exec', leftArray, rightArray);
  return [...quickSort(leftArray), rawArr[0], ...quickSort(rightArray)];
}
var arr = [2,3,1,5,0];
console.log(quickSort(arr));


// 爬楼梯 f(x)=f(x−1)+f(x−2)
// 斐波那契数列：前面相邻两项之和，构成了后一项。
// [0, 1, 1, 2, 3, 5, 8, 13]
function fibArr(n) {
  const fibs = [];
  let [pre, cur] = [0, 1];
  // 空间复杂度 O(1) 滚动数组法？ 动态规划法？
  for (let index = 1; index < n; index++) {
    [pre, cur] = [cur, pre + cur];
    fibs.push(cur);
  }
  return fibs;
}
console.log(fibArr(10));
// 爬楼梯
function climbStairs(n) {
  const fibs = [1, 2];
  // 空间复杂度 O(n) 动态规划法
  for (let index = 2; index < n; index++) {
    fibs[index] = fibs[index - 1] + fibs[index - 2];
  }
  return fibs;
}

function fibonacci(n) {
  if (n <= 2) {
    return 1;
  } else {
    const num = fibonacci(n - 1) + fibonacci(n - 2);
    return num;
  }
}
console.log(fibonacci(10));

// leetcode 1. 两数之和  暴力破解法、hash 表法
var twoSum = function(nums, target) {
  if (!nums || !nums.length) return;
  const hashObj = {};
  for (let index = 0; index < nums.length; index++) {
    const num = nums[index];
    const hasVal = hashObj[target - num];
    if (hasVal) {
      return [hasVal, index];
    }
    hashObj[num] = index;
  }
};
console.log('twoSum', twoSum([1,2,3,7,11,15], 9));

// 876. 链表的中间结点

// 136. 只出现一次的数字  位运算异或 时间复杂度：O(n)，空间复杂度：O(1)

// 172. 阶乘后的零

// leetcode 209. 长度最小的子数组
// https://github.com/azl397985856/leetcode/blob/master/problems/209.minimum-size-subarray-sum.md

// 汉诺塔问题 https://blog.csdn.net/lizhengxv/article/details/80043809

// 20. 有效的括号 https://leetcode-cn.com/problems/valid-parentheses/

// 53. 最大子序和

// https://leetcode-cn.com/problems/length-of-longest-fibonacci-subsequence/
// 动态规划 https://juejin.cn/post/6951922898638471181
// 状态转移方程: 新加入一个元素nums[i], 最长递增子序列要么是以nums[i]结尾的递增子序列，要么就是nums[i-1]的最长递增子序列。
// 最长斐波那契子序列
var lenLongestFibSubseq = function (arr) {
  const len = arr.length;
  let ans = 0;
  const map = arr.reduce((pre, item, index) => ({
      ...pre,
      [item]: index + 1,
  }), {});
  // dp数组初始化为2
  const dp = new Array(len).fill().map(() => new Array(len).fill(2));
  console.log('map', map, dp);
  for (let j = len - 1; j >= 1; j--) {
      for (let i = j - 1; i >= 0; i--) {
          const sum = arr[i] + arr[j];
          if (map[sum]) {
            dp[i][j] = dp[j][map[sum] - 1] + 1;
          }
          ans = Math.max(dp[i][j], ans);
      }
  }
  return ans > 2 ? ans : 0;
};
const arr1 = [1,3,7,11,12,14,18]
// const arr1 = [1,2,3,4,5,6,7,8];
console.log(lenLongestFibSubseq(arr1));




/**
  traverse
*/

// https://segmentfault.com/a/1190000004620352
// 二叉树 前中后序遍历  数组表示法 [3,9,20,null,null,15,7]
var binaryTree = {
  value: 1,
  left: {
    value: 2,
    left: {
      value: 4,
    }
  },
  right: {
    value: 3,
    left: {
      value: 5,
      left: {
        value: 7,
      },
      right: {
        value: 8,
      },
    },
    right: {
      value: 6,
    }
  }
};
var levelTraverse = function (root) {
  if (!root) {
    return;
  }
  const que = [root];
  while(que.length) {
    const node = que.shift();
    console.log('current node', node.value);
    if (node.left) {
      que.push(node.left);
    }
    if (node.right) {
      que.push(node.right);
    }
  }
};
levelTraverse(binaryTree);

// 前序遍历 根左右
var preOrder = function (root) {
  if (!root) {
    return;
  }
  console.log('pre current node', root.value);
  preOrder(root.left);
  preOrder(root.right);
}
preOrder(binaryTree);
var preOrderUnRecur = function (root) {
  if (!root) {
    return;
  }
  const stack = [root];
  while (stack.length) {
    const node = stack.pop();
    console.log('preUn current node', node.value);
    if (node.right) {
      stack.push(node.right);
    }
    if (node.left) {
      stack.push(node.left);
    }
  }
}
preOrderUnRecur(binaryTree);

// 中序遍历 左根右
var inOrder = function (root) {
  if (!root) {
    return;
  }
  inOrder(root.left);
  console.log('in current node', root.value);
  inOrder(root.right);
}
inOrder(binaryTree);

// 后序遍历 左右根
var postOrder = function (root) {
  if (!root) {
    return;
  }
  postOrder(root.left);
  postOrder(root.right);
  console.log('post current node', root.value);
}
postOrder(binaryTree);

// leetcode 104. 二叉树的最大深度
var maxDepth = function (root) {
  if (!root) {
    return 0;
  }
  var lh = maxDepth(root.left);
  var rh = maxDepth(root.right);
  console.log('lr', lh, rh);
  return Math.max(lh, rh) + 1;
}
console.log('maxDepth', maxDepth(binaryTree));


const data = {
  id: 0,
  children: [
    { id: 1, children: [{ id: 3 }, { id: 4 }]},
    { id: 2 }
  ]
};

// dfs(data) // [0, 1, 3, 4, 2]
// bfs(data) // [0, 1, 2, 3, 4]

/**
 * 怎么生成 类似以下结构的 tree 数据？(注意 id 的值需要反馈节点所在树的位置)
 [{
    id: '0',
    children: [{
      id: '0-0',
      children: [{
        id: '0-0-0',
      }, {
        id: '0-0-1'
      }]
    }, {
      id: '0-1'
    }]
  }]
  * 再写出 用 广度优先(BFS) 和 深度优先(DFS) 遍历以上树的方法？
  */
// 生成 treeData 方法
function generateTree(
  x = 3, // x: 每一级下的节点数
  y = 2, // y: 每级节点数里有 y 个节点、存在子节点 (y < x)
  z = 1 // z: 树的 level 层级数（0表示只有一级）
) {
  const treeData = [];
  function _loop(level, preKey = "0", nodes = treeData) {
    const _level = level - 1;
    if (level < 0) {
      return nodes;
    }
    for (let i = 0; i < x; i++) {
      const key = `${preKey}-${i}`;
      if (i < y) {
        nodes.push({ id: key, children: _loop(_level, key, []) });
      } else {
        nodes.push({ id: key });
      }
    }
    return nodes;
  }
  _loop(z);
  return treeData;
}
const tree = generateTree(3, 2, 2);
console.log(tree);

// BFS
function traverseBFS(callback, treeData) {
  let queue = [...treeData];
  while (queue.length) {
    const node = queue.shift();
    if (callback(node.id)) {
      return node;
    }
    queue = queue.concat(node.children);
  }
  return null;
}
console.log(traverseBFS(id => id === "0-0-1", tree));

// DFS
let selNode = "";
function traverseDFS(callback, treeData) {
  const stack = [...treeData];
  for (let index = 0; index < stack.length; index++) {
    const node = stack[index];
    if (callback(node.id)) {
      selNode = node;
    }
    if (node.children && node.children.length) {
      traverseDFS(callback, node.children);
    }
    // return node;
  }
}
traverseDFS(id => id === "0-0-1", tree);
console.log(selNode);


function getLeafCount(data) {
  if (!data.children) {
    return 1;
  }
  let count = 0;
  for (let index = 0; index < data.children.length; index++) {
    count += getLeafCount(data.children[index]);
  }
  return count;
}
console.log(getLeafCount({ id: 0, children: tree }));







/*
tree 遍历算法： 广度优先和深度优先
Tree Traversal（BFS vs. DFS）：http://kevhuang.com/tree-traversal/
https://stackoverflow.com/a/33704700/2190503
库：http://aaronstacy.com/t-js/
*/
function unflatten(array, parent, tree) {
  tree = typeof tree !== 'undefined' ? tree : [];
  parent = typeof parent !== 'undefined' ? parent : { id: 0 };
  var children = array.filter(child => child.parentid == parent.id);
  if (children.length) {
    if (parent.id == 0) {
      tree = children;
    } else {
      parent['children'] = children;
    }
    children.forEach(child => unflatten(array, child));
  }
  return tree;
}

function unflatten1(array, parent = { id: 0 }) {
  var children = array.filter(child => child.parentid == parent.id);
  if (children.length) {
    parent['children'] = children;
    children.forEach(child => unflatten1(array, child));
  }
  if (parent.id == 0) {
    return children;
  }
}

// improve performance
function unflatten2(array, parent = { id: 0 }) {
  const children = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i].parentid === parent.id) {
      children.push(array[i]);
      array.splice(i--, 1);
    }
  }
  if (children.length) {
    parent['children'] = children;
    children.forEach(child => unflatten2(array, child));
  }
  if (parent.id == 0) {
    return children;
  }
}

function findPath(obj, id) {
  let node = obj[id];
  const path = [];
  while(node) {
    path.push(node.id);
    node = obj[node.parentid];
  }
  return path;
}

function trackParent(array) {
  array.forEach(i => {
    if (i.parentid) {
      i['parent'] = array.filter(ii => ii.id === i.parentid)[0];
    }
  });
}

function findPath1(arr, id) {
  // 不用 reduce 效率更高
  return arr.reduce((result, next) => {
    return next.id === id ? next : result;
  });
}

var treeData = [
  {'id':1 ,'parentid' : 0},
  {'id':2 ,'parentid' : 1},
  {'id':3 ,'parentid' : 1},
  {'id':4 ,'parentid' : 2},
  {'id':5 ,'parentid' : 0},
  {'id':6 ,'parentid' : 0},
  {'id':7 ,'parentid' : 4},
  {'id':8 ,'parentid' : 5},
];
var treeData1 = {
  1: {'id':1 ,'parentid' : 0},
  2: {'id':2 ,'parentid' : 1},
  3: {'id':3 ,'parentid' : 1},
  4: {'id':4 ,'parentid' : 2},
  5: {'id':5 ,'parentid' : 0},
  6: {'id':6 ,'parentid' : 0},
  7: {'id':7 ,'parentid' : 4},
  8: {'id':8 ,'parentid' : 5},
};

var transformData = {};
treeData.forEach(i => transformData[i.id] = i);
console.log(findPath(transformData, 4));
// console.log(findPath(treeData1, 4));

// trackParent(treeData);
// console.log(findPath1(treeData, 4));

// var tree = unflatten1(treeData);
var tree = unflatten2(treeData);
console.log(tree);









/*

# 算法
递归、尾递归，构造多叉树、二叉树(中序遍历)，排序算法。

算法入门 https://leetcode.cn/study-plan/algorithms/?progress=uw39h4i
几种常见的JS递归算法 https://juejin.cn/post/6844904014207795214
js 算法 https://github.com/trekhleb/javascript-algorithms

[leetcode-master](https://github.com/youngyangyang04/leetcode-master)、[leetcode-cn](https://leetcode-cn.com/)、[LeetCode](https://leetcode.com/)、[Google笔试面试](http://ask.julyedu.com/question/447)。
计算机科学中有哪些重要的算法？https://www.applysquare.com/topic-cn/RT1ia720O/
2009 POJ推荐50题 —— ACM暑假集训 列表中大约有70个题目 选做其中的50道，且每类题目有最低数量限制。北京大学ACM在线评测系统 http://acm.pku.edu.cn/JudgeOnline

常用算法方法：查找(二分法)、双指针(快慢指针)、动态规划、滑动窗口、

数据结构 逻辑结构 线性的：数组、链表、栈、队列(优先队列)、串  非线性的：堆、树、图、广义表。 存储结构:

算法的时间与空间复杂度 https://zhuanlan.zhihu.com/p/50479555
时间复杂度：渐近时间复杂度的表示法T(n)=O(f(n))。按数量级递增排列，常见的时间复杂度有：常数阶O(1),对数阶O(log2n),线性阶O(n),线性对数阶O(nlog2n),平方阶O(n2)，立方阶O(n3),k次方阶O(nk), 指数阶O(2n)。随着问题规模n的不断增大，上述时间复杂度不断增大，算法的执行效率越低。Ο(1)表示基本语句的执行次数是一个常数，一般来说，只要算法中不存在循环语句，其时间复杂度就是Ο(1)。如果算法的执行时间不随着问题规模n的增加而增长，即使算法中有上千条语句，其执行时间也不过是一个较大的常数。此类算法的时间复杂度是O(1)。Ο(log2n)、Ο(n)、Ο(nlog2n)、Ο(n2)和Ο(n3)称为多项式时间，而Ο(2n)和Ο(n!)称为指数时间。计算机科学家普遍认为前者是有效算法，把这类问题称为P类问题，而把后者称为NP问题。

存储具有普通树结构数据的方法有 3 种：双亲表示法；孩子表示法；孩子兄弟表示法。
通过孩子兄弟表示法，任意一棵普通树都可以相应转化为一棵二叉树，换句话说，任意一棵普通树都有唯一的一棵二叉树于其对应。因此，孩子兄弟表示法可以作为将普通树转化为二叉树的最有效方法，通常又被称为"二叉树表示法"或"二叉链表表示法"。

二叉树结构可以用数组表示。满二叉树与完全二叉树、二叉树的遍历（前序、中序、后序遍历）。

迭代与递归：迭代用重复结构，而递归用选择结构。递归重复函数调用的开销很大，将占用很长的处理器时间和大量的内存空间。迭代通常发生在函数内，因此没有重复调用函数和多余内存赋值的开销。
尾递归算法和单向递归算法可用迭代算法来代替。斐波那契数列计算的递归改循环迭代所带来的速度大幅提升。汉诺塔问题的递归算法中有两处递归调用，并且其中一处递归调用语句后还有其他语句，因此该递归算法不是尾递归或单向递归。要把这样的递归算法转化为非递归算法，并没有提高程序运行的速度，反而会使程序变得复杂难懂，这是不可取的。

# 数学

数字两两组合 有多少种？

《微积分》是学习《概率统计》和《线性代数》的必备条件。初学者，请一定按照“微积分---概率论---线性代数”的流程来学习，因为“求导/求积”的运算是后期概率运算的基础。
一个国家的教学水平，整体反应在教材的水平上；一个大学的教学水平，也反应在教材水平上。全国除顶尖985学校之外，其余学校的数学水平都很不理想，绝大多数学校的数学课程都是直接从苏联数学继承过来的。
看完美国教材只有一个感受：真正好的教育是将复杂的东西简化，强化基础概念和实际应用，弱化具体计算和逻辑证明，最终让普通学生也可掌握相对深奥的理论知识，并迅速转入实际应用。国内的教育正好相反：强化具体计算和逻辑证明，却弱化了基础概念和实际应用，最终生产了许多解题高手，但他们完全不懂这些数学“有什么用？”。
2017 <无法理解高等数学怎么办> 知乎 https://www.zhihu.com/question/24066773/answer/80124451

# AI

推荐系统：[microsoft/recommenders](https://github.com/microsoft/recommenders)、[NicolasHug/Surprise](https://github.com/NicolasHug/Surprise)、[NirantK/awesome-project-ideas](https://github.com/NirantK/awesome-project-ideas)、[guoguibing/librec](https://github.com/guoguibing/librec)、[grahamjenson/list_of_recommender_systems](https://github.com/grahamjenson/list_of_recommender_systems)、[Magic-Bubble/RecommendSystemPractice](https://github.com/Magic-Bubble/RecommendSystemPractice)
[三步搭建基础分析框架](http://www.woshipm.com/data-analysis/821704.html)、Lookup表(维度表)和数据表(事实表)，一般是Lookup表在上,数据表在下。

学习路线：
https://blog.csdn.net/baimafujinji/article/details/49891221
https://blog.csdn.net/han_xiaoyang/article/details/50759472
https://developers.google.com/machine-learning/crash-course/
https://academy.microsoft.com/en-us/professional-program/tracks/artificial-intelligence/
https://cn.udacity.com/course/deep-learning--ud730
机器学习入门 https://zhuanlan.zhihu.com/p/24339995 、http://www.cnblogs.com/subconscious/p/4107357.html 、 https://github.com/memect/hao/blob/master/awesome/machine-learning-guide.md
深度学习 https://github.com/exacity/deeplearningbook-chinese
https://ai.googleblog.com 李飞飞TED https://www.youtube.com/watch?v=40riCqvRoMs   斯坦福 vision lab http://vision.stanford.edu/
SIFT算法详解 http://blog.csdn.net/zddblog/article/details/7521424

百度大脑 http://ai.baidu.com/ 微软 https://azure.microsoft.com/en-us/services/cognitive-services/ 、阿里 PAI (数据采集，数据处理，特征工程，建模，预测服务) xNN、AliNN
蚂蚁：分布式学习和系统：智能客服；Parameter Server架构；美国组：自然语言处理；推荐营销；小助手；商业产品架构：金融类，量化理财因子发现，金融知识图谱；AI 平台部：达尔文测试系统；底层的GPU，FPGA开发调度系统阿尔卑斯。

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

语音识别的基本原理：语音输入→预处理→特征提取→训练→模式库→模式识别→语音识别结果
在人工智能和智能系统的研究过程中，人们已开发出许多专用和通用的程序设计语言。大多数人工智能系统都采用 PROLOG 和 LISP 语言。
2015-03-08《人工智能基础》


*/
