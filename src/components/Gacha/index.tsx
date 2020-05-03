import React, { useState } from 'react'
import './gacha.less'
import { useMount, useInterval } from 'react-use'
import { playSound } from '../AcAudio'
import GachaDetail from './GachaDetail'
import { getRandomFloor } from '@/utils'
import GachaShadow from './GachaShadow'

interface MemberGetProps {
  onClose(visible: boolean): void
}

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
  const left = moveType === 'blink' ? getRandomFloor(0, w) : moveDirection === 'left-to-right' ? getRandomFloor(0, w * 0.2) : getRandomFloor(w * 0.8, w)

  return {
    id: Date.now() + Math.random(),
    top: color === 'pink' ? getRandomFloor(h * 0.3, h * 0.7) : getRandomFloor(h * 0.7, h),
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

interface MemberGetProps {
  onClose(visible: boolean): void
}


const gacha = require('./images/gacha.png')
const data = require('./images/gacha2.png')

/**
 * @description: 清空已经完成动画的元素
 * @param {Array<ArrowItem>} list
 * @param {function} setList
 * @return {Array<ArrowItem>} newList
 */
const clearMovedList = (list: Array<ArrowItem>, setList: (newList: Array<ArrowItem>) => void) => {
  let newList: Array<ArrowItem> = []
  list.forEach((item) => {
    if (!item.moved) {
      newList.push(item)
    }
  })
  setList(newList)
  return newList
}

export default function MemberGet (props: MemberGetProps) {
  const [ visble, setVisible ] = useState<boolean>(false)
  const [ preShadowVisible, setPreShadowVisible ] = useState<boolean>(false)
  const [ shadowVisible, setShadowVisible ] = useState<boolean>(false)
  let [ list, setList ] = useState<Array<ArrowItem>>(createDefaultArrow(5))
  
  useMount(() => {
    setTimeout(() => {
      setPreShadowVisible(true)
    }, 4000)
    setTimeout(() => {
      setShadowVisible(true)
    }, 6000)
    setTimeout(() => {
      setVisible(true)
    }, 8000)

    playSound('mixed_gacha_part1')
  })

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
    <div className="gacha-preview">
      <div className='arrow-wrap'>
        {
          list.map((item) => {
            return (
              <div className={`arrow-item ${item.color} ${item.moveType} ${item.moveDirection}`} key={item.id} style={{ left: item.left + 'px', top: item.top + 'px' }}>
                <div className='arrow-item-light'></div>
                <i className={`iconfont icon-fill-${item.direction}`} style={{ fontSize: item.size }}></i>
              </div>
            )
          })
        }
      </div>
      <img className="gacha-preview-data" width="500" src={data} alt="" />
      <img className="gacha-preview-pack" width="500" src={gacha} alt="" />
      { visble && <GachaDetail onClose={() => setVisible(false)} /> }
      { preShadowVisible && <div className="gacha-preview-shadow"></div> }
      { shadowVisible && <GachaShadow /> }
    </div>
  )
}