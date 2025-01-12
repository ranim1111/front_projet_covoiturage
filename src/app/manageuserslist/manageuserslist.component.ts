import { Component } from '@angular/core';
import { LayoutComponent } from '../layout/layout.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manageuserslist',
  standalone: true,
  imports: [LayoutComponent, CommonModule,FormsModule],
  templateUrl: './manageuserslist.component.html',
  styleUrl: './manageuserslist.component.css'
})
export class ManageuserslistComponent {
 data = [
    { invoiceNumber: 'PROJ1001', customer: 'John Doe', amount: '$1,200.00', issued: '2024-08-01', dueDate: '2024-08-15' },
    { invoiceNumber: 'PROJ1002', customer: 'Jane Smith', amount: '$850.00', issued: '2024-08-05', dueDate: '2024-08-20' },
    { invoiceNumber: 'PROJ1003', customer: 'Acme Corp', amount: '$2,500.00', issued: '2024-08-07', dueDate: '2024-08-21' },
    { invoiceNumber: 'PROJ1004', customer: 'Global Inc', amount: '$4,750.00', issued: '2024-08-10', dueDate: '2024-08-25' },
    { invoiceNumber: 'PROJ1005', customer: 'Star Ltd', amount: '$3,100.00', issued: '2024-08-12', dueDate: '2024-08-28' },
    // Add more data as needed
  ];

  searchTerm: string = '';
  filteredData = [...this.data];

  currentPage = 1;
  pageSize = 2;
  totalPages = Math.ceil(this.filteredData.length / this.pageSize);
  pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);

  get startIndex() {
    return (this.currentPage - 1) * this.pageSize;
  }

  get endIndex() {
    return Math.min(this.startIndex + this.pageSize, this.filteredData.length);
  }

  get paginatedData() {
    return this.filteredData.slice(this.startIndex, this.endIndex);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  onSearch() {
    this.filteredData = this.data.filter(
      (item) =>
        item.invoiceNumber.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.customer.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.updatePagination();
  }

  updatePagination() {
    this.currentPage = 1;
    this.totalPages = Math.ceil(this.filteredData.length / this.pageSize);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}