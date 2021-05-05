import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { products } from 'src/app/Product';

import { ProductServiceService } from 'src/app/product-service.service';

function priceCheckValidater(min :number , max:number) : ValidatorFn
{

  return(pricecheck : AbstractControl) : {[key : string] : boolean} | null =>
  {
    if(pricecheck.value !== undefined && Number.isNaN(pricecheck.value) || pricecheck.value<=min || pricecheck.value>max)
    {
      return {'pricevalidater' : true}
    }
    return null;
  };
}

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

inStockValue : boolean = false;

ProductForm : FormGroup ;

item : products;

min = 100;
max = 100000;

  constructor(private formBuilder: FormBuilder, private productservice:ProductServiceService,private snackbar : MatSnackBar) { }

  ngOnInit(): void {

    this.ProductForm = this.formBuilder.group({

      title : [null,[Validators.required]],
      price : [null,[Validators.required,priceCheckValidater(this.min,this.max)]],
      quantity : [null,[Validators.required]],
      colour : [null,[Validators.required]],
      inStock : [,[Validators.required]]

    });
    this.formcontrolValueChanged();

 


  }

  login(){
    
    console.log(this.ProductForm.value);
    

  }
  formcontrolValueChanged(){

    this.ProductForm.get('inStock')?.valueChanges.subscribe((data : string)=>
    {
      console.log(data);
      if(data === "true"){
           this.inStockValue = true;
           console.log("Getting "+this.inStockValue);
      }
      else if(data === "false"){
        this.inStockValue = false;
        console.log("Getting "+this.inStockValue);
      }
     
    });
  }

  addProduct(){

    this.item = this.ProductForm.value;
   
    let product1 = {
      id : 121,
      title : this.item.title,
      price : this.item.price,
      quantity : this.item.quantity,
      colour : this.item.colour,
      inStock : this.inStockValue,
    }
    this.productservice.AddToProductList(product1).subscribe(
      data =>{
        let snackbar =  this.snackbar.open('Added Successfully','Ok');
        console.log(data);
      }
    )
    
  }
}
