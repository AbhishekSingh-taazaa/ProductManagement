import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AsycListComponent } from './asyc-list/asyc-list.component';
import { SubListComponent } from './sub-list/sub-list.component';

import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';

import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';

import { AddProductComponent } from './Operations/add-product/add-product.component';
import { FindProductComponent } from './Operations/find-product/find-product.component';
import { UpdateProductComponent } from './Operations/update-product/update-product.component';
import { DeleteProductComponent } from './Operations/delete-product/delete-product.component';
import { HomeComponent } from './home/home.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';



  const ProductOperationsRoute : Routes = [
    {
      path : 'products',
      component : HomeComponent
    },
    {
      path : 'update-product/:id',
      component : UpdateProductComponent
    },
    {
      path : 'find-product/:id',
      component : FindProductComponent
    }
  ];

@NgModule({
  declarations: [
    AppComponent,
    AsycListComponent,
    SubListComponent,
    AddProductComponent,
    FindProductComponent,
    UpdateProductComponent,
    DeleteProductComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule.forChild(ProductOperationsRoute),



    MatTableModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatCardModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSelectModule,
    MatTabsModule,
    MatSnackBarModule,
    MatCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
