import { fromEvent } from "rxjs"
import { map, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators'
import { ajax } from 'rxjs/ajax'
import type { Observable } from "rxjs/internal/Observable"

const api: string = 'http://github.com/search/users?q='

const search: HTMLElement = document.getElementById('search')
const stream$: Observable<Event> = fromEvent(search, 'input')
  .pipe(
    map( (e: any) => e.target.value ),
    debounceTime(1000),
    distinctUntilChanged(),
    switchMap(v => ajax.getJSON(api + v))
  )

stream$.subscribe(value => {
  console.log(value)
})