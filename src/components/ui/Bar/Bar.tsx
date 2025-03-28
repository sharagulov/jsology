import { Button } from '@ui/Button/Button'
import styles from './Bar.module.scss'
import { BarProps } from './Bar.types'

export function Bar(props: BarProps) {
  const { type = 'header', separator } = props

  if (type === 'header') {
    return (
      <div className={styles.bar}>
        <Button type="click" icon="down" variant="ghost" onClick={() => alert('click')}>
          Canvases
        </Button>
        {separator && <div className={styles.separator} />}
        <Button type="click" icon="down" variant="ghost" onClick={() => alert('click')}>
          Watcher
        </Button>
        {separator && <div className={styles.separator} />}
        <Button type="click" variant="ghost" onClick={() => alert('click')}>
          About
        </Button>
      </div>
    )
  }
}
