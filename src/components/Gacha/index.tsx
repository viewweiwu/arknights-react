import React, { useState } from 'react'
import './gacha.less'
import { useMount, useInterval } from 'react-use'
import { playSound, stopSound } from '../AcAudio'
import GachaDetail from './GachaDetail'
import { getRandomFloor } from '@/utils'
import GachaShadow from './GachaShadow'
import ReactDOM from 'react-dom'

interface GachaProps {
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

const gacha = 'https://imgkr.cn-bj.ufileos.com/b2e372b6-8ded-45b8-b4e1-5c8e160f1e39.png'
const data = 'https://imgkr.cn-bj.ufileos.com/e10a9f47-2035-4272-a613-9f1cfdd9ad6b.png'

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

let preShadowTimer: NodeJS.Timeout
let shadowTimer: NodeJS.Timeout
let timer: NodeJS.Timeout

function GachaDialog (props: GachaProps) {
  const [ visble, setVisible ] = useState<boolean>(false)
  const [ preShadowVisible, setPreShadowVisible ] = useState<boolean>(false)
  const [ shadowVisible, setShadowVisible ] = useState<boolean>(false)
  let [ list, setList ] = useState<Array<ArrowItem>>(createDefaultArrow(5))
  
  useMount(() => {
    preShadowTimer = setTimeout(() => {
      setPreShadowVisible(true)
    }, 4000)
    shadowTimer = setTimeout(() => {
      setShadowVisible(true)
    }, 6000)
    timer = setTimeout(() => {
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

  const handleSkip = () => {
    if (!visble) {
      clearTimeout(preShadowTimer)
      clearTimeout(shadowTimer)
      clearTimeout(timer)
      setPreShadowVisible(false)
      setShadowVisible(true)
      timer = setTimeout(() => {
        setVisible(true)
      }, 2000)
      stopSound('mixed_gacha_part1')
    } else {
      props.onClose(true)
      stopSound('能天使_干员报到')
      stopSound('mixed_gacha_part2')
    }
  }

  return (
    <div className="gacha-preview">
      <div className="gacha-skip btn" onClick={handleSkip}>SKIP</div>
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
      { !shadowVisible && <img className="gacha-preview-data" width="500" src={data} alt="" /> }
      { !shadowVisible && <img className="gacha-preview-pack" width="500" src={gacha} alt="" /> }
      { visble && <GachaDetail onClose={() => props.onClose(false)} /> }
      { preShadowVisible && <div className="gacha-preview-shadow"></div> }
      { shadowVisible && <GachaShadow /> }
    </div>
  )
}

export default function ShowGacha () {
  let element: HTMLDivElement = window.document.createElement('div')
  document.body.appendChild(element)

  const onClose = () => {
    ReactDOM.unmountComponentAtNode(element)
    document.body.removeChild(element)
  }

  ReactDOM.render(
    <GachaDialog onClose={onClose} />,
    element
  )
}
