import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { WishItem } from '../../../shared/models/whishItem';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'add-wish-form',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './add-wish-form.component.html',
  styleUrl: './add-wish-form.component.css',
})

// the output of the addWish attribute creates a channel to WishItem objects
//this emitter will then be used inside a addNewWish func to create the objects
export class AddWishFormComponent {
  @Output() addWish = new EventEmitter<WishItem>();

  newWishText = '';

  addNewWish() {
    // this.items.push(new WishItem(this.newWishText)); //this was the original func

    this.addWish.emit(new WishItem(this.newWishText));
    this.newWishText = '';
  }
}
