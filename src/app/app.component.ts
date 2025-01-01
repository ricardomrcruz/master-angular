import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WishItem } from '../shared/models/whishItem';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  items: WishItem[] | never = [
    new WishItem('To Learn Angular'),
    new WishItem('To Get Some coffee', true),
    new WishItem('Find grass that cuts itself'),
  ];
  title = 'heyyyyyyy';

  toggleItem(e: any) {
    console.log(e);
  }
}
