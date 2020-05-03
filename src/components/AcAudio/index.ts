import { Howl } from 'howler'

let soundMap = {
  click: new Howl({ src: [require('./audio/g_ui_btn_n.wav')] }),
  back: new Howl({ src: [require('./audio/g_ui_back.wav')] }),
  stagepull: new Howl({ src: [require('./audio/g_ui_stagepull.wav')] }),
  confirm: new Howl({ src: [require('./audio/g_ui_confirm.wav')] }),
  popup: new Howl({ src: [require('./audio/g_ui_popup.wav')] }),
  tab: new Howl({ src: [require('./audio/g_ui_tabswitch.wav')] })
}

/**
 * 播放声音
 * @param {String} soundName 声音名字
 */
export const playSound = (soundName: 'click' | 'back' | 'stagepull' | 'confirm' | 'popup' | 'tab' = 'click') => {
  soundMap[soundName].play()
}
