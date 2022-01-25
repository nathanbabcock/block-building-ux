import { ThreeEvent, useThree } from '@react-three/fiber'
import { MutableRefObject, useRef, useState } from 'react'
import { Group, Mesh, Plane, Vector3 } from 'three'
import useStore from '../useStore'

/** A connection point for a Block */
export default function Node(props: {
  position?: [number, number, number],
  type?: 'male' | 'female',
  parentRef: MutableRefObject<Group | undefined>,
}) {
  const mesh = useRef<Mesh>()
  const { camera } = useThree()
  const [ plane ] = useState(new Plane())
  const [ lastIntersection ] = useState(new Vector3())
  const draggedBlock = useStore(state => state.draggedBlock)
  const setDraggedBlock = useStore(state => state.setDraggedBlock)
  const draggedNode = useStore(state => state.draggedNode)
  const setDraggedNode = useStore(state => state.setDraggedNode)
  const draggedNodeType = useStore(state => state.draggedNodeType)
  const setDraggedNodeType = useStore(state => state.setDraggedNodeType)

  const startDragging = () => {
    const isDragging = !!draggedBlock
    if (isDragging) return
    setDraggedBlock(props.parentRef.current)
    setDraggedNode(mesh.current)
    setDraggedNodeType(props.type)
  }

  const stopDragging = () => {
    const isDragging = !!draggedBlock
    if (!isDragging) return
    setDraggedBlock(undefined)
    setDraggedNode(undefined)
    setDraggedNodeType(undefined)
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
    const parent = props.parentRef.current
    if (!parent) return
    if (draggedBlock !== parent) return
    const ray = event.ray
    const intersection = ray.intersectPlane(plane, new Vector3())
    if (!intersection) return
    const delta = intersection.clone().sub(lastIntersection)
    parent.position.add(delta)
    lastIntersection.copy(intersection)
  }

  const onHover = (event: ThreeEvent<PointerEvent>) => {
    if (!mesh.current) return
    if (!draggedBlock) return 
    if (!draggedNode) return
    if (mesh.current.parent! === draggedBlock) return // Can't snap to self
    if (draggedNodeType === props.type) return // Can't snap to same type

    const pairWorldPos = draggedNode.getWorldPosition(new Vector3())
    const curWorldPos = mesh.current.getWorldPosition(new Vector3())
    const diff = pairWorldPos.sub(curWorldPos)
    const dest = draggedBlock.position.sub(diff)
    draggedBlock.position.copy(dest)
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
