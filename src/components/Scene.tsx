import { OrbitControls } from '@react-three/drei'
import React, { useRef } from 'react'
import { Object3D } from 'three'
import useStore from '../useStore'
import Block from './Block'

export default function Scene() {
  const block1 = useRef<Object3D>()
  const block2 = useRef<Object3D>()
  const block3 = useRef<Object3D>()
  const block4 = useRef<Object3D>()
  const block5 = useRef<Object3D>()
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

    <Block
      ref={block3}
      position={[3, 0, 0]}
      width={2}
      depth={1}
    />

    <Block
      ref={block4}
      position={[0, 0, -4]}
      width={2}
      depth={2}
    />

    <Block
      ref={block5}
      position={[4, 0, -4]}
      width={4}
      depth={1}
    />
  </>
}