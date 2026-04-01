import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Ticket } from '../models/ticket.model';

@Injectable({ providedIn: 'root' })
export class TicketService {
  mockTickets: Ticket[] = [
    // BACKLOG
    {
      id: 'BUG-101',
      title: 'Investigate login issue',
      status: 'backlog',
      priority: 'high',
      assignee: 'K',
    },
    {
      id: 'TASK-102',
      title: 'Design system planning',
      status: 'backlog',
      priority: 'medium',
      assignee: 'R',
    },
    {
      id: 'TASK-102',
      title: 'Design system planning',
      status: 'backlog',
      priority: 'low',
      assignee: 'R',
    },
    {
      id: 'TASK-102',
      title: 'Design system planning',
      status: 'backlog',
      priority: 'high',
      assignee: 'R',
    },
    {
      id: 'TASK-102',
      title: 'Design system planning',
      status: 'backlog',
      priority: 'medium',
      assignee: 'D',
    },
    {
      id: 'TASK-102',
      title: 'Design system planning',
      status: 'backlog',
      priority: 'low',
      assignee: 'K',
    },
    {
      id: 'TASK-102',
      title: 'Design system planning',
      status: 'backlog',
      priority: 'low',
      assignee: 'K',
    },
    {
      id: 'TASK-102',
      title: 'Design system planning',
      status: 'backlog',
      priority: 'low',
      assignee: 'K',
    },

    // TODO
    { id: 'BUG-103', title: 'Fix login bug', status: 'todo', priority: 'high', assignee: 'K' },
    {
      id: 'TASK-104',
      title: 'Setup auth module',
      status: 'todo',
      priority: 'medium',
      assignee: 'A',
    },
    {
      id: 'TASK-104',
      title: 'Setup auth module',
      status: 'todo',
      priority: 'medium',
      assignee: 'A',
    },
    {
      id: 'TASK-104',
      title: 'Setup auth module',
      status: 'todo',
      priority: 'medium',
      assignee: 'A',
    },
    {
      id: 'TASK-104',
      title: 'Setup auth module',
      status: 'todo',
      priority: 'medium',
      assignee: 'A',
    },
    {
      id: 'TASK-104',
      title: 'Setup auth module',
      status: 'todo',
      priority: 'medium',
      assignee: 'A',
    },
    {
      id: 'TASK-104',
      title: 'Setup auth module',
      status: 'todo',
      priority: 'medium',
      assignee: 'A',
    },
    {
      id: 'TASK-104',
      title: 'Setup auth module',
      status: 'todo',
      priority: 'medium',
      assignee: 'A',
    },
    {
      id: 'TASK-104',
      title: 'Setup auth module',
      status: 'todo',
      priority: 'medium',
      assignee: 'A',
    },
    {
      id: 'TASK-104',
      title: 'Setup auth module',
      status: 'todo',
      priority: 'medium',
      assignee: 'A',
    },

    // IN PROGRESS
    {
      id: 'TASK-105',
      title: 'Create dashboard UI',
      status: 'inprogress',
      priority: 'medium',
      assignee: 'R',
    },
    {
      id: 'BUG-106',
      title: 'Handle API errors',
      status: 'inprogress',
      priority: 'high',
      assignee: 'A',
    },
    {
      id: 'BUG-106',
      title: 'Handle API errors',
      status: 'inprogress',
      priority: 'high',
      assignee: 'A',
    },
    {
      id: 'BUG-106',
      title: 'Handle API errors',
      status: 'inprogress',
      priority: 'high',
      assignee: 'A',
    },
    {
      id: 'BUG-106',
      title: 'Handle API errors',
      status: 'inprogress',
      priority: 'high',
      assignee: 'A',
    },
    {
      id: 'BUG-106',
      title: 'Handle API errors',
      status: 'inprogress',
      priority: 'high',
      assignee: 'A',
    },
    {
      id: 'BUG-106',
      title: 'Handle API errors',
      status: 'inprogress',
      priority: 'high',
      assignee: 'A',
    },
    {
      id: 'BUG-106',
      title: 'Handle API errors',
      status: 'inprogress',
      priority: 'high',
      assignee: 'A',
    },
    {
      id: 'TASK-107',
      title: 'Sidebar responsiveness',
      status: 'inprogress',
      priority: 'low',
      assignee: 'K',
    },

    // REVIEW
    {
      id: 'BUG-108',
      title: 'Fix routing issue',
      status: 'review',
      priority: 'high',
      assignee: 'R',
    },
    {
      id: 'BUG-108',
      title: 'Fix routing issue',
      status: 'review',
      priority: 'high',
      assignee: 'R',
    },
    {
      id: 'BUG-108',
      title: 'Fix routing issue',
      status: 'review',
      priority: 'high',
      assignee: 'R',
    },
    {
      id: 'BUG-108',
      title: 'Fix routing issue',
      status: 'review',
      priority: 'high',
      assignee: 'R',
    },
    {
      id: 'BUG-108',
      title: 'Fix routing issue',
      status: 'review',
      priority: 'high',
      assignee: 'R',
    },
    {
      id: 'BUG-108',
      title: 'Fix routing issue',
      status: 'review',
      priority: 'high',
      assignee: 'R',
    },
    {
      id: 'BUG-108',
      title: 'Fix routing issue',
      status: 'review',
      priority: 'high',
      assignee: 'R',
    },
    {
      id: 'BUG-108',
      title: 'Fix routing issue',
      status: 'review',
      priority: 'high',
      assignee: 'R',
    },
    {
      id: 'BUG-108',
      title: 'Fix routing issue',
      status: 'review',
      priority: 'high',
      assignee: 'R',
    },
    {
      id: 'BUG-108',
      title: 'Fix routing issue',
      status: 'review',
      priority: 'high',
      assignee: 'R',
    },
    {
      id: 'BUG-108',
      title: 'Fix routing issue',
      status: 'review',
      priority: 'high',
      assignee: 'R',
    },
    {
      id: 'TASK-109',
      title: 'Optimize performance',
      status: 'review',
      priority: 'medium',
      assignee: 'A',
    },
    {
      id: 'TASK-109',
      title: 'Optimize performance',
      status: 'review',
      priority: 'medium',
      assignee: 'A',
    },    {
      id: 'TASK-109',
      title: 'Optimize performance',
      status: 'review',
      priority: 'medium',
      assignee: 'A',
    },    {
      id: 'TASK-109',
      title: 'Optimize performance',
      status: 'review',
      priority: 'medium',
      assignee: 'A',
    },    {
      id: 'TASK-109',
      title: 'Optimize performance',
      status: 'review',
      priority: 'medium',
      assignee: 'A',
    },    {
      id: 'TASK-109',
      title: 'Optimize performance',
      status: 'review',
      priority: 'medium',
      assignee: 'A',
    },    {
      id: 'TASK-109',
      title: 'Optimize performance',
      status: 'review',
      priority: 'medium',
      assignee: 'A',
    },    {
      id: 'TASK-109',
      title: 'Optimize performance',
      status: 'review',
      priority: 'medium',
      assignee: 'A',
    },    {
      id: 'TASK-109',
      title: 'Optimize performance',
      status: 'review',
      priority: 'medium',
      assignee: 'A',
    },    {
      id: 'TASK-109',
      title: 'Optimize performance',
      status: 'review',
      priority: 'medium',
      assignee: 'A',
    },    {
      id: 'TASK-109',
      title: 'Optimize performance',
      status: 'review',
      priority: 'medium',
      assignee: 'A',
    },    {
      id: 'TASK-109',
      title: 'Optimize performance',
      status: 'review',
      priority: 'medium',
      assignee: 'A',
    },    {
      id: 'TASK-109',
      title: 'Optimize performance',
      status: 'review',
      priority: 'medium',
      assignee: 'A',
    },    {
      id: 'TASK-109',
      title: 'Optimize performance',
      status: 'review',
      priority: 'medium',
      assignee: 'A',
    },    {
      id: 'TASK-109',
      title: 'Optimize performance',
      status: 'review',
      priority: 'medium',
      assignee: 'A',
    },    {
      id: 'TASK-109',
      title: 'Optimize performance',
      status: 'review',
      priority: 'medium',
      assignee: 'A',
    },    {
      id: 'TASK-109',
      title: 'Optimize performance',
      status: 'review',
      priority: 'medium',
      assignee: 'A',
    },    {
      id: 'TASK-109',
      title: 'Optimize performance',
      status: 'review',
      priority: 'medium',
      assignee: 'A',
    },    {
      id: 'TASK-109',
      title: 'Optimize performance',
      status: 'review',
      priority: 'medium',
      assignee: 'A',
    },    {
      id: 'TASK-109',
      title: 'Optimize performance',
      status: 'review',
      priority: 'medium',
      assignee: 'A',
    },    {
      id: 'TASK-109',
      title: 'Optimize performance',
      status: 'review',
      priority: 'medium',
      assignee: 'A',
    },    {
      id: 'TASK-109',
      title: 'Optimize performance',
      status: 'review',
      priority: 'medium',
      assignee: 'A',
    },    {
      id: 'TASK-109',
      title: 'Optimize performance',
      status: 'review',
      priority: 'medium',
      assignee: 'A',
    },    {
      id: 'TASK-109',
      title: 'Optimize performance',
      status: 'review',
      priority: 'medium',
      assignee: 'A',
    },    {
      id: 'TASK-109',
      title: 'Optimize performance',
      status: 'review',
      priority: 'medium',
      assignee: 'A',
    },    {
      id: 'TASK-109',
      title: 'Optimize performance',
      status: 'review',
      priority: 'medium',
      assignee: 'A',
    },    {
      id: 'TASK-109',
      title: 'Optimize performance',
      status: 'review',
      priority: 'medium',
      assignee: 'A',
    },    {
      id: 'TASK-109',
      title: 'Optimize performance',
      status: 'review',
      priority: 'medium',
      assignee: 'A',
    },    {
      id: 'TASK-109',
      title: 'Optimize performance',
      status: 'review',
      priority: 'medium',
      assignee: 'A',
    },

    // DONE
    {
      id: 'TASK-110',
      title: 'Setup project structure',
      status: 'done',
      priority: 'low',
      assignee: 'K',
    },
    { id: 'BUG-111', title: 'Fix UI alignment', status: 'done', priority: 'low', assignee: 'R' },
    { id: 'BUG-111', title: 'Fix UI alignment', status: 'done', priority: 'low', assignee: 'R' },
    { id: 'BUG-111', title: 'Fix UI alignment', status: 'done', priority: 'low', assignee: 'R' },
    { id: 'BUG-111', title: 'Fix UI alignment', status: 'done', priority: 'low', assignee: 'R' },
    { id: 'BUG-111', title: 'Fix UI alignment', status: 'done', priority: 'low', assignee: 'R' },
    { id: 'BUG-111', title: 'Fix UI alignment', status: 'done', priority: 'low', assignee: 'R' },
    { id: 'BUG-111', title: 'Fix UI alignment', status: 'done', priority: 'low', assignee: 'R' },
    { id: 'BUG-111', title: 'Fix UI alignment', status: 'done', priority: 'low', assignee: 'R' },
    { id: 'BUG-111', title: 'Fix UI alignment', status: 'done', priority: 'low', assignee: 'R' },
    { id: 'BUG-111', title: 'Fix UI alignment', status: 'done', priority: 'low', assignee: 'R' },
    { id: 'BUG-111', title: 'Fix UI alignment', status: 'done', priority: 'low', assignee: 'R' },
    { id: 'BUG-111', title: 'Fix UI alignment', status: 'done', priority: 'low', assignee: 'R' },
    { id: 'BUG-111', title: 'Fix UI alignment', status: 'done', priority: 'low', assignee: 'R' },
    { id: 'BUG-111', title: 'Fix UI alignment', status: 'done', priority: 'low', assignee: 'R' },
    { id: 'BUG-111', title: 'Fix UI alignment', status: 'done', priority: 'low', assignee: 'R' },
    { id: 'BUG-111', title: 'Fix UI alignment', status: 'done', priority: 'low', assignee: 'R' },
    { id: 'BUG-111', title: 'Fix UI alignment', status: 'done', priority: 'low', assignee: 'R' },
    { id: 'BUG-111', title: 'Fix UI alignment', status: 'done', priority: 'low', assignee: 'R' },
    { id: 'BUG-111', title: 'Fix UI alignment', status: 'done', priority: 'low', assignee: 'R' },
    { id: 'BUG-111', title: 'Fix UI alignment', status: 'done', priority: 'low', assignee: 'R' },
    { id: 'BUG-111', title: 'Fix UI alignment', status: 'done', priority: 'low', assignee: 'R' },
    { id: 'BUG-111', title: 'Fix UI alignment', status: 'done', priority: 'low', assignee: 'R' },
    { id: 'BUG-111', title: 'Fix UI alignment', status: 'done', priority: 'low', assignee: 'R' },
    { id: 'BUG-111', title: 'Fix UI alignment', status: 'done', priority: 'low', assignee: 'R' },
    { id: 'BUG-111', title: 'Fix UI alignment', status: 'done', priority: 'low', assignee: 'R' },
    { id: 'BUG-111', title: 'Fix UI alignment', status: 'done', priority: 'low', assignee: 'R' },
    { id: 'BUG-111', title: 'Fix UI alignment', status: 'done', priority: 'low', assignee: 'R' },
    { id: 'BUG-111', title: 'Fix UI alignment', status: 'done', priority: 'low', assignee: 'R' },
    { id: 'BUG-111', title: 'Fix UI alignment', status: 'done', priority: 'low', assignee: 'R' },
    { id: 'BUG-111', title: 'Fix UI alignment', status: 'done', priority: 'low', assignee: 'R' },
    { id: 'BUG-111', title: 'Fix UI alignment', status: 'done', priority: 'low', assignee: 'R' },
    { id: 'BUG-111', title: 'Fix UI alignment', status: 'done', priority: 'low', assignee: 'R' },
    { id: 'BUG-111', title: 'Fix UI alignment', status: 'done', priority: 'low', assignee: 'R' },
    { id: 'BUG-111', title: 'Fix UI alignment', status: 'done', priority: 'low', assignee: 'R' },
    { id: 'BUG-111', title: 'Fix UI alignment', status: 'done', priority: 'low', assignee: 'R' },
    { id: 'BUG-111', title: 'Fix UI alignment', status: 'done', priority: 'low', assignee: 'R' },
    { id: 'BUG-111', title: 'Fix UI alignment', status: 'done', priority: 'low', assignee: 'R' },
    { id: 'BUG-111', title: 'Fix UI alignment', status: 'done', priority: 'low', assignee: 'R' },
    { id: 'BUG-111', title: 'Fix UI alignment', status: 'done', priority: 'low', assignee: 'R' },
    { id: 'BUG-111', title: 'Fix UI alignment', status: 'done', priority: 'low', assignee: 'R' },
    { id: 'BUG-111', title: 'Fix UI alignment', status: 'done', priority: 'low', assignee: 'R' },
    { id: 'BUG-111', title: 'Fix UI alignment', status: 'done', priority: 'low', assignee: 'R' },
    { id: 'BUG-111', title: 'Fix UI alignment', status: 'done', priority: 'low', assignee: 'R' },
    { id: 'BUG-111', title: 'Fix UI alignment', status: 'done', priority: 'low', assignee: 'R' },
    { id: 'BUG-111', title: 'Fix UI alignment', status: 'done', priority: 'low', assignee: 'R' },
    { id: 'BUG-111', title: 'Fix UI alignment', status: 'done', priority: 'low', assignee: 'R' },
    { id: 'BUG-111', title: 'Fix UI alignment', status: 'done', priority: 'low', assignee: 'R' },
    { id: 'BUG-111', title: 'Fix UI alignment', status: 'done', priority: 'low', assignee: 'R' },
    { id: 'BUG-111', title: 'Fix UI alignment', status: 'done', priority: 'low', assignee: 'R' },
    { id: 'BUG-111', title: 'Fix UI alignment', status: 'done', priority: 'low', assignee: 'R' },
    { id: 'BUG-111', title: 'Fix UI alignment', status: 'done', priority: 'low', assignee: 'R' },
    { id: 'BUG-111', title: 'Fix UI alignment', status: 'done', priority: 'low', assignee: 'R' },
    { id: 'BUG-111', title: 'Fix UI alignment', status: 'done', priority: 'low', assignee: 'R' },
    {
      id: 'TASK-112',
      title: 'Initial commit setup',
      status: 'done',
      priority: 'medium',
      assignee: 'A',
    },
  ];
  getTickets(status: string, page: number, filters?: any) {
    const pageSize = 5;

    let filtered = this.mockTickets.filter((t) => t.status === status);

    // 🔥 Apply filters
    if (filters?.search) {
      filtered = filtered.filter((t) =>
        t.title.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters?.priority) {
      filtered = filtered.filter((t) => t.priority === filters.priority);
    }

    if (filters?.type) {
      filtered = filtered.filter((t) => t.id.startsWith(filters.type));
    }

    // 🔥 Pagination
    const start = (page - 1) * pageSize;
    const paginated = filtered.slice(start, start + pageSize);

    return of({
      data: paginated,
      hasMore: start + pageSize < filtered.length,
    }).pipe(delay(500)); // simulate API delay
  }
}
