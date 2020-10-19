import React from 'react'
import AudioPlayer from './AudioPlayer'

export default function HomeCardAudio () {
  return (
    <div className="home-card-audio">
      <div className="home-card">
        <p>明日方舟</p>
        <p>原声OST2</p>
      </div>
      <AudioPlayer />
    </div>
  )
}