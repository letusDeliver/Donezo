import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketCard } from './ticket-card';

describe('TicketCard', () => {
  let component: TicketCard;
  let fixture: ComponentFixture<TicketCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketCard);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('ticket', {
      id: 'TASK-1',
      title: 'Sample',
      status: 'todo',
      priority: 'low',
      assignee: 'K',
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
