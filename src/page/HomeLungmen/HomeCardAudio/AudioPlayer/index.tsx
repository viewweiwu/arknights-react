import React, { MutableRefObject, useRef, useEffect } from 'react'
// const high = require('@/assets/audio/high.mp3')
const high = '/audio/high.mp3'


class AudioControls {
  private canvas: HTMLCanvasElement
  private audio: HTMLAudioElement
  private content: HTMLDivElement
  private width: number = 0
  private height: number = 0
  private bufferLength: number = 0
  private ctx?: CanvasRenderingContext2D | null
  private dataArray?: Uint8Array
  private analyser?: AnalyserNode
  private pause: boolean = false

  constructor (canvas: HTMLCanvasElement, audio: HTMLAudioElement, content: HTMLDivElement) {
    this.canvas = canvas
    this.audio = audio
    this.content = content
    this.audioInit()
    this.canvasInit()
  }

  private audioInit () {
    let context = new window.AudioContext()
    let analyser = context.createAnalyser()
    analyser.fftSize = 64
    let source = context.createMediaElementSource(this.audio)

    source.connect(analyser)
    analyser.connect(context.destination)

    let bufferLength = analyser.frequencyBinCount
    let dataArray = new Uint8Array(bufferLength)

    this.bufferLength = bufferLength
    this.dataArray = dataArray
    this.analyser = analyser

    this.audio.oncanplay = () => {
      // this.audio.play()
    }
    this.audio.onpaste = () => {
      console.log('pause')
      this.pause = true
    }
    this.audio.onplay = () => {
      console.log('play')
      this.pause = false
      this.draw()
    }
  }

  private canvasInit () {
    let { canvas, content } = this
    let rect = content.getBoundingClientRect()
    canvas.width = rect.width
    canvas.height = rect.height
    this.width = rect.width
    this.height = rect.height
    this.ctx = canvas.getContext('2d')
  }

  draw () {
    let { ctx, width, height, bufferLength, dataArray, analyser, pause } = this
    if (pause) {
      return
    }
    requestAnimationFrame(this.draw.bind(this))
    if (!ctx || !dataArray || !analyser) {
      return
    }
    analyser.getByteFrequencyData(dataArray)
    ctx.clearRect(0, 0, width, height)
    let barWidth = width / bufferLength * 1.5
    let barHeight

    for (let i = 0, x = 0; i < bufferLength; i++) {
      barHeight = dataArray[i]

      ctx.fillStyle = 'rgba(255, 255, 255, .8)'
      ctx.fillRect(x, height - barHeight, barWidth, barHeight)


      x += barWidth + 2;
    }
  }
}

export default function AudioPlayer () {
  const audio: MutableRefObject<any> = useRef()
  const canvas: MutableRefObject<any> = useRef()
  const content: MutableRefObject<any> = useRef()

  useEffect(() => {
    new AudioControls(canvas.current, audio.current, content.current)
  }, [])

  const play = () => {
    if (audio.current) {
      audio.current.play()
    }
  }
  const pause = () => {
    if (audio.current) {
      audio.current.pause()
    }
  }

  return (
    <div ref={ content } className="audio-player">
      <audio ref={ audio } src='/audio/high.mp3' loop controls></audio>
      <canvas ref={ canvas }></canvas>
    </div>
  )
}