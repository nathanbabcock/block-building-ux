import { ThreeEvent, useThree } from '@react-three/fiber'
import { MutableRefObject, useEffect, useRef, useState } from 'react'
import { Group, Mesh, Plane, Vector3 } from 'three'

/** A connection point for a Block */
export default function Node(props: {
  position?: [number, number, number],
  type?: 'male' | 'female',
  parentRef: MutableRefObject<Group>,
  draggedMesh: Mesh | undefined,
}) {
  const mesh = useRef<Mesh>()
  const [ dragging, setDragging ] = useState(false)
  const { camera } = useThree()
  const [ plane ] = useState(new Plane())
  const [ lastIntersection ] = useState(new Vector3())

  useEffect(() => console.log('parent', props.parentRef.current))

  const onPointerDown = (event: ThreeEvent<MouseEvent>) => {
    console.log('pointerdown', event)
    setDragging(true)

    const normal = camera.getWorldDirection(plane.normal)
    const point = mesh.current!.getWorldPosition(new Vector3())
    plane.setFromNormalAndCoplanarPoint(normal, point)
    const ray = event.ray
    ray.intersectPlane(plane, lastIntersection)
    console.log({point, plane, originalIntersection: lastIntersection})
  }

  const onPointerUp = (event: ThreeEvent<MouseEvent>) => {
    console.log('pointerup', event)
    setDragging(false)
  }

  const onPointerOut = (event: ThreeEvent<MouseEvent>) => {
    console.log('pointerout', event)
    setDragging(false)
  }

  const onPointerMove = (event: ThreeEvent<MouseEvent>) => {
    if (!dragging) return
    const parent = props.parentRef.current as Group
    if (!parent) return
    const ray = event.ray
    const intersection = ray.intersectPlane(plane, new Vector3())
    if (!intersection) return
    const delta = intersection.clone().sub(lastIntersection)
    parent.position.add(delta)
    lastIntersection.copy(intersection)
  }

  const onHover = (event: ThreeEvent<PointerEvent>) => {
    console.log('hover', event)
    const draggedMesh = props.draggedMesh
    if (!dragging) return
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

    event.stopPropagation()
  }

  return (
    <mesh
      position={props.position}
      ref={mesh}
      onPointerOver={onHover}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerMove={onPointerMove}
      onPointerOut={onPointerOut}
    >
      <sphereBufferGeometry args={[0.2]} />
      <meshStandardMaterial color={props.type === 'female' ? 'pink' : 'cornflowerblue'} />
    </mesh>
  )
}
