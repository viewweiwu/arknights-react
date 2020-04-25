import React, { useEffect, useRef } from 'react'
import './dust.less'
import { getRandomFloor, getRandom } from '@/utils'

class Dust {
  ctx: CanvasRenderingContext2D
  width:number = 0 // 画布宽度
  height: number = 0 // 画布高度
  maxPointLength: number = 1 // 灰尘最大数量
  safeMaxPointLength: number = 30 // 灰尘上限数量
  maxTimer: NodeJS.Timeout | undefined // 灰尘上限计时器
  points: Array<Point> = [] // 灰尘组
  colors: Array<string> = ['#fff', '#000'] // 灰尘颜色
  
  constructor ($canvas: HTMLCanvasElement) {
    // 决定画布高度
    this.width = window.innerWidth
    this.height = window.innerHeight
    $canvas.width = this.width
    $canvas.height = this.height
    // 获取画布环境
    this.ctx = $canvas.getContext('2d') as CanvasRenderingContext2D
    // 循环绘制画布
    this.loopDraw()
    // 逐步开放灰尘数量上限
    this.graduallyMaxPointLength()
  }

  // 创建一个灰尘
  createPoint (): void {
    let { width, height, points, colors, maxPointLength } = this

    // 不允许超出灰尘数量上限
    if (points.length < maxPointLength) {
      // 创建并且添加一个灰尘
      let point: Point = {
        x: width,
        y: getRandomFloor(1, height),
        xa: -getRandom(1, 5),
        ya: -getRandom(-3, 3),
        size: getRandomFloor(2, 5),
        color: colors[getRandomFloor(0, 1)]
      }
      points.push(point)
    }
  }

  // 清除超出屏幕的灰尘
  clearPoint (): void {
    let { points } = this
    for (let i = 0; i < points.length; i++) {
      let point: Point = points[i]
      if (point.x < 0 || point.y < 0) {
        points.splice(i, 1)
        i -= 1
      }
    }
  }

  // 绘制画面
  draw (): void {
    let { points, ctx, width, height } = this
    // 清空画布
    ctx.clearRect(0, 0, width, height)
    // 循环绘制灰尘
    points.forEach((point: Point) => {
      point.x += point.xa
      point.y += point.ya
      ctx.fillStyle = point.color
      ctx.fillRect(point.x, point.y, point.size, point.size)
    })
  }

  // 循环绘制画面
  loopDraw (): void {
    requestAnimationFrame(() => {
      this.clearPoint()
      this.createPoint()
      this.draw()
      this.loopDraw()
    })
  }

  // 逐渐增大灰尘数量上限
  graduallyMaxPointLength (): void {
    this.maxTimer && clearTimeout(this.maxTimer)
    this.maxTimer = setTimeout(() => {
      if (this.maxPointLength < this.safeMaxPointLength) {
        this.maxPointLength += 1
      }
      this.graduallyMaxPointLength()
    }, 500)
  }
}

export default function () {
  const $canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    $canvas.current && new Dust($canvas.current)
  }, [])

  return (
    <div className="dust">
      <canvas ref={$canvas}></canvas>
    </div>
  )
}
