import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function useUnsavedGuard(when: boolean, message = 'You have unsaved changes. Leave anyway?') {
  const navigate = useNavigate()

  // Навигация по сайту
  useEffect(() => {
    if (!when) return

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = ''
    }

    const handleBeforeRoute = () => {
      const confirmed = window.confirm(message)
      if (!confirmed) {
        navigate(1)
      } else {
        navigate('/')
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    window.addEventListener('popstate', handleBeforeRoute)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      window.removeEventListener('popstate', handleBeforeRoute)
    }
  }, [when, message, navigate])
}
