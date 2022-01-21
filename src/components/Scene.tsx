import { OrbitControls } from '@react-three/drei'
import React, { useRef, useState } from 'react'
import { Mesh, Object3D } from 'three'
import Block from './Block'

export default function Scene() {
  const [dragging, setDragging] = useState(false)
  const [draggedMesh, setDraggedMesh] = useState<Mesh>()
  const block1 = useRef<Object3D<Event>>()
  const block2 = useRef<Object3D<Event>>()
  const [orbitControlsEnabled, setOrbitControlsEnabled] = useState(true)

  const onDraggingChanged = (value: boolean, mesh: Mesh) => {
    setDragging(value)
    setDraggedMesh(mesh)
  }

  return <>
    <OrbitControls makeDefault enabled={orbitControlsEnabled}/>

    <ambientLight intensity={0.25} />
    <pointLight position={[10, 10, 10]} />
    
    <Block
      ref={block1}
      position={[-1.2, 0, 0]}
      setOrbitControlsEnabled={setOrbitControlsEnabled}
      onDraggingChanged={onDraggingChanged}
      dragging={dragging}
      draggedMesh={draggedMesh}
    />

    <Block
      ref={block2}
      position={[1.2, 0, 0]}
      setOrbitControlsEnabled={setOrbitControlsEnabled}
      onDraggingChanged={onDraggingChanged}
      dragging={dragging}
      draggedMesh={draggedMesh}
    />
  </>
}