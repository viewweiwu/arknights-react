import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Object3D,
  WireframeGeometry,
  IcosahedronGeometry,
  LineSegments,
  LineBasicMaterial
} from 'three'

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js'

class GeoEffect {
  $el: HTMLElement
  width: number = document.body.getBoundingClientRect().width
  height: number = document.body.getBoundingClientRect().height
  scene: Scene | undefined
  camera: PerspectiveCamera | undefined
  mesh: any
  renderer: WebGLRenderer | undefined

  constructor ($el: HTMLDivElement) {
    this.$el = $el
    this.initCamera()
    this.initRenderer()
    this.initControls()
    this.initMesh()
    this.initScene()
    this.renderer && this.$el.appendChild(this.renderer.domElement)
    requestAnimationFrame(() => {
      this.render()
    })
  }
  
  /**
   * 初始化场景
   */
  initScene () {
    const { mesh } = this
    const scene = new Scene()

    scene.add(mesh)

    this.scene = scene
  }

  /**
   * 初始化相机
   */
  initCamera () {
    const { width, height } = this

    const camera = new PerspectiveCamera(75, width / height, 0.1, 50)

    camera.position.z = 30

    this.camera = camera
  }

  /**
   * 初始化渲染器
   */
  initRenderer () {
    const { width, height } = this

    const renderer = new WebGLRenderer({ antialias: true })

    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(width, height)

    this.renderer = renderer
  }

  /**
   * 初始化鼠标控制器
   */
  initControls () {
    const { camera, renderer } = this

    if (!camera || !renderer) {
      return
    }

    const orbit = new OrbitControls(camera, renderer.domElement)
    orbit.enableZoom = false
  }

  /**
   * 初始化材质
   */
  initMesh () {
    const mesh = new Object3D()


    mesh.add(
      new LineSegments(

        new WireframeGeometry(new IcosahedronGeometry(10, 1)),

        new LineBasicMaterial({
          color: 0xffbb22,
          linewidth: 20
        })

      )
    )
    
    // const geo = new IcosahedronBufferGeometry( 10, 1 )
    // const geometry = new WireframeGeometry2( geo );

    // const matLine = new LineMaterial( {
    //   color: 0xffbb22,
    //   linewidth: 1, // in pixels
    //   //resolution:  // to be set by renderer, eventually
    //   dashed: false

    // } );

    // const mesh = new Wireframe( geometry, matLine );
    // mesh.computeLineDistances();
    // mesh.scale.set( 1, 1, 1 );

    console.log(new IcosahedronGeometry(10, 1))
    console.log(mesh)

    this.mesh = mesh
  }

  /**
   * 循环渲染
   */
  render () {
    const { mesh, renderer, scene, camera } = this
    requestAnimationFrame(this.render.bind(this))

    if (!renderer || !mesh) {
      return
    }
    
    mesh.rotation.x += 0.005
    mesh.rotation.y += 0.005

    renderer.render(scene as Scene, camera as PerspectiveCamera)
  }
}

export default GeoEffect