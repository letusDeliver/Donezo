import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface ScrollPosition {
  scrollTop: number;
  clientHeight: number;
  scrollHeight: number;
}

/** Broadcasts the main content area's scroll position (event stream → RxJS). */
@Injectable({ providedIn: 'root' })
export class ScrollService {
  readonly scroll$ = new Subject<ScrollPosition>();
}
