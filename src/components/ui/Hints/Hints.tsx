import styles from './Hints.module.scss'

export function Hints() {
  return (
    <section className={styles.hint}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <strong>New Thread</strong>
          <strong>1/5</strong>
        </div>
        <span>To create a new Thread click RMB on Component1.jsx and choose one of the suggested items</span>
      </div>
    </section>
  )
}