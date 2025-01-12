import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { LayoutconducteurComponent } from '../layoutconducteur/layoutconducteur.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profileconducteur',
  standalone: true,
  imports: [LayoutconducteurComponent,FooterComponent],
  templateUrl: './profileconducteur.component.html',
  styleUrl: './profileconducteur.component.css'
})
export class ProfileconducteurComponent  implements OnInit {
private apiUrl = 'http://localhost:8081/api/auth';
userProfile: any;
roleChanged: boolean = false;
constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  private getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }

  loadUserProfile() {
    const token = this.getAuthToken();
    if (!token) {
      alert('No token found. Please log in again.');
      this.router.navigate(['/login-page']);
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get<any>(`${this.apiUrl}/profile`, { headers }).subscribe({
      next: (response) => {
        this.userProfile = response;
      },
      error: (error) => {
        console.error('Error fetching profile:', error);
        if (error.status === 401) {
          alert('Session expired or unauthorized. Please log in again.');
          this.router.navigate(['/login-page']);
        }
        else {
          alert('An error occurred while fetching your profile. Please try again later.');
        }
      }
    });
  }
  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  onDeleteProfile() {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteProfile();
      }
    });
  }

  deleteProfile() {
    const token = localStorage.getItem('authToken'); 

    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

      this.http.delete(`${this.apiUrl}/deleteprofile`, { headers })
        .subscribe({
          next: (response) => {
            Swal.fire(
              'Deleted!',
              'Your account has been deleted.',
              'success'
            );
          },
          error: (error) => {
            Swal.fire(
              'Error!',
              'There was an error deleting your account.',
              'error'
            );
          }
        });
    } else {
      Swal.fire(
        'Error!',
        'No valid token found.',
        'error'
      );
    }
  }










  ////////////////////////////////////////////////////////////////


  logout() {
    console.log('Logging out...');  // Add debug log to ensure logout is triggered
    this.http.post(`${this.apiUrl}/logout`, {}).subscribe(
      (response) => {
        console.log('Logout successful:', response);
        Swal.fire({
          icon: 'success',
          title: 'Logout successful',
          text: 'See you next time!',
          position: 'bottom-end',
          toast: true,
          showConfirmButton: false,
          timer: 8000,
          background: '#eafaf1',
        });
        localStorage.removeItem('authToken');
        this.router.navigate(['/login-page']);
      },
      (error) => {
        console.error('Logout failed:', error);
      }
    );
  }
  onRoleChange(event: any) {
    const selectedRole = event.target.value;
    // Check if the role has changed
    if (selectedRole !== this.userProfile.role) {
      this.roleChanged = true;
    } else {
      this.roleChanged = false;
    }
  }

  onUpdateProfile() {
  Swal.fire({
    title: 'Update Profile',
    html: `
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
        <label for="firstName">First Name:</label>
        <input id="firstName" class="swal2-input" placeholder="First Name" value="${this.userProfile.firstName || ''}" style="width: 70%; height: 30px; font-size: 14px;">
        
        <label for="lastName">Last Name:</label>
        <input id="lastName" class="swal2-input" placeholder="Last Name" value="${this.userProfile.lastName || ''}" style="width: 70%; height: 30px; font-size: 14px;">
        
        <label for="email">Email:</label>
        <input id="email" class="swal2-input" placeholder="Email" value="${this.userProfile.email || ''}" style="width: 70%; height: 30px; font-size: 14px;">
        
        <label for="phoneNumber">Phone Number:</label>
        <input id="phoneNumber" class="swal2-input" placeholder="Phone" value="${this.userProfile.phonenumber || ''}" style="width: 70%; height: 30px; font-size: 14px;">
        
       <label for="role">Role:</label>
<select id="role" class="swal2-input" style="width: 70%; height: 30px; font-size: 14px;" (change)="onRoleChange($event)">
  <option value="CONDUCTEUR" [selected]="userProfile.role === 'CONDUCTEUR'">CONDUCTEUR</option>
  <option value="PASSAGER" [selected]="userProfile.role === 'PASSAGER'">PASSAGER</option>
</select>

        

        <label for="ville">City:</label>
        <select id="ville" class="swal2-input" style="width: 70%; height: 30px; font-size: 14px;">
<option value="Ariana" ${this.userProfile.ville === 'Ariana' ? 'selected' : ''}>Ariana</option>
<option value="Béja" ${this.userProfile.ville === 'Béja' ? 'selected' : ''}>Béja</option>
<option value="Ben Arous" ${this.userProfile.ville === 'Ben Arous' ? 'selected' : ''}>Ben Arous</option>
<option value="Bizerte" ${this.userProfile.ville === 'Bizerte' ? 'selected' : ''}>Bizerte</option>
<option value="Gabès" ${this.userProfile.ville === 'Gabès' ? 'selected' : ''}>Gabès</option>
<option value="Gafsa" ${this.userProfile.ville === 'Gafsa' ? 'selected' : ''}>Gafsa</option>
<option value="Jendouba" ${this.userProfile.ville === 'Jendouba' ? 'selected' : ''}>Jendouba</option>
<option value="Kairouan" ${this.userProfile.ville === 'Kairouan' ? 'selected' : ''}>Kairouan</option>
<option value="Kasserine" ${this.userProfile.ville === 'Kasserine' ? 'selected' : ''}>Kasserine</option>
<option value="Kébili" ${this.userProfile.ville === 'Kébili' ? 'selected' : ''}>Kébili</option>
<option value="Le Kef" ${this.userProfile.ville === 'Le Kef' ? 'selected' : ''}>Le Kef</option>
<option value="Mahdia" ${this.userProfile.ville === 'Mahdia' ? 'selected' : ''}>Mahdia</option>
<option value="La Manouba" ${this.userProfile.ville === 'La Manouba' ? 'selected' : ''}>La Manouba</option>
<option value="Médenine" ${this.userProfile.ville === 'Médenine' ? 'selected' : ''}>Médenine</option>
<option value="Monastir" ${this.userProfile.ville === 'Monastir' ? 'selected' : ''}>Monastir</option>
<option value="Nabeul" ${this.userProfile.ville === 'Nabeul' ? 'selected' : ''}>Nabeul</option>
<option value="Sfax" ${this.userProfile.ville === 'Sfax' ? 'selected' : ''}>Sfax</option>
<option value="Sidi Bouzid" ${this.userProfile.ville === 'Sidi Bouzid' ? 'selected' : ''}>Sidi Bouzid</option>
<option value="Siliana" ${this.userProfile.ville === 'Siliana' ? 'selected' : ''}>Siliana</option>
<option value="Sousse" ${this.userProfile.ville === 'Sousse' ? 'selected' : ''}>Sousse</option>
<option value="Tataouine" ${this.userProfile.ville === 'Tataouine' ? 'selected' : ''}>Tataouine</option>
<option value="Tozeur" ${this.userProfile.ville === 'Tozeur' ? 'selected' : ''}>Tozeur</option>
<option value="Tunis" ${this.userProfile.ville === 'Tunis' ? 'selected' : ''}>Tunis</option>
<option value="Zaghouan" ${this.userProfile.ville === 'Zaghouan' ? 'selected' : ''}>Zaghouan</option>

         
        </select>
      </div>
    `,
    focusConfirm: false,
    width: '900px',
    preConfirm: () => {
      const firstName = (document.getElementById('firstName') as HTMLInputElement).value;
      const lastName = (document.getElementById('lastName') as HTMLInputElement).value;
      const email = (document.getElementById('email') as HTMLInputElement).value;
      const phoneNumber = (document.getElementById('phoneNumber') as HTMLInputElement).value;
      const role = (document.getElementById('role') as HTMLSelectElement).value;
      const ville = (document.getElementById('ville') as HTMLSelectElement).value;

      if (!firstName || !lastName || !email || !phoneNumber || !role || !ville) {
        Swal.showValidationMessage('All fields are required');
        return null;
      }

      return { firstName, lastName, email, phoneNumber, role, ville };
    }
  }).then((result) => {
    if (result.isConfirmed) {
      const updatedProfile = result.value;
        
        
        this.updateProfile(updatedProfile);
        localStorage.setItem('role', updatedProfile.role);
    }
  });
}

  updateProfile(updatedProfile: { firstName: string; lastName: string; email: string; phoneNumber: string; role: string; ville: string }) {
  const token = localStorage.getItem('authToken');
  if (token) {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.put(`${this.apiUrl}/updateprofile`, updatedProfile, { headers })
      .subscribe({
        next: () => {
          this.userProfile = { ...this.userProfile, ...updatedProfile };
          if (this.userProfile.role !== updatedProfile.role) {
            this.onRoleChange(updatedProfile.role);
          }

          Swal.fire({
  toast: true,
  icon: 'success',
  title: 'Your profile has been updated.',
  position: 'bottom-end',
  showConfirmButton: false,
  timer: 3000, // Auto-dismiss after 3 seconds
  timerProgressBar: true,
});


          this.loadUserProfile();
        },
        error: (error) => {
         Swal.fire({
  toast: true,
  icon: 'error', 
  title: 'Your error message here', 
  position: 'bottom-end', 
  showConfirmButton: false,
  timer: 3000, 
  timerProgressBar: true,
});

        }
      });
  } else {
   Swal.fire({
  toast: true,
  icon: 'error',
  title: 'No valid token found. Please log in again.',
  position: 'bottom-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});

  }
}

}