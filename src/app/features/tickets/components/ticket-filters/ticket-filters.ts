import { ChangeDetectionStrategy, Component, computed, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { SelectOption } from '../../models/dropdowns.model';
import { TicketFilter } from '../../models/ticket-filter.model';

type FilterKey = keyof TicketFilter;

const EMPTY_FILTERS: TicketFilter = { search: '', priority: '', type: '', assignee: '' };

@Component({
  selector: 'app-ticket-filters',
  imports: [FormsModule, InputTextModule, SelectModule],
  templateUrl: './ticket-filters.html',
  styleUrl: './ticket-filters.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TicketFilters {
  readonly filtersChange = output<TicketFilter>();

  protected readonly priorities: SelectOption[] = [
    { name: 'High', code: 'high' },
    { name: 'Medium', code: 'medium' },
    { name: 'Low', code: 'low' },
  ];
  protected readonly types: SelectOption[] = [
    { name: 'BUG', code: 'BUG' },
    { name: 'TASK', code: 'TASK' },
  ];
  protected readonly assignees: SelectOption[] = ['K', 'A', 'R', 'D'].map((code) => ({
    name: code,
    code,
  }));

  protected readonly filters = signal<TicketFilter>({ ...EMPTY_FILTERS });

  protected readonly activeFilters = computed(() => {
    const f = this.filters();
    const nameOf = (options: SelectOption[], code: string) =>
      options.find((o) => o.code === code)?.name ?? code;

    const chips: { key: FilterKey; label: string }[] = [];
    if (f.search) chips.push({ key: 'search', label: `Search: ${f.search}` });
    if (f.priority) chips.push({ key: 'priority', label: `Priority: ${nameOf(this.priorities, f.priority)}` });
    if (f.type) chips.push({ key: 'type', label: `Type: ${nameOf(this.types, f.type)}` });
    if (f.assignee) chips.push({ key: 'assignee', label: `Assignee: ${nameOf(this.assignees, f.assignee)}` });
    return chips;
  });

  protected set(key: FilterKey, value: string | null | undefined) {
    const next = { ...this.filters(), [key]: (value ?? '').trim() };
    this.filters.set(next);
    this.filtersChange.emit(next);
  }

  protected clearAll() {
    this.filters.set({ ...EMPTY_FILTERS });
    this.filtersChange.emit({ ...EMPTY_FILTERS });
  }
}
