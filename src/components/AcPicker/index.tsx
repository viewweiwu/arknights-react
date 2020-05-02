import React, { useState } from 'react'
import './ac-picker.less'
import { useInterval } from 'react-use'

export interface AcPickerOption {
  label: string | number,
  value: string | number | boolean
}

export interface AcPickerProps {
  options: Array<AcPickerOption>,
  value: string | number | boolean,
  onChange?(value: string | number | boolean): void,
  readonly?: boolean
}

export default function AcPicker (props: AcPickerProps) {
  const [ upRunning, setUpRunning ] = useState<boolean>(false)
  const [ downRunning, setDownRunning ] = useState<boolean>(false)
  const readonly: boolean = props.readonly === true || false

  /**
   * 移动到上一个选项
   */
  const handleUp = (): void => {
    let { value, options, onChange } = props
    let index = options.findIndex((option: AcPickerOption) => option.value === value)
    
    if (index !== 0) {
      index -= 1
    }

    onChange && onChange(options[index].value)
  }

  /**
   * 持续点击向上，开启计时
   */
  const handleUpStart = (): void => {
    setUpRunning(true)
  }

  /**
   * 持续点击向上，关闭计时
   */
  const handleUpEnd = (): void => {
    setUpRunning(false)
  }
  
  /**
   * 持续点击向下，开启计时
   */
  const handleDownStart = (): void => {
    setDownRunning(true)
  }

  /**
   * 持续点击向下，关闭计时
   */
  const handleDownEnd = (): void => {
    setDownRunning(false)
  }

  /**
   * 持续点击向上
   */
  useInterval(() => {
    handleUp()
  }, upRunning ? 100 : null)
  
  /**
   * 持续点击向下
   */
  useInterval(() => {
    handleDown()
  }, downRunning ? 100 : null)


  const handleDown = (): void => {
    let { value, options, onChange } = props
    let index = options.findIndex((option: AcPickerOption) => option.value === value)
    
    if (index < options.length - 2) {
      index += 1
    }

    onChange && onChange(options[index].value)
  }

  const getLabel = (): string | number | undefined => {
    let { value, options } = props
    let target = options.find((option: AcPickerOption) => option.value === value)
    return target ? target.label : ''
  }

  return (
    <div className="ac-picker">
      {
        !readonly && <button
          className="ac-picker-up btn"
          onClick={handleUp}
          onMouseDown={handleUpStart}
          onMouseUp={handleUpEnd}
        >
          <i className="iconfont icon-up"></i>
        </button>
      }
      <div className="ac-picker-label">{getLabel()}</div>
      {
        !readonly && <button
          className="ac-picker-down btn"
          onClick={handleDown}
          onMouseDown={handleDownStart}
          onMouseUp={handleDownEnd}
        >
          <i className="iconfont icon-down"></i>
        </button>
      }
    </div>
  )
}