import React, { useRef } from 'react'
import ReactDOM from 'react-dom'
import { Canvas } from 'react-three-fiber'
import { Mesh } from 'three'
import './index.scss'

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
  <Canvas>
    <ambientLight />
    <pointLight position={[10, 10, 10]} />
    <Block position={[-1.2, 0, 0]} />
    <Block position={[1.2, 0, 0]} />
  </Canvas>,
  document.getElementById('root')
)