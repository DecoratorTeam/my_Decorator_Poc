import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductdetailService {

  constructor(private http: Http) { }
 
  //GetProductAndImagesByProductID
  getProductAndImagesByProductID(productID){
    var res=this.http.get('https://decoratorpoc.azurewebsites.net/GetProductAndImagesByProductID/'+ productID).map(products => products.json());
    console.log(JSON.stringify(res));
     return res;
  }
}
