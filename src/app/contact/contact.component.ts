import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
  standalone: true,
})
export class ContactComponent implements OnInit {
  ngOnInit(): void {}

  constructor() {}

  senderNameControl = new FormControl('');
  senderEmailControl = new FormControl('');
  senderMessageControl = new FormControl('');

  submitForm() {
    if (this.senderNameControl.dirty) {
      alert('you changed the name field.');
    }
  }
}
