import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderpasComponent } from '../headerpas/headerpas.component';


@Component({
  selector: 'app-sidebarpas',
  standalone: true,
  imports: [CommonModule, FormsModule,HeaderpasComponent, HttpClientModule,RouterModule],
  templateUrl: './sidebarpas.component.html',
  styleUrl: './sidebarpas.component.css'
})
export class SidebarpasComponent {

}
