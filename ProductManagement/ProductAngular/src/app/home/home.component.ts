import { ChangeDetectorRef, Component, DoCheck, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { products } from '../Product';
import { ProductServiceService } from '../product-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy,OnChanges {

  // productlist : products[] =[];
  // productsub : Subscription;
  items$ : Observable<products[]>;
  
  constructor(private productservice : ProductServiceService,private cd : ChangeDetectorRef) {
    this.items$ = new Observable<products[]>();
    // this.productsub = new Subscription();
   }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("Rex onchage");
    this.items$ = this.productservice.getProductList().pipe(switchMap(data =>
      { 
         return this.productservice.getProductList();
    }))
  }
 
 
   ngOnInit(): void {
     this.items$ = this.productservice.getProductList();

    //  this.productsub = this.productservice.getProductList().subscribe(
    //   data =>{
    //     this.productlist = data
    //     console.log(data);
    //   },
    //   () => console.log('complete')
    // )
  }

  ngOnDestroy(): void {
    
  }


}
