import { Component, OnInit  } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { LayoutpasComponent } from '../../layoutpas/layoutpas.component';



@Component({
  selector: 'app-listetrajets',
  standalone: true,
  imports: [LayoutpasComponent,FormsModule,CommonModule,DatePipe ],
  templateUrl: './listetrajets.component.html',
  styleUrl: './listetrajets.component.css'
})
export class ListetrajetsComponent implements OnInit{
private apiUrl = 'http://localhost:8081/api/trajets';
private apiUrlFiltered = 'http://localhost:8081/api/trajets/filter';
  trajets: any[] = [];
  searchTerm: string = '';
  filteredData = [...this.trajets];
  filter = {
    depart: '',
    arrivee: '',
    dateCreation: '',
    firstName: '',
    lastName: ''
  };


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

    if (!token) {
      alert('No token found. Please log in again.');
      this.router.navigate(['/login-page']);
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    
    

    this.http.get<any[]>(this.apiUrl, { headers }).subscribe({
      next: (response) => {
        this.trajets = response;
        this.filteredData = [...this.trajets];
       // console.log(response);
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
applyFilters() {
  const token = this.getAuthToken();

  if (!token) {
    alert('No token found. Please log in again.');
    this.router.navigate(['/login-page']);
    return;
  }

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });

  let params = new HttpParams();
  if (this.filter.arrivee) {
    params = params.set('arrivee', this.filter.arrivee);
  }
  if (this.filter.depart) {
    params = params.set('depart', this.filter.depart);
  }
  if (this.filter.dateCreation) {
    params = params.set('dateCreation', this.filter.dateCreation);
  }
  if (this.filter.firstName) {
    params = params.set('firstName', this.filter.firstName);
  }
  if (this.filter.lastName) {
    params = params.set('lastName', this.filter.lastName);
  }
    console.log(params);

  this.http.get<any[]>(this.apiUrlFiltered, { headers, params }).subscribe({
  next: (response) => {
    console.log('Response:', response);  
    if (Array.isArray(response)) {
      this.trajets = response;  
      this.filteredData = [...this.trajets];
      console.log(this.filteredData, 'Filtered Results');
      this.updatePagination();
    } else {
      console.error('La réponse de l\'API n\'est pas un tableau');
    }
  },
  error: (error) => {
    console.error('Error fetching filtered trajets:', error);
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
        item.arrivee.toLowerCase().includes(this.searchTerm.toLowerCase()) || item.firstName.toLowerCase().includes(this.searchTerm.toLowerCase())|| item.lastName.toLowerCase().includes(this.searchTerm.toLowerCase())
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
  resetFilters() {
    this.filter.depart = '';
    this.filter.arrivee = '';
    this.filter.dateCreation = '';
    this.filter.firstName = '';
    this.filter.lastName = '';

    this.loadTrajets();
  }
}