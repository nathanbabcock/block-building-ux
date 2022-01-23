
import { Group } from 'three'
import create from 'zustand'

export type State = {
  draggedBlock?: Group
  setDraggedBlock: (block?: Group) => void
}

const useStore = create<State>(set => ({
  draggedBlock: undefined,
  setDraggedBlock: block => set(state => ({ draggedBlock: block })),
}))

export default useStore
