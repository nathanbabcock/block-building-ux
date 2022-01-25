
import { Group, Mesh } from 'three'
import create from 'zustand'

export type NodeType = 'male' | 'female'

export type State = {
  draggedBlock?: Group
  setDraggedBlock: (block?: Group) => void
  
  draggedNodeType?: NodeType
  setDraggedNodeType: (nodeType?: NodeType) => void

  draggedNode?: Mesh
  setDraggedNode: (node?: Mesh) => void
}

const useStore = create<State>(set => ({
  draggedBlock: undefined,
  setDraggedBlock: draggedBlock => set(() => ({ draggedBlock })),

  draggedNodeType: undefined,
  setDraggedNodeType: draggedNodeType => set(() => ({ draggedNodeType })),

  draggedNode: undefined,
  setDraggedNode: draggedNode => set(() => ({ draggedNode })),
}))

export default useStore
