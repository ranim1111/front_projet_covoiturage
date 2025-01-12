import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileadminComponent } from './profileadmin/profileadmin.component';
import { ManageuserslistComponent } from './manageuserslist/manageuserslist.component';
import { LayoutconducteurComponent } from './layoutconducteur/layoutconducteur.component';
import { LayoutpasComponent } from './layoutpas/layoutpas.component';
import { ListetrajetsComponent } from './trajets/listetrajets/listetrajets.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login-page', component: LoginComponent},
    {path: 'forgotpassword-page', component: ForgetpasswordComponent},
    {path: 'resetpassword-page', component: ResetpasswordComponent},
    {path: 'layoutadmin', component: LayoutComponent},
    {path: 'dashboardadmin', component: DashboardComponent},
    {path: 'profileadmin', component: ProfileadminComponent,canActivate: [AuthGuard]},
    {path: 'manageusers', component: ManageuserslistComponent},
    {path: 'layoutpasager', component: LayoutpasComponent},
    {path: 'layoutconducteur', component: LayoutconducteurComponent},
    {path: 'listetrajets', component: ListetrajetsComponent},
];
