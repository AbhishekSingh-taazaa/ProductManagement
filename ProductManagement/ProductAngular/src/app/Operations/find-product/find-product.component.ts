import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { products } from 'src/app/Product';
import { ProductServiceService } from 'src/app/product-service.service';

@Component({
  selector: 'app-find-product',
  templateUrl: './find-product.component.html',
  styleUrls: ['./find-product.component.css']
})
export class FindProductComponent implements OnInit {

  FindProductForm : FormGroup;
  product : products ;
  Product$ : Observable<products>;

  constructor(private formBuilder: FormBuilder, private productservice:ProductServiceService) {
   
    this.Product$ = new Observable();
   
   }

  ngOnInit(): void {

    this.FindProductForm = this.formBuilder.group({
      id : [null,[Validators.required]]
    });
      

  }

  findProduct(){
    this.Product$ = this.productservice.getProduct(this.FindProductForm.value.id);
   this.Product$.subscribe(data => {
    this.product = data;
     console.log(this.product);
   });
   
  }

  
}
