import { forwardRef, MutableRefObject, ReactNode, useEffect, useRef } from 'react'
import { Group, Mesh } from 'three'
import Node from './Node'

export type BlockProps = {
  position?: [number, number, number],
  ref?: MutableRefObject<any>,
  setOrbitControlsEnabled: (enabled: boolean) => void,
  globalDragging: boolean,
  setGlobalDragging: (dragging: boolean) => void
  draggedMesh?: Group,
  setDraggedMesh: (group?: Group) => void,
}

const Block = forwardRef<ReactNode, BlockProps>((props, ref) => {
  const mesh = useRef<Mesh>()

  return (
    <group {...props} ref={ref}>
      <Node
        type="female"
        position={[0, -0.5, 0]}
        parentRef={ref as MutableRefObject<Group>}
        setOrbitControlsEnabled={props.setOrbitControlsEnabled}
        globalDragging={props.globalDragging}
        setGlobalDragging={props.setGlobalDragging}
        draggedMesh={props.draggedMesh}
        setDraggedMesh={props.setDraggedMesh}
      />
      <Node
        type="male"
        position={[0, 0.5, 0]}
        parentRef={ref as MutableRefObject<Group>}
        setOrbitControlsEnabled={props.setOrbitControlsEnabled}
        globalDragging={props.globalDragging}
        setGlobalDragging={props.setGlobalDragging}
        draggedMesh={props.draggedMesh}
        setDraggedMesh={props.setDraggedMesh}
      />

      <mesh ref={mesh}>
        <boxBufferGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={'orange'} />
      </mesh>
    </group>
  )
})

export default Block