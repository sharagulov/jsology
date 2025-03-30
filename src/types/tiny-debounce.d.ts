declare module 'tiny-debounce' {
  export default function debounce<T extends (...args: any[]) => void>(
    fn: T,
    wait?: number
  ): T
}
