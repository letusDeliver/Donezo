import { Component, EventEmitter, Output } from '@angular/core';
import { ANGULAR_IMPORTS } from '../../../../shared/ui/angular-imports';
import { PRIMENG_IMPORTS } from '../../../../shared/ui/primeng-imports';
import { TicketFilter } from '../../models/ticket-filter.model';
import { Assignees, Priorities, Types } from '../../models/dropdowns.model';

@Component({
  standalone: true,
  selector: 'app-ticket-filters',
  imports: [...ANGULAR_IMPORTS, ...PRIMENG_IMPORTS],
  templateUrl: './ticket-filters.html',
  styleUrl: './ticket-filters.scss',
})
export class TicketFilters {
  @Output() filtersChange = new EventEmitter<TicketFilter>();

  filters: TicketFilter = {
    search: '',
    priority: '',
    type: '',
    assignee: '',
  };

  selectedPriority?: any;
  selectedType?: any;
  selectedAssignee?: any;

  activeFilters: { key: string; label: string }[] = [];

  priorities = [
    { name: 'High', code: 'high' },
    { name: 'Medium', code: 'medium' },
    { name: 'Low', code: 'low' },
  ];

  types = [
    { name: 'BUG', code: 'BUG' },
    { name: 'TASK', code: 'TASK' },
  ];

  assignees = [
    { name: 'K', code: 'K' },
    { name: 'A', code: 'A' },
    { name: 'R', code: 'R' },
    { name: 'D', code: 'D' },
  ];

  // 🔥 Trigger on dropdown change
  onSelectChange() {
    this.filters.priority = this.selectedPriority?.code || '';
    this.filters.type = this.selectedType?.code || '';
    this.filters.assignee = this.selectedAssignee?.code || '';

    this.updateChips();
    this.emitFilters();
  }

  // 🔍 Search change
  onFilterChange() {
    this.filters.search = this.filters.search?.trim() || '';
    this.updateChips();
    this.emitFilters();
  }

  // 🧠 Build chips
  updateChips() {
    this.activeFilters = [];

    if (this.filters.search) {
      this.activeFilters.push({
        key: 'search',
        label: `Search: ${this.filters.search}`,
      });
    }

    if (this.selectedPriority) {
      this.activeFilters.push({
        key: 'priority',
        label: `Priority: ${this.selectedPriority.name}`,
      });
    }

    if (this.selectedType) {
      this.activeFilters.push({
        key: 'type',
        label: `Type: ${this.selectedType.name}`,
      });
    }

    if (this.selectedAssignee) {
      this.activeFilters.push({
        key: 'assignee',
        label: `Assignee: ${this.selectedAssignee.name}`,
      });
    }
  }
  // ❌ Remove single chip
  removeFilter(key: string) {
    if (key === 'search') this.filters.search = '';
    if (key === 'priority') this.selectedPriority = undefined;
    if (key === 'type') this.selectedType = undefined;
    if (key === 'assignee') this.selectedAssignee = undefined;

    this.onSelectChange(); // ensures sync + chips update
  }

  // 🧹 Clear all
  clearAll() {
    this.filters = {
      search: '',
      priority: '',
      type: '',
      assignee: '',
    };

    this.selectedPriority = undefined;
    this.selectedType = undefined;
    this.selectedAssignee = undefined;

    this.activeFilters = [];

    this.emitFilters();
  }

  // 📡 Emit to parent
  emitFilters() {
    this.filtersChange.emit(this.filters);
  }
}
