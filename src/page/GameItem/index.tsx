import React, { useState } from 'react'
import { useHistory } from 'react-router'
import GameItemDetail from './GameItemDetail' // 道具详情展示
import gameItemList from '@/assets/json/game-item.json' // 道具数据源
import './game-item.less'

export default function () {
  // 选中的道具
  let [selectedItem, setSelectedItem] = useState<GameItem>(
    {
      name: '',
      description: '',
      usage: '',
      obtain_approach: [],
      rarity: '',
      file: '',
      category: [],
      id: ''
    }
  )
  // 是否展示道具详情
  let [visible, setVisible] = useState<boolean>(false)

  let history = useHistory()

  /**
   * 是否展示详情
   * @param {GameItem} item 道具信息
   */
  const showDetail = (item: GameItem) => {
    setSelectedItem(item)
    setVisible(true)
  }

  return (
    <div className="game-item">
      <div className="shadow-page"></div>
      <div className="tool">
        <button className="tool-item btn" onClick={() => history.goBack()}>
          <i className="iconfont icon-back"></i>
        </button>
      </div>
      <div className="shadow-scroll">
        <div className="game-item-content">
          <div className="game-item-list">
            {
              gameItemList.map((item: GameItem) => {
                return <div className="game-item-item" onClick={() => showDetail(item)}>
                  <img src={item.file} alt={item.name}/>
                  <p className="item-count">99</p>
                </div>
              })
            }
            <div className="game-item-item empty"></div>
            <div className="game-item-item empty"></div>
            <div className="game-item-item empty"></div>
            <div className="game-item-item empty"></div>
            <div className="game-item-item empty"></div>
            <div className="game-item-item empty"></div>
          </div>
        </div>
      </div>
      {
        visible && <GameItemDetail item={selectedItem} onClose={() => setVisible(false)} />
      }
    </div>
  )
}
