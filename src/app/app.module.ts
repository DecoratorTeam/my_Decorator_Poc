import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CategoryComponent } from './components/home/category/category.component';
import { CategoryService } from './services/category.service';
import { ProductService } from './services/product.service';
import { ProductdetailService} from './Services/productdetail.service';
import { ProductComponent } from './Components/Home/product/product.component';
import { ProductDetailComponent } from './components/home/product-detail/product-detail.component';
import { DesignerToolComponent } from './components/home/designer-tool/designer-tool.component';
import { HeaderComponent } from './components/home/header/header.component';


const appRoutes: Routes = [
  {path:'',component:CategoryComponent},
  {path:'product/:categoryID',component:ProductComponent},
  {path:'productdetail/:productID',component:ProductDetailComponent},
  {path:'designertool/:productID/:productColor/:canvasTop/:canvasLeft/:canvasWidth/:canvasHeight/:mainCanvasWidth/:mainCanvasHeight',component:DesignerToolComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    ProductComponent,
    ProductDetailComponent,
    DesignerToolComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [CategoryService,ProductService,ProductdetailService],
  bootstrap: [AppComponent]
})
export class AppModule { }
