const canvas = document.getElementById('c') as HTMLCanvasElement 
const ctx: CanvasRenderingContext2D = canvas?.getContext('2d')
const rect: DOMRect = canvas?.getBoundingClientRect()
const scale: number = window.devicePixelRatio

export {
  canvas,
  ctx,
  rect,
  scale
}