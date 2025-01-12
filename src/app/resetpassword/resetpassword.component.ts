import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-resetpassword',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
 password: string = ''; // Bound to the "New Password" field
  confirmPassword: string = ''; // Bound to the "Confirm Password" field
  passwordsDoNotMatch: boolean = false; // Validation error flag
  token: string | null = null; // Token from query params
  loginError: string | null = null; // Error messages
  signupSuccess: boolean = false;  // Flag for success alert
  loginmessage: string = ''; // Success message text

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Extract token from query parameters
    this.token = this.route.snapshot.queryParamMap.get('token');
    if (!this.token) {
      this.loginError = 'Invalid or missing token. Please try again.';
    }
    console.log('Extracted token:', this.token);
  }

  resetPassword() {
if (this.password !== this.confirmPassword) {
  this.loginError = 'Passwords do not match. Please try again.';
  setTimeout(() => (this.loginError = null), 5000); // Clear error message after 5 seconds
  return;
}

    if (!this.token) {
      this.loginError = 'Invalid or missing token. Please try again.';
      return;
    }

    // Prepare the query parameters
    const params = new HttpParams()
      .set('token', this.token)
      .set('newPassword', this.password);

    // Send the request
    this.http.post('http://localhost:8081/api/auth/reset-password', null, {
      params,
      responseType: 'text',
    }).subscribe(
      (response: string) => {
        switch (response) {
          case 'Password has been reset successfully!':
            this.signupSuccess = true;
            this.loginmessage = 'Password has been reset successfully!';
            Swal.fire({
              icon: 'success',
              title: this.loginmessage,
              position: 'bottom-end',
              toast: true,
              showConfirmButton: false,
              timer: 8000,
              background: '#eafaf1',
            });
            this.router.navigate(['/login-page']); // Redirect to login
            break;

          case 'Reset token has expired':
            this.loginError = 'Reset token has expired. Please request a new one.';
            break;

          case 'Invalid or expired reset token.':
            this.loginError = 'Invalid or expired reset token. Please try again.';
            break;

          case 'Email not found':
            this.loginError = 'Email not found. Please check and try again.';
            break;

          default:
            this.loginError = response || 'An unknown error occurred. Please try again later.';
            break;
        }

        // Clear error message after 5 seconds
        if (this.loginError) {
          setTimeout(() => (this.loginError = null), 5000);
        }
      },
      (error) => {
        console.error('Unexpected error occurred:', error);
        this.loginError = 'An error occurred while processing your request. Please try again later.';
        setTimeout(() => (this.loginError = null), 5000);
      }
    );
  }

  // Navigate to login page
  goToLoginPage() {
    this.router.navigate(['/login-page']);
  }
}