import React from 'react'
import MemberInfo from './MemberInfo'
import memberList from './member.json'
import AcScroll from '@/components/AcScroll'
import './member.less'
import { useHistory } from 'react-router'

export default function () {
  let history = useHistory()
  return (
    <div className="member">
      <div className="shadow-page"></div>
      <div className="tool">
        <button className="tool-item btn" onClick={() => history.goBack()}>
          <i className="iconfont icon-back"></i>
        </button>
      </div>
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