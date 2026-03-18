import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserStories } from './user-stories';

describe('UserStories', () => {
  let component: UserStories;
  let fixture: ComponentFixture<UserStories>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserStories]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserStories);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
