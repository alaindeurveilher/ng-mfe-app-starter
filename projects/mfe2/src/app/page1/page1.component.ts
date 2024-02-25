import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-page1',
  standalone: true,
  imports: [MatSlideToggleModule, MatButtonModule],
  templateUrl: './page1.component.html',
  styleUrl: './page1.component.scss'
})
export class Page1Component {

}
