import React from 'react'

interface MemberProps {
  member: Member
}

type Rarity = '0' | '1' | '2' | '3' | '4' | '5'

let rarityMap = {
  '5': {
    star: 'http://prts.wiki/images/4/46/%E7%A8%80%E6%9C%89%E5%BA%A6_%E9%BB%84_5.png',
    lh: 'http://prts.wiki/images/a/a5/%E5%B9%B2%E5%91%98%E5%9B%BE%E9%89%B4_lh_5.png',
    light: 'http://prts.wiki/images/1/19/%E5%B9%B2%E5%91%98%E5%9B%BE%E9%89%B4_%E7%A8%80%E6%9C%89%E5%BA%A6_%E4%BA%AE%E5%85%89_5.png',
    uh: 'http://prts.wiki/images/4/45/%E5%B9%B2%E5%91%98%E5%9B%BE%E9%89%B4_uh_5.png',
    bg: 'http://prts.wiki/images/c/c9/%E5%B9%B2%E5%91%98%E5%9B%BE%E9%89%B4_%E8%83%8C%E6%99%AF_5.png',
    step: 'http://prts.wiki/images/5/5d/%E7%B2%BE%E8%8B%B1_2_%E5%A4%A7%E5%9B%BE.png'
  },
  '4': {
    star: 'http://prts.wiki/images/8/81/%E7%A8%80%E6%9C%89%E5%BA%A6_%E9%BB%84_4.png',
    lh: 'http://prts.wiki/images/9/9e/%E5%B9%B2%E5%91%98%E5%9B%BE%E9%89%B4_lh_4.png',
    light: 'http://prts.wiki/images/f/f7/%E5%B9%B2%E5%91%98%E5%9B%BE%E9%89%B4_%E7%A8%80%E6%9C%89%E5%BA%A6_%E4%BA%AE%E5%85%89_4.png',
    uh: 'http://prts.wiki/images/9/92/%E5%B9%B2%E5%91%98%E5%9B%BE%E9%89%B4_uh_4.png',
    bg: 'http://prts.wiki/images/a/ad/%E5%B9%B2%E5%91%98%E5%9B%BE%E9%89%B4_%E8%83%8C%E6%99%AF_4.png',
    step: 'http://prts.wiki/images/5/5d/%E7%B2%BE%E8%8B%B1_2_%E5%A4%A7%E5%9B%BE.png'
  },
  '3': {
    star: 'http://prts.wiki/images/4/4c/%E7%A8%80%E6%9C%89%E5%BA%A6_%E9%BB%84_3.png',
    lh: 'http://prts.wiki/images/a/a5/%E5%B9%B2%E5%91%98%E5%9B%BE%E9%89%B4_lh_3.png',
    light: 'http://prts.wiki/images/0/0d/%E5%B9%B2%E5%91%98%E5%9B%BE%E9%89%B4_%E7%A8%80%E6%9C%89%E5%BA%A6_%E4%BA%AE%E5%85%89_3.png',
    uh: 'http://prts.wiki/images/e/e5/%E5%B9%B2%E5%91%98%E5%9B%BE%E9%89%B4_uh_3.png',
    bg: 'http://prts.wiki/images/b/b1/%E5%B9%B2%E5%91%98%E5%9B%BE%E9%89%B4_%E8%83%8C%E6%99%AF_3.png',
    step: 'http://prts.wiki/images/d/d7/%E7%B2%BE%E8%8B%B1_1_%E5%A4%A7%E5%9B%BE.png'
  },
  '2': {
    star: 'http://prts.wiki/images/4/4b/%E7%A8%80%E6%9C%89%E5%BA%A6_%E9%BB%84_2.png',
    lh: 'http://prts.wiki/images/0/0b/%E5%B9%B2%E5%91%98%E5%9B%BE%E9%89%B4_lh_0%2C1%2C2.png',
    light: 'http://prts.wiki/images/b/b0/%E5%B9%B2%E5%91%98%E5%9B%BE%E9%89%B4_%E7%A8%80%E6%9C%89%E5%BA%A6_%E4%BA%AE%E5%85%89_2.png',
    uh: 'http://prts.wiki/images/6/69/%E5%B9%B2%E5%91%98%E5%9B%BE%E9%89%B4_uh_2.png',
    bg: 'http://prts.wiki/images/2/25/%E5%B9%B2%E5%91%98%E5%9B%BE%E9%89%B4_%E8%83%8C%E6%99%AF_0%2C1%2C2.png',
    step: 'http://prts.wiki/images/d/d7/%E7%B2%BE%E8%8B%B1_1_%E5%A4%A7%E5%9B%BE.png'
  },
  '1': {
    star: 'http://prts.wiki/images/0/02/%E7%A8%80%E6%9C%89%E5%BA%A6_%E9%BB%84_1.png',
    lh: 'http://prts.wiki/images/0/0b/%E5%B9%B2%E5%91%98%E5%9B%BE%E9%89%B4_lh_0%2C1%2C2.png',
    light: 'http://prts.wiki/images/9/9c/%E5%B9%B2%E5%91%98%E5%9B%BE%E9%89%B4_%E7%A8%80%E6%9C%89%E5%BA%A6_%E4%BA%AE%E5%85%89_1.png',
    uh: 'http://prts.wiki/images/d/d7/%E5%B9%B2%E5%91%98%E5%9B%BE%E9%89%B4_uh_1.png',
    bg: 'http://prts.wiki/images/2/25/%E5%B9%B2%E5%91%98%E5%9B%BE%E9%89%B4_%E8%83%8C%E6%99%AF_0%2C1%2C2.png',
    step: 'http://prts.wiki/images/c/c5/%E7%B2%BE%E8%8B%B1_0_%E5%A4%A7%E5%9B%BE.png'
  },
  '0': {
    star: 'http://prts.wiki/images/6/62/%E7%A8%80%E6%9C%89%E5%BA%A6_%E9%BB%84_0.png',
    lh: 'http://prts.wiki/images/0/0b/%E5%B9%B2%E5%91%98%E5%9B%BE%E9%89%B4_lh_0%2C1%2C2.png',
    light: 'http://prts.wiki/images/a/a7/%E5%B9%B2%E5%91%98%E5%9B%BE%E9%89%B4_%E7%A8%80%E6%9C%89%E5%BA%A6_%E4%BA%AE%E5%85%89_0.png',
    uh: 'http://prts.wiki/images/6/68/%E5%B9%B2%E5%91%98%E5%9B%BE%E9%89%B4_uh_0.png',
    bg: 'http://prts.wiki/images/2/25/%E5%B9%B2%E5%91%98%E5%9B%BE%E9%89%B4_%E8%83%8C%E6%99%AF_0%2C1%2C2.png',
    step: 'http://prts.wiki/images/c/c5/%E7%B2%BE%E8%8B%B1_0_%E5%A4%A7%E5%9B%BE.png'
  }
}

