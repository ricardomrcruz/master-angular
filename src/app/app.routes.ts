import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { FirstComponent } from './first/first.component';
import { SecondComponent } from './second/second.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ContactComponent } from './contact/contact.component';
import { ProductsListComponent } from './products/products-list/products-list.component';
import { ProductdetailsComponent } from './products/productdetails/productdetails.component';
import { SpeechToTextComponent } from './speech-to-text/speech-to-text.component';


export const routes: Routes = [
    { path: '', component: FirstComponent },
    { path: 'second-component', component: SecondComponent },
    { path: 'speech-to-text', component: SpeechToTextComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'products', component: ProductsListComponent },
    { path: 'products/:id', component: ProductdetailsComponent },
    { path: '**', component: NotFoundComponent },
];
