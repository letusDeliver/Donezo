import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ScrollService {
  scroll$ = new Subject<{
    scrollTop: number;
    clientHeight: number;
    scrollHeight: number;
  }>();
}
