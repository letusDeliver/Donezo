
import { Component, OnInit, inject, signal } from '@angular/core';
import { ANGULAR_IMPORTS } from '../../../../shared/ui/angular-imports';
import { PRIMENG_IMPORTS } from '../../../../shared/ui/primeng-imports';
import { StoryService } from '../../services/story.service';

export interface Country {
  name?: string;
  code?: string;
}

export interface Representative {
  name?: string;
  image?: string;
}

export interface Customer {
  id?: number;
  name?: string;
  country?: Country;
  company?: string;
  date?: string | Date;
  status?: string;
  activity?: number;
  representative?: Representative;
  verified?: boolean;
  balance?: number;
}

@Component({
  standalone: true,
  selector: 'app-user-stories',
  imports: [...ANGULAR_IMPORTS, ...PRIMENG_IMPORTS],
  templateUrl: './user-stories.html',
  styleUrl: './user-stories.scss',
  providers: [StoryService]
})
export class UserStories {
  private customerService: StoryService = inject(StoryService);
  customers = signal<Customer[]>([]);
  representatives = signal<Representative[]>([]);
  statuses = signal<any[]>([]);
  loading = signal(true);
  searchValue = signal('');
  activityValues = signal<number[]>([0, 100]);

  ngOnInit() {
    this.customerService.getCustomersLarge().then((customers) => {
      customers.forEach(
        (customer: Customer) => (customer.date = new Date(customer.date as string))
      );
      this.customers.set(customers);
      this.loading.set(false);
    });
    this.representatives.set([
      { name: 'Amy Elsner', image: 'amyelsner.png' },
      { name: 'Anna Fali', image: 'annafali.png' },
      { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
      { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
      { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
      { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
      { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
      { name: 'Onyama Limba', image: 'onyamalimba.png' },
      { name: 'Stephen Shaw', image: 'stephenshaw.png' },
      { name: 'Xuxue Feng', image: 'xuxuefeng.png' },
    ]);
    this.statuses.set([
      { label: 'Unqualified', value: 'unqualified' },
      { label: 'Qualified', value: 'qualified' },
      { label: 'New', value: 'new' },
      { label: 'Negotiation', value: 'negotiation' },
      { label: 'Renewal', value: 'renewal' },
      { label: 'Proposal', value: 'proposal' },
    ]);
  }

  clear(table: any) {
    table.clear();
    this.searchValue.set('');
  }

  getSeverity(status: string): string | null {
    switch (status) {
      case 'unqualified':
        return 'danger';
      case 'qualified':
        return 'success';
      case 'new':
        return 'info';
      case 'negotiation':
        return 'warn';
      case 'renewal':
        return null;
    }
  
    return null; // ✅ ensures all paths return
  }
}
