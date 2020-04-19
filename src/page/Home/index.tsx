import React from 'react'
import HomeSide from './HomeSide'
import HomeBanner from './HomeBanner'
import { RouteComponentProps } from 'react-router'
import cg from '@/assets/images/char_103_angel_wild.png'
import eye from '@/assets/images/eye.gif'
import './home.less'

export default function Home (props: RouteComponentProps) {
  return (
    <div className="home">
      <section className="chara-cg">
        <div className="chara-cg-doctor"></div>
        <img className="chara-cg-main" src={cg} alt=""/>
        <img className="chara-cg-eye" src={eye} alt=""/>
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
      <HomeBanner />
      <HomeSide {...props} />
    </div>
  )
}
