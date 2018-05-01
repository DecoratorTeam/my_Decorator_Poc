import { Component, Pipe,PipeTransform, OnInit } from '@angular/core';
import { ProductdetailService } from '../../../Services/productdetail.service';
import { Products } from '../../../Models/Product';
import { ProductImages } from '../../../Models/productImage';
import { Router,ActivatedRoute, Params } from '@angular/router';
import { Http } from '@angular/http';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['../../../decorator.css']
})
export class ProductDetailComponent implements OnInit {
  public product : Products;
  public productID: string;
  imgurl = "";
  productImageColors = [];
  colorCodeImages = [];
  productImageColorCodes = [];
  productColor : string ;
  productColorCode : string;
  canvasTop: string = "20%";
  canvasLeft: string = "30%";
  canvasWidth : number = 200;
  canvasHeight : number = 200;
  mainCanvasWidth : number = 500;
  mainCanvasHeight : number = 700;
  constructor(private productDetailService : ProductdetailService,private activatedRoute: ActivatedRoute,private router: Router) { }

  ngOnInit() {
    //Get productID
    this.productID = this.activatedRoute.snapshot.paramMap.get('productID');
    //GetProductAndImagesByProductID
    this.productDetailService.getProductAndImagesByProductID(this.productID).subscribe(data => {   
         this.product = data["_batch"][0];
         this.imgurl = this.product.productImages[0].ImageURL;
         this.productColor = this.product.productImages[0].Colour;
         this.productColorCode = this.product.productImages[0].colourCode;
         switch(this.product.productID){
          case 3:
                  {
                    this.canvasTop = "15";
                    this.canvasLeft = "13";
                    this.canvasWidth = 270;
                    this.canvasHeight = 380;
                    this.mainCanvasHeight = 500;
                    this.mainCanvasWidth = 500;
                    break;
                  }
          case 4:
                  {
                    this.canvasTop = "30";
                    this.canvasLeft = "23";
                    this.canvasWidth = 190;
                    this.canvasHeight = 256;
                    this.mainCanvasHeight = 500;
                    this.mainCanvasWidth = 500;
                    break;
                  }
          case 5:
                  {
                    this.canvasTop = "10";
                    this.canvasLeft = "31";
                    this.canvasWidth = 340;
                    this.canvasHeight = 280;
                    this.mainCanvasHeight = 350;
                    this.mainCanvasWidth = 500;
                    break;
                  }
          case 6:
                  {
                    this.canvasTop = "10";
                    this.canvasLeft = "15";
                    this.canvasWidth = 385;
                    this.canvasHeight = 280;
                    this.mainCanvasHeight = 400;
                    this.mainCanvasWidth = 500;
                    break;
                  }

           case 7:
                  {
                    this.canvasTop = "25";
                    this.canvasLeft = "30";
                    this.canvasWidth = 220;
                    this.canvasHeight = 250;
                    this.mainCanvasHeight = 700;
                    this.mainCanvasWidth = 500;
                    break;
                  }
           case 8:
                  {
                    this.canvasTop = "31";
                    this.canvasLeft = "31";
                    this.canvasWidth = 233;
                    this.canvasHeight = 250;
                    this.mainCanvasHeight = 700;
                    this.mainCanvasWidth = 500;
                    break;
                  }
           case 9:
                  {
                    this.canvasTop = "31";
                    this.canvasLeft = "31";
                    this.canvasWidth = 210;
                    this.canvasHeight = 250;
                    this.mainCanvasHeight = 700;
                    this.mainCanvasWidth = 500;
                    break;
                  }
           case 10:
                  {
                    this.canvasTop = "25";
                    this.canvasLeft = "15";
                    this.canvasWidth = 300;
                    this.canvasHeight = 310;
                    this.mainCanvasHeight = 500;
                    this.mainCanvasWidth = 500;
                    break;
                  }
          case 11:
                  {
                    this.canvasTop = "31";
                    this.canvasLeft = "15";
                    this.canvasWidth = 260;
                    this.canvasHeight = 250;
                    this.mainCanvasHeight = 500;
                    this.mainCanvasWidth = 500;
                    break;
                  }
          case 12:
                  {
                    this.canvasTop = "25";
                    this.canvasLeft = "25";
                    this.canvasWidth = 210;
                    this.canvasHeight = 250;
                    this.mainCanvasHeight = 500;
                    this.mainCanvasWidth = 500;
                    break;
                  }
          case 13:
                  {
                    this.canvasTop = "31";
                    this.canvasLeft = "41";
                    this.canvasWidth = 260;
                    this.canvasHeight = 280;
                    this.mainCanvasHeight = 500;
                    this.mainCanvasWidth = 500;
                    break;
                  }
         }
         

      //Get productImageColorsCodes
      var imageColorCodes = this.product.productImages.map(function(obj) { return obj.colourCode; });
      var colorCodes = imageColorCodes.filter(function(v,i) { return imageColorCodes.indexOf(v) == i; });
      this.productImageColorCodes = colorCodes;
      var firstColorCode = colorCodes[0];
      this.colorCodeImages = this.product.productImages.filter(x => x.colourCode === firstColorCode);
    }); 
  }

  getImageUrls = function(ImageURL){
    this.imgurl = ImageURL;
  }

  getColorCodeImages = function(colorCode){
        this.colorCodeImages = this.product.productImages.filter(x => x.colourCode === colorCode); 
        this.imgurl = this.colorCodeImages[0].ImageURL;
        this.productColorCode = colorCode;
        this.productColor = this.colorCodeImages[0].Colour;
  }

  getProductListCrumbItem = function(){
    this.router.navigate(['/product/' + this.product.categoryID]);
 }

  getToolPage = function(){
    this.router.navigate(['/designertool/'+this.productID+'/'+this.productColor+'/'+this.canvasTop+'/'+this.canvasLeft+'/'+this.canvasWidth+'/'+this.canvasHeight+'/'+this.mainCanvasWidth+'/'+this.mainCanvasHeight]);
  }
}
