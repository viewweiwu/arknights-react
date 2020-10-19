declare interface Point {
  x: number, // x 坐标
  y: number, // y 坐标
  xa: number, // x 加速度
  ya: number, // y 加速度
  size: number, // 点大小
  color: string | CanvasGradient | CanvasPattern // 点颜色
}
