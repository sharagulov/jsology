import styles from './Component.module.scss'

type ComponentProps = {
  position: { x: number; y: number }
  name: string
  id: string
  blocks: any[] // пока что any
}

export function Component({ position }: ComponentProps) {
  return (
    <section
      className={styles.component}
      style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
    >
      <div className={styles.screen}>{position.x}, {position.y}</div>
    </section>
  )
}
