import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ANGULAR_IMPORTS } from '../../ui/angular-imports';
import { PRIMENG_IMPORTS } from '../../ui/primeng-imports';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';

interface BreadcrumbItem {
  label: string;
  path: string;
  isLast: boolean;
}

@Component({
  standalone: true,
  selector: 'app-bread-crumb',
  imports: [...ANGULAR_IMPORTS, ...PRIMENG_IMPORTS, RouterLink],
  templateUrl: './bread-crumb.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './bread-crumb.scss',
})
export class BreadCrumb {
  breadcrumbs: BreadcrumbItem[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.build(this.router.url);

    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e: any) => this.build(e.urlAfterRedirects));
  }

  private build(url: string) {
    const segments = url.split('/').filter(Boolean);

    this.breadcrumbs = segments.map((segment, index) => ({
      label: this.format(segment),
      path: '/' + segments.slice(0, index + 1).join('/'),
      isLast: index === segments.length - 1,
    }));
  }

  private format(value: string): string {
    return value
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
