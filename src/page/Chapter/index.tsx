import React from 'react'
import './chapter.less'
import Dust from '@/components/Dust'
import AcScroll from '@/components/AcScroll'
import AcToolbar from '@/components/AcToolbar'

// 章节数据
const chapterList = [
  {
    title: '黑暗时代·上',
    en: 'EPISODE 00',
    text: '序章',
    src: 'https://imgkr.cn-bj.ufileos.com/7d752599-0663-4083-b0ae-d464fce91736.png'
    // src: require('./images/chapter0.png')
  },
  {
    title: '黑暗时代·下',
    en: 'EPISODE 01',
    text: '第一章',
    src: 'https://imgkr.cn-bj.ufileos.com/e5fa571d-5dad-4ebf-9dbd-a68a66cf0f1a.png'
    // src: require('./images/chapter1.png')
  },
  {
    title: '以卵同生',
    en: 'EPISODE 02',
    text: '第二章',
    src: 'https://imgkr.cn-bj.ufileos.com/06a2445a-905a-4605-8a22-9c72a2e3dfcf.png'
    // src: require('./images/chapter2.png')
  },
  {
    title: '二次呼吸',
    en: 'EPISODE 03',
    text: '第三章',
    src: 'https://imgkr.cn-bj.ufileos.com/d731c70a-2127-4128-8ef6-e7e4316393fa.png'
    // src: require('./images/chapter3.png')
  },
  {
    title: '急性衰竭',
    en: 'EPISODE 04',
    text: '第四章',
    src: 'https://imgkr.cn-bj.ufileos.com/65745304-2666-4ddb-a180-61e6f00b9eca.png'
    // src: require('./images/chapter4.png')
  },
  {
    title: '靶向药物',
    en: 'EPISODE 05',
    text: '第五章',
    src: 'https://imgkr.cn-bj.ufileos.com/a260ad66-d447-41ca-9ab0-f911df5b4fe4.png'
    // src: require('./images/chapter5.png')
  },
  {
    title: '局部坏死',
    en: 'EPISODE 06',
    text: '第六章',
    src: 'https://imgkr.cn-bj.ufileos.com/16d7eee4-4d17-49b8-ac50-df3d00822f44.png'
    // src: require('./images/chapter6.png')
  }
]


export default function () {
  return (
    <div className="chapter">
      <AcToolbar />
      <Dust />
      <div className="shadow-page"></div>
      <AcScroll className="shadow-scroll">
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
                    <img src={chapter.src} alt="" draggable="false" />
                  </div>
                </div>
              )
            })
          }
        </div>
      </AcScroll>
    </div>
  )
}