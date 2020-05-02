import React, { useState, useRef } from 'react'
import './home-sign.less'
import { getRandomFloor } from '@/utils'
import dayjs from 'dayjs'

interface SignProps {
  onClose(): void
}

interface GridItem {
  index: number,
  img: string,
  checked: boolean,
  active: boolean
}

// 道具图表
const images = [
  'http://ak.mooncell.wiki/images/thumb/7/70/%E9%81%93%E5%85%B7_%E5%BC%82%E9%93%81%E5%9D%97.png/100px-%E9%81%93%E5%85%B7_%E5%BC%82%E9%93%81%E5%9D%97.png',
  'http://ak.mooncell.wiki/images/thumb/d/d0/%E9%81%93%E5%85%B7_%E9%A3%9F%E5%A0%82%E6%B1%A4%E7%82%B9%E5%88%B8.png/100px-%E9%81%93%E5%85%B7_%E9%A3%9F%E5%A0%82%E6%B1%A4%E7%82%B9%E5%88%B8.png',
  'http://ak.mooncell.wiki/images/thumb/a/a5/%E9%81%93%E5%85%B7_%E5%88%9D%E7%BA%A7%E4%BD%9C%E6%88%98%E8%AE%B0%E5%BD%95.png/100px-%E9%81%93%E5%85%B7_%E5%88%9D%E7%BA%A7%E4%BD%9C%E6%88%98%E8%AE%B0%E5%BD%95.png',
  'http://ak.mooncell.wiki/images/thumb/4/41/%E9%81%93%E5%85%B7_%E4%B8%AD%E7%BA%A7%E4%BD%9C%E6%88%98%E8%AE%B0%E5%BD%95.png/100px-%E9%81%93%E5%85%B7_%E4%B8%AD%E7%BA%A7%E4%BD%9C%E6%88%98%E8%AE%B0%E5%BD%95.png'
]

// 道具列表
const grid: Array<GridItem> = []
const date = new Date()

// 每日填充随机道具
for (let i = 0; i < 31; i++) {
  let item: GridItem = {
    index: i + 1,
    img: images[getRandomFloor(0, images.length - 1)],
    checked: date.getDate() > i,
    active: date.getDate() === i
  }
  grid.push(item)
}

export default function (props: SignProps) {
  // 遮罩 x, y 坐标
  const [x, setX] = useState<number>(-500)
  const [y, setY] = useState<number>(-500)
  const $border = useRef<HTMLUListElement>(null)

  /**
   * 将遮罩移动到鼠标位置
   * @param {MouseEvent} e 鼠标移动 event
   */
  const handleMouseMove = (e: React.MouseEvent): void => {
    e.stopPropagation()
    const rect: DOMRect | null = $border.current ? $border.current.getBoundingClientRect() : null

    setX(e.pageX - (rect ? rect.x : -500) - 150)
    setY(e.pageY - (rect ? rect.y : -500) - 150)
  }

  /**
   * 设置遮罩隐藏
   */
  const handleMouseLeave = (): void => {
    setX(-500)
    setY(-500)
  }

  /**
   * 今日签到完毕
   */
  const handleSign = (): void => {
    props.onClose()
    localStorage.setItem('SIGNED_DATE', dayjs(new Date()).format('YYYY-MM-DD'))
  }

  return (
    <div className="sign">
      <div className="sign-content">
        <i className="sign-close iconfont icon-close" onClick={() => handleSign()}></i>
        <div
          className="sign-grid"
          onMouseMove={(e: React.MouseEvent) => handleMouseMove(e)}
          onMouseLeave={() => handleMouseLeave()}
        >
          <header className="sign-header">
            <i className="iconfont icon-calendar"></i>
            <mark>四月签到</mark>
            一日之计在于晨。罗德岛后勤部将为博士提供多样的每日物资。
          </header>
          <ul
            ref={$border}
            className="sign-grid-border"
            style={{ WebkitMaskPosition: `${x}px ${y}px`, maskPosition: `${x}px ${y}px` }}
          >
            {
              grid.map(item => {
                return (
                  <li className="sign-grid-item" key={item.index}></li>
                )
              })
            }
          </ul>
          <ul className="sign-grid-main">
            {
              grid.map(item => {
                return (
                  <li className={`sign-grid-item ${item.checked && 'checked'} ${item.active && 'active'}`} key={item.index}>
                    <div className="sign-grid-number">{item.index}</div>
                    { item.checked && <i className="iconfont icon-checked"></i> }
                    <img className="sign-grid-image" src={item.img} height="60" alt="" draggable="false" />
                    <span className="sign-grid-count">99</span>
                  </li>
                )
              })
            }
          </ul>
        </div>
        <aside className="sign-aside">
          <div className="sign-aside-content">
            <time>
              <i className="iconfont icon-time"></i>
              <span className="gap">08:44:44</span>
            </time>
            <span className="sign-aside-tag">常规配给</span>
            <div className="sign-aside-info">
              <img src={images[1]} alt=""/>
              <div className="sign-aside-bar">
                <p className="sign-aside-name">高级作战记录</p>
                x99
              </div>
            </div>
          </div>
          <p className='sign-confirm'>
            <i className="iconfont icon-sign"></i>
            已签到
          </p>
        </aside>
      </div>
    </div>
  )
}