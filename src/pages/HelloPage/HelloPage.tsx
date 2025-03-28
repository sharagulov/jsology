import { Button } from '@ui/Button/Button'
import styles from './HelloPage.module.scss'
import { PageTransition } from '../../components/PageTransition'
import { useNavigate } from 'react-router-dom'

function HelloPage() {

  const navigate = useNavigate()

  return (
    <PageTransition>
      <main className={styles.main}>
        <section className={styles.hello}>
          <h3>
            <span className={styles.unbold}>Every async decision.</span> Visualized.
          </h3>
          <Button type="click" onClick={() => navigate('/canvas')} icon="arrow">
            Try out
          </Button>
        </section>
      </main>
    </PageTransition>
  )
}

export default HelloPage
