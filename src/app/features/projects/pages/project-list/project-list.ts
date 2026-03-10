import { Component } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { ProjectModel } from '../../models/project.model';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';

@Component({
  standalone: true,
  selector: 'app-project-list',
  imports: [CommonModule, TableModule],
  templateUrl: './project-list.html',
  styleUrl: './project-list.scss',
})
export class ProjectList {
  projects: ProjectModel[] = [];

  constructor(private projectService: ProjectService) {}

  ngOnInit() {
    this.projectService.projects$.subscribe((data) => {
      this.projects = data;
    });
  }
}
