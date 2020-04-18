import React, { useEffect, useState, SetStateAction, Dispatch } from 'react'
import './home-slider.less'

interface SliderItem {
  src: string
}

let timer: NodeJS.Timeout | undefined

/**
 * 循环改变 slider index
 * @param index 当前处于第几个
 * @param setIndex 设置 index
 * @param maxLength index 最大值
 * @param time 每次循环间隔时间
 */
function loop (index: number, setIndex: Dispatch<SetStateAction<number>>, maxLength: number, time: number) {
  timer && clearTimeout(timer)
  timer = setTimeout(() => {
    if (index < maxLength - 1) {
      index += 1
    } else {
      index = 0
    }
    setIndex(index)
  }, time)
}

export default function () {
  const [ list ] = useState<Array<SliderItem>>([{ src: '消息1' }, { src: '消息2' }, { src: '消息3' }])
  const [ index, setIndex ] = useState(0) // 当亲啊处于第几个
  const width: number = 330 // 每个 slider item 的宽度
  const time: number = 5000 // 5 秒钟循环一次

  useEffect(() => {
    loop(index, setIndex, list.length, time)
  }, [index, list])

  return (
    <div className="home-slider">
      <div className="home-slider-content">
        <ul className="content-main" style={{ transform: `translateX(${-width * index}px)` }}>
          {
            list.map(item => {
              return <li className="content-item" key={item.src}>{item.src}</li>
            })
          }
        </ul>
      </div>
      <ul className="home-slider-indicator">
        {
          list.map((item, i) => {
            return <li className={`indicator-item ${ i === index && 'active' }`} key={item.src}></li>
          })
        }
      </ul>
    </div>
  )
}