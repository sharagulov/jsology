import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { v4 as uuidv4 } from 'uuid'

export type Block = {
  id: string
  type: string
  config?: Record<string, any>
}

export type Component = {
  id: string
  name: string
  position: { x: number; y: number }
  blocks: Block[]
}

type CanvasStore = {
  components: Component[]

  shift: {x: number, y: number}
  setShift: (x: number, y: number) => void
  scale: number
  setScale: (value: number) => void

  hasInitialized: boolean
  setInitialized: () => void

  addComponent: (component?: Partial<Component>) => void
  updateComponent: (id: string, component: Partial<Component>) => void
  removeComponent: (id: string) => void
  resetCanvas: () => void
}

export const useCanvasStore = create<CanvasStore>()(
  devtools(
    (set) => ({
      components: [],
      hasInitialized: false,

      shift: { x: 0, y: 0 },
      setShift: (x, y) => set({ shift: { x, y } }),

      scale: 0,
      setScale: (value) => set({ scale: value }),

      addComponent: (component = {}) =>
        set((state) => {
          const index = state.components.length + 1
          return {
            components: [
              ...state.components,
              {
                id: uuidv4(),
                name: `Component${index}.jsx`,
                position: { x: 0, y: 0 },
                blocks: [],
                ...component,
              },
            ],
          }
        }),

      updateComponent: (id, component) =>
        set((state) => ({
          components: state.components.map((c) =>
            c.id === id ? { ...c, ...component } : c
          ),
        })),

      removeComponent: (id) =>
        set((state) => ({
          components: state.components.filter((c) => c.id !== id),
        })),

      resetCanvas: () => set({ components: [], hasInitialized: false }),

      setInitialized: () => set({ hasInitialized: true }),
    }),
    { name: '🧠 CanvasStore' } // 👈 имя стора в Redux DevTools
  )
)