type MemberClass = '医疗' | '术师' | '特种' | '重装' | '近卫' | '狙击' | '辅助' | '先锋'

let classMap = {
  医疗: 'http://prts.wiki/images/b/be/%E5%9B%BE%E6%A0%87_%E8%81%8C%E4%B8%9A_%E5%8C%BB%E7%96%97.png',
  术师: 'http://prts.wiki/images/2/23/%E5%9B%BE%E6%A0%87_%E8%81%8C%E4%B8%9A_%E6%9C%AF%E5%B8%88.png',
  特种: 'http://prts.wiki/images/f/f1/%E5%9B%BE%E6%A0%87_%E8%81%8C%E4%B8%9A_%E7%89%B9%E7%A7%8D.png',
  重装: 'http://prts.wiki/images/3/3c/%E5%9B%BE%E6%A0%87_%E8%81%8C%E4%B8%9A_%E9%87%8D%E8%A3%85.png',
  近卫: 'http://prts.wiki/images/7/7d/%E5%9B%BE%E6%A0%87_%E8%81%8C%E4%B8%9A_%E8%BF%91%E5%8D%AB.png',
  狙击: 'http://prts.wiki/images/9/96/%E5%9B%BE%E6%A0%87_%E8%81%8C%E4%B8%9A_%E7%8B%99%E5%87%BB.png',
  辅助: 'http://prts.wiki/images/c/c7/%E5%9B%BE%E6%A0%87_%E8%81%8C%E4%B8%9A_%E8%BE%85%E5%8A%A9.png',
  先锋: 'http://prts.wiki/images/7/78/%E5%9B%BE%E6%A0%87_%E8%81%8C%E4%B8%9A_%E5%85%88%E9%94%8B.png'
}

export default function (props: MemberProps) {
  let member = props.member
  return (
    <div className='member-item'>
      <img className='item-uh' src={rarityMap[member.rarity as Rarity].uh} alt='角落' draggable='false' />
      <img className='item-class' src={classMap[member.class as MemberClass]} alt={member.class} draggable='false' />
      <img className='item-star' src={rarityMap[member.rarity as Rarity].star} alt={Number(member.rarity) + 1 + '星'} draggable='false' />
      <div className='item-content'>
        <img className='item-bg' src={rarityMap[member.rarity as Rarity].bg} alt='背景' draggable='false' />
        <img className='item-half' src={member.half} alt={member.cn + '半身'} draggable='false' />
        <img className='item-light' src={rarityMap[member.rarity as Rarity].light} alt='高光' draggable='false' />
      </div>
      <img className='item-lh' src={rarityMap[member.rarity as Rarity].lh} alt='前景' draggable='false' />
      <div className='item-step'>
        <img src={rarityMap[member.rarity as Rarity].step} alt='高光' draggable='false' />
      </div>
      <div className='item-level'>
        <span className='level-num'>
          <span className='level-text'>LV</span>
          57
        </span>
        <svg width='60' height='60'>
          <circle cx='30' cy='30' r='25' strokeWidth='2' stroke='rgba(255, 255, 255, .2)' fill='none'></circle>
          <circle cx='30' cy='30' r='25' strokeWidth='2' stroke='#fe2' fill='none' transform='matrix(0,-1,1,0,0,60)' strokeDasharray='100 314'></circle>
        </svg>
      </div>
      <img
        className='item-skill'
        src='http://prts.wiki/images/thumb/a/a7/%E6%8A%80%E8%83%BD_%E5%8D%81%E5%AD%97%E6%82%AC%E6%8C%82.png/100px-%E6%8A%80%E8%83%BD_%E5%8D%81%E5%AD%97%E6%82%AC%E6%8C%82.png'
        alt=''
        draggable='false'
      />
      <div className='item-cn'>
        <span>{member.cn}</span>
      </div>
    </div>
  )
}
