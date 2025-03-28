import { useState } from 'react'
import styles from './Button.module.scss'
import type { ButtonProps } from './Button.types.ts'

export function Button(props: ButtonProps) {
  const { children, variant = 'default', disabled = false, icon } = props

  const [openMenu, setOpenMenu] = useState(false)

  if (props.type === 'click') {
    return (
      <div className={styles.clickWrapper}>
        <button
          className={`${styles.button} ${styles[variant]}`}
          disabled={disabled}
          onClick={props.onClick}
        >
          {children}
          {icon && <img className={styles.icon} src={`icons/button/button-icon-${icon}.svg`} alt="icon" />}
        </button>
      </div>
    )
  }

  if (props.type === 'menu') {
    return (
      <div
        className={styles.menuWrapper}
        onMouseEnter={() => setOpenMenu(true)}
        onMouseLeave={() => setOpenMenu(false)}
      >
        <button className={`${styles.button} ${styles[variant]}`} disabled={disabled}>
          {children}
          {icon && <img src={`button-icon-${icon}`} alt="icon" />}
        </button>
        {openMenu && <div className={styles.dropdown}></div>}
      </div>
    )
  }
}
