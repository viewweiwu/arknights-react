import React, { useState } from 'react'
import './recruit-editor.less'
import AcPicker, { AcPickerOption } from '@/components/AcPicker'
import AcButton from '@/components/AcButton'
import { playSound } from '@/components/AcAudio'

interface RecruitEditorProps {
  onClose?(): void
}

/**
 * 创建时间选项
 * @param {Number} min 最小选项
 * @param {Number} max 最大选项
 */
const createOptions = (min: number, max: number, step: number = 1) => {
  let options: Array<AcPickerOption> = []
  
  for (let i = max; i >= min - step; i -= step) {
    // 小于 10 补 0
    const label = i < 10 ? '0' + i : i
    options.push({
      label,
      value: i
    })
  }

  return options
} 

// 小时选项
const HourOptions: Array<AcPickerOption> = createOptions(1, 9)

// 分钟选项
const MinuteOptions: Array<AcPickerOption> = createOptions(0, 50, 10)

// 秒钟选项
const SecondOptions: Array<AcPickerOption> = createOptions(0, 0)

const StarOptions: Array<AcPickerOption> = [
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
  { label: '4', value: 4 },
  { label: '5', value: 5 },
  { label: '6', value: 6 }
]

const TagOptions: Array<AcPickerOption> = [
  { label: '资深干员', value: 1 },
  { label: '高级资深干员', value: 2 },
  { label: '狙击干员', value: 3 },
  { label: '治疗', value: 4 },
  { label: '近战位', value: 5 }
]

export default function RecruitEditor (props: RecruitEditorProps) {
  const [ hour, setHour ] = useState<number | string | boolean>(1)
  const [ minute, setMinute ] = useState<number | string | boolean>(0)
  const [ activeTag, setActiveTag ] = useState<Array<string | number | boolean>>([])

  /**
   * 监听小时改变
   * @param {Number | String | Boolean} value 选项值
   */
  const handleHourChange = (value: number | string | boolean) => {
    setHour(value)
  }
  
  /**
   * 监听分钟改变
   * @param {Number | String | Boolean} value 选项值
   */
  const handleMinuteChange = (value: number | string | boolean) => {
    setMinute(value)
  }

  const handleConfirm = () => {
    props.onClose && props.onClose()
  }

  const handleCancel = () => {
    props.onClose && props.onClose()
  }

  const toggleTag = (value: string | number | boolean) => {
    let index = activeTag.findIndex(option => option === value)
    if (index >= 0) {
      activeTag.splice(index, 1)
    } else {
      activeTag.push(value)
    }
    setActiveTag([...activeTag])
    playSound('tab')
  }

  return (
    <div className="recruit-editor">
      <div className="recruit-editor-content">
        <section className="row-first">
          <div className="section-left">
            <label>限时招募</label>
            <AcPicker options={HourOptions} value={hour} onChange={handleHourChange} />
            <span className="ac-picker-label recruit-editor-colon">:</span>
            <AcPicker options={MinuteOptions} value={minute} onChange={handleMinuteChange} />
            <span className="ac-picker-label recruit-editor-colon">:</span>
            <AcPicker options={SecondOptions} value={0} readonly={true}></AcPicker>
          </div>
          <div className="section-right">
            <header>可获得的干员</header>
            <ul className="recruit-editor-tag">
              {
                StarOptions.map((option: AcPickerOption) => {
                  return (
                    <li key={option.label}>
                      {option.label}
                      <i className="iconfont icon-star"></i>
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </section>
        <section className="row-middle">
          <div className="section-left">
            <label>
              职业需求
              <p className="sub">(最多3项)</p>
            </label>
            <ul>
              {
                TagOptions.map((option: AcPickerOption) => {
                  return <li
                    className={`btn ${activeTag.includes(option.value) ? 'active' : ''}`}
                    key={option.label}
                    onClick={() => toggleTag(option.value)}
                  >{option.label}</li>
                })
              }
              <li className="empty"></li>
            </ul>
          </div>
          <div className="section-right">
            <AcButton type="blue" size="large">
              <i className="iconfont icon-refresh"></i>
            </AcButton>
            <p className="tip">点击刷新标签</p>
          </div>
        </section>
        <section className="row-last">
          <div className="section-left">
            <label>招募预算</label>
            <ul>
              <li>
                <img height="140" width="140" src="http://ak.mooncell.wiki/images/thumb/6/6a/%E9%81%93%E5%85%B7_%E5%B8%A6%E6%A1%86_%E9%BE%99%E9%97%A8%E5%B8%81.png/140px-%E9%81%93%E5%85%B7_%E5%B8%A6%E6%A1%86_%E9%BE%99%E9%97%A8%E5%B8%81.png" alt=""/>
                <mark>
                  <span>140</span>
                </mark>
              </li>
              <li>
                <img height="140" width="140" src="http://ak.mooncell.wiki/images/thumb/d/de/%E9%81%93%E5%85%B7_%E5%B8%A6%E6%A1%86_%E6%8B%9B%E8%81%98%E8%AE%B8%E5%8F%AF.png/140px-%E9%81%93%E5%85%B7_%E5%B8%A6%E6%A1%86_%E6%8B%9B%E8%81%98%E8%AE%B8%E5%8F%AF.png" alt=""/>
                <mark>
                  <span>66</span>/1
                </mark>
              </li>
            </ul>
          </div>
          <div className="section-right">
            <AcButton type="blue" onClick={handleConfirm} sound="confirm">
              <i className="iconfont icon-check"></i>
            </AcButton>
            <AcButton onClick={handleCancel} sound="back">
              <i className="iconfont icon-close"></i>
            </AcButton>
          </div>
        </section>
      </div>
    </div>
  )
}