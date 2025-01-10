import { Component } from '@angular/core';
import { Router, RouterOutlet, RouterLink } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  imports: [RouterOutlet, RouterLink]
})
export class AppComponent {

  constructor(private router: Router) { }

  title = 'router-app';

  goToContact() {
    this.router.navigate(['contact'])
  }

}
