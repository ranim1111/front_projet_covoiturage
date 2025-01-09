import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

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

  this.http.get('http://localhost:8081/api/password/email', {
    params: { email: this.email }
  }).subscribe(
    (response) => {
              console.log('Email sent successfully', response);
              this.signupSuccess = true;
        this.loginmessage = "Email sent successfully !";
        setTimeout(() => this.signupSuccess = false, 5000);

    },
    (error) => {
      
      console.error('Failed to send email', error);
       const errorMessage = error.error.message || 'Failed to send reset email. Please try again later.';
        this.loginError = errorMessage;
        setTimeout(() => this.loginError = null, 5000);
      
    }
  );
}


}
