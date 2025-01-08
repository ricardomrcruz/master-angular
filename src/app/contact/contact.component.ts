import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { createInvalidEmailDomainValidator } from './invalidEmailDomain';

const invalidEmailDomain = createInvalidEmailDomainValidator(['gmail.com', 'yahoo.com', 'hotmail.com'])

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
  standalone: true,
})
export class ContactComponent implements OnInit {
  constructor() { }

  ngOnInit(): void { }

  contactForm = new FormGroup({
    senderName: new FormControl('', Validators.required),
    senderEmail: new FormControl('', [
      Validators.required,
      Validators.email,
      invalidEmailDomain,
    ]),
    senderMessage: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
  });

  submitForm() {
    console.log(this.contactForm.valid);

    // if (this.senderNameControl.dirty) {
    //   alert('you changed the name field.');
    // }
  }
}
