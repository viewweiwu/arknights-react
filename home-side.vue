<template>
  <div ref="content" class="home-side" :class="{ hide: !visible }">
    <div class="home-side-parallax" data-depth="0.3">
      <div class="home-side-content">
        <div class="home-side-time">
          <div class="time-battery"></div>
          <span class="time-text">{{ datetime }}</span>
        </div>
        <ul class="home-side-assets">
          <li>
            <span class="assets-icon money"></span>
            <span class="assets-text">8888</span>
          </li>
          <li>
            <span class="assets-icon gem"></span>
            <span class="assets-text">8888</span>
          </li>
          <li>
            <span class="assets-icon stone"></span>
            <span class="assets-text">8888</span>
          </li>
        </ul>
        <div class="home-side-row row-first">
          <div ref="fight" class="home-side-item item-fight" @click="handleSelect('fight')" tabindex="0" @keydown.self.enter="handleSelect('fight')">
            <div class="fight-info">
              <p class="primary">255</p>
              <p class="sub">理智/90</p>
            </div>
            <div class="fight-content">
              <p class="item-title">作战</p>
              <p class="item-tag">当前</p>
              <p>2-9 漫漫长夜</p>
              <div class="item-icon"></div>
            </div>
          </div>
        </div>
        <div class="home-side-row row-sub">
          <div class="home-side-item item-row1-col1" tabindex="0" @click="handleSelect('empty')">
            <p class="item-title">编队</p>
            <div class="item-icon"></div>
          </div>
          <div ref="preview" class="home-side-item item-row1-col2" @click="handleSelect('preview')" tabindex="0" @keydown.self.enter="handleSelect('preview')">
            <p class="item-title">预览</p>
            <div class="item-icon"></div>
          </div>
          <div class="home-side-black-gap"></div>
        </div>
        <div class="home-side-row row-primary">
          <div ref="params" class="home-side-item item-blue item-title-end item-row2-col1"  @click="handleSelect('params')" tabindex="0" @keydown.self.enter="handleSelect('params')">
            <p class="item-title">参数设置</p>
            <div class="item-icon"></div>
          </div>
          <div class="home-side-item item-blue item-multi">
            <p class="item-name">
              <span class="item-icon"></span>
              <span>招募</span>
            </p>
            <div class="item-multi-content">
              <div class="item-multi-item item-row2-col2" tabindex="0" @click="handleSelect('empty')">
                <p class="item-multi-title">干员中心</p>
                <div class="item-icon"></div>
              </div>
              <div class="item-multi-item item-row2-col3" tabindex="0" @click="handleSelect('empty')">
                <p class="item-multi-title">干员寻访</p>
                <div class="item-icon"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="home-side-row row-end">
          <div class="home-side-item item-row3-col1" tabindex="0" @click="handleSelect('empty')">
            <p class="item-title">生成代码</p>
              <div class="item-icon"></div>
          </div>
          <div class="home-side-item item-row3-col2" tabindex="0" @click="handleSelect('empty')">
            <p class="item-title">基建</p>
              <div class="item-icon"></div>
          </div>
          <div class="home-side-item item-end item-row3-col3" tabindex="0" @click="handleSelect('empty')">
            <p class="item-title">仓库</p>
            <div class="item-icon"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import Parallax from 'parallax-js'
import { mapState } from 'vuex'

export default {
  name: 'home-side',
  data () {
    return {
      visible: true,
      date: new Date(),
      type: 'fight'
    }
  },
  computed: {
    ...mapState(['fields']),
    datetime () {
      return dayjs(this.date).format('YYYY/MM/DD HH:mm:ss')
    }
  },
  mounted () {
    this.sence = new Parallax(this.$refs.content)
    this.loopTime()
  },
  methods: {
    loopTime () {
      setTimeout(() => {
        this.date = new Date()
        this.loopTime()
      }, 1000)
    },
    handleSelect (type) {
      switch (type) {
        case 'empty':
          window.$confirm('尚未实现！')
          break
        case 'preview':
          if (!this.fields.length) {
            window.$confirm('发现尚未配置 fields，是否前去配置？').then(() => {
              this.emit('fight')
            })
          } else {
            this.emit(type)
          }
          break
        default:
          this.emit(type)
          break
      }
    },
    emit (type) {
      this.hide()
      this.$sound.confirm.play()
      this.$router.push('/' + type)
      this.type = type
    },
    hide () {
      this.visible = false
    },
    show () {
      this.visible = true
      if (this.type && this.$refs[this.type]) {
        this.$refs[this.type].focus()
      } else {
        this.$refs.fight.focus()
      }
    }
  }
}
</script>

