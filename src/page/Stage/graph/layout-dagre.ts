// 边样本
export interface Edge {
  source: string // 开始 nodeId
  target: string, // 结束 nodeId
  _config?: {
    startX: number, // 开始 x
    startY: number, // 开始 y
    endX: number, // 结束 x
    endY: number, // 结束 y
    lineWidth: number // 线条宽度
  }
}

export interface Node {
  id: string, // 节点 id
  label: string, // 节点名称
  type: string, // 节点样式类型
  offsetY?: number, // y 轴偏移量
  offsetX?: number, // x 偏移量
  _config?: {
    x: number, // 节点 x
    y: number, // 节点 y
    width: number, // 节点宽度
    height: number // 节点高度
  }
}

// 节点组成的 map
interface NodeMap {
  [key: string]: Node
}

// 链表
interface Link {
  nodeId: string, // 节点 id
  node: Node, // 对应节点
  added: boolean, // 是否已经添加
  deep: number, // 深度
  children: Array<Link>
}

// 链表 map
interface LinkMap {
  [key: string]: Link
}

// Dagre 层次布局
class LayoutDagre {
  data: { nodes: Array<Node>, edges: Array<Edge> } // 数据
  nodeSize: [number, number] // 节点大小
  edgeSize: [number, number] // 边大小
  offsetSize: [number, number] // x 轴偏移大小, y轴偏移大小
  map: LinkMap = {} // 节点链表
  nodeMap: NodeMap = {} // 节点集合
  length: number = 0 // 长度
  padding: number = 0 // 左右两侧留白
  width: number // 画布宽度
  height: number // 画布高度

  /**
   * 初始化
   * @param data 数据
   * @param options 配置
   */
  constructor (
    data: { nodes: Array<Node>, edges: Array<Edge> },
    options: {
      nodeSize: [number, number],
      edgeSize: [number, number],
      offsetSize: [number, number],
      padding: number,
      height: number,
      width: number
    }
  ) {
    this.data = data
    this.edgeSize = options.edgeSize
    this.nodeSize = options.nodeSize
    this.offsetSize = options.offsetSize
    this.padding = options.padding
    this.height = options.height
    this.width = options.width

    this.initLinkMap()
    this.setEdgeAndNodeConfig()
    this.setCanvasWidth()

    console.log(this.map)
  }
  /**
   * 数据转链表
   */
  initLinkMap () {
    const { nodes, edges } = this.data
    let map: LinkMap = {}
    let nodeMap: NodeMap = {}
    let length = 1
  
    nodes.forEach((node: Node) => {
      map[node.id] = {
        nodeId: node.id,
        node,
        deep: 1,
        added: false,
        children: []
      }
      nodeMap[node.id] = node
    })
  
    edges.forEach((edge: Edge) => {
      if (map[edge.source] && map[edge.target]) {
        const source: Link = map[edge.source]
        const target: Link = map[edge.target]
        target.deep = source.deep + 1
        source.children.push(target)
        // 标记已经被添加
        target.added = true
        // 记录最大深度
        if (target.deep > length) {
          length = target.deep
        }
      }
    })
    
    // 删除节点
    for (let key in map) {
      if (map[key].added) {
        delete map[key]
      }
    }
    
    this.nodeMap = nodeMap
    this.map = map
    this.length = length
  }

  /**
   * 设置边 edge 与节点 node 的配置 confing
   */
  setEdgeAndNodeConfig () {
    const { map, edgeSize, nodeSize, offsetSize, padding, height, nodeMap } = this
    const { edges } = this.data
    const [edgeWidth, edgeHeight] = edgeSize
    const [nodeWidth, nodeHeight] = nodeSize
    const [offsetX, offsetY] = offsetSize

    const loop = (link: Link) => {
      // 添加节点 config 配置
      link.node._config = {
        x: edgeWidth * (link.deep  - 1) + padding - nodeWidth * 0.5 + (link.node?.offsetX || 0) * offsetX,
        y: height * 0.5 - nodeHeight + (link.node?.offsetY || 0) * offsetY,
        width: nodeWidth,
        height: nodeHeight
      }
      if (link.children && link.children.length) {
        link.children.forEach(item  => loop(item))
      }
    }

    // 硬编码，固定开始 nodeId 是 1
    loop(map[1])

    edges.forEach((edge: Edge) => {
      const sourceNode: Node = nodeMap[edge.source]
      const targetNode: Node = nodeMap[edge.target]

      if (sourceNode._config && targetNode._config) {
        // 添加边 config 配置
        edge._config = {
          startX: sourceNode._config.x + sourceNode._config.width / 2,
          startY: sourceNode._config.y + sourceNode._config.height / 2,
          endX: targetNode._config.x + targetNode._config.width / 2,
          endY: targetNode._config.y + targetNode._config.height / 2,
          lineWidth: edgeHeight
        }
      }
    })
  }

  /**
   * 设置画布宽度
   */
  setCanvasWidth () {
    const { padding, nodeMap } = this
    let limitNode: Node | null = null

    for (let key in nodeMap) {
      const node: Node = nodeMap[key]
      if (!limitNode) {
        limitNode = node
      } else if (node._config && limitNode._config) {
        if (node._config.x > limitNode._config.x) {
          limitNode = node
        }
      }
    }
    
    if (limitNode && limitNode._config) {
      this.width = limitNode._config.x + limitNode._config.width + padding
    }
  }
}

export default LayoutDagre
