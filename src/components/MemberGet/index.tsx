/*
 * @Author: your name
 * @Date: 2020-04-23 19:20:37
 * @LastEditTime: 2020-04-27 18:37:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /arknights-react/src/components/MemberGet/index.tsx
 */
import React, { useState } from 'react'
import './member-get.less'
import { getRandomFloor } from '@/utils'
import { useInterval } from '@/utils/useTimeout'
import Dust from '../Dust'
import MemberGetBreak from './MemberGetBreak'
import pikaccyuu from './pikacyuu.svg'
const garish = require('./poly.png')

const cg = 'http://ak.mooncell.wiki/images/1/13/%E7%AB%8B%E7%BB%98_%E8%83%BD%E5%A4%A9%E4%BD%BF_skin1.png'
const logo = 'http://ak.mooncell.wiki/images/f/f3/Skin_logo_%E7%94%9F%E5%91%BD%E4%B9%8B%E5%9C%B0.png'
const type = 'http://ak.mooncell.wiki/images/d/d1/%E5%9B%BE%E6%A0%87_%E8%81%8C%E4%B8%9A_%E7%8B%99%E5%87%BB_%E5%A4%A7%E5%9B%BE.png'

interface ArrowItem {
  id: number,
  top: number,
  left: number,
  size: number,
  color: string,
  direction: string,
  moved: boolean,
  moveType: string,
  moveDirection: string
}

/**
 * @description: 创建一个箭头动画元素
 * @return {void}
 */
let createArrowItem = () => {
  let w = window.innerWidth
  let h = window.innerHeight
  const color = ['pink', 'white'][getRandomFloor(0, 1)]
  const moveType = ['blink', 'move'][getRandomFloor(0, 1)]
  const moveDirection = ['left-to-right', 'right-to-left'][getRandomFloor(0, 1)]
  const left = moveType === 'blink'
    ? getRandomFloor(0, w)
    : moveDirection === 'left-to-right'
      ? getRandomFloor(0, w * .2)
      : getRandomFloor(w * .8, w)
    
  return {
    id: Date.now() + Math.random(),
    top: color === 'pink'
      ? getRandomFloor(h * .3, h * .7)
      : getRandomFloor(h * .7, h),
    left,
    moveType,
    moveDirection,
    size: getRandomFloor(10, 30),
    color,
    direction: ['up', 'down'][getRandomFloor(0, 1)],
    moved: false
  }
}

// 箭头元素上限
let max = 50

const createDefaultArrow = (count: number) => {
  let newList: Array<ArrowItem> = []

  for (let i = 0; i < count; i++) {
    newList.push(createArrowItem())
  }

  return newList
}

/**
 * @description: 清空已经完成动画的元素
 * @param {Array<ArrowItem>} list
 * @param {function} setList
 * @return {Array<ArrowItem>} newList
 */
const clearMovedList = (list: Array<ArrowItem>, setList: (newList: Array<ArrowItem>) => void) => {
  let newList: Array<ArrowItem> = []
  list.forEach(item => {
    if (!item.moved) {
      newList.push(item)
    }
  })
  setList(newList)
  return newList
}

interface MemberGetProps {
  visible: boolean,
  setVisible(visible: boolean): void
}

export default function (props: MemberGetProps) {
  let [ list, setList ] = useState<Array<ArrowItem>>(createDefaultArrow(5))

  useInterval(() => {
    // 清空已经完成动画的元素
    list = clearMovedList(list, setList)
    if (list.length < max) {
      let newItem = createArrowItem()
      setList([...list, newItem])
      setTimeout(() => {
        newItem.moved = true
      }, 4000)
    }
  }, 200)

  return props.visible
    ? (
    <div className="member-get" onClick={ () => props.setVisible(false) }>
      <div className="shadow-page"></div>
      <Dust />
      <div className="icon-large">
        <i className="iconfont icon-fill-down"></i>
      </div>
      <div className="arrow-wrap">
        {
          list.map(item => {
            return (
              <div className={`arrow-item ${item.color} ${item.moveType} ${item.moveDirection}`} key={item.id} style={{ left: item.left + 'px', top: item.top + 'px' }}>
                <div className="arrow-item-light"></div>
                <i className={`iconfont icon-fill-${item.direction}`} style={{ fontSize: item.size }}></i>
              </div>
            )
          })
        }
      </div>
      <img className="member-garish" src={garish} alt=""/>
      <img className="member-cg" src={cg} alt=""/>
      <img className="member-logo" src={logo} alt=""/>
      <div className="member-stars">
        <i className="iconfont icon-star"></i>
        <i className="iconfont icon-star"></i>
        <i className="iconfont icon-star"></i>
        <i className="iconfont icon-star"></i>
        <i className="iconfont icon-star"></i>
        <i className="iconfont icon-star"></i>
      </div>
      <main className="member-info">
        <div className="info-type">
          <p>SNIPER</p>
          <p className="info-type-cn">狙击</p>
        </div>
        <div className="info-image">
          <img src={type} width="70" height="70" alt=""/>
        </div>
        <div className="info-name">
          <p className="info-name-cn">能天使</p>
          <p>Exusiai</p>
        </div>
      </main>
      <div className="member-voice">
        <p>口令是“企鹅帝国万岁”，你就是雇主吗？叫我能天使。我和那个冷淡的鲁珀人可不一样，你要是想找点有趣的事做，随时都可以来叫我！</p>
      </div>
      <MemberGetBreak />
    </div>
  )
  : null
}
