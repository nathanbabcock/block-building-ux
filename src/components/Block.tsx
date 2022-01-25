import { ReactNode, useRef } from 'react'
import { Group, Mesh } from 'three'
import { NodeType } from '../useStore'
import Node from './Node'

export type BlockProps = {
  position?: [number, number, number],
  width?: number
  depth?: number
}

export default function Block(props: BlockProps) {
  const group = useRef<Group>()
  const mesh = useRef<Mesh>()
  const width = props.width ?? 1
  const depth = props.depth ?? 1
  const nodes: ReactNode[] = []
  
  let i = 0
  for (let x = 0; x < width; x++)
    for (let z = 0; z < depth; z++)
      for (const type of ['female', 'male']) {
        const y = type === 'female' ? -0.5 : 0.5
        nodes.push(<Node
          type={type as NodeType}
          position={[x - ((width-1) / 2), y, z - ((depth-1) / 2)]}
          parentRef={group}
          key={i++}
        />)
      }

  return (
    <group {...props} ref={group}>
      { nodes }
      <mesh ref={mesh}>
        <boxBufferGeometry args={[width, 1, depth]} />
        <meshStandardMaterial color={'orange'} />
      </mesh>
    </group>
  )
}
