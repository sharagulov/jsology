import styles from './CanvasViewport.module.scss'
import { useState, useRef, useEffect } from 'react'

type CanvasViewportProps = {
  children: React.ReactNode
}

export function CanvasViewport({ children }: CanvasViewportProps) {
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const dragging = useRef(false)
  const origin = useRef({ x: 0, y: 0 })

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
    setOffset({
      x: e.clientX - origin.current.x,
      y: e.clientY - origin.current.y,
    })
  }

  const onMouseUp = () => {
    dragging.current = false
  }

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [])

  return (
    <div className={styles.viewport}>
      <div
        className={styles.world}
        onMouseDown={onMouseDown}
        style={{
          transform: `translate(${offset.x}px, ${offset.y}px)`,
        }}
      >
        {children}
      </div>
    </div>
  )
}
