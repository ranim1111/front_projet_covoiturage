import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import Swal from 'sweetalert2';


@Component({
selector: 'app-login',
standalone: true,
imports: [CommonModule,FormsModule,HttpClientModule],
templateUrl: './login.component.html',
styleUrl: './login.component.css'
})
export class LoginComponent {
loginData = {
username: '',
password: ''
};

signupData = {
firstName: '',
lastName: '',
username: '',
email: '',
phoneNumber: '',
ville: '',
role: '',
naturePersonne: '',
password: '',
confirmPassword:''

};

isSignup = false;
signupSuccess = false;
loginError: string | null = null;
loginmessage: string | null = null;
confirmPassword: string = '';

constructor(private http: HttpClient, private router: Router) {}

toggleForm() {
this.isSignup = !this.isSignup;
}

onLogin(form: any) {
if (form.invalid) {
this.loginError = 'Please fill in all required fields.';
setTimeout(() => this.loginError = null, 6000);

return;


}
this.http.post('http://localhost:8081/api/auth/login', this.loginData).subscribe(
(response: any) => {
const token = response.token;
const userRole = response.role.name;
const username = response.username;
const phoneNumber = response.phonenumber;
const email = response.email;
const expirationTime = response.expiration;
const id = response.id;


console.log(response)
console.log(token);
localStorage.setItem('authToken', token);
localStorage.setItem('expirationTime', expirationTime);
localStorage.setItem('username', username);
localStorage.setItem('phoneNumber', phoneNumber);
localStorage.setItem('email', email);
localStorage.setItem('id', id);






Swal.fire({
        icon: 'success',
        title: 'Welcome back!',
        text: `${username}`,
        position: 'bottom-end',  // Position at the top-right corner
        toast: true,          // Toast style (small popup)
        showConfirmButton: false, // Hide the confirmation button
        timer: 8000 ,          // Close after 3 seconds
        background: '#eafaf1',
      });

if (userRole === 'CONDUCTEUR') {
this.router.navigate(['/listetrajets']);
} else if (userRole === 'ADMINISTATEUR'){
this.router.navigate(['/dashboardadmin']);
}else if(userRole === 'PASSAGER'){
this.router.navigate(['/homepas']);
}


console.log('Login successful', response);


},
(error) => {
console.error('Login failed', error);
const errorMessage = error.error || 'Login failed. Please check your credentials and try again.';
this.loginError = errorMessage;
setTimeout(() => this.loginError = null, 6000);
Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.error,
        position: 'top-end',
        toast: true,
        showConfirmButton: false,
        timer: 3000
      });
}
);
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
onSignup(form: any) {
console.log('Confirm Password:', this.confirmPassword);
console.log('Password:', this.signupData.password);
if (form.invalid) {
this.loginError = 'Please fill in all required fields.';

setTimeout(() => this.loginError = null, 6000);

return;


}
if (this.signupData.password !== this.signupData.confirmPassword) {
this.loginError='Passwords do not match.';
setTimeout(() => this.loginError = null, 6000);
return;
}
this.http.post('http://localhost:8081/api/auth/register', this.signupData).subscribe(
(response) => {
console.log('Signup successful', response);
this.router.navigate(['/login-page']);
window.location.reload();
this.signupSuccess = true;
this.loginmessage = 'Signup successful !';
setTimeout(() => this.signupSuccess = false, 6000);
this.signupData = {
firstName: '',
lastName: '',
username: '',
email: '',
phoneNumber: '',
ville: '',
role: '',
naturePersonne: '',
password: '',
confirmPassword: ''
};
this.confirmPassword = '';

},
(error) => {
console.error('Signup failed', error);
if (error.error && error.error.errors) {
const errors = error.error.errors;
const firstError = Object.values(errors)[0];
this.loginError = typeof firstError === 'string' ? firstError : 'Signup failed. Please check your information and try again.';
} else {
this.loginError = error.error.message;
}

setTimeout(() => this.loginError = null, 6000);
}
);
}


showingPage: string = 'account-page';




toggleView(): void {
this.showingPage = this.showingPage == 'login-page' ? 'account-page' : 'login-page';
}
}