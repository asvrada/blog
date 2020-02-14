---
title: 用脚本批量删除QQ空间的说说
layout: post
tags: [code]
---

以下我使用Chrome浏览器进行演示。代码可能仅兼容该浏览器。进行操作的页面为*QQ空间 > 个人中心 > 说说*。

![Imgur](https://i.imgur.com/ZuZRV5B.png)

## 1. 了解大致流程
首先需要知道人工删除一条说说该怎么做。人工的话操作起来很简单，说说下方有删除按钮，点击后会出现确认对话框，点击确认即可。

![Imgur](https://i.imgur.com/XImPUa3.png)

接下来，观察QQ空间的网页结构来看如何用代码进行以上操作。

通过检查页面工具，我们发现QQ空间的网页嵌套了一个`<iframe>`标签。而所有的说说，以及其删除按钮，都在这个`<iframe>`的根节点下。但是，确认对话框却在主根节点下。

值得注意的是，`<iframe>`标签内的页面有其自己的document属性，直接在主界面的document下无法通过getElementByxxx找到`<iframe>`标签内的元素。解决方法便是提前获取到iframe的document:

```javascript
let iframe_document = iframe.contentDocument;
// iframe_document.getElementById(xxx)...
```

## 2.初步编写代码

代码应该进行以下操作：

1. 点击每个说说的“删除”按钮
2. 点击每个弹出来的对话框的“确认“按钮

```javascript
(function() {
	// 主页面的document
	const mainDocument = document;
	// 说说所在的iframe的document
	const feedDocument = mainDocument.getElementsByClassName("app_canvas_frame")[0].contentDocument;
	
	// 删除当前页面的所有说说
	function deleteFeed() {
	    // 获取删除说说的按钮
	    let listBtnDelete = feedDocument.getElementsByClassName("del_btn");
	
	    for (let each of listBtnDelete) {
	        each.click();
	    }
	
	    return new Promise((resolve) => {
	        setTimeout(() => {
	            // 弹出对话框的所有确认按钮
	            let listBtnConfirm = mainDocument.getElementsByClassName("qz_dialog_layer_sub");
	
	            for (let each of listBtnConfirm) {
	                each.click();
	            }
	
	            resolve();
	        }, 2000);
	    });
	}
})()
```

## 3.运行

运行脚本的方法有很多种，这里就用最简单的。首先进入文章开头提到的说说页面，然后打开Chrome的开发者工具。找到Console（控制台）一栏，复制上面的代码到控制台最下方的输入区域，回车即可运行代码。

---

测试代码的时候把自己的说说都删完了，目的达到了，我也懒得继续完善其他功能了。

溜了溜了(ง ˙ω˙)ว 。
