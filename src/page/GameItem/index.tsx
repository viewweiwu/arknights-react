import React, { useState } from 'react'
import gameItemList from '@/assets/json/game-item.json'
import './game-item.less'
import { useHistory } from 'react-router'
import GameItemDetail from './GameItemDetail'

export default function () {
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
  let [visible, setVisible] = useState<boolean>(false)

  let history = useHistory()

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
        visible && <GameItemDetail item={selectedItem} setVisible={setVisible} />
      }
    </div>
  )
}
