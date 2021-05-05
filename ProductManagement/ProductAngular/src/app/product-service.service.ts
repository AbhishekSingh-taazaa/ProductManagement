import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';

import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { products } from './Product';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(private http : HttpClient,private snackbar : MatSnackBar) { }

   
   getProductList(): Observable<products[]>{

    const apiurl1 = environment.newapiurl+"Products";
    const headers = {'content-type' : 'application/json'};

    return this.http.get<products[]>(apiurl1,{'headers':headers}).pipe(
      tap(data =>{console.log(data)}),
      catchError(error=> {
   let snackbar =  this.snackbar.open('Error No LIST Found','Ok');
      return throwError(error)}));
    
  }

  AddToProductList(product : products){

    const apiurl1 = environment.newapiurl+"Products";
    const headers = {'content-type' : 'application/json'};
    Object.defineProperty(product,"id",{'enumerable':false});
    const productAdd = JSON.stringify(product);
    console.log(product);

    return this.http.post<products>(apiurl1,productAdd,{headers : headers}).pipe(
      tap((product : any) =>{
        console.log(product)
      }),
      catchError(error=> {
      let snackbar= this.snackbar.open('Error Occur','Ok');
        return throwError(error)})
    );
  }

  UpdateToProductList(product : products){

    const apiurl1 = environment.newapiurl+"Products/"+ product.id;
    const headers = {'content-type' : 'application/json'};

    const productAdd = JSON.stringify(product);
    console.log(product);

    return this.http.put<products>(apiurl1,productAdd,{headers : headers}).pipe(
      tap((product : any) =>{
        console.log(product)
      }),
      catchError(error=> {
        let snackdelete = this.snackbar.open('Error Id Not Found','Ok');
        return throwError(error)})
    );
  }

 getProduct(id : number) : Observable<products>{
  const apiurl1 = environment.newapiurl+"Products/"+ id;
  const headers = {'content-type' : 'application/json','accept' : 'application/json'};

  return this.http.get<products>(apiurl1,{'headers':headers}).pipe(tap(data =>{console.log(data)}),
  catchError(error=> {
    let snackdelete = this.snackbar.open('Error Id not found','Ok');
    return throwError(error)}));

 }
deleteProductById(id : number) : Observable<products>{

  const apiurl1 = environment.newapiurl+"Products/"+ id;
  const headers = {'content-type' : 'application/json','accept' : 'application/json'};

  return this.http.delete<products>(apiurl1,{'headers' : headers}).pipe(
    tap(data =>{console.log(data)}),
    catchError(error=> {
      let snackdelete = this.snackbar.open('Error Id not found','Ok');
      return throwError(error)
    }));
}




}
