import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStoryModal } from './add-story-modal';

describe('AddStoryModal', () => {
  let component: AddStoryModal;
  let fixture: ComponentFixture<AddStoryModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddStoryModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddStoryModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
