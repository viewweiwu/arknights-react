import React from 'react'
import './game-item-detail.less'

interface GameItemDetail {
  item: GameItem,
  onClose?(): void
}

export default function (props: GameItemDetail) {
  let item = props.item
  
  return (
    <div className="game-item-detail" onClick={() => props.onClose && props.onClose()}>
      <div className="detail-content">
        <header>
          <span className="detail-name">{item.name}</span>
          <span className="detail-right">
            <span className="detail-label">库存</span>
            <span className="detail-count">99</span>
          </span>
        </header>
        <main>
          <img width="170" height="170" src={item.file} alt={item.name}/>
          <div className="detail-main">
            <p className="detail-usage">{item.usage}</p>
            <p className="detail-desc">{item.description}</p>
            <p className="detail-title">获得方式</p>
            <p>{item.obtain_approach.join('、')}</p>
          </div>
        </main>
      </div>
    </div>
  )
}