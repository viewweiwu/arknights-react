import React, { useRef } from 'react'
import './login.less'
import GeoEffect from './GeoEffect'
import { useMount } from 'react-use'
// import './GeoEffect/test'

export default function Login () {
  const $main = useRef<HTMLDivElement>(null)
  
  useMount(() => {
    $main.current && new GeoEffect($main.current)
  })

  return (
    <div className="login" ref={$main}>
    </div>
  )
}