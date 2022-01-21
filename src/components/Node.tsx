import { ThreeEvent } from '@react-three/fiber'
import { useRef } from 'react'
import { Mesh, Vector3 } from 'three'

/** A connection point for a Block */
export default function Node(props: {
  position?: [number, number, number],
  type?: 'male' | 'female',
  dragging: boolean,
  draggedMesh: Mesh | undefined,
} = {
  dragging: false,
  draggedMesh: undefined,
}) {
  // This reference will give us direct access to the mesh
  const mesh = useRef<Mesh>()

  const onHover = (e: ThreeEvent<PointerEvent>) => {
    console.log('hover', e)
    const draggedMesh = props.draggedMesh
    if (!props.dragging) return
    if (!mesh.current) return
    if (!draggedMesh) return
    if (!draggedMesh.parent) return
    if (mesh.current.parent === draggedMesh.parent) return // Can't snap to self

    // Hardcoded traversal of Threejs graph
    const parent = mesh.current.parent!
    const draggedParent = draggedMesh.parent
    const pairIndex = props.type === 'female' ? 1 : 0
    const pairNode = draggedParent.children[pairIndex]

    const pairWorldPos = new Vector3()
    pairNode.getWorldPosition(pairWorldPos)

    const curWorldPos = new Vector3()
    mesh.current.getWorldPosition(curWorldPos)

    const diff = pairWorldPos.sub(curWorldPos)
    const dest = parent.position.add(diff)
    parent.position.set(dest.x, dest.y, dest.z)
    console.log('diff', diff)

    e.stopPropagation()
  }

  return (
    <mesh position={props.position} ref={mesh} onPointerOver={onHover}>
      <sphereBufferGeometry args={[0.2]} />
      <meshStandardMaterial color={props.type === 'female' ? 'pink' : 'cornflowerblue'} />
    </mesh>
  )
}
