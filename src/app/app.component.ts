import { Component, OnInit } from '@angular/core';
import { WishComponent } from './wish/wish.component';
import { ContactComponent } from './contact/contact.component';
import { Router, RouterOutlet, RouterLink, } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  // imports: [WishComponent, ContactComponent], part I
  // imports: [ContactComponent], part II
  imports: [RouterOutlet, RouterLink]
})
export class AppComponent {

  constructor(private router: Router) { }
  title = 'router-app';


  goToContact() {
    this.router.navigate(['contact'])
  }
}
