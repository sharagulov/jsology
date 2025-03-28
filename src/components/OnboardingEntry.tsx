import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'

export function OnboardingEntry() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const devMode = import.meta.env.DEV
    const forceReset = searchParams.get('forceReset') === 'true'

    if (devMode || forceReset) {
      const newId = uuidv4().slice(0, 8)
      navigate(`/canvas/${newId}`)
    } else {
      const savedId = localStorage.getItem('onboardingCanvasId')
      if (savedId) {
        navigate(`/canvas/${savedId}`)
      } else {
        const newId = uuidv4().slice(0, 8)
        localStorage.setItem('onboardingCanvasId', newId)
        navigate(`/canvas/${newId}`)
      }
    }
  }, [])

  return null
}