<style lang="less">
.home-side {
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  font-family: noto sans sc, sans-serif;
  color: #333;
  position: fixed;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  user-select: none;
  overflow: hidden;
  transition: 300ms;
  transform-origin: right center;
  pointer-events: unset !important;

  &.hide {
    opacity: 0;
    transform: translateX(100%) !important;
  }
}

.layout-grid-back {
  top: 50px;
  left: 100px;
  position: absolute;
}

.home-side-content {
  transform: perspective(400px) rotateY(-6deg);
  transform-origin: right center;
  display: flex;
  flex-direction: column;
}

.home-side-time {
  color: #fff;
  width: 100%;
  margin-bottom: 20px;
  padding-left: 200px;
  font-size: 24px;
  margin-bottom: @space;
  font-family: SourceHanSansSubset;
  position: relative;
  display: flex;
  align-items: center;

  .time-battery {
    width: 63px;
    height: 37px;
    margin-right: 10px;
    filter: drop-shadow(@gray 7px 7px 0);
    background-image: url('~@/assets/images/icon.png');
    background-position-x: -690px;
    background-position-y: -400px;
    display: inline-block;
    transform: scale(.7);
  }

  .time-text {
    filter: drop-shadow(@gray 4px 3px 0);
  }

  &::before,
  &::after {
    content: '';
    top: 50%;
    height: 4px;
    opacity: .8;
    background-color: #fff;
    position: absolute;
    transform: translateY(-50%);
  }

  &::before {
    left: 90px;
    width: 100px;
  }

  &::after {
    right: -50px;
    width: 320px;
  }
}

