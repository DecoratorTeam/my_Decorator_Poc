import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpModule } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class CategoryService {

  constructor(private http: Http) { }
  
   //GetAllCategories From API
  getAllCategories(){
    var res=this.http.get('http://localhost:3000/GetAllCategories').map(categories => categories.json());
    console.log(res);
    return res;
  }
}
