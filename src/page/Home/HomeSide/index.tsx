import React, { useEffect, useRef } from 'react'
import Parallax from 'parallax-js'
import './home-side.less'

export default function () {
  const parallax = useRef(null)

  useEffect(() => {
    parallax.current && new Parallax(parallax.current)
  })

  return (
    <div className="home-side">
      <div className="event" ref={parallax}>
        <div className="home-side-parallax" data-depth="0.5">
          <div className="home-side-content">
            <div className="home-side-time">
              <div className="time-battery"></div>
              <span className="time-text">2019-20-33</span>
            </div>
            <ul className="home-side-assets">
              <li>
                <span className="assets-icon money"></span>
                <span className="assets-text">8888</span>
              </li>
              <li>
                <span className="assets-icon gem"></span>
                <span className="assets-text">8888</span>
              </li>
              <li>
                <span className="assets-icon stone"></span>
                <span className="assets-text">8888</span>
              </li>
            </ul>
            <div className="home-side-row row-first">
              <div className="home-side-item item-fight">
                <div className="fight-info">
                  <p className="primary">255</p>
                  <p className="sub">理智/90</p>
                </div>
                <div className="fight-content">
                  <p className="item-title">作战</p>
                  <p className="item-tag">当前</p>
                  <p>2-9 漫漫长夜</p>
                  <div className="item-icon"></div>
                </div>
              </div>
            </div>
            <div className="home-side-row row-sub">
              <div className="home-side-item item-row1-col1">
                <p className="item-title">编队</p>
                <div className="item-icon"></div>
              </div>
              <div className="home-side-item item-row1-col2">
                <p className="item-title">干员</p>
                <div className="item-icon"></div>
              </div>
              <div className="home-side-black-gap"></div>
            </div>
            <div className="home-side-row row-primary">
              <div className="home-side-item item-blue item-title-end item-row2-col1">
                <p className="item-title">采购中心</p>
                <div className="item-icon"></div>
              </div>
              <div className="home-side-item item-blue item-multi">
                <p className="item-name">
                  <span className="item-icon"></span>
                  <span>招募</span>
                </p>
                <div className="item-multi-content">
                  <div className="item-multi-item item-row2-col2">
                    <p className="item-multi-title">公开招募</p>
                    <div className="item-icon"></div>
                  </div>
                  <div className="item-multi-item item-row2-col3">
                    <p className="item-multi-title">干员寻访</p>
                    <div className="item-icon"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="home-side-row row-end">
              <div className="home-side-item item-row3-col1">
                <p className="item-title">任务</p>
                  <div className="item-icon"></div>
              </div>
              <div className="home-side-item item-row3-col2">
                <p className="item-title">基建</p>
                  <div className="item-icon"></div>
              </div>
              <div className="home-side-item item-end item-row3-col3">
                <p className="item-title">仓库</p>
                <div className="item-icon"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}