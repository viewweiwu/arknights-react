import React from 'react'
import HomeCardTimer from './HomeCardTimer'
import './home-lungmen.less'
import HomeCardAudio from './HomeCardAudio'
import HomeCardCharacter from './HomeCardCharacter'

export default function HomeLungmen () {
  return (
    <div className="home-lungmen">
      <HomeCardTimer />
      <HomeCardAudio />
      <HomeCardCharacter />
    </div>
  )
}