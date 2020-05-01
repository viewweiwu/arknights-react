import React, { useEffect, useRef, useState, SetStateAction, Dispatch } from 'react'
import { RouteComponentProps } from 'react-router'
import Parallax from 'parallax-js' // 鼠标视差特效
import dayjs from 'dayjs' // 日期转换
import './home-side.less'

let timer: NodeJS.Timeout
/**
 * 计时每日
 * @param {Function} setDate 设置日期
 */
function loopDate (setDate: Dispatch<SetStateAction<Date>>): void {
  timer && clearTimeout(timer)
  timer = setTimeout(() => {
    setDate(new Date())
    loopDate(setDate)
  }, 1000)
}


export default function (props: RouteComponentProps) {
  const [ date, setDate ] = useState(new Date()) // 每日计时
  const parallax = useRef(null)

  /**
   * 跳转到指定页面
   * @param {String} path 具体页面路径
   */
  function goPage (path: string): void {
    clearTimeout(timer)
    props.history.push(path)
  }

  useEffect(() => {
    const p = new Parallax(parallax.current)
    loopDate(setDate)
    
    return () => {
      clearTimeout(timer)
      p.destroy()
    }
  }, [])

  return (
    <aside className="home-side">
      <div className="event" ref={parallax}>
        <div className="home-side-parallax" data-depth="0.5">
          <div className="home-side-content">
            <div className="home-side-time">
              <div className="time-battery"></div>
              <span className="time-text">{dayjs(date).format('YYYY-MM-DD HH:mm:ss')}</span>
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
              <ul className="home-side-item item-fight" onClick={() => goPage('/chapter')}>
                <li className="fight-info">
                  <p className="primary">255</p>
                  <p className="sub">理智/90</p>
                </li>
                <li className="fight-content">
                  <p className="item-title">作战</p>
                  <p className="item-tag">当前</p>
                  <p>2-9 漫漫长夜</p>
                  <div className="item-icon"></div>
                </li>
              </ul>
            </div>
            <ul className="home-side-row row-sub">
              <li className="home-side-item item-row1-col1">
                <p className="item-title">编队</p>
                <div className="item-icon"></div>
              </li>
              <li className="home-side-item item-row1-col2" onClick={() => goPage('/member')}>
                <p className="item-title">干员</p>
                <div className="item-icon"></div>
              </li>
              <li className="home-side-black-gap"></li>
            </ul>
            <ul className="home-side-row row-primary">
              <li className="home-side-item item-blue item-title-end item-row2-col1" onClick={() => goPage('/shop')}>
                <p className="item-title">采购中心</p>
                <div className="item-icon"></div>
              </li>
              <li className="home-side-item item-blue item-multi">
                <p className="item-name">
                  <span className="item-icon"></span>
                  <span>招募</span>
                </p>
                <div className="item-multi-content">
                  <div className="item-multi-item item-row2-col2" onClick={() => goPage('/recruit')}>
                    <p className="item-multi-title">公开招募</p>
                    <div className="item-icon"></div>
                  </div>
                  <div className="item-multi-item item-row2-col3">
                    <p className="item-multi-title">干员寻访</p>
                    <div className="item-icon"></div>
                  </div>
                </div>
              </li>
            </ul>
            <ul className="home-side-row row-end">
              <li className="home-side-item item-row3-col1">
                <p className="item-title">任务</p>
                  <div className="item-icon"></div>
              </li>
              <li className="home-side-item item-row3-col2">
                <p className="item-title">基建</p>
                  <div className="item-icon"></div>
              </li>
              <li className="home-side-item item-end item-row3-col3" onClick={() => goPage('/gameitem')}>
                <p className="item-title">仓库</p>
                <div className="item-icon"></div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </aside>
  )
}