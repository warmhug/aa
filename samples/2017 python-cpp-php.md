
# php-ksweb

index.php

```php
<?php
  $viewInfo = $_GET['viewInfo'];
  if ($viewInfo == '1') {
    phpinfo();
  } else {
  $path = "uploads/";
  $fileMArr = array();
  $fileMFObj = new StdClass();
  foreach (glob($path."*") as $filename) {
    $fm = filemtime($filename);
    $fileInfo = new StdClass();
    $fileInfo->name = $filename;
    $fileInfo->ext = pathinfo($filename, PATHINFO_EXTENSION);
    $fileInfo->mtime = date("Y-m-d H:i:s", $fm);
    $fileMFObj->$fm = $fileInfo;
    array_push($fileMArr, $fm);
  }
  arsort($fileMArr);
  $filenameArr = array();
  $fileExtArr = array();
  $fileTimeArr = array();
  foreach ($fileMArr as $value) {
    array_push($filenameArr, $fileMFObj->$value->name);
    array_push($fileExtArr, $fileMFObj->$value->ext);
    array_push($fileTimeArr, $fileMFObj->$value->mtime);
  }
  // var_dump($fileMFObj);
  function toJsArray($arr) {
    return "[".'"' . implode('","', $arr).'"' ."]";
  }
  $js_data = "<script>
    var filenameArr = ". toJsArray($filenameArr) ."; \n
    var fileExtArr = ". toJsArray($fileExtArr) ."; \n
    var fileTimeArr = ". toJsArray($fileTimeArr) .";
  </script>";
?>
<!DOCTYPE html>
<html>
<head>
  <title>demo</title>
  <meta charset="utf-8" />
  <meta name="apple-touch-fullscreen" content="yes" />
  <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" name="viewport" />
  <meta content="yes" name="apple-mobile-web-app-capable" />
  <meta content="black" name="apple-mobile-web-app-status-bar-style" />
  <style>
    #mvideo { width: 100%; margin-top: 10px; position: relative; }
    #mvideo .st { position: absolute; top: 10px; left: 10px; z-index: 999; }
    #list { word-break: break-all; }
    #list a { display: inline-block; padding: 4px; }
    #list a.vs { background-color: bisque; }
    form { display: block; margin: 20px auto; background: #eee; border-radius: 10px; padding: 15px }
    .progress { position:relative; width:100%; border: 1px solid #ddd; padding: 1px; border-radius: 3px; }
    .bar { background-color: #B4F5B4; width:0%; height:20px; border-radius: 3px; }
    .percent { position:absolute; display:inline-block; top:3px; left:48%; }
  </style>
  <!-- 5.11.6/video-js.css -->
  <link href="https://os.alipayobjects.com/rmsportal/XNpVOAMlFTypViDwBexF.css" rel="stylesheet">
  <?php
  echo $js_data;
  ?>
</head>
<body>
  <a href='index.php?viewInfo=1'>Click</a> to view PHP info.

  <form action="upload.php" method="post" enctype="multipart/form-data">
    Select file to upload:
    <input type="file" name="fileToUpload" id="fileToUpload" multiple="multiple" />
    <input type="submit" value="Upload file" name="submit" />
  </form>
  <div class="progress">
    <div class="bar"></div>
    <div class="percent">0%</div>
  </div>
  <div id="status"></div>
  <!-- jQuery v1.12.4 -->
  <script src="https://gw.alipayobjects.com/os/rmsportal/YbGjMuYEbXdIGJRsqOSA.js"></script>
  <!-- jQuery Form Plugin version: 3.51.0-2014.06.20 -->
  <script src="https://gw.alipayobjects.com/os/rmsportal/iDZHbJEouZyiZGETqGjK.js"></script>
  <script>
    (function() {
      var bar = $('.bar');
      var percent = $('.percent');
      var status = $('#status');
      $('form').ajaxForm({
        beforeSend: function() {
            status.empty();
            var percentVal = '0%';
            bar.width(percentVal)
            percent.html(percentVal);
        },
        uploadProgress: function(event, position, total, percentComplete) {
            var percentVal = percentComplete + '%';
            bar.width(percentVal)
            percent.html(percentVal);
        },
        success: function() {
          console.log('success..');
          var percentVal = '100%';
          bar.width(percentVal)
          percent.html(percentVal);
          setTimeout(function () {
            location.reload();
          }, 1000);
        },
        complete: function(xhr) {
          console.log('complete..');
          status.html(xhr.responseText);
        }
      });
    })();
  </script>
  <video id="mvideo"
    class="video-js vjs-default-skin vjs-big-play-centered"
    controls height="264">
  </video>
  <!-- 5.11.6/video.min.js -->
  <script src="https://os.alipayobjects.com/rmsportal/tKjaoxQxIehvljvpwkLo.js"></script>
  <!-- videojs.hotkeys.min.js -->
  <script src="https://os.alipayobjects.com/rmsportal/ggQzhojOhUGULmwqXFKA.js"></script>
  <!-- Hammer.JS - v2.0.8  -->
  <script src="https://gw.alipayobjects.com/os/rmsportal/ytgbeqbiCoGivVPYWUVZ.js"></script>
  <!-- videojs-dock.css -->
  <link href="https://gw.alipayobjects.com/os/rmsportal/SunZxbEHhikrAUeyzSAs.css" rel="stylesheet">
  <!-- videojs-dock.js -->
  <script src="https://gw.alipayobjects.com/os/rmsportal/EjmvXAeRayDABBQwzEQo.js"></script>
  <!-- vr support
  <script src="libs/three.min.js"></script>
  <script src="libs/vr/vr.js"></script>
  <script src="libs/vr/OculusRiftControls.js"></script>
  <script src="libs/vr/OculusRiftEffect.js"></script>
  <script src="libs/videojs.vr.js"></script>
  -->
  <script>
    var player = videojs('mvideo', {
      playbackRates: [0.5, 1, 1.5, 2, 2.5, 3],
      controlBar: {
        muteToggle: false,
        progressControl: {
          keepTooltipsInside: false
        }
      }
     }, function() {
      this.hotkeys();
      // player.dock({
      //   title: 'Bacon ipsum dolor amet ribeye',
      //   description: 'des...'
      // });
      // player.shelf.addChild('playToggle');
      // this.play();
      // this.vr({projection: 'Sphere'});
    });

    // 快进/快退 功能
    var videoContainer = document.getElementById('mvideo');
    function mkStatus(text) {
      var st = document.createElement('div');
      st.setAttribute('class', 'st');
      st.innerHTML = text;
      videoContainer.appendChild(st);
      setTimeout(function () {
        if (st.parentNode) {
          st.parentNode.removeChild(st);
        }
      }, 1000);
    }
    var mc = new Hammer(videoContainer);
    var seekStep = 5;
    mc.on("swipeleft", function(ev) {
      var curTime = player.currentTime() - seekStep;
      if (player.currentTime() <= seekStep) {
        curTime = 0;
      }
      player.currentTime(curTime);
      mkStatus('快退 5 秒');
    });
    mc.on("swiperight", function(ev) {
      player.currentTime(player.currentTime() + seekStep);
      mkStatus('快进 5 秒');
    });
  </script>

  <div id="list" style="padding: 10px; margin-top: 10px;"></div>
  <div id="pagination-container"></div>
  <!-- pagination.css 2.0.7 -->
  <link href="https://gw.alipayobjects.com/os/rmsportal/gbpQwVVeKonlJIwszbqx.css" rel="stylesheet">
  <!-- pagination.js 2.0.7 -->
  <script src="https://gw.alipayobjects.com/os/rmsportal/zGKujqDocdriMchcKxhD.js"></script>
  <script>
    var ds = ['jpg', 'jpeg', 'JPG', 'JPEG', 'png', 'gif', 'txt'];
    var vs = ['mp4', 'MKV', 'mkv'];
    var res = [];
    filenameArr.forEach(function (item, index) {
      if (ds.indexOf(fileExtArr[index]) >= 0) {
        res.push('<div><a class="ds" href="' + item + '">' + item + '</a>\
        <i>' + fileTimeArr[index] + '</i>\
        <button data-name="' + item + '">删除</button></div>');
      } else if (vs.indexOf(fileExtArr[index]) >= 0) {
        res.push('<div><a class="vs" href="javascript:;">' + item + '</a>\
        <i>' + fileTimeArr[index] + '</i>\
        <button data-name="' + item + '">删除</button></div>');
      } else {
        res.push('<div><a class="ot" href="javascript:;">' + item + '</a>\
        <i>' + fileTimeArr[index] + '</i>\
        <button data-name="' + item + '">删除</button></div>');
      }
    })
    $('#pagination-container').pagination({
        dataSource: res,
        callback: function(data, pagination) {
          $('#list').html(data);
        }
    })
    $('#list').delegate('a.vs', 'click', function () {
      var url = $(this).text();
      player.src({ type: "video/mp4", src: url });
      player.dock({
        title: url,
        description: 'des...'
      });
      player.play();
    }).delegate('button', 'click', function() {
      var fileName = $(this).attr('data-name').replace('uploads/', '');
      if (window.confirm('确认是否删除 ' + fileName )) {
        $.ajax({
          url: '/delete.php',
          type: 'DELETE',
          data: JSON.stringify({fileName: fileName}),
          success: function(result) {
            location.reload();
          }
        });
      }
    });
  </script>
</body>
</html>
<?php
}
?>
```


