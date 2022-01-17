import React, { useRef } from 'react'
import ReactDOM from 'react-dom'
import { Canvas } from '@react-three/fiber'
import { Group, Mesh } from 'three'
import './index.scss'
import { OrbitControls } from '@react-three/drei'

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
      <Node type="female" position={[0, -0.5, 0]}/>
      <Node type="male" position={[0, 0.5, 0]}/>

      <mesh ref={mesh}>
        <boxBufferGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={'orange'} />
      </mesh>
    </group>
  )
}

ReactDOM.render(
  <div style={{ width: "100vw", height: "100vh" }}>
    <Canvas>
      <OrbitControls/>
      <ambientLight intensity={0.25}/>
      <pointLight position={[10, 10, 10]} />
      <Block position={[-1.2, 0, 0]} />
      <Block position={[1.2, 0, 0]} />
    </Canvas>
  </div>,
  document.getElementById('root')
)