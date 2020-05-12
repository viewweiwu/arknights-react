> 各位朋友们！**W** 的活动快要结束了，各位抽到了吗？刚刚又来了一次十连，又歪了，感觉跟 **W** 要无缘了😭。
这次分享一个**布局小技巧**，在网页中实现元素的横向排版。

这是《明日方舟》的干员列表页面。

![](https://imgkr.cn-bj.ufileos.com/18a971ed-8a1d-4754-8fd9-40ab252965a1.png)

仔细观察一下，会发现元素排版从上倒下，如果空间不够，会挤到第二列。

而正常的元素排版是从左到右，如果空间不够，会挤到第二行。

![](https://imgkr.cn-bj.ufileos.com/e8e3fa87-daac-4bea-98ed-e70a7deeb614.png)

再来个图演示一下效果。

![](https://imgkr.cn-bj.ufileos.com/3e74a1ea-bd37-4b58-92d1-9faf12019437.gif)

虽然在平时开发中很少会遇到，但是还是有的，比如 bilibili 的菜单。

![](https://imgkr.cn-bj.ufileos.com/69d1a037-6eae-4bf8-ae33-438b128afb5f.png)


## 横向排版代码实现

### 提前声明

另外本次写 html 用的 pug，不清楚 pug 怎么使用的同学看这里:

[READ MORE+](https://pugjs.org/zh-cn/language/iteration.html)

### 一、实现布局

1. **限制父元素高度**。
2. **flex 布局**。

```html
// html pug
- var n = 1;
ul
	while n <= 21
		li= n++
```

然后加上一点点样式

```css
// less
html,
body {
	width: 100%;
	height: 100vh;
	background-image: linear-gradient(to top, #accbee 0%, #e7f0fd 100%);
	overflow: auto;
}

ul {
	padding: 0 30px;
	height: 100%;
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
}

li {
	width: 200px;
	height: 300px;
	margin: 30px;
	border: 1px solid #fff;
	color: #fff;
	background-color: rgba(0, 0, 0, .5);
	display: flex;
	font-size: 40px;
	justify-content: center;
	align-items: center;
}

```

代码地址： [READ MORE+](https://codepen.io/viewweiwu/pen/JjYLNXV)

### 二、空元素占位

上面的例子，滚动到最后，就会发现这样子。

![](https://imgkr.cn-bj.ufileos.com/efe8770b-5963-403e-af7a-fb8ca26d3bf6.png)

父元素的以及子元素的`padding-right`、`margin-right` 都丢失了。

那么解决办法有好几种，这里用一种比较实用的一种，利用**空白元素**来撑开这个空间。

这里一列有两个元素，那么就塞两个空白元素就好了。

```html
// html pug
- var n = 1;
ul
	while n <= 21
		li= n++
	li.empty
	li.empty
```
```css
// less
.empty {
  width: 30px;
  background-color: unset; // 去掉背景
  border: none; // 去掉边框
  point-event: none; // 去掉触发事件
  animation: unset; // 去掉动画，如果有
}
```

CodePen：[READ MORE+](https://codepen.io/viewweiwu/pen/bGVKOQX)

## 竖向滚动转横向滚动

如果是用触控板的话，那么可以很舒服的双指横轴滚动。

但大多数同学用的还是鼠标。

其实在 web 中很少有横向去滚动，那么如果要去做兼容的话，只能去模拟。

我想到方式有两种：

- 模拟移动端拖拽（本次不实现）
- 鼠标竖轴滚动转横轴滚动

如果要转横向滚动，需要做的有 3 步：

1. **监听鼠标滚轮事件**
2. **判定是否是竖轴滚动**
3. **改变滚动元素的 `scrollLeft`**

代码很简单，就只有几行。

```javascript
document.body.onmousewheel = (e) => {
    let step = 50
    if (
      e.deltaY !== 0
      && Math.abs(e.deltaY) > Math.abs(e.deltaX)
    ) {
      document.body.scrollLeft += e.deltaY < 0 ? -step : step
    }
}
```

代码地址：[READ MORE+](https://codepen.io/viewweiwu/pen/pojKxVr)

## 总结

1. 使用 flex 做横向布局。
2. 使用空白元素撑开末尾空间。
3. 监听鼠标滚轮事件模拟竖轴滚动转横轴滚动。

注意点有：

1. 父子元素都需要确定高度。
2. 超过一屏幕会丢失右边距。

## 最后

### 以往文章

《明日方舟》签到效果实现：[READ MORE+](https://juejin.im/post/5eb41918f265da7b9b5ee2be)

《明日方舟》前端界面复刻: [READ MORE+](https://juejin.im/post/5eb05b575188256d55340964)

### 页面效果

CodePen：[READ MORE+](https://codepen.io/viewweiwu/pen/pojKxVr)

Arknight React: [READ MORE+](http://118.24.147.213/)
