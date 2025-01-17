import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  street: string;
  city: string;
  zipcode: string;
  company: string;
  position: string;
  experience: number;
}


@Injectable({
  providedIn: 'root'
})
export class WizardService {

  //initialise empty form data
  private formData: FormData = {
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    zipcode: '',
    company: '',
    position: '',
    experience: 0
  }

  //create a BehaviourSubject to hold our form state
  private formState = new BehaviorSubject<FormData>(this.formData);

  //Observable to subscribe to a form state changes
  getFormState(): Observable<FormData> {
    return this.formState.asObservable();
  }

  //update form data
  updateFormData(data: Partial<FormData>): void {
    this.formData = { ...this.formData, ...data };
    this.formState.next(this.formData);
  }

  //reset form data
  resetForm(): void {
    this.formData = {
      firstName: '',
      lastName: '',
      email: '',
      street: '',
      city: '',
      zipcode: '',
      company: '',
      position: '',
      experience: 0
    };
    this.formState.next(this.formData);
  }





  // constructor() { }
}
