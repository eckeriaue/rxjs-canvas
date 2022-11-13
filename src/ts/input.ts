import { fromEvent } from 'rxjs'
import {
  map,
  startWith
} from 'rxjs/operators'
const range = document.getElementById('range') as HTMLInputElement
const color = document.getElementById('color') as HTMLInputElement

const lineWidth$ = fromEvent(range, 'input')
  .pipe(
    map((e) => (e.target as HTMLInputElement).value),
    startWith(range.value)
  )

export {
  lineWidth$
}