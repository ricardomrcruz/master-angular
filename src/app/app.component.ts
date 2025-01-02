import { Component } from '@angular/core';
import { WishItem } from '../shared/models/whishItem';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: false,
})
export class AppComponent {
  items: WishItem[] = [
    // new WishItem('To Learn Angular'),
    // new WishItem('To Get Some coffee', true),
    // new WishItem('Find grass that cuts itself'),
  ];

  newWishText = '';

  title = 'heyyyyyyy';

  addNewWish() {
    this.items.push(new WishItem(this.newWishText));
    this.newWishText = '';
  }

  toggleItem(item: WishItem) {
    item.isComplete = !item.isComplete;
    console.log(item);
  }
}
