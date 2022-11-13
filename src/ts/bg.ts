// in progress
import { fromEvent } from 'rxjs'

import {
  map
} from 'rxjs/operators'

import {
  canvas,
  ctx
} from './canvas'

const bg = document.getElementById('bg')!
const input$ = fromEvent(bg, 'input')
  .pipe(
    map(e => {
      console.log((e.target as HTMLInputElement).value)
    })
    ).subscribe(v => {console.log(v)})