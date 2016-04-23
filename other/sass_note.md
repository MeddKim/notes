# Sass学习

**说明：**Sass 扩展了 CSS3，增加了规则、变量、混入、选择器、继承等等特性。Sass 生成良好格式化的 CSS 代码，易于组织和维护。Sass最后还是会编译出合法的CSS让浏览可以使用因为它不是标准的CSS格式，在它的语法内部可以使用动态变量等，所以它更像一种极简单的动态语言。

-----------

[TOC]

## Sass的语法

### Sass文件的后缀名
sass文件的后缀名有两种：一种是*.sass*，不使用大括号和分号，格式要求更严格；另一种就是*.scss*，这种和我们平常写CSS文件的格式差不多，使用大括号和分号，推荐使用*.scss*后缀的文件。
``` css
//文件后缀名为sass的语法
body
  background: #eee
  font-size:12px
p
  background: #0982c1

//文件后缀名为scss的语法  
body {
  background: #eee;
  font-size:12px;
}
p{
  background: #0982c1;
} 
```

### 导入
sass的导入(@import)规则和CSS的有所不同，编译时会将@import的scss文件合并进来只生成一个CSS文件。但是如果你在sass文件中导入css文件如@import 'reset.css'，那效果跟普通CSS导入样式文件一样，导入的css文件不会合并到编译后的文件中，而是以@import方式存在。
所有的sass导入文件都可以忽略后缀名.scss。一般来说基础的文件命名方法以_开头，如_mixin.scss。这种文件在导入的时候可以不写下划线，可写成@import "mixin"。

### 注释
sass有两种注释方式，一种是标准的css注释方式/* */，另一种则是//双斜杆形式的单行注释，不过这种单行注释不会被转译出来。

### 变量
sass的变量必须是$开头，后面紧跟变量名，而变量值和变量名之间就需要使用冒号(:)分隔开（就像CSS属性设置一样），如果值后面加上!default则表示默认值。 

#### 普通变量
定义之后可以在全局范围内使用。并且后面的声明的会覆盖前面的声明。
``` css
//sass style
//-------------------------------
$fontSize: 12px;
body{
    font-size:$fontSize;
}

//编译后的css文件
body{
    font-size:12px;
}
```

#### 默认变量
sass的默认变量一般是用来设置默认值，然后根据需求来覆盖的，覆盖的方式也很简单，只需要在默认变量之前重新声明下变量即可
``` css
//sass style
//-------------------------------
$baseLineHeight:        2;
$baseLineHeight:        1.5 !default;
body{
    line-height: $baseLineHeight; 
}

//css style
//编译后的css文件
body{
    line-height:2;
}
```
**说明：**默认变量的价值在进行组件化开发的时候会非常有用。例如：
```css
$fancybox-width: 400px !default;
.fancybox {
width: $fancybox-width;
}
```
在上例中，如果用户在导入你的sass局部文件之前声明了一个$fancybox-width变量，那么你的局部文件中对$fancybox-width赋值400px的操作就无效。如果用户没有做这样的声明，则$fancybox-width将默认为400px(不使用!default的话，后面声明的变量会覆盖前面的声明)。

#### 特殊变量
一般我们定义的变量都为属性值，可直接使用，但是如果变量作为属性或在某些特殊情况下等则必须要以#{$variables}形式使用。
``` css
//sass style
//-------------------------------
$borderDirection:       top !default; 
$baseFontSize:          12px !default;
$baseLineHeight:        1.5 !default;

//应用于class和属性
.border-#{$borderDirection}{
  border-#{$borderDirection}:1px solid #ccc;
}
//应用于复杂的属性值
body{
    font:#{$baseFontSize}/#{$baseLineHeight};
}

//css style
//-------------------------------
.border-top{
  border-top:1px solid #ccc;
}
body {
  font: 12px/1.5;
}
```

#### 多值变量
多值变量分为list类型和map类型，简单来说list类型有点像js中的数组，而map类型有点像js中的对象。

