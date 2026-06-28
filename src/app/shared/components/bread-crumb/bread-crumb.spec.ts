import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadCrumb } from './bread-crumb';

describe('BreadCrumb', () => {
  let component: BreadCrumb;
  let fixture: ComponentFixture<BreadCrumb>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreadCrumb]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreadCrumb);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
