import * as React from 'react'
import loadLive2d from 'live2d-helper'

export default class Live extends React.Component {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor (props: Readonly<{}>) {
    super(props)
  }
  componentDidMount () {
    console.log(1)
    loadLive2d({
      canvas: "live2d", // canvas的id亦可以是canvas的dom元素
      baseUrl: "./model/Rice", // 资源原始路径
      model: "./model/Rice/Rice.model3.json", // 可以直接填写网络路径,也可以直接传入model对象
      allowSound: true, // 是否允许播放音频，如果有的话 def：true
      interval: 30000, // 自动motion的开始时间点到下一个motion的开始点之间的间隔,有语音的话从语音播放结束开始计算
      idle: "idle", // 自动触发的motion
      width: "800", // html上的width属性优先级更高
      height: "800", // html上的height属性优先级更高
      globalFollowPointer: false, // 老婆焦点跟随鼠标 def:false
      scaling: true, // 是否允许使用滚轮放大缩小 def:false
      debug: {
        DEBUG_LOG: false,
        DEBUG_MOUSE_LOG: false
      }
    })
  }
  render () {
    return (
      <div className="live">
        <canvas id="live2d" width="500" height="500"></canvas>
      </div>
    )
  }
}