##### list
list数据可通过空格，逗号或小括号分隔多个值，可用nth($var,$index)取值。关于list数据操作还有很多其他函数如length($list)，join($list1,$list2,[$separator])，append($list,$value,[$separator])等，具体可参考[sass Functions](http://sass-lang.com/documentation/Sass/Script/Functions.html)（搜索List Functions即可）
**定义方式**
``` css
//一维数据
$px: 5px 10px 20px 30px;

//二维数据，相当于js中的二维数组
$px: 5px 10px, 20px 30px;
$px: (5px 10px) (20px 30px);
```

**使用**
``` css
//sass style
//-------------------------------
$linkColor:         #08c #333 !default;//第一个值为默认值，第二个鼠标滑过值
a{
  color:nth($linkColor,1);

  &:hover{          //通过&符号访问父元素
    color:nth($linkColor,2);
  }
}

//css style
//-------------------------------
a{
  color:#08c;
}
a:hover{
  color:#333;
}
```

##### map
map数据以key和value成对出现，其中value又可以是list。格式为：$map: (key1: value1, key2: value2, key3: value3);。可通过map-get($map,$key)取值。关于map数据还有很多其他函数如map-merge($map1,$map2)，map-keys($map)，map-values($map)等，具体可参考[sass Functions](http://sass-lang.com/documentation/Sass/Script/Functions.html)（搜索Map Functions即可）
**定义方式**
``` css
$heading: (h1: 2em, h2: 1.5em, h3: 1.2em);
```

**使用**
``` css
//sass style
//-------------------------------
$headings: (h1: 2em, h2: 1.5em, h3: 1.2em);
@each $header, $size in $headings {
  #{$header} {
    font-size: $size;
  }
}

//css style
//-------------------------------
h1 {
  font-size: 2em; 
}
h2 {
  font-size: 1.5em; 
}
h3 {
  font-size: 1.2em; 
}
```

#### 全局变量
在变量值后面加上!global即为全局变量。在选择器中声明的变量只在选择器内部有效。但若加上!global，就会覆盖外部声明的变量并在全局生效。
``` css
//sass style
//-------------------------------
$font-size:14px;
$background: #ccc;
body {

  //在选择器内声明变量
  $font-size:155px !global;
  $background: #ffff;
  
  background: $background; 
  font-size:$font-size;

}
p{
  background: $background;
  font-size:$font-size;
} 

//css style
//-------------------------------
body{
    background:#ffff
    ;font-size:155px
}

p{
    background:#ccc;
    font-size:155px
}
```

### 嵌套
sass的嵌套包括两种：一种是选择器的嵌套；另一种是属性的嵌套。我们一般说起或用到的都是选择器的嵌套。

#### 选择器嵌套
所谓选择器嵌套指的是在一个选择器中嵌套另一个选择器来实现继承，从而增强了sass文件的结构性和可读性。
在选择器嵌套中，可以使用&表示父元素选择器。
``` css
//sass style
//-------------------------------
#top_nav{
  line-height: 40px;
  text-transform: capitalize;
  background-color:#333;
  li{
    float:left;
  }
  a{
    display: block;
    padding: 0 10px;
    color: #fff;

    &:hover{
      color:#ddd;
    }
  }
}

//css style
//-------------------------------
#top_nav{
  line-height: 40px;
  text-transform: capitalize;
  background-color:#333;
}  
#top_nav li{
  float:left;
}
#top_nav a{
  display: block;
  padding: 0 10px;
  color: #fff;
}
#top_nav a:hover{
  color:#ddd;
}
```

#### 属性嵌套
所谓属性嵌套指的是有些属性拥有同一个开始单词，如border-width，border-color都是以border开头。
``` css
//sass style
//-------------------------------
.fakeshadow {
  border: {
    style: solid;
    left: {
      width: 4px;
      color: #888;
    }
    right: {
      width: 2px;
      color: #ccc;
    }
  }
}

//css style
//-------------------------------
.fakeshadow {
  border-style: solid;
  border-left-width: 4px;
  border-left-color: #888;
  border-right-width: 2px;
  border-right-color: #ccc; 
}
```
**说明：**当然这只是个属性嵌套的例子，如果实际这样使用，那估计得疯掉。

#### @at-root
@at-root用来跳出选择器嵌套的。默认所有的嵌套，继承所有上级选择器，但有了这个就可以跳出所有上级选择器。
**普通跳出嵌套**
``` css
//sass style
//-------------------------------
//没有跳出
.parent-1 {
  color:#f00;
  .child {
    width:100px;
  }
}

//单个选择器跳出
.parent-2 {
  color:#f00;
  @at-root .child {
    width:200px;
  }
}

//多个选择器跳出
.parent-3 {
  background:#f00;
  @at-root {
    .child1 {
      width:300px;
    }
    .child2 {
      width:400px;
    }
  }
}

//css style
//-------------------------------
.parent-1 {
  color: #f00;
}
.parent-1 .child {
  width: 100px;
}

.parent-2 {
  color: #f00;
}
.child {
  width: 200px;
}

.parent-3 {
  background: #f00;
}
.child1 {
  width: 300px;
}
.child2 {
  width: 400px;
}
```

**@at-root (without: ...)和@at-root (with: ...)**
默认@at-root只会跳出选择器嵌套，而不能跳出@media或@support，如果要跳出这两种，则需使用@at-root (without: media)，@at-root (without: support)。这个语法的关键词有四个：all（表示所有），rule（表示常规css），media（表示media），support（表示support，因为@support目前还无法广泛使用，所以在此不表）。我们默认的@at-root其实就是@at-root (without:rule)
``` css
//sass style
//-------------------------------
//跳出父级元素嵌套
@media print {
    .parent1{
      color:#f00;
      @at-root .child1 {
        width:200px;
      }
    }
}

//跳出media嵌套，父级有效
@media print {
  .parent2{
    color:#f00;

    @at-root (without: media) {
      .child2 {
        width:200px;
      } 
    }
  }
}

//跳出media和父级
@media print {
  .parent3{
    color:#f00;

    @at-root (without: all) {
      .child3 {
        width:200px;
      } 
    }
  }
}

//sass style
//-------------------------------
@media print {
  .parent1 {
    color: #f00;
  }
  .child1 {
    width: 200px;
  }
}

@media print {
  .parent2 {
    color: #f00;
  }
}
.parent2 .child2 {
  width: 200px;
}

@media print {
  .parent3 {
    color: #f00;
  }
}
.child3 {
  width: 200px;
}
```

**@at-root与&配合使用**
``` css
//sass style
//-------------------------------
.child{
    @at-root .parent &{
        color:#f00;
    }
}

//css style
//-------------------------------
.parent .child {
  color: #f00;
}
```

**应用于@keyframe**

``` css
//sass style
//-------------------------------
.demo {
    ...
    animation: motion 3s infinite;

    @at-root {
        @keyframes motion {
          ...
        }
    }
}

//css style
//-------------------------------   
.demo {
    ...   
    animation: motion 3s infinite;
}
@keyframes motion {
    ...
}
```

### 混合(mixin)
sass中使用@mixin声明混合，可以传递参数，参数名以$符号开始，多个参数以逗号分开，也可以给参数设置默认值。声明的@mixin通过@include来调用

#### 无参数的minxin
``` css
//sass style
//-------------------------------
@mixin center-block {
    margin-left:auto;
    margin-right:auto;
}
.demo{
    @include center-block;
}

//css style
//-------------------------------
.demo{
    margin-left:auto;
    margin-right:auto;
}
```

#### 有参数的minxin
调用时可直接传入值，如@include传入参数的个数小于@mixin定义参数的个数，则按照顺序表示，后面不足的使用默认值，如不足的没有默认值则报错。除此之外还可以选择性的传入参数，使用参数名与值同时传入。
``` css
//css style
//-------------------------------
.imgtext-h li {
    border-bottom: 1px solid #cccccc;
    padding-top: 10px;
    padding-bottom: 10px;
}
.imgtext-h--product li {
    border-bottom: 1px dashed #cccccc;
    padding-top: 15px;
    padding-bottom: 15px;
}

//css style
//-------------------------------
.box{
  border:1px solid #ccc;
  -webkit-box-shadow:0 2px 2px rgba(0,0,0,.3),0 3px 3px rgba(0,0,0,.3),0 4px 4px rgba(0,0,0,.3);
  box-shadow:0 2px 2px rgba(0,0,0,.3),0 3px 3px rgba(0,0,0,.3),0 4px 4px rgba(0,0,0,.3);
}
```

#### 多组值参数mixin
如果一个参数可以有多组值，如box-shadow、transition等，那么参数则需要在变量后加三个点表示，如$variables...。
``` css
//sass style
//-------------------------------   
//box-shadow可以有多组值，所以在变量参数后面添加...
@mixin box-shadow($shadow...) {
  -webkit-box-shadow:$shadow;
  box-shadow:$shadow;
}
.box{
  border:1px solid #ccc;
  @include box-shadow(0 2px 2px rgba(0,0,0,.3),0 3px 3px rgba(0,0,0,.3),0 4px 4px rgba(0,0,0,.3));
}

//css style
//-------------------------------
.box{
  border:1px solid #ccc;
  -webkit-box-shadow:0 2px 2px rgba(0,0,0,.3),0 3px 3px rgba(0,0,0,.3),0 4px 4px rgba(0,0,0,.3);
  box-shadow:0 2px 2px rgba(0,0,0,.3),0 3px 3px rgba(0,0,0,.3),0 4px 4px rgba(0,0,0,.3);
}
```

#### @content
@content可以用来解决css3的@media等带来的问题。它可以使@mixin接受一整块样式，接受的样式从@content开始。
``` css
//sass style
//-------------------------------                     
@mixin max-screen($res){
  @media only screen and ( max-width: $res )
  {
    @content;
  }
}

@include max-screen(480px) {
  body { color: red }
}

//css style
//-------------------------------
@media only screen and (max-width: 480px) {
  body { color: red }
} 
```
**注：**@mixin通过@include调用后解析出来的样式是以拷贝形式存在的，而下面的继承则是以联合声明的方式存在的，建议传递参数的用@mixin，而非传递参数类的使用下面的继承%。

### 继承
sass中，选择器继承可以让选择器继承另一个选择器的所有样式，并联合声明。使用选择器的继承，要使用关键词@extend，后面紧跟需要继承的选择器。
``` css
//sass style
//-------------------------------
h1{
  border: 4px solid #ff9aa9;
}
.speaker{
  @extend h1;
  border-width: 2px;
}

//css style
//-------------------------------
h1,.speaker{
  border: 4px solid #ff9aa9;
}
.speaker{
  border-width: 2px;
}
```

#### 占位选择器%
从sass 3.2.0以后就可以定义占位选择器%。这种选择器的优势在于：如果不调用则不会有任何多余的css文件，避免了以前在一些基础的文件中预定义了很多基础的样式，然后实际应用中不管是否使用了@extend去继承相应的样式，都会解析出来所有的样式。占位选择器以%标识定义，通过@extend调用。
