import LayoutDagre, { Edge, Node } from './layout-dagre'
import { info } from '@/components/AcMessage'


const getNodeStyle = (type: string) => {
  let style = {
    color: '#333',
    x: 470,
    y: 307,
    icon: {
      x: 292,
      y: 257,
      width: 32,
      height: 36
    }
  }
  switch (type) {
    case 'guide':
      style = {
        color: '#fff',
        x: 522,
        y: 222,
        icon: {
          x: 882,
          y: 472,
          width: 32,
          height: 36
        }
      }
      break
    case 'finish':
      style = {
        color: '#fff',
        x: 645,
        y: 430,
        icon: {
          x: 882,
          y: 472,
          width: 32,
          height: 36
        }
      }
  }
  return style
}

// 关卡画布
class StageFlow {
  $el: HTMLCanvasElement
  width: number = document.body.getBoundingClientRect().width
  height: number = document.body.getBoundingClientRect().height
  padding: number = window.innerWidth / 2 // 左右两侧留白
  edgeSize: [number, number] = [300, 4] // 线 宽度、厚度
  nodeSize: [number, number] = [132, 45] // 节点 宽度、高度
  offsetSize: [number, number] = [200, 120] // x 轴偏移大小, y轴偏移大小
  ctx: CanvasRenderingContext2D
  size: number = 12
  nodes: Array<Node> = []
  edges: Array<Edge> = []
  loaded: Boolean = false
  image: HTMLImageElement | null | undefined

  constructor ($el: HTMLCanvasElement, data: { nodes: Array<Node>, edges: Array<Edge> }) {
    let { padding, edgeSize, nodeSize, offsetSize, width, height } = this
    
    this.$el = $el
    this.ctx = $el.getContext('2d') as CanvasRenderingContext2D

    this.nodes = data.nodes
    this.edges = data.edges

    const dagre = new LayoutDagre(data, { nodeSize, edgeSize, offsetSize, padding, width, height })

    this.width = dagre.width

    $el.height = this.height
    $el.width = this.width

    let cursorNode: Node | null = null
    $el.addEventListener('mousemove', (e: any) => {
      const { layerX, layerY } = e
      let added: boolean = false

      for (let i = 0; i < this.nodes.length; i++) {
        const node: Node = this.nodes[i]
        const config = node._config
        if (config) {
          if (
            layerX >= config.x
            && layerY >= config.y
            && layerX <= config.x + config.width
            && layerY <= config.y + config.height
          ) {
            cursorNode = node
            added = true
            break
          }
        }
      }
      
      if (added) {
        $el.style.cursor = 'pointer'
      } else {
        cursorNode = null
        $el.style.cursor = 'unset' 
      }
    })

    $el.addEventListener('click', () => {
      if (cursorNode) {
        info('你点击了：' + cursorNode.label)
      }
    })

    if (this.loaded) {
      this.draw(this.ctx, this.nodes, this.edges)
    } else {
      const ui = require('../images/ui.png')
      const image: HTMLImageElement = new Image()
      image.src = ui
      image.onload = () => {
        this.image = image
        this.loaded = true
        this.draw(this.ctx, this.nodes, this.edges)
      }
    }
  }

  /**
   * 绘制数据
   * @param ctx 画笔
   * @param nodes 节点数据
   * @param edges 边数据
   */
  draw (ctx: CanvasRenderingContext2D, nodes: Array<Node>, edges: Array<Edge>) {
    if (!ctx) return
    const image: HTMLImageElement = this.image as HTMLImageElement
    
    edges.forEach((edge: Edge) => {
      this.drawEdge(ctx, edge)
    })

    nodes.forEach((node: Node) => {
      this.drawNode(ctx, node, image)
    })

  }

  /**
   * 绘制节点
   * @param ctx 画笔
   * @param node 节点
   */
  drawNode (ctx: CanvasRenderingContext2D, node: Node, image: CanvasImageSource) {
    const config = node._config
    const style = getNodeStyle(node.type)
    ctx.textBaseline = 'middle'
    ctx.textAlign = 'center'
    if (config && ctx) {
      // 绘制主体
      ctx.drawImage(image, style.x, style.y, 130, 42, config.x, config.y, config.width, config.height)
      ctx.fillStyle = style.color
      ctx.font = '22px Serail'
      ctx.fillText(node.label, config.x + config.width / 2, config.y + 5 + config.height / 2)

      // 绘制教学书本
      ctx.drawImage(image, 694, 204, 60, 55, config.x - 45, config.y + config.height - 55, 60, 55)
      
      // 绘制icon
      const icon = style.icon
      ctx.drawImage(image,
        icon.x, icon.y, icon.width, icon.height,
        config.x - icon.width / 2, config.y + config.height - icon.height, icon.width, icon.height)
    }
  }

  /**
   * 绘制边
   * @param ctx 画笔
   * @param edge 边
   */
  drawEdge(ctx: CanvasRenderingContext2D, edge: Edge) {
    const config = edge._config
    if (!config) {
      return
    }
    ctx.strokeStyle = '#fff'
    ctx.lineWidth = config.lineWidth
    ctx.beginPath()
    ctx.moveTo(config.startX, config.startY)
    ctx.lineTo(config.endX, config.endY)
    ctx.closePath()
    ctx.stroke()
  }
}

export default StageFlow