```php
// delete.php
<?php
  header('Content-type: application/json');
  $delFileName = json_decode(file_get_contents("php://input"))->fileName;
  if ($_SERVER['REQUEST_METHOD'] === "DELETE" && $delFileName != '') {
    unlink('uploads/'.$delFileName);
    echo '{"data": true}';
  }
?>

// upload.php
<?php
// 使用 stream 处理大文件上传
// read contents from the input stream
// $inputHandler = fopen('php://input', "r");
// // create a temp file where to save data from the input stream
// $fileHandler = fopen('/tmp/myfile.tmp', "w+");
// // save data from the input stream
// while(true) {
//   $buffer = fgets($inputHandler, 4096);
//   if (strlen($buffer) == 0) {
//     fclose($inputHandler);
//     fclose($fileHandler);
//     return true;
//   }
//   fwrite($fileHandler, $buffer);
// }
echo "log...";
$target_dir = "uploads/";
$target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
$uploadOk = 1;
// Check if image file is a actual image or fake image
if(isset($_POST["submit"])) {
    $check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
    if($check !== false) {
        echo "File is an image - " . $check["mime"] . ".";
        $uploadOk = 1;
    } else {
        // echo "File is not an image.";
        $uploadOk = 1;
    }
}
// Check if file already exists
if (file_exists($target_file)) {
    echo "Sorry, file already exists.";
    $uploadOk = 0;
}
// Check file size
// if ($_FILES["fileToUpload"]["size"] > 500000) {
//     echo "your file is too large.";
//     $uploadOk = 1;
// }
// $imageFileType = pathinfo($target_file, PATHINFO_EXTENSION);
// if($imageFileType != "jpg") {
//     // echo "your file type is not jpg";
//     // $uploadOk = 1;
// }
// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
  echo "Sorry, your file was not uploaded.";
  header('HTTP/1.1 451 Not valid');
} else {
  if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
    echo "The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded.";
  } else {
    echo "Sorry, there was an error uploading your file.";
    header('HTTP/1.1 500 Internal Server Error');
  }
}
?>
```











