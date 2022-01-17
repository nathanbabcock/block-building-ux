import React, { useRef } from 'react'
import ReactDOM from 'react-dom'
import { Canvas } from '@react-three/fiber'
import { Mesh } from 'three'
import './index.scss'
import { OrbitControls } from '@react-three/drei'

function Block(props: any) {
  // This reference will give us direct access to the mesh
  const mesh = useRef<Mesh>()

  return (
    <mesh {...props} ref={mesh}>
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={'orange'} />
    </mesh>
  )
}

ReactDOM.render(
  <div style={{ width: "100vw", height: "100vh" }}>
    <Canvas>
      <OrbitControls/>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Block position={[-1.2, 0, 0]} />
      <Block position={[1.2, 0, 0]} />
    </Canvas>
  </div>,
  document.getElementById('root')
)