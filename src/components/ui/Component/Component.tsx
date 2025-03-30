import { useLayoutEffect, useRef, useState } from 'react'
import styles from './Component.module.scss'
import { Label } from '@ui/Label/Label'
import { Button } from '@ui/Button/Button'
import { useDragHandle } from '@hooks/useDragHandle'
import { useCanvasStore } from '@stores/useCanvasStore'

type ComponentProps = {
  position: { x: number; y: number }
  name: string
  id: string
  blocks: any[]
}

export function Component({ position, name }: ComponentProps) {
  const ref = useRef<HTMLElement>(null)
  const [offset, setOffset] = useState<{ x: number; y: number } | null>(null)

  const scale = useCanvasStore((s) => s.scale)
  const { handleMouseDown, dragOffset } = useDragHandle({ scale })

  useLayoutEffect(() => {
    if (ref.current) {
      const el = ref.current
      setOffset({
        x: el.offsetWidth / 2,
        y: el.offsetHeight / 2,
      })
    }
  }, [])

  const numericOffset = offset
    ? {
        x: position.x - offset.x + dragOffset.x,
        y: position.y - offset.y + dragOffset.y,
      }
    : undefined

  const style = numericOffset
    ? { transform: `translate(${numericOffset.x}px, ${numericOffset.y}px)` }
    : undefined

  return (
    <section ref={ref} className={styles.component} style={style}>
      <Label variant="default">{name}</Label>
      <div className={styles.screen}></div>
      <div className={styles.bottom}>
        <div onMouseDown={handleMouseDown} className={styles.buttonWrapper}>
          <Button type="click" variant="square" icon="drag" onClick={() => {}} />
        </div>
      </div>
    </section>
  )
}