# python

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











# cpp

## 代码

```cpp
// Created by hua on 2017/2/27.
#include <iostream>
#include <string>
#include <vector>
#include <string>

using namespace std;  // 不建议这么写 http://stackoverflow.com/questions/1452721/why-is-using-namespace-std-considered-bad-practice
using std::cout;   // 建议做法
using std::endl;
using std::vector;
using std::string;

//template <typename T>
template <class T>
T min(T x, T y) {
    return (x < y) ? x : y;
}

template <class T>
void Swap(T &, T &);  // template prototype

// 显式具体化(explicit specialization)  template 后跟 <>
template <> void Swap<job>(job &j1, job &j2);
template <> void Swap(job &j1, job &j2);
// 显式实例化(explicit instantiation)  template 后不跟 <>
template void Swap<int>(int, int);


int main() {
  // 使用 new 来为 内置类型 分配动态内存
  int *pi = new int(6);  // *pi set to 6
  double *pd = new double(99.99);  // *pd set to 99.99
  int *ar = new int[4]{2, 4, 6, 7};  // C++11

  // new delete 的实质
  int *pi = new int; // 会被转换为 int *pi = new(sizeof(int));
  int *pa = new int[40]; // 会被转换为 int *pa = new(40 * sizeof(int));
  delete pi;             // 会被转换为 delete(pi);

  const Stock land = Stock("xx");
  land.show();  // 编译器将拒绝执行此行，因为 show() 代码无法确保调用对象 land 不被修改
  // show 方法所使用的对象是由方法调用隐式提供的，所以需要一种新语法，保证函数不会修改调用对象
  void show() const;  // promises not to change invoking object
  void Stock::show() const;  // promises not to change invoking object

  // c++11 中新增了 基于范围的for循环，便于操作数组或容器类
  double prices[5] = {4.99, 10.99, 6.87, 7.99};
  for (double x : prices) {
    std::cout << x << std::endl;
  }

  double (*pf)(int);  // pf points to a function that returns double
  double *pf(int);  // pf() a function that returns a pointer-to-double

  // 以下三种写法都正确
  const double *f1(const double ar[], int n);
  const double *f2(const double [], int);
  const double *f3(const double *, int);
  // 声明一个指针，指向以上三个函数之一
  const double *(*p1)(const double *, int) = f1;
  auto p1 = f2;  // c++11 automatic type deduction 自动类型推断
  // 声明一个 函数指针数组，包含以上三个函数
  const double *(*pa[3])(const double *, int) = {f1, f2, f3};
  auto pb = pa;  // pa pb 都是指向函数指针的指针
  // 调用函数
  const double *px = pa[0](av, 3);
  const double *py = (*pb[1])(av, 3);
  // 创建指向整个数组的指针
  auto pc = &pa;  // c++11
  const double *(*(*pd)[3])(const double *, int) = &pa;  // c++98
  **&pa == *pa == pa[0];

  // 使用 typedef 起别名做简化
  typedef const double *(*p_fun)(const double *, int);  // p_fun now a type name
  p_fun p1 = f1;  // p1 points to the f1() function
  p_fun pa[3] = {f1, f2, f3};
  p_fun(*pd)[3] = &pa;  // pd points to an array of 3 function pointers

  return 0;
}


int main() {
    int n1 = 2, n2 = 10;
    double d1 = 1.5, d2 = 5.6;
    cout << "较小整数：" << min(n1, n2) << endl;

    vector<int> ivec;
    vector<vector<string> > file; // 该向量的元素是 vector 对象

    return 0;
}


int main() {

    // 指针
    int  var1;
    char var2[10];
    cout << "var1 变量的地址： " << &var1 << endl;
    cout << "var2 变量的地址： " << &var2 << endl;
    int  var = 20;   // 实际变量的声明
    int  *ip;        // 指针变量的声明
    ip = &var;       // 在指针变量中存储 var 的地址
    cout << "Value of var variable: " << var << endl;
    cout << "Address stored in ip variable: " << ip << endl;
    cout << "Value of *ip variable: " << *ip << endl;

    // void* 指针可以存放任意对象的地址。 ref: c++ primer
    double obj = 3.14, *pd = &obj;
    void *pv = &obj;
    pv = pd;

    int ival = 1024;
    int *pi = &ival; // pi 指向一个 int 型的数
    int **ppi = &pi; // ppi 指向一个 int 型的指针

    int ii = 42;
    int *p; // p 是一个 int 型指针
    int *&rr = p; // r 是一个对指针 p 的引用
    rr = &ii; // r 引用了一个指针，因此给 r 赋值 &i 就是令 p 指向 i
    *rr = 0; // 解引用 r 得到 i，也就是 p 指向的对象，将 i 的值改为 0

    double arr[5] = {22.1, 32.2, 23.4, 45.2, 37.4};
    double *pt = arr;  // pt points to arr[0]
    ++pt;  // pt points to arr[1]
    double x = *++pt;  // to arr[2]
    // ++*pt;  // arr[2] + 1
    // (*pt)++;  //
    x = *pt++;  // 后缀运算符++的优先级高于*，因此用于 pt，而不是 *pt，对指针递增

    // 错误用法，重要！
    // long *fellow;
    // *fellow = 223323;  // 223323 存在哪里不确定，fellow 指向的地址可能并不是要存放 223323 的地方

    ing age = 39;
    int *pd = &age;  // *pd = 41 is a valid operation
    const int *pt = pd;  // *pt = 42 is an invalid operation

    int sloth = 3;
    const int *ps = &sloth;  // a pointer to const int , ps 可以改为指向其他地址
    int *const finger = &sloth;  // a const pointer to int , finger 只能指向 sloth，但可以用 finger 修改 sloth 的值

    double trouble = 2.0E30;
    const double *const stick = &trouble;  // 指向 const 对象的 const 指针， stick 和 *stick 都是 const

    // 二维数组和指针
    // ar2[r][c] == *(*(ar2 + r) + c)  // same

    // 引用
    int rats;
    // 必须在声明引用变量时 进行初始化
    int &rodents = rats; // 同 int * const pr = &rats; 引用更接近 const 指针

    int *pt = &rats;
    int &rodents = *pt; // 使 rodents 指向 rats
    int bunnies = 50;
    pt = &bunnies;  // 改变 pt 的指向，不影响 rodents 引用

    int    i;
    double d;
    int &r = i;
    double &s = d;

    i = 5;
    cout << "Value of i : " << i << endl;
    cout << "Value of i reference : " << r  << endl;

    d = 11.7;
    cout << "Value of d : " << d << endl;
    cout << "Value of d reference : " << s  << endl;
}


#define NEWLINE '\n'
#define LENGTH 10  // 使用 #define 预处理器定义常量
const int WIDTH = 5; // 使用 const 前缀声明指定类型的常量
int g; // 全局变量声明. 在所有函数外部定义的变量，称为全局变量
int func(); // 函数声明

// 结构体
struct inflatable {
  char name[20];
  float volume;
  double price;
}

void swapr(int & a, int & b);   // a, b are aliases for ints
void swapp(int * p, int * q);   // p, q are addresses of ints
void swapv(int a, int b);       // a, b are new variables

int main()
{
    using namespace std;
    int wallet1 = 300;
    int wallet2 = 350;

    cout << "wallet1 = $" << wallet1;
    cout << " wallet2 = $" << wallet2 << endl;

    cout << "Using references to swap contents:\n";
    swapr(wallet1, wallet2);   // pass variables
    cout << "wallet1 = $" << wallet1;
    cout << " wallet2 = $" << wallet2 << endl;
    // 类型不匹配时，swapr 函数内会创建 临时变量、交换的是临时变量，而 a b 保持不变
    long a = 3, b = 5;
    swapr(a, b);
    cout << "a = " << a << " b = " << b << endl;

    cout << "Using pointers to swap contents again:\n";
    swapp(&wallet1, &wallet2); // pass addresses of variables
    cout << "wallet1 = $" << wallet1;
    cout << " wallet2 = $" << wallet2 << endl;

    cout << "Trying to use passing by value:\n";
    swapv(wallet1, wallet2);   // pass values of variables
    cout << "wallet1 = $" << wallet1;
    cout << " wallet2 = $" << wallet2 << endl;
    // cin.get();
    return 0;
}

void swapr(int & a, int & b)    // use references
{
    int temp;

    temp = a;       // use a, b for values of variables
    a = b;
    b = temp;
}

void swapp(int * p, int * q)    // use pointers
{
    int temp;

    temp = *p;      // use *p, *q for values of variables
    *p = *q;
    *q = temp;
}

void swapv(int a, int b)        // try using values
{
    int temp;

    temp = a;      // use a, b for values of variables
    a = b;
    b = temp;
}

int main() {
    // 局部变量声明 并定义 并初始化
    char ch = 'A', ch1 = 'B';
    int x;
    // 变量初始化
    x = 3;  // c 中初始化方式
    int x1(5);  // c++ 中新增的初始化方式
    int x2 = {5};  // c++98 中新增的初始化 单值变量 的方式，可以不写 =
    cout << "x1: " << x1 << x2 << endl;

    cout << "基本的内置类型：bool / char / int / float / double / void / wchar_t" << endl;
    cout << "类型修饰符：signed / unsigned / short / long" << endl;

    cout << "bool / char / int / float / double 占据空间大小："
         << sizeof(bool) << sizeof(char) << sizeof(int) << sizeof(float) << sizeof(double) << endl;

    cout << "long int / unsigned int / signed short int 占据空间大小："
         << sizeof(long int) << sizeof(unsigned int) << sizeof(signed short int) << endl;

    short int i;           // 有符号短整数
    short unsigned int j;  // 无符号短整数
    j = 50000;
    i = j;
    cout << i << " " << j << endl;

    // 数组
    double balance[5] = {1000.0, 2.0, 3.4, 17.0, 50.0};  // c++11 可省略 = 号
    long plifs[] = {25, 92, 3.0};  // c++11 编译不通过，不能将浮点数转换为整数
    char slifs[] = {'h', 'i', 1122011, '\0'};  // c++11 编译不通过，1122011 超出 char 范围

    // 字符串实际上是使用 null 字符 '\0' 终止的一维字符数组
    char greeting[6] = {'H', 'e', 'l', 'l', 'o', '\0'};  // 不能将一个数组赋给另一个数组
    // char greeting[] = "Hello";  // c 语言中只能用 char 数组定义字符串，而 c++ 中新增了 string 类
    cout << "Greeting message: " << greeting << " 拼接字符串方式（略奇怪）：str1 " "str2" << endl;

    char str1[10] = "Hello";
    char str2[10] = "World";
    // 连接 str1 和 str2
    strcat( str1, str2);
    cout << "strcat( str1, str2): " << str1 << endl;

    //  String 类
    string str111 = {"Hello"};  // c++11 风格初始化 可省略 = 号
    string str11 = "Hello";  // c 风格初始化
    string str22 = "World";
    string str3;
    str3 = str11 + str22;
    cout << "str11 + str22 : " << str3 << str3.size() << endl;
    // 原始字符串
    cout << R"(Jim "King" Tutt uses "\n" instead of endl.)" << '\n';
    // 在原始字符串中包含 )"
    cout << R"+*("(Who wouldn't?)", she whispered.)+*" << endl;

    // 初始化结构体
    inflatable guest = {
      "Glorious Gloria",  // name value
      1.88,               // volume value
      29.99               // price value
    };
    cout << guest.price << endl;
    // 创建 包含 100 个 inflatable 结构的数组
    inflatable gifts[100];
    cin >> gifts[0].volume;
    cout << gifts[99].price << endl;

    // 枚举类型
    enum color { red, green, blue } c;
    c = red;  // valid
    // c = 2000; // invalid
    cout << c << endl;
    enum bits
    {
      one = 1,
      two = 2,
      four = 4,
      eight = 8
    };
    bits myflag;
    myflag = bits(6); // valid, 6 不是枚举值，但它位于枚举定义的取值范围内

    // 函数调用
    int fn = func();

    return 0;
}

// 函数定义
int func() {
    return 0;
}

```


