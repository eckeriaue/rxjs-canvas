const canvas = document.getElementById('c') as HTMLCanvasElement 
const ctx = canvas?.getContext('2d') as CanvasRenderingContext2D
const rect = canvas?.getBoundingClientRect() as DOMRect

const scale: number = window.devicePixelRatio

canvas.width = rect.width * scale
canvas.height = rect.height * scale
ctx.scale(scale, scale)


export {
  canvas,
  ctx,
}