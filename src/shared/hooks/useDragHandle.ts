import { useRef, useEffect, useCallback, useState } from 'react'
import { useInnerDragState } from '@stores/useInnerDragState'

type UseDragHandleOptions = {
  scale?: number
}

export function useDragHandle({ scale = 1 }: UseDragHandleOptions = {}) {
  const dragging = useRef(false)
  const lastPos = useRef({ x: 0, y: 0 })
  const setInnerDragging = useInnerDragState((s) => s.setInnerDragging)

  const [offset, setOffset] = useState({ x: 0, y: 0 })

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    dragging.current = true
    lastPos.current = { x: e.clientX, y: e.clientY }
    setInnerDragging(true)
    e.preventDefault()
  }, [setInnerDragging])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragging.current) return

      const delta = {
        x: (e.clientX - lastPos.current.x) / scale,
        y: (e.clientY - lastPos.current.y) / scale,
      }

      lastPos.current = { x: e.clientX, y: e.clientY }

      setOffset((prev) => ({
        x: prev.x + delta.x,
        y: prev.y + delta.y,
      }))
    }

    const handleMouseUp = () => {
      dragging.current = false
      setInnerDragging(false)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [scale, setInnerDragging])

  return {
    handleMouseDown,
    dragOffset: offset,
  }
}
