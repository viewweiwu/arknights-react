import React from 'react'
import './chapter.less'
import Dust from '@/components/Dust'
import AcScroll from '@/components/AcScroll'
import AcToolbar from '@/components/AcToolbar'
import { useHistory } from 'react-router'
import { playSound } from '@/components/AcAudio'

interface Chapter {
  title: string,
  en: string,
  text: string,
  src: string
}

// 章节数据
const chapterList: Array<Chapter> = [
  {
    title: '黑暗时代·上',
    en: 'EPISODE 00',
    text: '序章',
    src: 'https://misc.hzzcckj.cn/upload/image/202010/aa7bf0d8a000000.png'
    // src: require('./images/chapter0.png')
  },
  {
    title: '黑暗时代·下',
    en: 'EPISODE 01',
    text: '第一章',
    src: 'https://misc.hzzcckj.cn/upload/image/202010/aa7bfe591400000.png'
    // src: require('./images/chapter1.png')
  },
  {
    title: '以卵同生',
    en: 'EPISODE 02',
    text: '第二章',
    src: 'https://misc.hzzcckj.cn/upload/image/202010/aa7bf3e95400000.png'
    // src: require('./images/chapter2.png')
  },
  {
    title: '二次呼吸',
    en: 'EPISODE 03',
    text: '第三章',
    src: 'https://misc.hzzcckj.cn/upload/image/202010/aa7bf5420c00000.png'
    // src: require('./images/chapter3.png')
  },
  {
    title: '急性衰竭',
    en: 'EPISODE 04',
    text: '第四章',
    src: 'https://misc.hzzcckj.cn/upload/image/202010/aa7bf6631c00000.png'
    // src: require('./images/chapter4.png')
  },
  {
    title: '靶向药物',
    en: 'EPISODE 05',
    text: '第五章',
    src: 'https://misc.hzzcckj.cn/upload/image/202010/aa7c085f0c00000.png'
    // src: require('./images/chapter5.png')
  },
  {
    title: '局部坏死',
    en: 'EPISODE 06',
    text: '第六章',
    src: 'https://misc.hzzcckj.cn/upload/image/202010/aa7c09676000000.png'
    // src: require('./images/chapter6.png')
  }
]


export default function Chapter () {
  const history = useHistory()

  const handleChapterSelect = (chapter: Chapter) => {
    playSound('stagepull')
    history.push('/stage')
  }

  return (
    <div className="chapter">
      <AcToolbar />
      <Dust />
      <div className="shadow-page"></div>
      <AcScroll className="shadow-scroll">
        <div className="chapter-select">
          {
            chapterList.map((chapter: Chapter) => {
              return (
                <div className="chapter-select-item" key={chapter.title} onClick={() => handleChapterSelect(chapter)}>
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