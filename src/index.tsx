import { OrbitControls, TransformControls, TransformControlsProps } from '@react-three/drei'
import { Canvas, extend } from '@react-three/fiber'
import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { Mesh } from 'three'
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
  type?: 'male' | 'female',
  position?: [number, number, number],
} = {}) {
  // This reference will give us direct access to the mesh
  const mesh = useRef<Mesh>()

  const onHover = (...args: any[]) => console.log(args)

  return (
    <mesh position={props.position} ref={mesh} onPointerOver={onHover}>
      <sphereBufferGeometry args={[0.2]} />
      <meshStandardMaterial color={props.type === 'female' ? 'pink' : 'cornflowerblue'} />
    </mesh>
  )
}

function Block(props: {
  position?: [number, number, number],
  onDraggingChanged: (value: boolean, mesh: Mesh) => any
}) {
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
      transformControls.current.removeEventListener('dragging-changed', draggingChangedListener)
    }
  })

  return (
    <group {...props}>
      <TransformControls mode="translate" showZ={false} ref={transformControls}>
        <>
          <Node type="female" position={[0, -0.5, 0]} />
          <Node type="male" position={[0, 0.5, 0]} />

          <mesh ref={mesh}>
            <boxBufferGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={'orange'} />
          </mesh>
        </>
      </TransformControls>
    </group>
  )
}

function Scene() {
  const [dragging, setDragging] = useState(false)

  const onDraggingChanged = (value: boolean, mesh: Mesh) => {
    console.log('Dragging changed to ', value)
    setDragging(value)
  }

  return <>
    <OrbitControls makeDefault/>
    {/* <dragControls args={[[mesh], camera, domElement]} /> */}

    <ambientLight intensity={0.25} />
    <pointLight position={[10, 10, 10]} />
    
    <Block position={[-1.2, 0, 0]} onDraggingChanged={onDraggingChanged}/>
    <Block position={[1.2, 0, 0]} onDraggingChanged={onDraggingChanged}/>
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