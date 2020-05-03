import React from 'react'
import '../gacha.less'
import Dust from '../../Dust'
import MemberGetBreak from '../GachaBreak'
import { useMount } from 'react-use'
import { playSound } from '@/components/AcAudio'
const garish = require('./poly.png')

interface GachaDetailProps {
  onClose(visible: boolean): void
}

const cg = 'http://ak.mooncell.wiki/images/1/13/%E7%AB%8B%E7%BB%98_%E8%83%BD%E5%A4%A9%E4%BD%BF_skin1.png'
const logo = 'http://ak.mooncell.wiki/images/f/f3/Skin_logo_%E7%94%9F%E5%91%BD%E4%B9%8B%E5%9C%B0.png'
const type = 'http://ak.mooncell.wiki/images/d/d1/%E5%9B%BE%E6%A0%87_%E8%81%8C%E4%B8%9A_%E7%8B%99%E5%87%BB_%E5%A4%A7%E5%9B%BE.png'

export default function GachaDetail(props: GachaDetailProps) {

  useMount(() => {
    playSound('能天使_干员报到')
  })

  return (
    <div className="gacha-detail" onClick={() => props.onClose(false)}>
      <div className="shadow-page"></div>
      <Dust />
      <div className="icon-large">
        <i className="iconfont icon-fill-down"></i>
      </div>
      <img className="gacha-garish" src={garish} alt="" />
      <img className="gacha-cg" src={cg} alt="" />
      <img className="gacha-logo" src={logo} alt="" />
      <main className="gacha-info">
        <div className="info-type">
          <p>SNIPER</p>
          <p className="info-type-cn">狙击</p>
        </div>
        <div className="info-image">
          <img src={type} width="70" height="70" alt="" />
        </div>
        <div className="info-name">
          <p className="info-name-cn">能天使</p>
          <p>Exusiai</p>
        </div>
      </main>
      <div className="gacha-voice">
        <p>口令是“企鹅帝国万岁”，你就是雇主吗？叫我能天使。我和那个冷淡的鲁珀人可不一样，你要是想找点有趣的事做，随时都可以来叫我！</p>
      </div>
      <MemberGetBreak />
    </div>
  )
}
