import { fromEvent } from 'rxjs'

import {
  map,
  pairwise,
  switchMap,
  takeUntil,
  withLatestFrom,
} from 'rxjs/operators'

import {
  canvas,
  ctx,
  rect,
  scale
} from './ts/canvas'

import {
  lineWidth$,
  strokeStyle$
} from './ts/input'

canvas.width = rect.width * scale
canvas.height = rect.height * scale
ctx.scale(scale, scale)


type Coord = Array<{
  x: number
  y: number
  options?: {
      lineWidth: string,
      strokeStyle: string
  }
}>
const mouseMove$ = fromEvent(canvas, 'mousemove')
const mouseDown$ = fromEvent(canvas, 'mousedown')
const mouseUp$ = fromEvent(canvas, 'mouseup')
const mouseOut$ = fromEvent(canvas, 'mouseout')

const stream$ = mouseDown$
  .pipe(
    withLatestFrom(lineWidth$, strokeStyle$,(_, lineWidth, strokeStyle) => {
      return { lineWidth, strokeStyle }
    }),
    switchMap((options) => {
      return mouseMove$
      .pipe(
        map((e: MouseEvent) => ({
          x: e.offsetX,
          y: e.offsetY,
          options
        })),
        pairwise(),
        takeUntil(mouseUp$),
        takeUntil(mouseOut$)
      )
    })
  )


  stream$.subscribe(([from, to]: Coord) => {
    const {lineWidth, strokeStyle} = from.options
    ctx.lineWidth = Number(lineWidth)
    ctx.strokeStyle = strokeStyle
    ctx.beginPath()
    ctx.moveTo(from.x, from.y)
    ctx.lineTo(to.x, to.y)
    ctx.stroke()
  })