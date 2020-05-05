import { Howl } from 'howler'

interface SoundMapProps {
  [key: string]: Howl
}

let soundMap: SoundMapProps = {
  click: new Howl({ src: [require('./audio/g_ui_btn_n.wav')] }),
  back: new Howl({ src: [require('./audio/g_ui_back.wav')] }),
  stagepull: new Howl({ src: [require('./audio/g_ui_stagepull.wav')] }),
  confirm: new Howl({ src: [require('./audio/g_ui_confirm.wav')] }),
  popup: new Howl({ src: [require('./audio/g_ui_popup.wav')] }),
  tab: new Howl({ src: [require('./audio/g_ui_tabswitch.wav')] }),
  '能天使_干员报到': new Howl({ src: [require('./audio/能天使_干员报到.wav')] }),
  'mixed_gacha_part1': new Howl({ src: [require('./audio/mixed_gacha_part1.wav')] }),
  'mixed_gacha_part2': new Howl({ src: [require('./audio/mixed_gacha_part2.wav')] })
}

/**
 * 播放声音
 * @param {String} soundName 声音名字
 */
export const playSound = (soundName: string) => {
  if (soundMap.hasOwnProperty(soundName)) {
    soundMap[soundName].play()
  } else {
    soundMap[soundName] = new Howl({ src: [require(`./audio/${soundName}.wav`)] })
    soundMap[soundName].play()
  }
}

export const stopSound = (soundName: string) => {
  if (soundMap.hasOwnProperty(soundName)) {
    soundMap[soundName].stop()
  }
}
