import { Component } from '@angular/core';
import { HeaderconducteurComponent } from '../headerconducteur/headerconducteur.component';
import { SidebarconducteurComponent } from '../sidebarconducteur/sidebarconducteur.component';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-layoutconducteur',
  standalone: true,
  imports: [ HttpClientModule,RouterOutlet, SidebarconducteurComponent,HeaderconducteurComponent, FooterComponent],
  templateUrl: './layoutconducteur.component.html',
  styleUrl: './layoutconducteur.component.css'
})
export class LayoutconducteurComponent {

}
