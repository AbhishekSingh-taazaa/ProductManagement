import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { products } from 'src/app/Product';
import { ProductServiceService } from 'src/app/product-service.service';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css']
})
export class DeleteProductComponent implements OnInit {
  DeleteProductForm : FormGroup;
  product : products ;
  Product$ : Observable<products>;

  constructor(private formBuilder: FormBuilder, private productservice:ProductServiceService,private _snackBar: MatSnackBar) {
   
    this.Product$ = new Observable();
   
   }

  ngOnInit(): void {

    this.DeleteProductForm = this.formBuilder.group({
      id : [null,[Validators.required]]
    });
      

  }

  deleteProduct(){
 this.productservice.deleteProductById(this.DeleteProductForm.value.id).subscribe(data => {
  let snackBarRef = this._snackBar.open('Deleted', 'Ok'); 
  
  console.log(data)});
 
   
  }

  


}
