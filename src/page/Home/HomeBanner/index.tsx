import React, { useRef, useEffect } from 'react'
import HomeSlider from '../HomeSlider' // 左下角轮播框
import Parallax from 'parallax-js' // 鼠标视差特效
import { confirm } from '@/components/AcConfirm'
import './home-banner.less'
import { info } from '@/components/AcMessage'
import { playSound } from '@/components/AcAudio'

interface HomeBannerProps {
  onSign(): void
}

export default function (props: HomeBannerProps) {
  const $parallax = useRef(null)

  useEffect(() => {
    const p = new Parallax($parallax.current)
    
    return () => {
      p.destroy()
    }
  })

  /**
   * 签到
   */
  const handleSign = () => {
    playSound('click')
    props.onSign()
  }

  const handleGithub = () => {
    playSound('click')
    const confirmMsg = (
      <div className="(oﾟvﾟ)ノ">
        <p>现在要跳转到本项目的 <i className="iconfont icon-github"></i> github 源码!</p>
        <p>确定吗？(oﾟvﾟ)ノ</p>
      </div>
    )
    confirm(confirmMsg).then(() => {
      info('感谢你的支持！')
      setTimeout(() => {
        window.open('https://github.com/viewweiwu/arknights-react')
      }, 2000)
    }, () => {})
  }
  
  return (
    <div className="home-banner event">
      <header className="home-banner-header">
        <i className="iconfont icon-calendar btn" onClick={handleSign}></i>
        <i className="iconfont icon-github btn" onClick={handleGithub}></i>
      </header>
      <main ref={$parallax}>
        <div className="home-banner-parallax event" data-depth="0.3">
          <div className="home-banner-parallax-content">
            <div className="home-voice">ドクター、終わってない仕事がたくさんありますから。まだ休んじゃダメですよ。(ﾟДﾟ*)ﾉ</div>
            <div className="home-banner-content">
              <HomeSlider />
              <div className="content-right">
                <div className="friends">
                  <div className="icon"></div>
                  <span>好友</span>
                </div>
                <div className="infomation">
                  <div className="icon"></div>
                  <span>情报</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}