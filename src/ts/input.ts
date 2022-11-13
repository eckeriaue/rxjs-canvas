import { fromEvent } from 'rxjs'

import {
  map,
  startWith
} from 'rxjs/operators'

const range = document.getElementById('range') as HTMLInputElement
const color = document.getElementById('color') as HTMLInputElement

const createInputSream = (node: HTMLInputElement) => {
  return fromEvent(node, 'input')
  .pipe(
    map((e) => (e.target as HTMLInputElement).value),
    startWith(node.value)
  )
}

const lineWidth$ = createInputSream(range)
const strokeStyle$ = createInputSream(color)

export {
  lineWidth$,
  strokeStyle$,
}