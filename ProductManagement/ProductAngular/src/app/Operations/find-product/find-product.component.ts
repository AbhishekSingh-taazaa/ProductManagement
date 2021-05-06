import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Observable, Subscription } from 'rxjs';
import { products } from 'src/app/Product';
import { ProductServiceService } from 'src/app/product-service.service';

@Component({
  selector: 'app-find-product',
  templateUrl: './find-product.component.html',
  styleUrls: ['./find-product.component.css'],
  
})
export class FindProductComponent implements OnInit {

  FindProductForm : FormGroup;
  product : products ;
  productidtoedit: number;
  idcheck : boolean
   idnew : number;
  Product$ : Observable<products>;
  Produt$Id : Observable<products>;
  visible : boolean = false;
  visiblesearchbar : boolean = true;
  constructor(private formBuilder: FormBuilder, private productservice:ProductServiceService,private route: ActivatedRoute) {
   
    this.Product$ = new Observable();
   
   }

  ngOnInit(): void {

    this.FindProductForm = this.formBuilder.group({
      id : [null,[Validators.required]],
      title : [null],
      price : [],
      quantity : [],
      colour :[],
      inStock :[]
    });
      
    this.route.params.subscribe(
      p =>{

         this.idnew = p.id as number;
        this.idcheck  =isNaN(this.idnew);
     
     if(this.idcheck == false){
   
      this.Produt$Id = this.productservice.getProduct(this.idnew);
      this.Produt$Id.subscribe( data =>{

        if(data)
        {
          this.visiblesearchbar = false;
          this.visible=true;
         this.FindProductForm.get("title")?.setValue(data.title);
         this.FindProductForm.get("price")?.setValue(data.price);
         this.FindProductForm.get("quantity")?.setValue(data.quantity);
         this.FindProductForm.get("colour")?.setValue(data.colour);
         this.FindProductForm.get("inStock")?.setValue(data.inStock);
         this.FindProductForm.get("id")?.setValue(data.id);
         this.productidtoedit=data.id;
        }
      });
      this.visible=false; 
      this.visiblesearchbar = true; 
    
     }
     else if(this.idcheck == true){
      console.log("Value is Not a Number"); 
    }
  
       }
    );

  }

  findProduct(){
    this.Product$ = this.productservice.getProduct(this.FindProductForm.value.id);
   this.Product$.subscribe(data => {
    
     if(data)
   {
     
    this.FindProductForm.get("title")?.setValue(data.title);
    this.FindProductForm.get("price")?.setValue(data.price);
    this.FindProductForm.get("quantity")?.setValue(data.quantity);
    this.FindProductForm.get("colour")?.setValue(data.colour);
    this.FindProductForm.get("inStock")?.setValue(data.inStock);
    this.visible=true;
    this.productidtoedit=data.id;
   }
  
   
   });
   this.visible=false; 
  
  }

  
}
