import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { Categories } from '../../../Models/Category';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { Http } from '@angular/http';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['../../../decorator.css']
})
export class CategoryComponent implements OnInit {
  public categories: Categories[] = [];
  constructor(private categoryService: CategoryService,private router: Router) { }

  ngOnInit() {
    //GetAllcategories From CategoryService
    this.categoryService.getAllCategories().subscribe(response => {this.categories = response});  
  }
   
  getProducts = function(categoryID){
    this.router.navigate(['/product/' + categoryID]);
  }   
}
