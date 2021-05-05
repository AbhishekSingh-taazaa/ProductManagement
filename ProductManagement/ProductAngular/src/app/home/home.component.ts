import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { products } from '../Product';
import { ProductServiceService } from '../product-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  productlist : products[] =[];
  productsub : Subscription;
  items$ : Observable<products[]>;
  
  constructor(private productservice : ProductServiceService) {
    this.items$ = new Observable<products[]>();
    this.productsub = new Subscription();
   }
 
   ngOnInit(): void {
     this.items$ = this.productservice.getProductList();

     this.productsub = this.productservice.getProductList().subscribe(
      data =>{
        this.productlist = data
      },
      () => console.log('complete')
    )
  }

  ngOnDestroy(): void {
    
  }


}
