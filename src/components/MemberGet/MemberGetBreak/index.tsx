import React, { useRef, useEffect } from 'react'
import { getRandomFloor } from '@/utils'

class Break {
  ctx: CanvasRenderingContext2D
  width:number = 0 // 画布宽度
  height: number = 0 // 画布高度

  constructor ($canvas: HTMLCanvasElement) {
    // 决定画布高度
    this.width = window.innerWidth
    this.height = window.innerHeight
    $canvas.width = this.width
    $canvas.height = this.height
    // 获取画布环境
    this.ctx = $canvas.getContext('2d') as CanvasRenderingContext2D
    this.ctx.fillStyle = 'rgba(255, 255, 255, .2)'
  }

  /**
   * @description: 绘制瓶部
   * @param {Number} x x 轴坐标
   * @param {Number} y y 轴坐标
   * @param {Number} width 宽度
   * @param {Number} height 高度
   * @return {void}
   */  
  draw (x: number, y: number, width: number, height: number) {
    let { ctx } = this
    ctx.clearRect(x, y, width, height)

    // 绘制 5 个透明小方框
    for (let i = 0; i < 5; i++) {
      let w = getRandomFloor(width * .1, width * .3)
      let h = getRandomFloor(height * .1, height * .7)
      ctx.fillRect(getRandomFloor(x, x + width - w), getRandomFloor(y, y + height - h), w, h)
    }
  }

  /**
   * @description: 晃动 -> 连续绘制 10 次
   * @param {Number} x x 轴坐标
   * @param {Number} y y 轴坐标
   * @param {Number} width 宽度
   * @param {Number} height 高度
   * @param {Number} count 绘制次数
   * @return {void}
   */  
  shake (x: number, y: number, width: number, height: number, count: number) {
    let c = 0
    let timer = setInterval(() => {
      c += 1

      this.draw(x, y, width, height)

      if (c >= count) {
        clearInterval(timer)
        this.ctx.clearRect(x, y, width, height)
      }
    }, 60)
  }
}

export default function () {
  const $canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if ($canvas.current) {
      let b: Break = new Break($canvas.current)
      let width = window.innerWidth
      let height = window.innerHeight
      setInterval(() => {
        b.shake(width * .25, height * .1, width * .5, height * .8, 10)
      }, 10000)

      setTimeout(() => {
        b.shake(width * .25, height * .1, width * .5, height * .8, 10)
      }, 3000)

      setTimeout(() => {
        b.shake(width * .6, height * .6, width * .1, width * .1, 10)
      }, 5000)

      setTimeout(() => {
        b.shake(width * .5, height * .5, width * .1, width * .1, 10)
      }, 7000)
    }
  }, [])

  return (
    <canvas ref={$canvas} className="member-get-break" />
  )
}