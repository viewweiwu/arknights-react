import React, { useState } from 'react'
import { useMount } from 'react-use'
const shadow = require('./shadow.png')

interface Point {
  x: number; // x 坐标
  y: number; // y 坐标
  left: number; // 左边距
  top: number; // 上边距
  color: string; // 颜色
  border?: boolean; // 是否是边缘
}

const getAroundPointList = (point: Point) => {
  return [
    /** 左 */
    [point.x - 1, point.y],
    /** 左上 */
    [point.x - 1, point.y - 1],
    /** 上 */
    [point.x, point.y - 1],
    /** 右上 */
    [point.x + 1, point.y - 1],
    /** 右 */
    [point.x + 1, point.y],
    /** 右下 */
    [point.x + 1, point.y + 1],
    /** 下 */
    [point.x, point.y + 1],
    /** 左下 */
    [point.x - 1, point.y + 1]
  ]
}

const getImageColor = (n: number = 20, scale: number = 1) => {
  return new Promise(resolve => {
    // 获取到图片
    const img = new Image()
    img.src = shadow
    img.onload = () => {
      // 创建一个 canvas
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      let width = img.width
      let height = img.height
      canvas.width = width
      canvas.height = height
      console.log(width, height)
      // 把图片绘制在 canvas 上
      ctx?.drawImage(img, 0, 0, width * scale, height * scale)
      // 获取到图片所有的像素点原数据
      let data = ctx?.getImageData(0, 0, width, height).data
      if (data) {
        // 把图片数据分割成 rgba 数据
        let list = []
        for (let i = 0; i < data?.length; i+= 4) {
          list.push(data.slice(i, i + 4))
        }
        // 每次间隔 n 拿一个像素点
        let pointList = []
        // 点集合，用于判断
        let set = new Set()
        for (let i = 0; i < height; i += n) {
          for (let j = 0; j < width; j += n) {
            let color = `rgba(${list[i * width + j].join(',')})`
            // 忽略透明色
            if (color === 'rgba(0,0,0,0)') {
              continue
            }
            // 获取实际 (x, y) 坐标
            let x = i / n
            let y = j / n
            let point: Point = {
              y,
              x,
              top: i,
              left: j,
              color
            }
            pointList.push(point)
            // 集合里根据 (x, y) 坐标, 添加一个数据
            set.add(x + ',' + y)
          }
        }
        let borderList = pointList.filter(point => {
          // 获取周边所有的点信息
          let aroundList = getAroundPointList(point)
          // 判断周边是否环绕着点
          let hasAround =  aroundList.some(item => !set.has(item.join(',')))
          point.border = hasAround
          return hasAround
        })
        resolve({ pointList, borderList })
      }
    }

  })
}
const n = 6
export default function HomeCardCharacter () {
  const [list, setList] = useState<any>([])
  useMount(() => {
    getImageColor(n, 0.5).then(({ pointList, borderList }: any) => {
      setList(pointList)
    })
  })
  return (
    <div className="home-card-character">
      {
        list.map((point: Point, i: number) => {
          return (
            <span
              className="point"
              key={ `point-${i}` }
              style={{
                top: point.top,
                left: point.left,
                width: n / 3 * 2,
                height: n / 3 * 2,
                backgroundColor: point.border ? '#f06' : point.color
              }}
            ></span>
          )
        })
      }
    </div>
  )
}