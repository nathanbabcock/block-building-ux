import { OrbitControls } from '@react-three/drei'
import React, { useRef } from 'react'
import { Object3D } from 'three'
import useStore from '../useStore'
import Block from './Block'

export default function Scene() {
  const block1 = useRef<Object3D<Event>>()
  const block2 = useRef<Object3D<Event>>()
  const draggedBlock = useStore(state => state.draggedBlock)

  return <>
    <OrbitControls makeDefault enabled={!draggedBlock}/>

    <ambientLight intensity={0.25} />
    <pointLight position={[10, 10, 10]} />
    
    <Block
      ref={block1}
      position={[-1.2, 0, 0]}
    />

    <Block
      ref={block2}
      position={[1.2, 0, 0]}
    />
  </>
}