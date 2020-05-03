import React, { useState, ReactNode } from 'react'
import './recruit.less'
import { success } from '@/components/AcMessage' // 消息
import { confirm } from '@/components/AcConfirm' // 确认框
import AcButton from '@/components/AcButton' // 按钮
import MemberGet from '@/components/Gacha' // 干员入队
import RecruitEditor from './RecruitEditor'
import ReactDOM from 'react-dom'
import AcToolbar from '@/components/AcToolbar'
import { playSound } from '@/components/AcAudio'

interface RecruitItem {
  num: number, // 格子坐标
  status: 'ready' | 'finished' | 'searching', // 格子状态
  finished: boolean // 格子是否完成
}

/**
 * 编辑招募规则
 */
const handleEdit = () => {
  playSound('click')
  const element = document.createElement('div')
  document.body.appendChild(element)

  const remove = () => {
    ReactDOM.unmountComponentAtNode(element)
    document.body.removeChild(element)
  }

  ReactDOM.render(
    <RecruitEditor onClose={() => remove()} />,
    element
  )
}

export default function Recruit () {
  let [ visible, setVisible ] = useState<boolean>(false)
  let [ data, setData ] = useState<Array<RecruitItem>>([
    {
      num: 1,
      status: 'ready',
      finished: true
    },
    {
      num: 2,
      status: 'finished',
      finished: false
    },
    {
      num: 3,
      status: 'searching',
      finished: false
    },
    {
      num: 4,
      status: 'ready',
      finished: false
    }
  ])

  /**
   * 招募结束 -> 干员加入
   */
  const handleConfirm = () => {
    setVisible(true)
  }
  
  /**
   * 立刻招募结束
   * @param { Item } item 选中格子
   */
  const finisheNow = (item: RecruitItem) => {
    data.forEach(obj => {
      if (obj === item) {
        obj.status = 'finished'
      }
    })

    setData(data)
  }

  /**
   * 停止招募
   * @param {RecruitItem} 选中格子 
   */
  const handleCancel = (item: RecruitItem) => {
    confirm('确定吗要取消吗？').then(() => {
      item.status = 'ready'
      item.finished = false
      success('已经取消')
    }, () => {})
  }
  
  return (
    <div className="recruit">
      <AcToolbar />
      <div className="recruit-header">
        <h2 className="recruit-title">公开招募</h2>
      </div>
      <ul className="open-list">
        {
          data.map(item => {
            let chidlren: ReactNode
            switch (item.status) {
              case 'ready':
                chidlren = <div className="item-empty btn" onClick={handleEdit}>
                  <i className="item-add iconfont icon-plus"></i>
                  <p>开始招募干员</p>
                </div>
                break
              case 'searching':
                chidlren = <div className="item-searching">
                  <header>职位需求</header>
                  <main>
                    <div className="item-left">
                      <div className="item-tag">剩余时间</div>
                      <time>11:22:44</time>
                    </div>
                    <div className="item-right">
                      <img src="http://ak.mooncell.wiki/images/thumb/6/6a/%E9%81%93%E5%85%B7_%E5%B8%A6%E6%A1%86_%E9%BE%99%E9%97%A8%E5%B8%81.png/100px-%E9%81%93%E5%85%B7_%E5%B8%A6%E6%A1%86_%E9%BE%99%E9%97%A8%E5%B8%81.png" alt=""/>
                      <img src="http://ak.mooncell.wiki/images/thumb/d/de/%E9%81%93%E5%85%B7_%E5%B8%A6%E6%A1%86_%E6%8B%9B%E8%81%98%E8%AE%B8%E5%8F%AF.png/100px-%E9%81%93%E5%85%B7_%E5%B8%A6%E6%A1%86_%E6%8B%9B%E8%81%98%E8%AE%B8%E5%8F%AF.png" alt=""/>
                    </div>
                  </main>
                  <footer>
                    <AcButton size="large" onClick={() => handleCancel(item) }>停止招募</AcButton>
                    <AcButton size="large" onClick={() => finisheNow(item) }>立即招募</AcButton>
                  </footer>
                </div>
                break
              case 'finished':
                chidlren = <div className="item-finished">
                  <p>已经找到部分符合要求的候选人</p>
                  <AcButton size="large" type="blue" onClick={() => handleConfirm()}>聘用候选人</AcButton>
                </div>
                break
            }
            return (
              <li className="open-list-item" key={item.num}>
                <div className="item-num">{item.num}</div>
                {chidlren}
              </li>
            )
          })
        }
      </ul>
      { visible && <MemberGet onClose={() => setVisible(false)} /> }
    </div>
  )
}