## 资料

```sh
gcc file.c file1.c
g++ file.cc file1.cc
```

使用 "Eclipse for c++" IDE + CDT (全称C/C++ Development Toolkit)
另外搭配 cmake 的方法：<http://stackoverflow.com/a/38716337/2190503>

> 不建议用 Clion (直接集成了 cmake 工具)，收费、开的时间长有内存泄露问题。

- [值得推荐的C/C++框架和库](https://www.ezlippi.com/blog/2014/12/c-open-project.html)
- [C++基础入门](http://study.163.com/course/courseMain.htm?courseId=1002981021): 1.学习纲要
- [《面向对象程序设计-C++》](http://study.163.com/course/courseMain.htm?courseId=271005):
  - 1.第一个C++程序。如何使用 Eclipse 编写 cpp
  - 5.头文件。头文件里不该写什么？介绍编译过程
  - 8.成员变量的秘密。介绍 this 指针是什么（类似 js 的this/prototype）
  - 11.new & delete。动态内存申请和销毁，内存泄露
  - 13.初始化列表。Initialization 初始化，类成员的特殊初始化方式
  - 18~41 其他基础内容详解

## 基础

- 模板
  - 模板也能像函数一样可以重载。
  - 显式具体化(explicit specialization)、显式实例化(explicit instantiation)、隐式实例化统称为具体化，在同一个文件中使用同一种类型的显式实例和显式具体化将出错。
  - 类模板可以被部分具体化，其他同函数模板一样可以 隐式实例化、显式实例化、显式具体化。
  - 模板类可用作其他类、结构和模板的成员。

- 类和对象
  - 公有继承能够建立 is-a 关系，私有继承和保护继承建立的是 has-a 关系，他们都能重用基类的代码。
  - 无论哪种继承，都继承实现，并不继承接口。在不进行显式类型转换的情况下，基类指针或引用将不能指向派生类对象。
  - 通常，应使用包含（组合、mixin）来建立 has-a 关系；如果新类需要访问原有类的保护成员，或需要重新定义虚函数，则应使用私有继承。
  - 多重继承（MI）使得能够在类设计中重用多个类的代码，私有或保护 MI 建立 has-a 关系，而共有 MI 建立 is-a 关系。
  - MI 会带来一些问题，使用类限定符来解决名称二义性的问题，使用虚基类来避免继承多个基类对象的问题。
  - 友元类：比如电视机和遥控器互相不是 is-a 或 has-a 关系，但遥控器能改变电视机状态，应将遥控器类作为电视机类的友元。
  - 友元使得能够为类开发更灵活的接口，类可以将其他函数、其他类和其他类的成员函数作为友元。
  - 嵌套类是在其他类中声明的类，能实现其他类，但不必是公有接口的组成部分。

- 函数
  - ANSI C 借鉴了 C++ 中的函数原型，但为了和 C 兼容、原型是可选的，但在 C++ 中，原型是必不可少的。
  - 函数原型能帮编译器正确处理函数返回值，检查使用的参数数目、参数类型是否正确。
  - C++ 通常按值传递参数。即传递常规变量的拷贝、或数组地址的拷贝。一般需要禁止无意修改数组内容，在函数数组形参前使用 const 可以保证。
  - 将指针参数 声明为 指向 const 的指针：使用 const 使得函数能够处理 const 和非 const 实参
  - 函数参数为 结构体 时，可以为小的结构体的拷贝，也可以为结构体的地址
  - 对于 inline 内联函数，部分编译器如果认为该函数过大或该函数调用了自己(递归),就不将其作为内联函数
  - 引用 & 经常被用作函数参数，称为 按引用传递，能允许被调用的函数能够访问调用函数中的变量（C 语言只能按值传递或按指针传递），应尽可能将引用形参声明为 const
  - C++11 提供了函数指针和函数符的替代品--lambda 表达式

- 指针和引用的区别
  - 引用总是指向某个对象，定义引用时必须初始化(之后不可改变)；引用只是一个“别名”，给引用赋值修改的是引用所关联对象的值
  - 指针可以指向任何对象，可以修改。
  - 不能对未被初始化为适当地址的指针解除引用。

- new 出来的对象，需要手动 delete，然后再设置为 NULL
  - 只能用 delete 来释放使用 new 分配的内存；不能用 delete 来释放普通变量声明所获得的内存。
  - 手工管理内存，非常容易出错，导致“内存泄露”问题，排查非常困难。使用智能指针，避免这种问题。
  - 当使用 delete 时，类的析构函数会被自动调用。删除对象可以释放对象本身占用的内存，但并不能自动释放属于对象成员的指针指向的内存，因此要在析构函数使用 delete 删除对象成员的内存。

- 内存模型
  - 自动变量：函数内的变量(包含函数参数)；静态变量：函数外的变量、使用 static 定义的变量；动态变量：new 出来的变量。
  - 自动变量保存在栈（LIFO 后进先出）中、变量数量可以灵活增减；静态变量数目在程序运行期间不会变，因此不需要栈来管理，编译器将分配固定的内存块来存储所有的静态变量，这些变量在程序执行期间一直存在。
  - 位于函数内的变量是「局部变量(自动变量)」，位于函数外的变量是「全局变量」，全局变量对所有的程序文件都是可见的。
  - 使用 static 修饰局部变量、可以在函数调用之间保持局部变量的值、不需要在每次进入和离开函数时进行创建和销毁。
  - 使用 static 修饰全局变量时，会使变量的作用域限制在声明它的文件内。
  - extern 是用来在另一个文件中声明一个全局变量或函数，用于当有两个或多个文件共享相同的全局变量或函数时。
  - 在函数或代码块中声明 const 时，其作用域为代码块，所以不用担心与外部的 const 常量重名引起冲突。
  - C/C++ 都不允许在一个函数中定义另外一个函数，因此所有函数都是静态存储，在整个程序执行期间一直存在。
  - 可以使用 static 定义静态函数，使函数只在文件内可见，这样可以在其他文件中定义同名的函数。
  - 使用 C++ 运算符 new（或 C 函数 malloc()）分配的内存称为动态内存，不受作用域限制，可以在一个函数中分配内存，在另一个函数中释放。动态内存不是 LIFO。
  - 通常编译器使用三块独立的内存：一块用于静态变量（可能再细分），一块用于自动变量，另一块用于动态存储。

- 异常
  - 对于不同的异常类型，基类引用能够捕获各派生类异常对象，而派生类异常只能捕获从这个类派生而来的类对象。
  - 使用异常会降低程序的运行速度。

- 头文件：
  - 可包含：函数原型，使用 #define 或 const 定义的常量，结构/类/模板声明，内联函数。
  - 不能包含：函数定义/函数体、变量声明。不要使用 using 指令。

- 命名空间
  - 命名空间可以是全局的，也可以位于另一个命名空间中，但不能位于代码块中。
  - using 声明：`using std::cout`，using 编译指令：`using namespace std`，首选在局部作用域内使用 using 声明。
  - 使用在已命名的名称空间中声明的变量，而不是使用外部全局变量或静态全局变量。

何时使用引用参数：
![何时使用引用参数](https://zos.alipayobjects.com/rmsportal/CpddxowZkhtkSoOVasEN.jpg)

如何选择智能指针：要使用多个指向同一个对象的指针，应选择 shared_ptr；反之使用 unique_ptr。

RTTI 只适用于包含虚函数的类。有三个运算符：dynamic_cast 、Typeid 。

不同的编译器对同一个函数生成不同的修饰名称，名称不同将使链接器无法将一个编译器生成的函数调用与另一个编译器生成的函数定义匹配。在链接编译模块时，请确保所有对象文件或库都是由同一个编译器生成的。通常可以用自己的编译器重新编译源代码来消除链接错误。

C 和 C++ 使用 & 符号来指示变量的地址，C++ 也用 & 符号来声明引用。

通常使用 vector 是最好的选择，除非你有很好的理由选择其他容器。

数组是一种数据结构，在内存中连续存储同类型的多个值。C++ 将数组名解释为其第一个元素的地址：arr == &arr[0]

浮点数能够表示小数值、非常大和非常小的值（比整型范围大），但浮点数运算速度比整数慢、且精度将下降。

如何选择数据类型？通常来说 int 被设置为对目标计算机来说最“自然”(处理起来效率最高)的长度，如果没有特殊理由，则应使用 int。
如果变量表示的值不可能为负数，如人口数、文档字数，则可以使用无符号类型，这样能够表示更大的值。
如果可能超过 int 类型的最大值，则使用 long 或 long long，便于程序移植到低位数的系统上而不出现问题。
如果节省内存很重要，则应使用 short 而不是 int，即使它们的长度一样。例如 int 数组从 16 位系统移到 32 位系统，内存占用会加倍。

cin 和 cout 都是智能对象，能根据程序上下文自动“转换类型”。例如 C 语言要打印字符串"25"和整数 25 ，需要这样：
`printf("print a string: %s\n", "25");`、`printf("print an integer: %d\n", 25);`，而 cout 能自动转换。

类之于对象 就像 类型之于变量。面向对象编程（OOP）的本质是设计并扩展自己的数据类型。

编译指令 using [namespace] 可以位于任何位置，如果在函数中、只会在本函数作用域里有效。
也可以完全不使用编译指令 using，而在需要时、直接加上命名空间前缀即可、如 `std:cout << "out sth" << std:endl;`

预处理指令 #include 来引用头文件，引用头文件相当于复制头文件的内容。
建议把所有的常量、宏、系统全局变量和函数原型写在头文件中。

C++ 可以使用 C 的头文件，C++ 头文件去掉了扩展名 h，有些 C 头文件被转换为 C++ 头文件时被重新命名，
去掉了扩展名 h，并在文件名称前面加上前缀 c (表明来自 c 语言)，例如 C++ 版本的 math.h 为 cmath。

---

## 泛型编程

[泛型编程、STL](http://www.cnblogs.com/youngforever/p/3251097.html)

模板使得算法独立于存储的数据类型，而迭代器使算法独立于使用的容器类型。迭代器是广义指针。

最好避免直接使用迭代器，而应尽可能使用 STL 函数（如 for_each()）来处理细节，也可使用 C++11 新增的基于范围的 for 循环：
`for (auto x : scores) cout << x << endl;`

STL 提供了函数对象（函数符），函数对象是重载了()运算符（即定义了 operator()() 方法）的类。

泛型（generic）是一种允许一个值取不同数据类型（所谓多态）的技术，
强调使用这种技术的编程风格被称为泛型编程（generic programming通用编程/类属编程）。

STL（Standard Template Library 标准模板库）是泛型编程思想的实际体现和具体实现，
它是一种为泛型组件建立大型标准库的可扩展架构。STL本身，与面向对象无关，也与具体的程序设计语言无关。

STL 提供了一组表示容器、迭代器、函数对象和算法的模板。所有 STL 容器都提供了一些基本方法：size()、swap()、begin()、end()

STL 是泛型编程思想的产物。
STL 是最新的 C++ 标准函数库中的一个子集，这个庞大的子集占据了整个库的大约 80% 的分量。
而作为在实现 STL 过程中扮演关键角色的模板则充斥了几乎整个 C++ 标准函数库。

STL提供六大组件，彼此可以组合套用。
这六大组件的交互关系：
container（容器） 通过 allocator（配置器） 取得数据储存空间，
algorithm（算法）通过 iterator（迭代器）存取 container（容器） 内容，
functor（仿函数） 可以协助 algorithm（算法） 完成不同的策略变化，
adapter（配接器） 可以修饰或套接 functor（仿函数）。

泛型编程是一种面向算法的多态技术，STL 是它的一种具体实现。

与针对问题和数据的面向对象的方法不同，泛型编程中强调的是算法。
是一类通用的参数化算法，它们对各种数据类型和各种数据结构都能以相同的方式进行工作，从而实现源代码级的软件重用。

例如，不管（容器）是数组、队列、链表、还是堆栈，不管里面的元素（类型）是字符、整数、浮点数、还是对象，
都可以使用同样的（迭代器）方法来遍历容器内的所有元素、获取指定元素的值、添加或删除元素，
从而实现排序、检索、复制、合并等各种操作和算法。

泛型编程的通用化算法，是建立在各种抽象化基础之上的：
利用参数化模版来达到数据类型的抽象化、利用容器和迭代器来达到数据结构的抽象化、
利用分配器和适配器来达到存储分配和界面接口的抽象化。
