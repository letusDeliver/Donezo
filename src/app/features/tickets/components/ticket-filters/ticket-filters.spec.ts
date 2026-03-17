import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketFilters } from './ticket-filters';

describe('TicketFilters', () => {
  let component: TicketFilters;
  let fixture: ComponentFixture<TicketFilters>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketFilters]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketFilters);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