.home-side-item {
  flex: 1;
  min-height: 130px;
  padding: 15px;
  box-shadow: 2px 2px 5px #2f2f2f;
  font-size: 20px;
  opacity: .9;
  background-color: #fff;
  position: relative;
  overflow: hidden;
  transition: 200ms;
  cursor: pointer;

  .item-title,
  .item-multi-title {
    font-size: 50px;
    font-family: Serif;
    font-weight: 900;
    z-index: 2;
    position: relative;
  }

  .item-icon {
    top: 50%;
    right: @space2;
    width: 134px;
    height: 118px;
    filter: invert(10%);
    background-image: url('~@/assets/images/icon.png');
    background-position-y: -200px;
    z-index: 1;
    position: absolute;
    transform: translateY(-50%) scale(.9);
  }

  .item-name {
    padding: 4px;
    color: #fff;
    background-color: @black;
    .item-icon {
      top: 2px;
      left: unset;
      right: unset;
      width: 20px;
      height: 20px;
      margin: 0 @space / 2;
      background-position-x: -1200px;
      background-position-y: -400px;
      display: inline-block;
      position: relative;
      transform: unset;
    }
  }

  &::after,
  .item-multi-item::after {
    content: '';
    right: 0;
    bottom: 0;
    width: 128px;
    height: 122px;
    background-image: url('~@/assets/images/icon.png');
    background-position: -420px 0;
    position: absolute;
  }

  &:hover {
    opacity: 1;
  }

  &:active {
    opacity: .8;
  }

  & + & {
    margin-left: @space;
  }

  &.item-row1-col1 {
    .item-icon {
      background-position-x: -140px;
    }
  }

  &.item-row1-col2 {
    .item-icon {
      width: 120px;
      background-position-x: -281px;
    }
  }

  &.item-row2-col1 {
    .item-icon {
      height: 110px;
      background-position-x: -421px;
    }
  }

  .item-row2-col2 {
    .item-icon {
      left: 0;
      right: unset;
      background-position-x: -934px;
      transform: translateY(-50%) scale(.7);
    }
  }

  .item-row2-col3 {
    .item-icon {
      left: 0;
      right: unset;
      background-position-x: -555px;
      transform: translateY(-50%) scale(.7);
    }
  }

  &.item-row3-col1 {
    .item-icon {
      width: 100px;
      background-position-x: -690px;
    }
  }

  &.item-row3-col2 {
    .item-icon {
      width: 130px;
      background-position-x: -802px;
    }
  }

  &.item-row3-col3 {
    .item-icon {
      top: 60%;
      left: 50%;
      right: unset;
      background-position-x: -1066px;
      transform: translate(-50%, -50%) scale(.5);
    }
  }

  &.item-fight {
    display: flex;

    .fight-info {
      width: 243px;
      height: 159px;
      background-image: url('~@/assets/images/icon.png');
      position: relative;

      .primary {
        margin-top: 15px;
        margin-left: 70px;
        font-size: 80px;
        font-weight: 700;
        text-shadow: @gray 5px 5px 0;
      }

      .sub {
        margin-top: 15px;
        margin-left: 90px;
        font-size: 28px;
        color: #fff;
      }
    }

    .item-icon {
      left: 60%;
      width: 130px;
      height: 130px;
      background-position: 0 -200px;
      filter: invert(20%) drop-shadow(26px 0px 0 rgba(0, 0, 0, .1));
      transform: translateY(-50%) scale(1.3);
      transform-origin: center center;
    }

    .item-tag {
      padding: 5px;
      margin-top: 4px;
      margin-bottom: 8px;
      border-radius: 4px;
      color: #fff;
      background-color: #3c3c3c;
      display: inline-block;
    }

    .fight-content {
      margin-left: 15px;
    }

    .item-title {
      font-size: 76px;
    }
  }

  &.item-end {
    flex: unset;
    width: 90px;
    margin-left: 0;
    color: #fff;
    background-color: @black;

    .item-title {
      font-size: 30px;
      font-weight: bold;
      text-align: right;
    }

    .a-icon {
      right: 50%;
      bottom: @space;
      font-size: 40px;
      transform: translate(50%);
    }

    &::after {
      display: none;
    }

    &:hover {
      background-color: lighten(@black, 10%);
    }
  }

  &.item-blue {
    margin-left: 0;
    color: #fff;
    background-color: @blue;

    .item-icon {
      opacity: .3;
    }

    &::after {
      opacity: .3;
    }
  }

  &.item-title-end {
    padding-bottom: @space2;
    display: flex;
    align-items: flex-end;
  }

  &.item-multi {
    padding: 4px 6px 6px;
    box-shadow: none;
    flex: 1.5;
    display: flex;
    flex-direction: column;

    &::after {
      display: none;
    }

    &:active,
    &:hover {
      background-color: @blue;
    }
  }

  .item-multi-content {
    flex: 1;
    display: flex;
  }

  .item-multi-item {
    flex: 1;
    box-shadow: 2px 0 2px -2px @fade-black;
    position: relative;
    overflow: hidden;
    .flex();
    transition: 300ms;

    .a-icon {
      top: 50%;
      left: 0;
      bottom: unset;
      right: unset;
      font-size: 40px;
      transform: translateY(-50%);
    }

    &::after {
      opacity: .2;
    }

    &:hover {
      background-color: @fade-blue-hover;
    }

    &:active {
      background-color: @fade-blue-active;
    }
  }

  .item-multi-item + .item-multi-item {
    &::before {
      content: '';
      left: 0;
      top: 10%;
      width: 1px;
      height: 80%;
      position: absolute;
    }
  }

  .item-multi-title {
    font-size: 40px;
  }
}

.home-side-black-gap {
  width: 120px;
  margin-left: @space;
  background-color: rgba(0, 0, 0, .7);
}

.home-side-row {
  width: 800px;
  display: flex;

  & + & {
    margin-top: @space2;
  }

  &.row-first {
    transform: translateX(80px);
  }

  &.row-primary {
    padding-right: 130px;
    transform: translateX(120px);
  }

  &.row-end {
    padding-right: 100px;
    transform: translateX(30px);
  }
}

.home-side-assets {
  height: 30px;
  margin-left: -30px;
  margin-bottom: 20px;
  padding-left: 100px;
  margin-right: -50px;
  font-size: 30px;
  color: #fff;
  background-color: rgba(0, 0, 0, .3);
  display: flex;
  align-items: center;

  li {
    margin-left: @space3;
    display: flex;
    align-items: center;
  }

  .assets-icon {
    width: 40px;
    height: 40px;
    margin-right: 15px;
    background-image: url('~@/assets/images/icon.png');
    background-position-y: -400px;
    display: inline-block;
    transform: scale(1.2);
  }

  .assets-text {
    text-shadow: @gray 3px 3px 0;
  }

  .money {
    height: 28px;
    background-position-x: -280px;
    transform: scale(1.4);
  }

  .gem {
    background-position-x: -555px;
  }

  .stone {
    background-position-x: -421px;
  }
}
</style>
