import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStoryAi } from './create-story-ai';

describe('CreateStoryAi', () => {
  let component: CreateStoryAi;
  let fixture: ComponentFixture<CreateStoryAi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateStoryAi]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateStoryAi);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
