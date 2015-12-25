# markdown的使用笔记

@(示例笔记)[meddkim|参考|Markdown]

**Markdown**：Markdown 是一种用来写作的轻量级「标记语言」，它用简洁的语法代替排版，而不像一般我们用的字处理软件 Word 或 Pages 有大量的排版、字体设置。特点概述：
 
- **重点突出** ：专注你的文字内容而不是排版样式。
- **使用简单** ：轻松的导出 HTML、PDF 和本身的 .md 文件。

-------------------------

[TOC]

## 标题

## 列表
* 无序列表
* 无序列表

- 无序列表的第二种方式
- 无序列表的第二种方式

1. 有序列表
2. 有序列表

## 引用
> Markdown 是一种轻量级标记语言，它允许人们使用易读易写的纯文本格式编写文档，然后转换成格式丰富的HTML页面。    —— [维基百科](https://zh.wikipedia.org/wiki/Markdown)

## 链接
[百度](http://baidu.com)
![Mou_icon](http://mouapp.com/Mou_128.png) 

## 粗体与斜体
*这是斜体*
**这是粗体**

## 表格
| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

## 代码
``` python
@requires_authorization
def somefunc(param1='', param2=0):
    '''A docstring'''
    if param1 > param2: # interesting
        print 'Greater'
    return (param2 - param1 + 1) or None
class SomeClass:
    pass
>>> message = '''interpreter
... prompt'''
```

## 分割线
  分割线之前
***
  分割线之后
