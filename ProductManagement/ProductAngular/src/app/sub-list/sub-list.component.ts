import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { products } from '../Product';

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

  constructor( private cd : ChangeDetectorRef) { 
    
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
          console.log(this.productlistsub);
        }
      );


  }

  AllProducts:products[]= this.productlistsub;
  displayedColumns: string[] = ['ID', 'TITLE', 'PRICE','QUANTITY','COLOR','INSTOCK' ];

}
