import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LayoutconducteurComponent } from '../layoutconducteur/layoutconducteur.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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
    const driverId = localStorage.getItem('id'); 

    if (!token || !driverId) {
      alert('Driver ID or token is missing. Please log in again.');
      this.router.navigate(['/login-page']);
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
 canceltrajet(id: number) {
  const token = this.getAuthToken(); // Récupérer le token de l'utilisateur
  if (!token) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'You must be logged in to cancel a ride.',
      toast: true,              
      position: 'bottom-right', 
      showConfirmButton: false, 
      timer: 3000,              
      timerProgressBar: true    
    });
    this.router.navigate(['/login-page']); // Redirection si non connecté
    return;
  }

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}` // Ajouter l'en-tête Authorization
  });

  this.http.post(`http://localhost:8081/api/trajets/annuler/${id}`, {}, { headers, responseType: 'text' }).subscribe(
    (response) => {
      console.log('Trajet annulé avec succès', response);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Ride cancelled successfully.',
        toast: true,              
        position: 'bottom-right', 
        showConfirmButton: false, 
        timer: 3000,              
        timerProgressBar: true    
      });
      this.loadTrajets(); // Recharger les trajets après annulation
    },
    (error) => {
      console.error('Erreur lors de l\'annulation du trajet', error);
      if (error.status === 401) {
        Swal.fire({
          icon: 'error',
          title: 'Session expired',
          text: 'Please log in again.',
          toast: true,              
          position: 'bottom-right', 
          showConfirmButton: false, 
          timer: 3000,              
          timerProgressBar: true    
        });
        this.router.navigate(['/login-page']);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while cancelling the ride.',
          toast: true,              
          position: 'bottom-right', 
          showConfirmButton: false, 
          timer: 3000,              
          timerProgressBar: true    
        });
      }
    }
  );
}

deleteTrajet(id: number) {
  const token = this.getAuthToken();
  if (!token) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'You must be logged in to delete a ride.',
      toast: true,              
      position: 'bottom-right', 
      showConfirmButton: false, 
      timer: 3000,              
      timerProgressBar: true    
    });
    this.router.navigate(['/login-page']);
    return;
  }

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });

  this.http.delete(`http://localhost:8081/api/trajets/${id}`, { headers }).subscribe({
    next: () => {
      this.loadTrajets(); 

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Ride deleted successfully',
        toast: true,              
        position: 'bottom-right', 
        showConfirmButton: false, 
        timer: 3000,             
        timerProgressBar: true    
      });
    },
    error: (error) => {
      console.error('Error deleting trajet:', error);

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to delete the ride',
        toast: true,              
        position: 'bottom-right', 
        showConfirmButton: false, 
        timer: 3000,              
        timerProgressBar: true    
      });
    }
  });
}
updateTrajet(id: number, updatedData: any) {
    const token = this.getAuthToken();
    if (!token) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'You must be logged in to update a ride.',
        toast: true,
        position: 'bottom-right',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
      });
      this.router.navigate(['/login-page']);
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const driverId = localStorage.getItem('id'); 

    this.http.put(`http://localhost:8081/api/trajets/${id}/conducteur/${driverId}`, updatedData, { headers }).subscribe({
      next: () => {
        this.loadTrajets();
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Ride updated successfully',
          toast: true,
          position: 'bottom-right',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        });
      },
      error: (error) => {
        console.error('Error updating trajet:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to update the ride',
          toast: true,
          position: 'bottom-right',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        });
      }
    });
  }

  showUpdateForm(trajet: any) {
  Swal.fire({
    title: 'Update Ride Details',
    html: `
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label for="depart">Departure</label>
          <input type="text" id="depart" class="swal2-input" value="${trajet.depart}">
        </div>
        <div>
          <label for="arrivee">Arrival</label>
          <input type="text" id="arrivee" class="swal2-input" value="${trajet.arrivee}">
        </div>
        <div>
          <label for="horaireDepart">Departure Time</label>
          <input type="text" id="horaireDepart" class="swal2-input" value="${trajet.horaireDepart}">
        </div>
        <div>
          <label for="horaireArrivee">Arrival Time</label>
          <input type="text" id="horaireArrivee" class="swal2-input" value="${trajet.horaireArrivee}">
        </div>
        <div>
          <label for="distance">Distance (km)</label>
          <input type="double" id="distance" class="swal2-input" value="${trajet.distance}">
        </div>
        <div>
          <label for="tarif">Price</label>
          <input type="number" id="tarif" class="swal2-input" value="${trajet.tarif}">
        </div>
        <div>
          <label for="description">Description</label>
          <input type="text" id="description" class="swal2-input" value="${trajet.description}">
        </div>
        <div>
          <label for="horaireArriveeEstimee">Estimated Arrival Time</label>
          <input type="text" id="horaireArriveeEstimee" class="swal2-input" value="${trajet.horaireArriveeEstimee}">
        </div>
      </div>
    `,
    showCancelButton: true,
    width: 700,
    confirmButtonText: 'Update Ride',
    cancelButtonText: 'Cancel',
    preConfirm: () => {
      const updatedData = {
        depart: (<HTMLInputElement>document.getElementById('depart')).value,
        arrivee: (<HTMLInputElement>document.getElementById('arrivee')).value,
        horaireDepart: (<HTMLInputElement>document.getElementById('horaireDepart')).value,
        horaireArrivee: (<HTMLInputElement>document.getElementById('horaireArrivee')).value,
        distance: (<HTMLInputElement>document.getElementById('distance')).value,
        tarif: (<HTMLInputElement>document.getElementById('tarif')).value,
        description: (<HTMLInputElement>document.getElementById('description')).value,
        horaireArriveeEstimee: (<HTMLInputElement>document.getElementById('horaireArriveeEstimee')).value
      };
      this.updateTrajet(trajet.id, updatedData);
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