import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouteState } from '../../../core/services/route-state.service';
import { titleCase } from '../../../core/utils/format';

interface BreadcrumbItem {
  label: string;
  path: string;
  isLast: boolean;
}

@Component({
  selector: 'app-bread-crumb',
  imports: [RouterLink],
  templateUrl: './bread-crumb.html',
  styleUrl: './bread-crumb.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadCrumb {
  private readonly routeState = inject(RouteState);

  protected readonly breadcrumbs = computed<BreadcrumbItem[]>(() => {
    const segments = this.routeState.url().split('?')[0].split('/').filter(Boolean);

    return segments.map((segment, index) => ({
      label: titleCase(segment),
      path: '/' + segments.slice(0, index + 1).join('/'),
      isLast: index === segments.length - 1,
    }));
  });
}
