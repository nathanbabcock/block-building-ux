import { OrbitControls } from '@react-three/drei'
import React, { useRef, useState } from 'react'
import { Mesh, Object3D } from 'three'
import Block from './Block'

export default function Scene() {
  const [dragging, setDragging] = useState(false)
  const [draggedMesh, setDraggedMesh] = useState<Mesh>()
  const block1 = useRef<Object3D<Event>>()
  const block2 = useRef<Object3D<Event>>()

  const onDraggingChanged = (value: boolean, mesh: Mesh) => {
    console.log(`Dragging changed to ${value}`)
    setDragging(value)
    setDraggedMesh(mesh)
    console.log(mesh.parent)
  }

  return <>
    {/* <OrbitControls makeDefault/> */}

    <ambientLight intensity={0.25} />
    <pointLight position={[10, 10, 10]} />
    
    <Block ref={block1} position={[-1.2, 0, 0]} onDraggingChanged={onDraggingChanged} dragging={dragging} draggedMesh={draggedMesh}/>
    <Block ref={block2} position={[1.2, 0, 0]} onDraggingChanged={onDraggingChanged} dragging={dragging} draggedMesh={draggedMesh}/>
  </>
}