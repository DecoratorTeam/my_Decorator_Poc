import { Component, OnInit} from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { Products } from '../../../Models/Product';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { Http } from '@angular/http';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['../../../decorator.css']
})

export class ProductComponent implements OnInit {
  public products: Products[] = [];
  public categoryID: string;

  constructor(private productService: ProductService,private activatedRoute: ActivatedRoute,private router: Router) { }
 
  ngOnInit() {
    //Get CategoryID
    this.categoryID = this.activatedRoute.snapshot.paramMap.get('categoryID');
    
    //GetProductsByCategoryId From ProductService
    this.productService.getProductsByCategoryId(this.categoryID).subscribe(response => {this.products = response}); 
  }
  getProduct = function(categoryID){
    console.log(categoryID);
    this.router.navigate(['/productdetail/' + categoryID]);
  }
}
