import StageData from './data/stage-data.json'
import React, { useState, useRef } from 'react'
import './stage.less'
import { useMount } from 'react-use'
import StageFlow from './graph/stage-flow'

const before = require('./images/zone_map_0_up.png')
const after = require('./images/zone_map_0_down.png')


export default function Stage () {
  const [opacity, setOpacity] = useState<number>(0)
  const [left, setLeft] = useState<number>(0)
  const $canvas = useRef<HTMLCanvasElement>(null)

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const target = e.currentTarget
    const width: number = target.offsetWidth  
    const scrollLeft: number = target.scrollLeft  
    const scrollWidth: number = target.scrollWidth  
    // 计算透明度
    setOpacity(scrollLeft > (scrollWidth - width) / 2 ? 1 : 0)
    // 计算左侧移动距离 0 ~ 100
    setLeft(Math.ceil(scrollLeft / (scrollWidth - width) * 100))
  }

  useMount(() => {
    $canvas.current && new StageFlow($canvas.current, StageData)
  })

  return (
    <div className="stage">
      <div className="stage-before" style={{ transform: `translateX(-${left / 10}%)` }}>
        <img src={before} alt=""/>
      </div>
      <div className="stage-after" style={{ opacity, transform: `translateX(-${left / 10}%)` }}>
        <img src={after} alt=""/>
      </div>
      <div className="stage-flow" onScroll={handleScroll}>
        <div className="stage-flow-content">
          <canvas ref={$canvas}></canvas>
        </div>
      </div>
    </div>
  )
}