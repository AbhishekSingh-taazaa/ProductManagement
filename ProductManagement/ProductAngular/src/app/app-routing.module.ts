import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AsycListComponent } from './asyc-list/asyc-list.component';
import { HomeComponent } from './home/home.component';
import { AddProductComponent } from './Operations/add-product/add-product.component';
import { DeleteProductComponent } from './Operations/delete-product/delete-product.component';
import { FindProductComponent } from './Operations/find-product/find-product.component';
import { UpdateProductComponent } from './Operations/update-product/update-product.component';
import { SubListComponent } from './sub-list/sub-list.component';

const routes: Routes = [
  {
    path : 'home',
    component : HomeComponent,
    children : [
    
        
          {
            path: 'AsyncList', 
            component: AsycListComponent,
          },
          {
            path: 'SubscriberList',
            component: SubListComponent, 
          },
        
        
      
    ]
  },
  {
    path : 'add-product',
    component :AddProductComponent
  },
  {
    path : 'find-product',
    component :FindProductComponent
  },
  {
    path : 'update-product',
    component :UpdateProductComponent
  },
  {
    path : 'delete-product',
    component :DeleteProductComponent
  },
  {
    path:'' , redirectTo:'home',pathMatch:'full'} ,
 
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
