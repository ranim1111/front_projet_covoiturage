import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { HeaderconducteurComponent } from '../headerconducteur/headerconducteur.component';
import { AuthService } from '../services/auth-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebarconducteur',
  standalone: true,
  imports: [CommonModule, FormsModule,HeaderconducteurComponent, HttpClientModule,RouterModule],
  templateUrl: './sidebarconducteur.component.html',
  styleUrl: './sidebarconducteur.component.css'
})
export class SidebarconducteurComponent {
private apiUrl = 'http://localhost:8081/api/auth';
constructor(private http: HttpClient, private router: Router) {}

logout() {
 this.http.post(`${this.apiUrl}/logout`, {}).subscribe(
      response => {
        console.log('Logout successful:', response);
        Swal.fire({
        icon: 'success',
        title: 'Logout successful',
        text: `See you next time!`,
        position: 'bottom-end',  // Position at the top-right corner
        toast: true,          // Toast style (small popup)
        showConfirmButton: false, // Hide the confirmation button
        timer: 8000 ,          // Close after 3 seconds
        background: '#eafaf1',
      });
        localStorage.removeItem('authToken');
        
      },
      error => {
        console.error('Logout failed:', error);
      }
    );
  }
}
