import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
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
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  inStockValue : boolean = false;

  ProductForm : FormGroup ;
  Product$ : Observable<products>;
  visible : boolean = false;
  item : products;

  productidtoedit: number;
  idcheck : boolean

  
  Produt$Id : Observable<products>;
  visiblesearchbar : boolean = true;
  
  min = 100;
  max = 100000;
  
    constructor(private formBuilder: FormBuilder, private productservice:ProductServiceService,private snackbar : MatSnackBar,private route: ActivatedRoute) { 
      this.Product$ = new Observable<products>();
    }
  
    ngOnInit(): void {
  
      this.ProductForm = this.formBuilder.group({
        id : [null,[Validators.required]],
        title : [null,[Validators.required]],
        price : [null,[Validators.required,priceCheckValidater(this.min,this.max)]],
        quantity : [null,[Validators.required]],
        colour : [null,[Validators.required]],
        inStock : [false,[Validators.required]]
  
      });
      this.formcontrolValueChanged();
  
      this.route.params.subscribe(
        p =>{
  
          let idnew = p.id as number;
          this.idcheck  =isNaN(idnew);
       
       if(this.idcheck == false){
     
        this.Produt$Id = this.productservice.getProduct(idnew);
        this.Produt$Id.subscribe( data =>{
  
          if(data)
          {
            this.visiblesearchbar = false;
            this.visible=true;
           this.ProductForm.get("title")?.setValue(data.title);
           this.ProductForm.get("price")?.setValue(data.price);
           this.ProductForm.get("quantity")?.setValue(data.quantity);
           this.ProductForm.get("colour")?.setValue(data.colour);
           this.ProductForm.get("inStock")?.setValue(data.inStock);
           this.ProductForm.get("id")?.setValue(idnew);
         
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

    findProduct(){
      this.Product$ = this.productservice.getProduct(this.ProductForm.value.id);
     this.Product$.subscribe(data => {
       
       if(data)
     {
       
      this.ProductForm.get("title")?.setValue(data.title);
      this.ProductForm.get("price")?.setValue(data.price);
      this.ProductForm.get("quantity")?.setValue(data.quantity);
      this.ProductForm.get("colour")?.setValue(data.colour);
      this.ProductForm.get("inStock")?.setValue(data.inStock);
      this.visible=true;
    
     }
    
     
     });
     this.visible=false; 
    
    }
  
    
  
    updateProduct(){
  
      this.item = this.ProductForm.value;
     
      let product1 = {
        id : this.item.id,
        title : this.item.title,
        price : this.item.price,
        quantity : this.item.quantity,
        colour : this.item.colour,
        inStock : this.inStockValue,
      }
      this.productservice.UpdateToProductList(product1).subscribe(
        data =>{
          let snackbar =  this.snackbar.open('Updated Successfully','Ok');
          console.log(data);
        }
      )
      
    }

  
}
