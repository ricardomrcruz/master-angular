import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WishItem } from '../../../shared/models/whishItem';
import { EventService } from '../../../shared/services/EventService';

@Component({
  selector: 'wish-list-item',
  imports: [CommonModule, FormsModule],
  templateUrl: './wish-list-item.component.html',
  styleUrl: './wish-list-item.component.css',
  standalone: true,
})
export class WishListItemComponent implements OnInit {
  @Input() wish!: WishItem;

  // either returning a ternary expression or a object for style is acceptable
  get cssClasses() {
    // return this.fullfilled ? ['strikeout', 'text-muted'] : [];

    return { 'strikeout text-muted': this.wish.isComplete };
  }
  constructor(private events: EventService) {}

  ngOnInit(): void {}

  removeWish() {
    this.events.emit('removeWish', this.wish);
  }

  toggleFullfilled() {
    this.wish.isComplete = !this.wish.isComplete;
  }
}
