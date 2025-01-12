import { Component, OnInit } from '@angular/core';
import { LayoutComponent } from '../layout/layout.component';
import { FooterComponent } from '../footer/footer.component';
import { AuthService } from '../services/auth-service.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profileadmin',
  standalone: true,
  imports: [LayoutComponent,FooterComponent],
  templateUrl: './profileadmin.component.html',
  styleUrl: './profileadmin.component.css'
})
export class ProfileadminComponent implements OnInit {

 userProfile: any = {};  // Store the profile data
  loading: boolean = true;  // Show loading spinner while fetching data
  error: string = '';  // Store error message
  private apiUrl = 'http://localhost:8081/api/auth/profile';  // Backend profile endpoint

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('authToken');  // Get the JWT token from localStorage

    if (token) {
      this.http.get(this.apiUrl, {
        headers: {
          'Authorization': `Bearer ${token}`  // Attach token to the Authorization header
        }
      }).subscribe(
        (response: any) => {
          this.userProfile = response;  
          console.log(response, "hhh")
          this.loading = false;  // Hide loading spinner
        },
        error => {
          this.error = 'Failed to load profile data. Please try again later.';
          this.loading = false;  // Hide loading spinner
          console.error(error);  // Log the error
        }
      );
    } else {
      this.router.navigate(['/login-page']);  // Redirect if token is missing
    }
  }
}