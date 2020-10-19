import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import dayjs from 'dayjs'

let timer: NodeJS.Timeout
/**
 * 计时每日
 * @param {Function} setDate 设置日期
 */
function loopDate (setDate: Dispatch<SetStateAction<Date>>): void {
  timer && clearTimeout(timer)
  timer = setTimeout(() => {
    setDate(new Date())
    loopDate(setDate)
  }, 1000)
}


export default function HomeTimerCard () {
  const [ date, setDate ] = useState(new Date()) // 每日计时

  useEffect(() => {
    loopDate(setDate)
    
    return () => {
      clearTimeout(timer)
    }
  }, [setDate])
  return (
    <div className="home-card home-card-timer">
      <time className="title">{ dayjs(date).format('A') }</time>
      <div className="right">
        <p>
          <time>{ dayjs(date).format('YYYY-MM-DD') }</time>
        </p>
        <p>
          <time>{ dayjs(date).format('HH-mm-ss') }</time>
        </p>
        <p>
          <time>{ dayjs(date).format('dddd') }</time>
        </p>
      </div>
    </div>
  )
}