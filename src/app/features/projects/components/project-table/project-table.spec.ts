import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTable } from './project-table';

describe('ProjectTable', () => {
  let component: ProjectTable;
  let fixture: ComponentFixture<ProjectTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
