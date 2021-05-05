import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { products } from '../Product';

@Component({
  selector: 'app-asyc-list',
  templateUrl: './asyc-list.component.html',
  styleUrls: ['./asyc-list.component.css'],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class AsycListComponent implements OnInit {

  @Input() list : Observable<products[]> ;
  constructor() {
    this.list = new Observable<products[]>();
   }

  ngOnInit(): void {
  }
  displayedColumns: string[] = ['ID', 'TITLE', 'PRICE','QUANTITY','COLOR','INSTOCK' ];
}
