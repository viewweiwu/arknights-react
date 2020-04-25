/*
 * @Author: your name
 * @Date: 2020-04-23 19:20:37
 * @LastEditTime: 2020-04-25 22:26:18
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

const cg = 'http://ak.mooncell.wiki/images/1/13/%E7%AB%8B%E7%BB%98_%E8%83%BD%E5%A4%A9%E4%BD%BF_skin1.png'
const logo = 'http://ak.mooncell.wiki/images/f/f3/Skin_logo_%E7%94%9F%E5%91%BD%E4%B9%8B%E5%9C%B0.png'
const garish = 'http://ak.mooncell.wiki/images/4/49/%E5%B9%B2%E5%91%98%E4%BF%A1%E6%81%AF_%E8%83%8C%E6%99%AF.png'
const type = 'http://ak.mooncell.wiki/images/d/d1/%E5%9B%BE%E6%A0%87_%E8%81%8C%E4%B8%9A_%E7%8B%99%E5%87%BB_%E5%A4%A7%E5%9B%BE.png'

interface ArrowItem {
  id: number,
  top: number,
  left: number,
  size: number,
  color: string,
  direction: string,
  moved: boolean
}

/**
 * @description: 创建一个箭头动画元素
 * @return {void}
 */
let createArrowItem = () => {
  const color = ['pink', 'white'][getRandomFloor(0, 1)]
  return {
    id: Date.now() + Math.random(),
    top: color === 'pink'
      ? getRandomFloor(window.innerHeight * 0.3, window.innerHeight * 0.7)
      : getRandomFloor(window.innerHeight * 0.7, window.innerHeight),
    left: getRandomFloor(0, window.innerWidth),
    size: getRandomFloor(10, 30),
    color,
    direction: ['up', 'down'][getRandomFloor(0, 1)],
    moved: false
  }
}

// 箭头元素上限
let max = 30

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

export default function () {
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

  return (
    <div className="member-get">
      <Dust />
      <div className="arrow-wrap">
        {
          list.map(item => {
            return (
              <div className={`arrow-item ${item.color}`} key={item.id} style={{ left: item.left + 'px', top: item.top + 'px' }}>
                <div className="arrow-item-light"></div>
                <i className={`icon-white iconfont icon-fill-${item.direction}`} style={{ fontSize: item.size }}></i>
              </div>
            )
          })
        }
      </div>
      {/* <img className="member-garish" src={garish} alt=""/> */}
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
      <MemberGetBreak />
    </div>
  )
}
