import { Component } from '@angular/core';
import { LayoutComponent } from '../layout/layout.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manageuserslist',
  standalone: true,
  imports: [LayoutComponent, CommonModule],
  templateUrl: './manageuserslist.component.html',
  styleUrl: './manageuserslist.component.css'
})
export class ManageuserslistComponent {

}
