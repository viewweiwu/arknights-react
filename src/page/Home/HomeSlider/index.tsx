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
  const [ list ] = useState<Array<SliderItem>>([
    { src: 'http://ak.mooncell.wiki/images/0/0c/%E6%B4%BB%E5%8A%A8%E9%A2%84%E5%91%8A_%E7%94%9F%E4%BA%8E%E9%BB%91%E5%A4%9C_03.jpg' },
    { src: 'http://ak.mooncell.wiki/images/8/80/%E5%8D%88%E9%97%B4%E9%80%B8%E8%AF%9D%E6%B4%BB%E5%8A%A8%E9%A2%84%E5%91%8A03.jpg' },
    { src: 'http://ak.mooncell.wiki/images/4/4f/%E5%9C%B0%E7%94%9F%E4%BA%94%E9%87%91%E9%99%90%E6%97%B6%E5%AF%BB%E8%AE%BF.jpg' }])
  const [ index, setIndex ] = useState(0) // 当亲啊处于第几个
  const width: number = 330 // 每个 slider item 的宽度
  const time: number = 5000 // 5 秒钟循环一次

  useEffect(() => {
    loop(index, setIndex, list.length, time)
    return () => {
      timer && clearTimeout(timer)
    }
  }, [index, list])

  return (
    <div className="home-slider">
      <div className="home-slider-content">
        <ul className="content-main" style={{ transform: `translateX(${-width * index}px)` }}>
          {
            list.map(item => {
              return <li className="content-item" key={item.src}>
                <img src={item.src} alt=""/>
              </li>
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