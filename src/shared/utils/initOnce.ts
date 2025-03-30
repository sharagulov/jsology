import { getViewportCenter } from '@utils/getViewportCenter'
import { useCanvasStore } from '@stores/useCanvasStore'

let _alreadyInitialized = false

export function initCanvasOnce() {
  const { hasInitialized } = useCanvasStore.getState()
  if (_alreadyInitialized || hasInitialized) return

  const center = getViewportCenter({ x: 0, y: 0 })

  useCanvasStore.getState().addComponent({ position: center })
  useCanvasStore.getState().setInitialized()

  _alreadyInitialized = true
}
