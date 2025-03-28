import { useUnsavedGuard } from '@hooks/useUnsavedGuard'
import styles from './CanvasPage.module.scss'
import { PageTransition } from '../../components/PageTransition'
import { Button } from '@ui/Button/Button'
import { useOnboarding } from '@hooks/useOnboarding'
import { Hints } from '@ui/hints/Hints'

function CanvasPage() {
  const hasUnsavedChanges = true
  useUnsavedGuard(hasUnsavedChanges)

  const isOnboarding = useOnboarding()

  return (
    <PageTransition>
      <main className={styles.main}>
        {isOnboarding && (
          <section className={styles.absolute}>
            <div className={styles.skip}>
              <Button type="click" onClick={() => {}}>
                Skip tutorial
              </Button>
            </div>
            <div className={styles.hints}>
              <Hints />
            </div>
          </section>
        )}
      </main>
    </PageTransition>
  )
}

export default CanvasPage
