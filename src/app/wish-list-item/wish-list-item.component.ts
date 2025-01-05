import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WishItem } from '../../shared/models/whishItem';

@Component({
  selector: 'wish-list-item',
  imports: [CommonModule, FormsModule],
  templateUrl: './wish-list-item.component.html',
  styleUrl: './wish-list-item.component.css',
})
export class WishListItemComponent implements OnInit {
  @Input() wishText!: string; //non null

  @Input() fullfilled!: boolean;
  @Output() fullfilledChange = new EventEmitter<boolean>();

  // either returning a ternary expression or a object for style is acceptable
  get cssClasses() {
    // return this.fullfilled ? ['strikeout', 'text-muted'] : [];

    return { 'strikeout text-muted': this.fullfilled };
  }

  ngOnInit(): void {}

  toggleFullfilled() {
    this.fullfilled = !this.fullfilled;
    this.fullfilledChange.emit(this.fullfilled);
  }
}
