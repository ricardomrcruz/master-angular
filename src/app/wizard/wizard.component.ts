import { Component } from '@angular/core';
import { WizardService } from './wizard.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { StepperOrientation } from '@angular/material/stepper';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { Observable, zip } from 'rxjs';

@Component({
  selector: 'app-wizard',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './wizard.component.html',
  styleUrl: './wizard.component.css'
})
export class WizardComponent implements OnInit {

  personalInfoForm: FormGroup;
  addressForm: FormGroup;

  isLinear = false;


  // creates form group for personal info with validation
  constructor(private fb: FormBuilder, private wizardService: WizardService) {
    this.personalInfoForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]]
    })

    this.addressForm = this.fb.group({
      street: ['', [Validators.required]],
      city: ['', [Validators.required]],
      zipcode: ['', [Validators.required, Validators.pattern('^[0-9]{5}(?:-[0-9]{4})?$')]],
    })
  }

  ngOnInit(): void {
    // subscribe to form state changes to populate the form if data exists
    this.wizardService.getFormState().subscribe(data => {
      this.personalInfoForm.patchValue({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
      });
    });

    this.wizardService.getFormState().subscribe(data => {
      this.addressForm.patchValue({
        street: data.street,
        city: data.city,
        zipCode: data.zipcode,
      });
    })
  }

  // to save form data when clicking on next step
  savePersonalInfo(): void {
    if (this.personalInfoForm.valid) {
      this.wizardService.updateFormData(this.personalInfoForm.value);
    }
  }

  saveAddressInfo(): void {
    if (this.addressForm.valid) {
      this.wizardService.updateFormData(this.addressForm.value)
    }
  }
}
