import { Component, OnInit } from '@angular/core';
import { WishComponent } from './wish/wish.component';
import { ContactComponent } from './contact/contact.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  imports: [WishComponent, ContactComponent],
})
export class AppComponent {}
