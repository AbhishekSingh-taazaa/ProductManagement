import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { products } from '../Product';
import { ProductServiceService } from '../product-service.service';

@Component({
  selector: 'app-sub-list',
  templateUrl: './sub-list.component.html',
  styleUrls: ['./sub-list.component.css'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class SubListComponent implements OnInit,OnChanges {

  @Input() Products$ : Observable<products[]>;
  productlistsub : products[] =[];
  productsub : Subscription;
  idnew : number;

  constructor( private cd : ChangeDetectorRef,private productservice : ProductServiceService) { 
    
    this.Products$ = new Observable();

    this.productsub = new Subscription();


  }
  ngOnChanges(): void {
    this.productsub= this.Products$.subscribe(
      data=>{this.productlistsub= data},
      error=>{
        console.log(error);
      },
      ()=>console.log('complete')
      
    )
  }

  ngOnInit(): void {

      this.productsub = this.Products$.subscribe(
        data => {
          this.productlistsub = data ;
          this.cd.markForCheck();
        
        }
      );


  }

  editproduct(id : number){
    this.productservice.getProduct(id).subscribe();

  }

  deleteitem(id : number){
    this.idnew = id;
    this.productservice.deleteProductById(this.idnew).pipe(
      switchMap(data => {return this.productlistsub})
    ).subscribe(()=>{ this.cd.markForCheck()});
  }

  AllProducts:products[]= this.productlistsub;
  displayedColumns: string[] = ['ID', 'TITLE', 'PRICE','QUANTITY','COLOR','INSTOCK','OPERATIONS' ];

}
