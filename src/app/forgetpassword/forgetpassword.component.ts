import { Component } from '@angular/core';
import { HttpClient, HttpClientModule,HttpParams  } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [CommonModule,FormsModule,HttpClientModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.css'
})
export class ForgetpasswordComponent {
  email: string = '';
  signupSuccess = false;
  loginError: string | null = null;
  loginmessage: string | null = null;

   constructor(private http: HttpClient, private router: Router) {}

sendResetEmail() {
  if (!this.email) {
    this.loginError = 'Please enter your email address.';
    setTimeout(() => this.loginError = null, 5000);
    return;
  }

  const params = new HttpParams().set('email', this.email); // Using HttpParams to add query params

  this.http.post('http://localhost:8081/api/auth/forgot-password', {}, { 
    params,
    responseType: 'text'  // Expect plain text response
  })
  .subscribe(
    (response: string) => {
      if (response === 'Password reset email sent successfully!') {
        Swal.fire({
          icon: 'success',
          title: 'Password reset email sent!',
          text: 'Please check your inbox for instructions.',
          position: 'bottom-end',  // Position at the bottom-right corner
          toast: true,              // Toast style (small popup)
          showConfirmButton: false, // Hide the confirmation button
          timer: 8000,              // Close after 8 seconds
          background: '#eafaf1',    // Background color
        });
      } else {
        this.loginError = response === 'Email not found' ? 'Email not found' : 'Failed to send reset email. Please try again later.';
        setTimeout(() => this.loginError = null, 5000);
      }
    },
    (error) => {
      console.error('Failed to send email', error);

      const errorMessage = error.error === 'Email not found' ? 'Email not found' : 'Failed to send reset email. Please try again later.';
      this.loginError = errorMessage;
      setTimeout(() => this.loginError = null, 5000);
    }
  );
}
}