import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-productdetails',
  imports: [CommonModule],
  templateUrl: './productdetails.component.html',
  styleUrl: './productdetails.component.css',
  standalone: true,
})
export class ProductdetailsComponent implements OnInit {

  product: any = {};

  constructor(private store: ProductsService, private route: ActivatedRoute) { }

  //ParamMaps it's a observable that contains the route params 
  // defined in routes.ts in this case /:id
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id');

      if (id) {
        this.store.getProduct(parseInt(id, 10)).subscribe(product => this.product = product);
      }

    })
  }


}
