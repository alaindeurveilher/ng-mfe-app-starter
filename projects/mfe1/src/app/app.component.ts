import { Component, WritableSignal, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { Feat1Component } from './feat1/feat1.component';
import { Feat2Component } from './feat2/feat2.component';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatButton, MatIconModule, HeaderComponent, Feat1Component, Feat2Component],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'mfe1';
  protected displayedFeature: WritableSignal<'one' | 'two'> = signal<'one' | 'two'>('one');

  protected onFeatureChange(feature: 'one' | 'two'): void {
    this.displayedFeature.set(feature);
  }
}
