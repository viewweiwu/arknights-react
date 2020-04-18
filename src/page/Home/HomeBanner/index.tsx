import React, { useRef, useEffect } from 'react'
import HomeSlider from '../HomeSlider'
import Parallax from 'parallax-js'
import './home-banner.less'

export default function () {
  const parallax = useRef(null)

  useEffect(() => {
    parallax.current && new Parallax(parallax.current)
  })
  
  return (
    <div className="home-banner event" ref={parallax}>
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
    </div>
  )
}