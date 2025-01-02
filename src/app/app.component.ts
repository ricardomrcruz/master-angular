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
    new WishItem('To Learn Angular'),
    new WishItem('To Get Some coffee', true),
    new WishItem('Find grass that cuts itself'),
  ];

  listFilter: String = '0';

  newWishText = '';

  title = 'heyyyyyyy';

  visibleItems: WishItem[] = this.items;

  addNewWish() {
    this.items.push(new WishItem(this.newWishText));
    this.newWishText = '';
  }

  filterChanged(value: any) {
    if (value === '0') {
      this.visibleItems = this.items;
    } else if (value === '1') {
      this.visibleItems = this.items.filter((item) => !item.isComplete);
    } else {
      this.visibleItems = this.items.filter((item) => item.isComplete);
    }
  }

  toggleItem(item: WishItem) {
    item.isComplete = !item.isComplete;
    console.log(item);
  }
}
