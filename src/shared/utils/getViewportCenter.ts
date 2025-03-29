export function getViewportCenter(offset: {x: number; y: number}) {
  return {
    x: window.innerWidth / 2 - offset.x,
    y: window.innerHeight / 2 - offset.y,
  }
}