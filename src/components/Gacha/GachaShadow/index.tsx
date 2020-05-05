import React from 'react'
import { useMount } from 'react-use'
import { playSound } from '@/components/AcAudio'

const shadow = require('../images/shadow.png')

export default function GachaShadow() {
  useMount(() => {
    playSound('mixed_gacha_star_6')
    playSound('mixed_gacha_part2')
  })

  return (
    <div className="gacha-shadow">
      <img className="gacha-shadow-cg" src={shadow} height="900" draggable="false" alt="" />
      <ul className="gacha-shadow-light">
        <li className="light-item"></li>
        <li className="light-item"></li>
        <li className="light-item"></li>
      </ul>
      <ul className="gacha-stars">
        <i className="iconfont icon-star"></i>
        <i className="iconfont icon-star"></i>
        <i className="iconfont icon-star"></i>
        <i className="iconfont icon-star"></i>
        <i className="iconfont icon-star"></i>
        <i className="iconfont icon-star"></i>
      </ul>
    </div>
  )
}