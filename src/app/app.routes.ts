import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FirstComponent } from './first/first.component';
import { SecondComponent } from './second/second.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ContactComponent } from './contact/contact.component';


export const routes: Routes = [
    { path: '', component: FirstComponent },
    { path: 'second-component', component: SecondComponent },
    { path: 'contact', component: ContactComponent },
    { path: '**', component: NotFoundComponent },


];
