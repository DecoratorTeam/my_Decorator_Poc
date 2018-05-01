import { Component, OnInit } from '@angular/core';
import { ProductImages } from '../Models/productImage';
export class Products {
    productID: number;
    productName : string;
    productCode:string;
    productDescription:string;
    categoryID:number;
    size:string;
    msrp:string;
    map:string;
    colour:string;
    createdDate:Date;
    modifiedDate:string;
    status:number;
    productImage:string;
    productImages: Array<ProductImages> = [];

}