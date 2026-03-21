import { Component, signal, HostListener } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { Sidebar } from './layout/sidebar/sidebar';
import { Header } from './layout/header/header';
import { ANGULAR_IMPORTS } from './shared/ui/angular-imports';
import { PRIMENG_IMPORTS } from './shared/ui/primeng-imports';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ScrollService } from './core/services/scroll.service';
import { filter } from 'rxjs/operators';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [...ANGULAR_IMPORTS, ...PRIMENG_IMPORTS, RouterOutlet, Sidebar, Header],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('jira-clone');

  sidebarOpen = false;
  sidebarCollapsed = false;

  isMobile = false;
  isHovering = false;

  private touchStartX = 0;
  private touchEndX = 0;

  constructor(
    private router: Router,
    private scrollService: ScrollService,
  ) {
    this.checkScreen();

    // restore collapse ONLY for desktop
    const saved = localStorage.getItem('sidebarCollapsed');
    if (saved && !this.isMobile) {
      this.sidebarCollapsed = JSON.parse(saved);
    }

    // auto close on route change (mobile)
    this.router.events
      .pipe(
        takeUntilDestroyed(),
        filter((e) => e instanceof NavigationEnd),
      )
      .subscribe(() => {
        if (this.isMobile) {
          this.sidebarOpen = false;
        }
      });
  }

  @HostListener('window:resize')
  checkScreen() {
    this.isMobile = window.innerWidth <= 768;

    // IMPORTANT FIX: mobile me collapse disable
    if (this.isMobile) {
      this.sidebarCollapsed = false;
      this.isHovering = false;
    }
  }

  // Header actions
  toggleSidebar() {
    if (this.isMobile) {
      this.sidebarOpen = !this.sidebarOpen;
    }
  }

  toggleCollapse() {
    if (!this.isMobile) {
      this.sidebarCollapsed = !this.sidebarCollapsed;

      localStorage.setItem('sidebarCollapsed', JSON.stringify(this.sidebarCollapsed));
    }
  }

  closeSidebar() {
    this.sidebarOpen = false;
  }

  // Hover expand (desktop only)
  onSidebarHover(state: boolean) {
    if (!this.isMobile && this.sidebarCollapsed) {
      this.isHovering = state;
    } else {
      this.isHovering = false;
    }
  }

  // Swipe gesture
  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.changedTouches[0].screenX;
  }

  onTouchEnd(event: TouchEvent) {
    this.touchEndX = event.changedTouches[0].screenX;
    this.handleSwipe();
  }

  private handleSwipe() {
    const diff = this.touchEndX - this.touchStartX;

    if (diff > 70 && this.isMobile) {
      this.sidebarOpen = true;
    }

    if (diff < -70 && this.isMobile) {
      this.sidebarOpen = false;
    }
  }

  onMainScroll(event: Event) {
    const el = event.target as HTMLElement;

    this.scrollService.scroll$.next({
      scrollTop: el.scrollTop,
      clientHeight: el.clientHeight,
      scrollHeight: el.scrollHeight,
    });
  }
}
