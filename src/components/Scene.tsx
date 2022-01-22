import { OrbitControls } from '@react-three/drei'
import React, { useRef, useState } from 'react'
import { Group, Object3D } from 'three'
import Block from './Block'

export default function Scene() {
  const block1 = useRef<Object3D<Event>>()
  const block2 = useRef<Object3D<Event>>()
  const [orbitControlsEnabled, setOrbitControlsEnabled] = useState(true)
  const [globalDragging, setGlobalDragging] = useState(false)
  const [draggedMesh, setDraggedMesh] = useState<Group>()

  // TODO
  // const { events } = useThree()
  // events.handlers!.onPointerMove = () => {}

  return <>
    <OrbitControls makeDefault enabled={orbitControlsEnabled}/>

    <ambientLight intensity={0.25} />
    <pointLight position={[10, 10, 10]} />
    
    <Block
      ref={block1}
      position={[-1.2, 0, 0]}
      setOrbitControlsEnabled={setOrbitControlsEnabled}
      globalDragging={globalDragging}
      setGlobalDragging={setGlobalDragging}
      draggedMesh={draggedMesh}
      setDraggedMesh={setDraggedMesh}
    />

    <Block
      ref={block2}
      position={[1.2, 0, 0]}
      setOrbitControlsEnabled={setOrbitControlsEnabled}
      globalDragging={globalDragging}
      setGlobalDragging={setGlobalDragging}
      draggedMesh={draggedMesh}
      setDraggedMesh={setDraggedMesh}
    />
  </>
}