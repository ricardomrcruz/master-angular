import { Component } from '@angular/core';
import { WishItem } from '../../shared/models/whishItem';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'wish-list',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.css',
})
export class WishListComponent {
  wishes: WishItem[] = [];

  toggleItem(item: WishItem) {
    item.isComplete = !item.isComplete;
    console.log(item);
  }
}
