import React, { useRef } from 'react'

interface AcScrollProps {
  children: any,
  className: string
}

/**
 * 竖向滚动转横向滚动
 * @param {AcScrollProps} props 
 */
export default function (props: AcScrollProps) {
  const $scroll = useRef<HTMLDivElement>(null)

  const handleScroll = (e: any) => {
    let step: number = 50
    if (e.deltaY !== 0 && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      let target = $scroll.current as HTMLDivElement
      target.scrollLeft += e.deltaY < 0 ? -step : step
    }
  }

  return (
    <div className={props.className} ref={$scroll} onWheel={handleScroll}>{props.children}</div>
  )
}