import { useUnsavedGuard } from '@hooks/useUnsavedGuard'
import styles from './CanvasPage.module.scss'
import { PageTransition } from '../../components/PageTransition'
import { Button } from '@ui/Button/Button'
import { useOnboarding } from '@hooks/useOnboarding'
import { Hints } from '@ui/hints/Hints'
import { Component } from '@ui/Component/Component'
import { CanvasViewport } from '@components/canvas/CanvasViewport'
import { getViewportCenter } from '@utils/getViewportCenter'
import { useCanvasStore } from '@stores/useCanvasStore'
import { useEffect } from 'react'
import { initCanvasOnce } from '@utils/initOnce'

function CanvasPage() {
  const hasUnsavedChanges = true
  useUnsavedGuard(hasUnsavedChanges)

  const isOnboarding = useOnboarding()

  const components = useCanvasStore((s) => s.components)

  useEffect(() => {
    initCanvasOnce()
  }, [])

  return (
    <PageTransition>
      <main className={styles.main}>
        <CanvasViewport>
          {components.map((c) => (
            <Component key={c.id} {...c} />
          ))}
        </CanvasViewport>
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
