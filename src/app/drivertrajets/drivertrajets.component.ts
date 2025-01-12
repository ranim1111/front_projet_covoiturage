import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LayoutconducteurComponent } from '../layoutconducteur/layoutconducteur.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-drivertrajets',
  standalone: true,
  imports: [LayoutconducteurComponent,FormsModule,CommonModule,DatePipe ],
  templateUrl: './drivertrajets.component.html',
  styleUrl: './drivertrajets.component.css'
})
export class DrivertrajetsComponent  implements OnInit{
 private apiUrl = 'http://localhost:8081/api/trajets/conducteur'; // Base URL with conducteur path
  trajets: any[] = [];
  searchTerm: string = '';
  filteredData = [...this.trajets];

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

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadTrajets();
  }

  private getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }

  loadTrajets() {
    const token = this.getAuthToken();
    const driverId = localStorage.getItem('id'); // Directly getting driver ID from local storage

    if (!token || !driverId) {
      alert('Driver ID or token is missing. Please log in again.');
      this.router.navigate(['/login']);
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get<any[]>(`${this.apiUrl}/${driverId}`, { headers }).subscribe({
      next: (response) => {
        this.trajets = response;
        this.filteredData = [...this.trajets];
        console.log(response);
        this.updatePagination();
      },
      error: (error) => {
        console.error('Error fetching trajets:', error);
        if (error.status === 401) {
          alert('Session expired or unauthorized. Please log in again.');
          this.router.navigate(['/login-page']);
        }
      }
    });
  }

  onSearch() {
    this.filteredData = this.trajets.filter(
      (item) =>
        item.depart.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.arrivee.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.firstName.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        item.lastName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.updatePagination();
  }

  updatePagination() {
    this.currentPage = 1;
    this.totalPages = Math.ceil(this.filteredData.length / this.pageSize);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
}