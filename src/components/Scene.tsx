import { OrbitControls } from '@react-three/drei'
import React from 'react'
import useStore from '../useStore'
import Block from './Block'

export default function Scene() {
  const draggedBlock = useStore(state => state.draggedBlock)

  return <>
    <OrbitControls makeDefault enabled={!draggedBlock}/>
    <ambientLight intensity={0.25} />
    <pointLight position={[10, 10, 10]} />
    
    <Block position={[-1.2, 0, 0]} />
    <Block position={[1.2, 0, 0]} />
    <Block position={[3, 0, 0]} width={2} depth={1} />
    <Block position={[0, 0, -4]} width={2} depth={2} />
    <Block position={[4, 0, -4]} width={4} depth={1} />
  </>
}