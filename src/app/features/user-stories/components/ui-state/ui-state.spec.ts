import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiState } from './ui-state';

describe('UiState', () => {
  let component: UiState;
  let fixture: ComponentFixture<UiState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiState]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiState);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
