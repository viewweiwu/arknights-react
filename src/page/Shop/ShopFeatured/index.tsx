import React, { useState } from 'react'
import './shop-fetured.less'
import { getRandomFloor } from '@/utils'

interface Tab {
  id: string,
  isTime: boolean,
  title: string,
  img: string
}

const cg = 'http://ak.mooncell.wiki/images/4/47/Avg_char_007_closre_6.png'

const tabs: Array<Tab> = [
  {
    id: '1',
    isTime: true,
    title: '七成风情餐厅',
    img: require('./shop1.png')
  },
  {
    id: '2',
    isTime: false,
    title: '月卡',
    img: require('./shop2.png')
  },
  {
    id: '3',
    isTime: false,
    title: '精选组合',
    img: require('./shop3.png')
  }
]

let messages = [
  <div>可露希尔姐姐现在出门采购啦，今天由我来值班。<del>其实因为找不到可露希尔的 live2d 资源包。</del></div>,
  '啊对了！博士不考虑一下成为会员吗？享受性价比超高的优惠服务，轻轻松松就能帮罗德岛剩下不少的预算开支！',
  'Hello~ 博士今天有什么想采购吗？',
  '这些都是特意为博士准备的采购部组合包！快收下吧！虽然说是采购部组合包，但是这也是要动用预算经费的。'
]

const getActiveTab = (active: string): Tab => {
  return tabs.find(item => item.id === active) as Tab
}

export default function () {
  const [active, setActive] = useState<string>('1')
  const [messageIndex, setMessageIndex] = useState<number>(0)

  const changeIndex = () => {
    setMessageIndex(getRandomFloor(0, messages.length - 1))
  }

  return (
    <div className="shop-featured">
      <div className="featured-tabs">
        <aside>
          {
            tabs.map(tab => {
              return <div
                className={`aside-item ${tab.id === active && 'active'}`}
                onClick={() => setActive(tab.id)}
                key={tab.id}
              >
                { tab.isTime && <time><i className="iconfont icon-time"></i></time> }
                { tab.title }
              </div>
            })
          }
        </aside>
        <main>
          <img src={ getActiveTab(active).img } alt="" draggable="false" />
        </main>
      </div>
      <img className="shop-cg" src={cg} alt="可露希尔" draggable="false" />
      <div className="shop-voice" onClick={() => changeIndex()}>
        <p>
          <mark>FROM</mark>
          <span>HIYORI</span>
          {/* <span>CLOSURE</span>
          <span className="gap">罗德岛第一财务<del>(jianshang)</del></span> */}
        </p>
        <div className="shop-message">{messages[messageIndex]}</div>
      </div>
    </div>
  )
}