import React from 'react'
import './chapter.less'
import { useHistory } from 'react-router'

// 章节数据
const chapterList = [
  {
    title: '黑暗时代·上',
    en: 'EPISODE 00',
    text: '序章',
    src: require('./images/chapter0.png')
  },
  {
    title: '黑暗时代·下',
    en: 'EPISODE 01',
    text: '第一章',
    src: require('./images/chapter1.png')
  },
  {
    title: '以卵同生',
    en: 'EPISODE 02',
    text: '第二章',
    src: require('./images/chapter2.png')
  },
  {
    title: '二次呼吸',
    en: 'EPISODE 03',
    text: '第三章',
    src: require('./images/chapter3.png')
  },
  {
    title: '急性衰竭',
    en: 'EPISODE 04',
    text: '第四章',
    src: require('./images/chapter4.png')
  },
  {
    title: '靶向药物',
    en: 'EPISODE 05',
    text: '第五章',
    src: require('./images/chapter5.png')
  },
  {
    title: '局部坏死',
    en: 'EPISODE 06',
    text: '第六章',
    src: require('./images/chapter6.png')
  }
]

export default function () {
  let history = useHistory()
  
  return (
    <div className="chapter">
      <div className="tool">
        <button className="tool-item btn" onClick={() => history.goBack()}>
          <i className="iconfont icon-back"></i>
        </button>
      </div>
      <div className="shadow-page"></div>
      <div className="shadow-scroll">
        <div className="chapter-select">
          {
            chapterList.map(chapter => {
              return (
                <div className="chapter-select-item" key={chapter.title}>
                  <div className="item-symbol">
                    <div className="item-line"></div>
                    <div className="item-title">
                      <p className="item-text">{chapter.text}</p>
                      <p className="item-title-main">{chapter.title}</p>
                      <p className="item-title-en">{chapter.en}</p>
                    </div>
                  </div>
                  <div className="item-content btn">
                    <img src={chapter.src} alt=""/>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}