import { OrbitControls, TransformControls } from '@react-three/drei'
import { Canvas, extend, useThree } from '@react-three/fiber'
import React, { useRef } from 'react'
import ReactDOM from 'react-dom'
import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three'
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

  return (
    <mesh position={props.position} ref={mesh}>
      <sphereBufferGeometry args={[0.2]} />
      <meshStandardMaterial color={props.type === 'female' ? 'pink' : 'cornflowerblue'} />
    </mesh>
  )
}

function Block(props: any) {
  // This reference will give us direct access to the mesh
  const mesh = useRef<Mesh>()

  return (
    

    <group {...props}>
      <TransformControls mode="translate" showZ={false}>
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
  const {
    camera,
    gl: { domElement }
  } = useThree()

  const mesh = new Mesh(new BoxGeometry(1, 1, 1), new MeshBasicMaterial({ color: 0xff00ff }))

  return <>
    <OrbitControls makeDefault/>
    {/* <dragControls args={[[mesh], camera, domElement]} /> */}

    <ambientLight intensity={0.25} />
    <pointLight position={[10, 10, 10]} />
    
    <Block position={[-1.2, 0, 0]} />
    <Block position={[1.2, 0, 0]} />
    <primitive object={mesh} />
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