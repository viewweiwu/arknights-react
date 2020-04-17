import React from 'react'
import HomeSide from './HomeSide'
import { RouteComponentProps } from 'react-router'

export default function Home (props?: RouteComponentProps) {
  return (
    <div className="Home">
      <HomeSide />
    </div>
  )
}
