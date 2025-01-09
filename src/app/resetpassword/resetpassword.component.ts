import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-resetpassword',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  password: string = '';
  confirmPassword: string = '';
  token: string | null = null;
  signupSuccess = false;
  loginError: string | null = null;
  loginmessage: string | null = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

 ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get('token');
    console.log('Extracted token:', this.token);
  }

  resetPassword() {
    if (!this.password || !this.confirmPassword) {
      this.loginError = 'Please enter both new password and confirm password.';
      setTimeout(() => (this.loginError = null), 5000);
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.loginError = 'Passwords do not match.';
      setTimeout(() => (this.loginError = null), 5000);
      return;
    }

    if (!this.token) {
      this.loginError = 'Invalid or missing token.';
      setTimeout(() => (this.loginError = null), 5000);
      return;
    }

    const params = {
      token: this.token,
      newPassword: this.password,
      confirmPassword: this.confirmPassword,
    };

    this.http.put('http://localhost:8081/api/password/resetPassword', {}, { params, responseType: 'text' }).subscribe(
      (response: string) => {
        console.log('Password reset successful', response);
        
        this.password='';
        this.confirmPassword='';

        this.signupSuccess = true;
        this.loginmessage = response;
        setTimeout(() => (this.signupSuccess = false), 7000);
        
      },
      (error) => {
        console.error('Password reset failed', error);
        const errorMessage = error.error || 'Failed to reset password. Please try again later.';
        this.loginError = errorMessage;
        setTimeout(() => (this.loginError = null), 7000);
      }
    );
  }
  goToLoginPage() {
    this.router.navigate(['/login-page']); 
  }
}