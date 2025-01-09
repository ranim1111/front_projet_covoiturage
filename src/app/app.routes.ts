import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { NavbaradminComponent } from './navbaradmin/navbaradmin.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'navbar', component: NavbarComponent},
    {path: 'navbaradmin', component: NavbaradminComponent},
    {path: 'login-page', component: LoginComponent},
    {path: 'forgotpassword-page', component: ForgetpasswordComponent},
    {path: 'resetpassword-page', component: ResetpasswordComponent},
];
