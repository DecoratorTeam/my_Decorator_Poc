import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductService {

  constructor(private http: Http) { }
  
   //GetProductsByCatgeoryID From API
   getProductsByCategoryId(categoryID){
    var res=this.http.get('https://decoratorpoc.azurewebsites.net/GetProductsByCategoryId/'+ categoryID).map(products => products.json());
    console.log(res);
    return res;
  }

}
  