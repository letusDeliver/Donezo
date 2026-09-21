import { Injectable, signal } from '@angular/core';

const MOBILE_QUERY = '(max-width: 768px)';

@Injectable({ providedIn: 'root' })
export class Viewport {
  private readonly mql = window.matchMedia(MOBILE_QUERY);
  private readonly _isMobile = signal(this.mql.matches);

  readonly isMobile = this._isMobile.asReadonly();

  constructor() {
    this.mql.addEventListener('change', (e) => this._isMobile.set(e.matches));
  }
}
