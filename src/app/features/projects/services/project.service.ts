import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProjectModel } from '../models/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private projectsSubject = new BehaviorSubject<ProjectModel[]>([
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

  projects$ = this.projectsSubject.asObservable();
}
