<template>
  <div ref="bg" class="app-effect">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import { getRandom, getRandomFloor } from '@/util'
export default {
  name: 'layout-bg',
  data () {
    return {
      maxSize: 1,
      saveMaxSize: 20,
      colors: ['#fff', '#000'],
      points: []
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      let $canvas = this.$refs.canvas
      this.width = window.innerWidth
      this.height = window.innerHeight
      $canvas.width = this.width
      $canvas.height = this.height
      this.ctx = $canvas.getContext('2d')
      this.loopDraw()
      this.loopMaxSize()
    },
    loopMaxSize () {
      this.maxTimer && clearTimeout(this.maxTimer)
      this.maxTimer = setTimeout(() => {
        if (this.maxSize < this.saveMaxSize) {
          this.maxSize += 1
        }
        this.loopMaxSize()
      }, 500)
    },
    createPoint () {
      if (this.points.length < this.maxSize) {
        this.points.push({
          x: this.width,
          y: getRandomFloor(0, this.height),
          xa: -getRandom(1, 5),
          ya: -getRandom(-3, 3),
          size: Math.floor(Math.random() * 3) + 2,
          color: this.colors[getRandomFloor(0, 1)]
        })
      }
    },
    clearPoint () {
      let { points } = this
      for (let i = 0; i < points.length; i++) {
        let point = points[i]
        if (point.x < 0 || point.y < 0) {
          points.splice(i, 1)
          i -= 1
        }
      }
    },
    loopDraw () {
      requestAnimationFrame(() => {
        this.clearPoint()
        this.createPoint()
        this.draw()
        this.loopDraw()
      })
    },
    draw () {
      let { points, ctx, width, height } = this
      ctx.clearRect(0, 0, width, height)
      points.forEach(point => {
        point.x += point.xa
        point.y += point.ya
        ctx.fillStyle = point.color
        ctx.fillRect(point.x, point.y, point.size, point.size)
      })
    }
  }
}
</script>

<style lang="less">
.app-effect {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 21;
  position: fixed;
  pointer-events: none;
}
</style>
