import { Injectable, signal } from '@angular/core';
import { ProjectModel } from '../models/project.model';

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private readonly _projects = signal<ProjectModel[]>([
    {
      id: '1',
      name: 'Website Redesign',
      description: 'Revamp company website',
      status: 'active',
      createdAt: new Date(),
    },
    {
      id: '2',
      name: 'Mobile App',
      description: 'Build mobile application',
      status: 'active',
      createdAt: new Date(),
    },
  ]);

  readonly projects = this._projects.asReadonly();
}
