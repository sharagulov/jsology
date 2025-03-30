import styles from './CanvasViewport.module.scss'
import { useState, useRef, useEffect } from 'react'
import { useInnerDragState } from '@stores/useInnerDragState'
import { useCanvasStore } from '@stores/useCanvasStore'
import { useDebounceEffect } from '@hooks/useDebounce'

type CanvasViewportProps = {
  children: React.ReactNode
}

export function CanvasViewport({ children }: CanvasViewportProps) {
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const dragging = useRef(false)
  const origin = useRef({ x: 0, y: 0 })
  const [scale, setScale] = useState(1)

  const setStoreShift = useCanvasStore((s) => s.setShift)
  const setStoreScale = useCanvasStore((s) => s.setScale)
  const storeShift = useCanvasStore.getState().shift

  const onMouseDown = (e: React.MouseEvent) => {
    dragging.current = true
    origin.current = {
      // определить смещение мыши от левого верхнего угла компонента
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    }
  }

  const onMouseMove = (e: MouseEvent) => {
    if (!dragging.current) return
    const isDraggingComponent = useInnerDragState.getState().isInnerDragging
    if (isDraggingComponent) return
    setOffset({
      x: e.clientX - origin.current.x,
      y: e.clientY - origin.current.y,
    })
  }

  const onMouseUp = () => {
    dragging.current = false
  }

  const onWheel = (e: React.WheelEvent) => {
    const zoomFactor = 0.1
    const newScale = e.deltaY < 0 ? scale + zoomFactor : scale - zoomFactor

    // Ограничения масштаба (например, от 0.5x до 3x)
    const clamped = Math.min(Math.max(newScale, 0.5), 3)

    setScale(clamped)
  }

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [])

  useDebounceEffect(
    () => {
      setStoreScale(scale)
    },
    [scale],
    100
  )

  useDebounceEffect(
    () => {
      setStoreShift(offset.x, offset.y)
    },
    [offset],
    100
  )

  return (
    <div
      className={styles.viewport}
      style={{ backgroundPosition: `${offset.x}px ${offset.y}px` }}
      onMouseDown={onMouseDown}
      onWheel={onWheel}
    >
      <div
        className={styles.world}
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
          transformOrigin: 'top left',
        }}
      >
        {children}
      </div>
    </div>
  )
}
