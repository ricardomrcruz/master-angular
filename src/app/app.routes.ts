import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FirstComponent } from './first/first.component';
import { SecondComponent } from './second/second.component';
import { NotFoundComponent } from './not-found/not-found.component';


export const routes: Routes = [
    { path: '', component: FirstComponent },
    { path: 'second-component', component: SecondComponent },
    { path: '**', component: NotFoundComponent },


];
