import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { products } from '../Product';
import { ProductServiceService } from '../product-service.service';

@Component({
  selector: 'app-asyc-list',
  templateUrl: './asyc-list.component.html',
  styleUrls: ['./asyc-list.component.css'],
  // changeDetection : ChangeDetectionStrategy.OnPush
})
export class AsycListComponent implements OnInit{

  idnew : number;
  @Input() list : Observable<products[]> ;
  constructor(private productservice : ProductServiceService,private cd : ChangeDetectorRef) {
    this.list = new Observable<products[]>();
   }
 gOnChanges(changes: SimpleChanges): void {
   this.cd.markForCheck();  console.log("ngOnChanges");
  }

  ngOnInit(): void {
    console.log("oninit");
  }
  deleteitem(id : number){
    this.idnew = id;
    this.productservice.deleteProductById(this.idnew).pipe(
      switchMap(data => {return this.list})
    ).subscribe(()=>{ this.cd.markForCheck()});
  }
  editproduct(id : number){

    this.productservice.getProduct(id).subscribe();

  }

  displayedColumns: string[] = ['ID', 'TITLE', 'PRICE','QUANTITY','COLOR','INSTOCK' ];
}
