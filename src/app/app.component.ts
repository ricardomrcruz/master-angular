import { Component } from '@angular/core';
import { WishItem } from '../shared/models/whishItem';

const filters = [
  (item: WishItem) => item,
  (item: WishItem) => !item.isComplete,
  (item: WishItem) => item.isComplete,
];

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

  listFilter: any = '0';

  newWishText = '';

  title = 'heyyyyyyy';

  get visibleItems(): WishItem[] {
    return this.items.filter(filters[this.listFilter]);
  }

  addNewWish() {
    this.items.push(new WishItem(this.newWishText));
    this.newWishText = '';
  }
}
