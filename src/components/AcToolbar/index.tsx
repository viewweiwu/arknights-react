import React from 'react'
import { useHistory } from 'react-router'
import './ac-toolbar.less'
import { playSound } from '../AcAudio'

export default function AcToolbar () {
  let history = useHistory()

  const handleBack = () => {
    playSound('back')
    history.goBack()
  }
  
  return (
    <div className="ac-toolbar">
    <button className="ac-toolbar-item btn" onClick={handleBack}>
      <i className="iconfont icon-back"></i>
    </button>
  </div>
  )
}