import * as React from 'react'
import { useMount } from 'react-use'

export default function Live (props: any) {
  useMount(() => {
    new window.Live2dHelper({
      canvas: "#live2d",
      baseUrl: "/model/Hiyori",
      model: "/model/Hiyori/Hiyori.model3.json",
      width: document.body.clientWidth,
      height: document.body.clientHeight
    })
  })
  return (
    <div className={`live ${props.className}`}>
      <canvas id="live2d"></canvas>
    </div>
  )
}