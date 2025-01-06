import { Component } from '@angular/core';
import { WishItem } from '../shared/models/whishItem';
import events from '../shared/services/EventService';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: false,
})
export class AppComponent {
  items: WishItem[] = [
    new WishItem('To Learn Angular'),
    new WishItem('To Get Some coffee', true),
    new WishItem('Find grass that cuts itself'),
  ];

  filter = (item: WishItem) => item;

  constructor() {
    events.listen('removeWish', (wish: any) => {
      //todo remove wish from items
      console.log(wish);
    });
  }
}
