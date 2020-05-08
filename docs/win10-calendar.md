> 之前我写了一篇 [《明日方舟》前端界面复刻](https://juejin.im/post/5eb05b575188256d55340964)，其中有一个每日签到页面有一个聚光的效果，这次我们来分析一下具体是如何实现的。


## 效果演示
实际效果如图所示，移动到网格其中某个地方时，周围会出现聚光效果：

![](https://imgkr.cn-bj.ufileos.com/75511575-9604-4015-a9b9-e94b1dee95f7.gif)

而在游戏里面，似乎采用了静态贴图，这可能是由于手游没有这样的交互动作，所以显得有些差强人意。

![](https://imgkr.cn-bj.ufileos.com/3d93c748-c1cc-4b9a-8b1f-8c5635d7147f.png)

在同样的 win10 里面，也有类似的效果：

![](https://imgkr.cn-bj.ufileos.com/e33c659b-9c41-4d76-8c93-b4ab3312206a.png)

这一次，我们试着在 web 里面实现类似的效果。


![](https://imgkr.cn-bj.ufileos.com/e416bf74-327b-4960-a9d2-dfef232d5cab.gif)


web 仿签到日历 copepen: [READ MORE+](https://codepen.io/viewweiwu/pen/GRpQYby?editors=0110)

**《明日方舟》前端界面复刻**文章地址: [READ MORE+](https://juejin.im/post/5eb05b575188256d55340964)

arknights-react 演示地址: [READ MORE+](http://118.24.147.213/)

arknights-react 每日签到源码: [READ MORE+](https://github.com/viewweiwu/arknights-react/blob/master/src/page/Home/HomeSign/index.tsx)


## 实现思路

步骤分为 4 步。

### 1. 分层

分开两层图层，数字层与网格层。

让数字层放在网格层之上，大概就是这种感觉。

![](https://imgkr.cn-bj.ufileos.com/fffaa20f-f5e7-4817-bc0c-a62960fffb7f.png)

实际 dom 的排列顺序保持一致即可，两个层的内容重叠，大小也一致。

### 2. 绘制

在数字层绘制初内容，在网格层绘制出网格。

```javascript
// react hook 
function Grid () {
  // 生成 60 个网格，其实多少无所谓，随便来。
	const [list, setList] = React.useState(
		Array.from({ length: 60 }, (_, i) => i + 1)
	)

	return (
		<div className="grid">
      <!-- 第一层：网格 -->
			<ul className="grid-list grid-border">
				{ list.map(item => <li className="grid-item" key={item}></li>) }
			</ul>
      <!-- 第二层：数字 -->
			<ul className="grid-list grid-num">
				{ list.map(item => <li className="grid-item" tabindex="0" key={item}>{item}</li>) }
			</ul>
		</div>
	)
}

ReactDOM.render(
	<Grid></Grid>,
	document.getElementById('root')
)
```

效果如下

![](https://imgkr.cn-bj.ufileos.com/74e993ca-f053-4c1e-a0fd-e0012c4d7631.png)

蓝色边框表示我们的网格，而数字这是单独一层展示。

copepen 演示: [READ MORE+](https://codepen.io/viewweiwu/pen/XWmZGzK?editors=0110)
### 3. 显示遮罩

添加遮罩(mask)显示。

原理是用 mask 的其中 4 个属性来控制遮罩。

另外加上点细节丰富一下，让默认的文字是暗色，悬浮的是白色。


```css
.grid-border {
  // mask 大小
  -webkit-mask-size: 240px 240px;
  // mask 不重复
  -webkit-mask-repeat: no-repeat;
  // mask 圆半径
  -webkit-mask-image: radial-gradient(circle, #fff, transparent 120px);
  // mask 位置
  -webkit-position: 0 0;
}
```

效果如下：

![](https://imgkr.cn-bj.ufileos.com/ec532c9e-c4c9-4381-a3f2-11b1506e27a2.png)

copepen 演示: [READ MORE+](https://codepen.io/viewweiwu/pen/pojaYEM?editors=0110)。

### 4. 控制遮罩(mask)移动。

控制遮罩(mask)移动。

主要是控制 mask 的 position，因此我们需要 (x, y) 两个坐标来决定 mask 的位置。

同时鼠标在网格上移动，以及离开的时候，来设置 (x, y) 的位置。

```javascript
// react hook 实现
function Grid() {
    const [list, setList] = React.useState(
        Array.from({ length: 60 }, (_, i) => i + 1)
    )

    const $border = React.useRef(null)
    const [x, setX] = React.useState(-500)
    const [y, setY] = React.useState(-500)

    // 将遮罩移动到鼠标位置
    const handleMouseMove = (e) => {
        e.stopPropagation()
        const rect = $border.current
            ? $border.current.getBoundingClientRect()
            : null

        setX(e.pageX - (rect ? rect.x : -500) - 150)
        setY(e.pageY - (rect ? rect.y : -500) - 150)
    }

    //设置遮罩隐藏
    const handleMouseLeave = () => {
        setX(-500)
        setY(-500)
    }

    return (
        <div
            className='grid'
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <ul
                ref={$border}
                className='grid-list grid-border'
                style={{
                    WebkitMaskPosition: `${x}px ${y}px`, // 此处设置 mask 样式
                    maskPosition: `${x}px ${y}px`,
                }}
            >
                {list.map((item) => (
                    <li className='grid-item' key={item}></li>
                ))}
            </ul>
            <ul className='grid-list grid-num'>
                {list.map((item) => (
                    <li className='grid-item' tabindex='0' key={item}>
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    )
}

// ...

```

效果如下：

![](https://imgkr.cn-bj.ufileos.com/e416bf74-327b-4960-a9d2-dfef232d5cab.gif)

copepen 演示: [READ MORE+](https://codepen.io/viewweiwu/pen/GRpQYby?editors=0110)

以上就是完整的效果啦！

## 总结

完成日历效果总共需要 4 个步骤：

1. 分开两层图层，数字层与网格层。
2. 在数字层绘制初内容，在网格层绘制出网格。
3. 添加遮罩(mask)显示。
4. 控制遮罩(mask)移动。

至于其它的页面布局细节，这里就不多做介绍了，如果有想了解的，可以看源码，也可以在下面评论。

## 源码地址

web 仿签到日历 copepen: [READ MORE+](https://codepen.io/viewweiwu/pen/GRpQYby?editors=0110)

**《明日方舟》前端界面复刻**文章地址: [READ MORE+](https://juejin.im/post/5eb05b575188256d55340964)

arknights-react 演示地址: [READ MORE+](http://118.24.147.213/)

arknights-react 每日签到源码: [READ MORE+](https://github.com/viewweiwu/arknights-react/blob/master/src/page/Home/HomeSign/index.tsx)
