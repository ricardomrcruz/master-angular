import { Component, OnInit } from '@angular/core';
import { WishItem } from '../../shared/models/whishItem';
import { EventService } from '../../shared/services/EventService';
import { WishService } from '../wish/wish.service';
import {
  WishListComponent,
  AddWishFormComponent,
  WishFilterComponent,
} from '../wish';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'wish-component',
  imports: [
    FormsModule,
    CommonModule,
    WishListComponent,
    AddWishFormComponent,
    WishFilterComponent,
  ],
  templateUrl: './wish.component.html',
  styleUrl: './wish.component.css',
  standalone: true,
})
export class WishComponent implements OnInit {
  items: WishItem[] = [];

  filter = (item: WishItem) => item;

  constructor(events: EventService, private wishService: WishService) {
    events.listen('removeWish', (wish: any) => {
      let index = this.items.indexOf(wish);
      this.items.splice(index, 1);
    });
  }

  ngOnInit(): void {
    this.wishService.getWishes().subscribe(
      (data: any) => {
        this.items = data;
      },
      (error: any) => {
        alert(error.message);
      }
    );
  }
}
