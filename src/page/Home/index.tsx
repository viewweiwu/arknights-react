
import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import HomeSide from './HomeSide' // 主页右边选卡
import HomeBanner from './HomeBanner' // 主页右边内容
import Dust from '@/components/Dust' // 头皮屑特效
import HomeSign from './HomeSign' // 每日签到
import eye from '@/assets/images/eye.gif' // 能天使眼睛动画 gif
import dayjs from 'dayjs'
import './home.less'

// 能天使立绘
let cg = 'http://ak.mooncell.wiki/images/1/13/%E7%AB%8B%E7%BB%98_%E8%83%BD%E5%A4%A9%E4%BD%BF_skin1.png'

/**
 * 获得今日是否已经签到
 * @returns {Boolean} singed 是否签到
 */
const getTodaySigned = (): boolean => {
  const date = new Date()
  // 从缓存获取已经签到的日期
  const signedDate =  localStorage.getItem('SIGNED_DATE')
  if (signedDate && signedDate === dayjs(date).format('YYYY-MM-DD')) {
    return false
  } else {
    return true
  }
}

export default function Home (props: RouteComponentProps) {
  // 每日签到是否展示
  const [ signVisible, setSignVisible ] = React.useState<boolean>(getTodaySigned())

  return (
    <div className="home">
      <section className="chara-cg">
        <div className="chara-cg-doctor"></div>
        <img className="chara-cg-main" src={cg} alt="" draggable="false" />
        <img className="chara-cg-eye" src={eye} alt="" draggable="false" />
      </section>
      <section className="home-user">
        <div className="home-user-level">
          <span className="level-num">
            57
            <span className="level-text">LV</span>
          </span>
          <svg width="110" height="110">
            <circle cx="55" cy="55" r="50" strokeWidth="4" stroke="rgba(255, 255, 255, .2)" fill="none"></circle>
            <circle cx="55" cy="55" r="50" strokeWidth="4" stroke="#fe2" fill="none" transform="matrix(0,-1,1,0,0,110)" strokeDasharray="200 314"></circle>
          </svg>
        </div>
        <div className="home-user-account">
          <p className="account-name">View</p>
          <p className="account-id">ID:61675947</p>
        </div>
      </section>
      <Dust />
      <HomeBanner onSign={() => setSignVisible(true)} />
      <HomeSide {...props} />
      { signVisible && <HomeSign onClose={()=> setSignVisible(false)} /> }
    </div>
  )
}
