import React, { ReactNode } from 'react'
import ReactDOM from 'react-dom'
import './ac-confirm.less'

interface AcConfirmProps {
  children?: ReactNode,
  onConfirm?(): void,
  onCancel?(): void
}

const AcConfirm = (props: AcConfirmProps) => {
  return (
    <div className="ac-confirm">
      <div className="ac-confirm-content">
        <div className="ac-confirm-msg">hello</div>
        <footer>
          <button className="ac-confirm-cancel btn">
            <i className="iconfont icon-close"></i>
          </button>
          <button className="ac-confirm-confirm btn">
            <i className="iconfont icon-check"></i>
          </button>
        </footer>
      </div>
    </div>
  )
}

export const confirm = (msg: string | ReactNode) => {
  return new Promise((resolve, reject) => {  // 创建空元素
    let element: HTMLDivElement = window.document.createElement('div')
    document.body.appendChild(element)

    ReactDOM.render(
      <AcConfirm onConfirm={() => resolve()} onCancel={() => reject}>{msg}</AcConfirm>,
      element
    )
  })
}