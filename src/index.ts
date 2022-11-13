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
  ctx
} from './ts/canvas'

import {
  lineWidth$,
  strokeStyle$
} from './ts/input'

import './ts/clear'
 
type Coord = Array<{
  x: number
  y: number
  options?: {
      lineWidth: string
      strokeStyle: string
  }
}>

namespace Stream {
  const mouseMove$ = fromEvent(canvas, 'mousemove')
  const mouseDown$ = fromEvent(canvas, 'mousedown')
  const mouseUp$ = fromEvent(canvas, 'mouseup')
  const mouseOut$ = fromEvent(canvas, 'mouseout')
  export const draw$ = mouseDown$
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
}

Stream.draw$.subscribe(([from, to]: Coord) => {
  const {lineWidth, strokeStyle} = from.options
  ctx.lineWidth = Number(lineWidth)
  ctx.strokeStyle = strokeStyle
  ctx.beginPath()
  ctx.moveTo(from.x, from.y)
  ctx.lineTo(to.x, to.y)
  ctx.stroke()
})
