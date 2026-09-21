import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-list',
  imports: [DatePipe, TableModule, ButtonModule],
  templateUrl: './project-list.html',
  styleUrl: './project-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectList {
  protected readonly projects = inject(ProjectService).projects;
}
