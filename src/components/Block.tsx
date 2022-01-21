import { MutableRefObject, forwardRef, ReactNode, useRef, useEffect } from 'react'
import { Mesh } from 'three'
import Node from './Node'

export type BlockProps = {
  position?: [number, number, number],
  ref?: MutableRefObject<any>,
  onDraggingChanged: (value: boolean, mesh: Mesh) => any,
  dragging: boolean,
  draggedMesh: Mesh | undefined,
}

const Block = forwardRef<ReactNode, BlockProps>((props, ref) => {
  const mesh = useRef<Mesh>()
  const transformControls: any = useRef(null)
  const { onDraggingChanged } = props

  const draggingChangedListener = (event: any) => {
    console.log(event)
    onDraggingChanged(event.value, mesh.current!)
  }

  useEffect(() => {
    if (!transformControls.current) return
    transformControls.current.addEventListener('dragging-changed', draggingChangedListener)
    return () => {
      if (!transformControls.current) return
      // eslint-disable-next-line react-hooks/exhaustive-deps
      transformControls.current.removeEventListener('dragging-changed', draggingChangedListener)
    }
  })

  return (
    <group {...props} ref={ref}>
      <Node type="female" position={[0, -0.5, 0]} dragging={props.dragging} draggedMesh={props.draggedMesh}/>
      <Node type="male" position={[0, 0.5, 0]} dragging={props.dragging} draggedMesh={props.draggedMesh}/>

      <mesh ref={mesh}>
        <boxBufferGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={'orange'} />
      </mesh>
    </group>
  )
})

export default Block