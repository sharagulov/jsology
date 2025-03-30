import {debounce} from 'lodash'
import { useEffect } from 'react'

export function useDebounceEffect(effect: () => void, deps: any[], delay: number) {
  useEffect(() => {
    const handler = debounce(effect, delay)
    handler()
    return () => {
      handler.cancel()
    }
  }, deps)
}