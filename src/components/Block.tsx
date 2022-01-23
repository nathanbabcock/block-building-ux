import { forwardRef, MutableRefObject, ReactNode, useRef } from 'react'
import { Group, Mesh } from 'three'
import Node from './Node'

export type BlockProps = {
  position?: [number, number, number],
  ref?: MutableRefObject<any>,
}

const Block = forwardRef<ReactNode, BlockProps>((props, ref) => {
  const mesh = useRef<Mesh>()

  return (
    <group {...props} ref={ref}>
      <Node
        type="female"
        position={[0, -0.5, 0]}
        parentRef={ref as MutableRefObject<Group>}
      />
      <Node
        type="male"
        position={[0, 0.5, 0]}
        parentRef={ref as MutableRefObject<Group>}
      />

      <mesh ref={mesh}>
        <boxBufferGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={'orange'} />
      </mesh>
    </group>
  )
})

export default Block