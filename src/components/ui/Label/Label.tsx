import { LabelProps } from './Label.types'
import styles from './Label.module.scss'

export function Label(props: LabelProps) {
  
  if (!props.children) return null
  const children = Array.isArray(props.children) ? props.children : [props.children]

  if (typeof props.children === 'string') {
    return (
      <div className={`${styles.single} ${styles[props.variant]}`}>
        {props.variant === 'big' ? (<h2>{children}</h2>) : (<span>{children}</span>)}
      </div>
    )
  } else {
    return (
      <div className={styles.single}>
        <h2>{children[0]}</h2>
      </div>
    )
  }
}
