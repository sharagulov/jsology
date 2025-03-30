import { create } from 'zustand'

type InnerDragState = {
  isInnerDragging: boolean
  setInnerDragging: (value: boolean) => void
}

export const useInnerDragState = create<InnerDragState>((set) => ({
  isInnerDragging: false,
  setInnerDragging: (value) => set({ isInnerDragging: value }),
}))
