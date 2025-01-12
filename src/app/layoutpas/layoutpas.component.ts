import { Component } from '@angular/core';
import { SidebarpasComponent } from '../sidebarpas/sidebarpas.component';
import { HeaderpasComponent } from '../headerpas/headerpas.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layoutpas',
  standalone: true,
  imports: [RouterOutlet,SidebarpasComponent,HeaderpasComponent, FooterComponent],
  templateUrl: './layoutpas.component.html',
  styleUrl: './layoutpas.component.css'
})
export class LayoutpasComponent {

}
