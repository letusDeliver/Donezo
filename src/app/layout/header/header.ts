import { Component, EventEmitter, Input, Output, HostListener, ChangeDetectionStrategy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { PRIMENG_IMPORTS } from '../../shared/ui/primeng-imports';
import { ANGULAR_IMPORTS } from '../../shared/ui/angular-imports';
import { BreadCrumb } from '../../shared/components/bread-crumb/bread-crumb';

@Component({
  selector: 'app-header',
  imports: [...ANGULAR_IMPORTS, ...PRIMENG_IMPORTS, BreadCrumb],
  templateUrl: './header.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './header.scss',
})
export class Header {
  @Output() toggleSidebar = new EventEmitter<void>();
  @Output() toggleCollapse = new EventEmitter<void>();

  @Input() collapsed: boolean = false;

  module: string = '';
  subModule: string = '';

  isMobile = false;

  constructor(private router: Router) {
    this.checkScreen();
  }

  @HostListener('window:resize')
  checkScreen() {
    this.isMobile = window.innerWidth <= 768;
  }

  ngOnInit(): void {
    this.updateHeader(this.router.url);

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.updateHeader(event.urlAfterRedirects);
      });
  }

  onMenuClick() {
    if (this.isMobile) {
      this.toggleSidebar.emit();
    } else {
      this.toggleCollapse.emit();
    }
  }

  private updateHeader(url: string) {
    const segments = url.split('/').filter(Boolean);

    this.module = this.format(segments[0] || 'Dashboard');
    this.subModule = segments[1] ? this.format(segments[1]) : '';
  }

  private format(value: string): string {
    return value
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
