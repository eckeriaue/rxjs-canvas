import { fromEvent } from 'rxjs'
import { ctx, canvas } from './canvas'

const clearBtn: HTMLElement = document.getElementById('clear')
/* const clear$ = */
fromEvent(clearBtn, 'click').subscribe(() => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
})