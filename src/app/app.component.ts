import { Component, OnInit } from '@angular/core';
import { WishComponent } from './wish/wish.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  imports: [WishComponent],
})
export class AppComponent {}
