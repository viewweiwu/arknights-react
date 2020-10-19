import React from 'react'
import './ac-button.less'
import { playSound } from '../AcAudio'

interface AcButtonProps {
  children: any,
  type?: 'normal' | 'blue',
  size?: 'normal' | 'large' | 'mini' | 'small',
  onClick?: any,
  sound?: 'click' | 'confirm' | 'back'
}

const handleClick = function (e: React.MouseEvent<HTMLButtonElement>, props: AcButtonProps) {
  playSound(props.sound || 'click')
  if (props.onClick) {
    props.onClick(e)
  }
}

export default function (props: AcButtonProps) {
  return <button
    className={`ac-button btn ${props.size} ${props.type}`}
    onClick={(e: React.MouseEvent<HTMLButtonElement>) => { handleClick(e, props) }}
>{ props.children }</button>
}