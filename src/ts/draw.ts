
import { fromEvent, Observable } from 'rxjs'

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
} from './canvas'

import {
  lineWidth$,
  strokeStyle$
} from './input'



type Coord = Array<{
  x: number
  y: number
  options?: {
      lineWidth: string
      strokeStyle: string
  }
}>

type Option = {
  lineWidth: string
  strokeStyle: string
}

namespace Stream {
  const mouseMove$ = fromEvent(canvas, 'mousemove') as Observable<Event>
  const mouseDown$ = fromEvent(canvas, 'mousedown') as Observable<Event>
  const mouseUp$ = fromEvent(canvas, 'mouseup') as Observable<Event>
  const mouseOut$ = fromEvent(canvas, 'mouseout') as Observable<Event>
  export const draw$ = mouseDown$
    .pipe(
      withLatestFrom(lineWidth$, strokeStyle$,(_, lineWidth: string, strokeStyle: string) => {
        return { lineWidth, strokeStyle }
      }),
      switchMap((options: Option) => {
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