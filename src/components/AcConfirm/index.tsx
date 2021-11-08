import React, { ReactNode } from 'react'
import ReactDOM from 'react-dom'
import './ac-confirm.less'
import { playSound } from '../AcAudio'

interface AcConfirmProps {
  children?: ReactNode
  onConfirm?(): void
  onCancel?(): void
}

const AcConfirm = (props: AcConfirmProps) => {
  return (
    <div className='ac-confirm'>
      <div className='ac-confirm-content'>
        <div className='ac-confirm-msg'>{props.children}</div>
        <footer>
          <button className='ac-confirm-cancel btn' onClick={props.onCancel}>
            <i className='iconfont icon-close'></i>
          </button>
          <button className='ac-confirm-confirm btn' onClick={props.onConfirm}>
            <i className='iconfont icon-check'></i>
          </button>
        </footer>
      </div>
    </div>
  )
}

export const confirm = (msg: string | ReactNode) => {
  return new Promise((resolve: any, reject) => {
    // 创建空元素
    let element: HTMLDivElement = window.document.createElement('div')
    document.body.appendChild(element)

    /**
     * 取消
     */
    const handleCancel = () => {
      reject()
      remove()
      playSound('back')
    }

    /**
     * 确认
     */
    const handleConfirm = () => {
      resolve()
      remove()
      playSound('confirm')
    }

    /**
     * 移除元素
     */
    const remove = () => {
      ReactDOM.unmountComponentAtNode(element)
      document.body.removeChild(element)
    }

    ReactDOM.render(
      <AcConfirm onConfirm={handleConfirm} onCancel={handleCancel}>
        {msg}
      </AcConfirm>,
      element
    )
  })
}
