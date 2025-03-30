import { useLocation } from 'react-router-dom'

export function useOnboarding() {
  const { pathname } = useLocation()
  return pathname.startsWith('/canvas') && !localStorage.getItem('onboardingCompleted')
}
