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
  '能天使_干员报到': new Howl({ src: ['https://imgkr.cn-bj.ufileos.com/69d98a94-5f47-4260-9b5a-5bb1f7b42eb4.wav'] }),
  'mixed_gacha_part1': new Howl({ src: ['https://imgkr.cn-bj.ufileos.com/901f6aef-21cc-417f-b635-637ed0ec2e29.wav'] }),
  'mixed_gacha_part2': new Howl({ src: ['https://imgkr.cn-bj.ufileos.com/d04ef71d-b2b5-4849-b70e-bddd2074b593.wav'] }),
  'mixed_gacha_star_6': new Howl({ src: ['https://imgkr.cn-bj.ufileos.com/e902d52e-11f4-4e49-9107-419502df19d0.wav'] })
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
