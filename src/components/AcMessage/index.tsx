import React, { ReactNode } from 'react'
import ReactDOM from 'react-dom'
import './ac-message.less'

interface MessageProps {
  children?: React.ReactNode,
  type: string,
  time?: number,
  top: number
}

interface MessageItem {
  element: HTMLDivElement,
  timer?: NodeJS.Timeout,
  offsetHeight: number,
  remove?(): void,
  close?(): void,
  top: number
}

const list: Array<MessageItem> = []

// message dom
const Message = function (props: MessageProps) {
  return (
    <div style={{ top: props.top + 'px' }} className={`ac-message ${props.type}`}><i className={`ac-message-icon iconfont icon-circle-${props.type}`}></i>{ props.children }</div>
  )
}

const getMessageElement = function (element: HTMLDivElement) {
  return element.children[0]
}

// 默认距离顶部
let defaultTop = 100

// create message
const createMessage = function (message: string | ReactNode, type: string, time: number) {
  // 创建空元素
  let element: HTMLDivElement = window.document.createElement('div')
  document.body.appendChild(element)

  let item: MessageItem = {
    top: 0,
    offsetHeight: 0,
    element
  }

  // 设置顶部边距
  let last = list.slice(-1)[0]
  console.log(last)
  let top = last ? last.top + last.offsetHeight : defaultTop
  item.top = top

  ReactDOM.render(
    <Message top={item.top} type={type}>{ message }</Message>,
    element,
    () => {
      // 决定高度
      let children = getMessageElement(element) as HTMLDivElement
      if (children) {
        item.offsetHeight = children.offsetHeight + 16
      }
    }
  )
  
  // 过一段时间自动关闭
  item.timer = setTimeout(() => {
    item.close && item.close()
  }, time)

  // remove
  item.remove = function () {
    item.timer && clearTimeout(item.timer)
    ReactDOM.unmountComponentAtNode(element)
    document.body.removeChild(element)
    let index = list.findIndex(obj => obj.element === element)
    list.splice(index, 1)
  }

  // 关闭
  item.close = function () {
    let children = getMessageElement(element) as HTMLDivElement
    children.classList.add('hide')
    
    let afterIndex = list.findIndex(obj => obj.element === element)

    // 重新设定之后元素的高度
    for (let i = afterIndex + 1; i < list.length; i++) {
      let next = list[i]
      let nextChildren = getMessageElement(next.element) as HTMLDivElement
      next.top -= item.offsetHeight
      nextChildren.style.top = next.top + 'px'
    }

    setTimeout(() => {
      item.remove && item.remove()
    }, 300)
  }

  list.push(item)

  return item
}

export const message = function (message: string | ReactNode, time: number = 3000) {
  return createMessage(message, '', time)
}

export const info = function (message: string | ReactNode, time: number = 3000) {
  return createMessage(message, 'info', time)
}

export const warning = function (message: string | ReactNode, time: number = 3000) {
  return createMessage(message, 'warning', time)
}

export const error = function (message: string | ReactNode, time: number = 3000) {
  return createMessage(message, 'error', time)
}

export const success = function (message: string | ReactNode, time: number = 3000) {
  return createMessage(message, 'success', time)
}