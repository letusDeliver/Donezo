import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { Sidebar } from './layout/sidebar/sidebar';
import { Header } from './layout/header/header';
import { ScrollService } from './core/services/scroll.service';
import { Viewport } from './core/services/viewport.service';

const COLLAPSE_KEY = 'sidebarCollapsed';
const SWIPE_THRESHOLD = 70;

function readCollapsed(): boolean {
  try {
    return localStorage.getItem(COLLAPSE_KEY) === 'true';
  } catch {
    return false;
  }
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar, Header],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  private readonly router = inject(Router);
  private readonly scrollService = inject(ScrollService);

  protected readonly isMobile = inject(Viewport).isMobile;

  protected readonly sidebarOpen = signal(false);
  private readonly collapsePreference = signal(readCollapsed());
  protected readonly isHovering = signal(false);

  /** Collapse is a desktop-only concept. */
  protected readonly sidebarCollapsed = computed(() => !this.isMobile() && this.collapsePreference());
  protected readonly sidebarIconOnly = computed(() => this.sidebarCollapsed() && !this.isHovering());

  private touchStartX = 0;

  constructor() {
    // Persist the desktop collapse preference.
    effect(() => {
      const value = this.collapsePreference();
      try {
        localStorage.setItem(COLLAPSE_KEY, String(value));
      } catch {
        /* storage unavailable */
      }
    });

    // Close the mobile drawer after navigation.
    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.sidebarOpen.set(false));
  }

  protected toggleSidebar() {
    if (this.isMobile()) this.sidebarOpen.update((open) => !open);
  }

  protected toggleCollapse() {
    if (!this.isMobile()) this.collapsePreference.update((c) => !c);
  }

  protected closeSidebar() {
    this.sidebarOpen.set(false);
  }

  protected onSidebarHover(state: boolean) {
    this.isHovering.set(state && this.sidebarCollapsed());
  }

  protected onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  protected onTouchEnd(event: TouchEvent) {
    if (!this.isMobile()) return;

    const diff = event.changedTouches[0].screenX - this.touchStartX;
    if (diff > SWIPE_THRESHOLD) this.sidebarOpen.set(true);
    if (diff < -SWIPE_THRESHOLD) this.sidebarOpen.set(false);
  }

  protected onMainScroll(event: Event) {
    const el = event.target as HTMLElement;

    this.scrollService.scroll$.next({
      scrollTop: el.scrollTop,
      clientHeight: el.clientHeight,
      scrollHeight: el.scrollHeight,
    });
  }
}
