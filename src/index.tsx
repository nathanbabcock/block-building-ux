import { OrbitControls, TransformControls } from '@react-three/drei'
import { Canvas, extend, ThreeEvent, useThree } from '@react-three/fiber'
import React, { forwardRef, MutableRefObject, ReactNode, useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { Mesh, Vector3 } from 'three'
import { DragControls } from 'three/examples/jsm/controls/DragControls'
import './index.scss'

extend({ DragControls })

declare global {
  namespace JSX {
    interface IntrinsicElements {
      dragControls: any
    }
  }
}

/** A connection point for a Block */
function Node(props: {
  position?: [number, number, number],
  type?: 'male' | 'female',
  dragging: boolean,
  draggedMesh: Mesh | undefined,
} = {
  dragging: false,
  draggedMesh: undefined,
}) {
  // This reference will give us direct access to the mesh
  const mesh = useRef<Mesh>()

  const onHover = (e: ThreeEvent<PointerEvent>) => {
    console.log(e)
    const draggedMesh = props.draggedMesh
    if (!props.dragging) return
    if (!mesh.current) return
    if (!draggedMesh) return
    if (!draggedMesh.parent) return
    if (mesh.current.parent === draggedMesh.parent) return // Can't snap to self

    // Hardcoded traversal of Threejs graph
    const parent = mesh.current.parent!
    const draggedParent = draggedMesh.parent
    const pairIndex = props.type === 'female' ? 1 : 0
    const pairNode = draggedParent.children[pairIndex]

    const pairWorldPos = new Vector3()
    pairNode.getWorldPosition(pairWorldPos)

    const curWorldPos = new Vector3()
    mesh.current.getWorldPosition(curWorldPos)

    const diff = pairWorldPos.sub(curWorldPos)
    const dest = parent.position.add(diff)
    parent.position.set(dest.x, dest.y, dest.z)
    console.log('diff', diff)

    e.stopPropagation()
  }

  return (
    <mesh position={props.position} ref={mesh} onPointerOver={onHover}>
      <sphereBufferGeometry args={[0.2]} />
      <meshStandardMaterial color={props.type === 'female' ? 'pink' : 'cornflowerblue'} />
    </mesh>
  )
}

type BlockProps = {
  position?: [number, number, number],
  ref?: MutableRefObject<any>,
  onDraggingChanged: (value: boolean, mesh: Mesh) => any,
  dragging: boolean,
  draggedMesh: Mesh | undefined,
}

const Block = forwardRef<ReactNode, BlockProps>((props, ref) => {
  const mesh = useRef<Mesh>()
  const transformControls: any = useRef(null)
  const { onDraggingChanged } = props

  const draggingChangedListener = (event: any) => {
    console.log(event)
    onDraggingChanged(event.value, mesh.current!)
  }

  useEffect(() => {
    if (!transformControls.current) return
    transformControls.current.addEventListener('dragging-changed', draggingChangedListener)
    return () => {
      if (!transformControls.current) return
      // eslint-disable-next-line react-hooks/exhaustive-deps
      transformControls.current.removeEventListener('dragging-changed', draggingChangedListener)
    }
  })

  return (
    <group {...props} ref={ref}>
      <TransformControls mode="translate" showZ={false} ref={transformControls}>
        <>
          <Node type="female" position={[0, -0.5, 0]} dragging={props.dragging} draggedMesh={props.draggedMesh}/>
          <Node type="male" position={[0, 0.5, 0]} dragging={props.dragging} draggedMesh={props.draggedMesh}/>

          <mesh ref={mesh}>
            <boxBufferGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={'orange'} />
          </mesh>
        </>
      </TransformControls>
    </group>
  )
})

function Scene() {
  const [dragging, setDragging] = useState(false)
  const [draggedMesh, setDraggedMesh] = useState<Mesh>()
  const {
    camera,
    gl: { domElement }
  } = useThree()
  const block1 = useRef()
  const block2 = useRef()

  const onDraggingChanged = (value: boolean, mesh: Mesh) => {
    console.log(`Dragging changed to ${value}`)
    setDragging(value)
    setDraggedMesh(mesh)
    console.log(mesh.parent)
  }

  useEffect(() => console.log(block1.current, block2.current))

  return <>
    <OrbitControls makeDefault/>
    <dragControls args={[[block1, block2], camera, domElement]} />

    <ambientLight intensity={0.25} />
    <pointLight position={[10, 10, 10]} />
    
    <Block ref={block1} position={[-1.2, 0, 0]} onDraggingChanged={onDraggingChanged} dragging={dragging} draggedMesh={draggedMesh}/>
    <Block ref={block2} position={[1.2, 0, 0]} onDraggingChanged={onDraggingChanged} dragging={dragging} draggedMesh={draggedMesh}/>
  </>
}

ReactDOM.render(
  <div style={{ width: "100vw", height: "100vh" }}>
    <Canvas>
      <Scene />
    </Canvas>
  </div>,
  document.getElementById('root')
)