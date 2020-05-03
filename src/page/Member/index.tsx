import React from 'react'
import MemberInfo from './MemberInfo'
import memberList from './member.json'
import AcScroll from '@/components/AcScroll'
import AcToolbar from '@/components/AcToolbar'
import './member.less'

export default function () {
  return (
    <div className="member">
      <div className="shadow-page"></div>
      <AcToolbar />
      <AcScroll className="shadow-scroll">
        <div className="member-content">
          <div className="member-list">
            {
              memberList.map((member: Member) => {
                return <MemberInfo member={member} key={member.cn} />
              })
            }
            <div className="member-item empty"></div>
            <div className="member-item empty"></div>
            <div className="member-item empty"></div>
          </div>
        </div>
      </AcScroll>
    </div>
  )
}