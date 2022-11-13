import { fromEvent } from 'rxjs'
import { ctx, canvas } from './canvas'

namespace Stream {
  const clearBtn: HTMLElement = document.getElementById('clear')
  export const clear$ = fromEvent(clearBtn, 'click')
}

Stream.clear$.subscribe(() => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
})

