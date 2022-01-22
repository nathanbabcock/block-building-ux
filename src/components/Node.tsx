import { ThreeEvent, useThree } from '@react-three/fiber'
import { MutableRefObject, useRef, useState } from 'react'
import { Group, Mesh, Plane, Vector3 } from 'three'
import type { BlockProps } from './Block'

/** A connection point for a Block */
export default function Node(props: {
  position?: [number, number, number],
  type?: 'male' | 'female',
  parentRef: MutableRefObject<Group>,
  setOrbitControlsEnabled: BlockProps['setOrbitControlsEnabled'],
  globalDragging: boolean,
  setGlobalDragging: (dragging: boolean) => void
  draggedMesh?: Group,
  setDraggedMesh: (group?: Group) => void,
}) {
  const mesh = useRef<Mesh>()
  const [ dragging, setDragging ] = useState(false)
  const { camera } = useThree()
  const [ plane ] = useState(new Plane())
  const [ lastIntersection ] = useState(new Vector3())

  const startDragging = () => {
    if (dragging) return
    setDragging(true)
    props.setGlobalDragging(true)
    props.setOrbitControlsEnabled(false)
    props.setDraggedMesh(props.parentRef.current)
    console.log('startDragging')
  }

  const stopDragging = () => {
    if (!dragging) return
    setDragging(false)
    props.setGlobalDragging(false)
    props.setOrbitControlsEnabled(true)
    props.setDraggedMesh(undefined)
    console.log('stopDragging')
  }

  const onPointerDown = (event: ThreeEvent<MouseEvent>) => {
    startDragging()
    const normal = camera.getWorldDirection(plane.normal)
    const point = mesh.current!.getWorldPosition(new Vector3())
    plane.setFromNormalAndCoplanarPoint(normal, point)
    const ray = event.ray
    ray.intersectPlane(plane, lastIntersection)
  }

  const onPointerUp = (event: ThreeEvent<MouseEvent>) => {
    stopDragging()
  }

  const onPointerOut = (event: ThreeEvent<MouseEvent>) => {
    stopDragging()
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
    console.log('onPointerMove')
  }

  const onHover = (event: ThreeEvent<PointerEvent>) => {
    const curMesh = mesh.current!
    const draggedMesh = props.draggedMesh!
    const parent = curMesh.parent!

    if (dragging) return
    if (!props.globalDragging) return
    if (parent === draggedMesh) return // Can't snap to self

    const pairIndex = props.type === 'female' ? 1 : 0
    const pairNode = draggedMesh.children[pairIndex]
    const pairWorldPos = pairNode.getWorldPosition(new Vector3())
    const curWorldPos = curMesh.getWorldPosition(new Vector3())
    const diff = pairWorldPos.sub(curWorldPos)
    const dest = draggedMesh.position.sub(diff)
    draggedMesh.position.copy(dest)
    console.log('snap')
    stopDragging()
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
