import { Component, OnInit } from '@angular/core';
//import {ToolService} from '../tool.service'
import { fabric } from 'fabric';
import '../../../../assets/jquery-ui';
declare var $:any;
import '../../../../assets/jspdf.js';
declare var jsPDF:any;
import '../../../../assets/bootstrap.min.js'

// import '../../assets/FileSaver.min.js';
// declare var FileSaver:any;

import * as FileSaver from '../../../../assets/FileSaver.min.js';
import { ProductdetailService } from '../../../Services/productdetail.service';
import { Products } from '../../../Models/Product';
import { ProductImages } from '../../../Models/ProductImage';
import { Router,ActivatedRoute, Params } from '@angular/router';
//declare var FileSaver:any;
//declare var saveAs: FileSaver;

@Component({
  selector: 'app-designer-tool',
  templateUrl: './designer-tool.component.html',
  styleUrls: ['../../../decorator.css'],
  providers:[]
})
export class DesignerToolComponent implements OnInit {
  textValue:string
  fontColor:string
  textBackgroundColor : string
  Angle: Number
  Radius:Number
  Spacing:Number
  canvasImage:string = ""
  public product: Products;
  public productimages: ProductImages[] = [];
  public productID: string;
  public color : string;
  canvasTop: string = "20%";
  canvasLeft: string = "30%";
  canvasWidth : number = 200;
  canvasHeight : number = 200;
  mainCanvasWidth : number = 500;
  mainCanvasHeight : number = 700;


  constructor(private productDetailService : ProductdetailService,private activatedRoute: ActivatedRoute,private router: Router) {
  }

   pos1 :number = 0
   pos2 :number = 0
   pos3 : number = 0
   pos4 :number = 0;
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    getProductListCrumbItem = function(){
      this.router.navigate(['/product/' + this.product.categoryID]);
    }
    getProductDetailCrumbItem = function(){
      this.router.navigate(['/productdetail/' + this.product.productID]);
    }

  ngOnInit() {
    this.productID = this.activatedRoute.snapshot.paramMap.get('productID');
    this.color = this.activatedRoute.snapshot.paramMap.get('productColor');
    this.canvasTop = this.activatedRoute.snapshot.paramMap.get('canvasTop');
    this.canvasLeft = this.activatedRoute.snapshot.paramMap.get('canvasLeft');
    this.canvasWidth = parseInt(this.activatedRoute.snapshot.paramMap.get('canvasWidth'));
    this.canvasHeight = parseInt(this.activatedRoute.snapshot.paramMap.get('canvasHeight'));
    this.mainCanvasWidth = parseInt(this.activatedRoute.snapshot.paramMap.get('mainCanvasWidth'));
    this.mainCanvasHeight = parseInt(this.activatedRoute.snapshot.paramMap.get('mainCanvasHeight'));
    
    
    $(document).ready(() =>   {
      $('.curveProperties').hide();
        var canvas = new fabric.Canvas("baseCanvas");
        var topCanvas =<HTMLCanvasElement>( document.getElementById('topCanvas'))
        
        var ctx = topCanvas.getContext('2d');
        ctx.fillStyle = "transparent";
        ctx.fillRect(0, 0, topCanvas.width, topCanvas.height);
        var img = new Image();
        var canvasImg;
        document.getElementById("Radius").setAttribute("max",(canvas.width/2).toString());
        //img.crossOrigin = "Anonymous";
        var canvasTop = this.canvasTop;
        var canvasLeft = this.canvasLeft;
        var canvasWidth = this.canvasWidth;
        var canvasHeight = this.canvasHeight;
        var mainCanvasWidth = this.mainCanvasWidth;
        var mainCanvasHeight = this.mainCanvasHeight;
        var borderColor = "white";
        var fillColor = "white";
        
        img.onload = function() {
          ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, topCanvas.width, topCanvas.height);
          console.log("Getting Image Rectangle");
          $('#mainDiv')[0].style.top=canvasTop+"%";
          $('#mainDiv')[0].style.left=canvasLeft+"%";
          $("#baseCanvas").width(canvasWidth);
          $('#baseCanvas').height(canvasHeight);
          $(".upper-canvas").width(canvasWidth);
          $('.upper-canvas').height(canvasHeight);
          $("#topCanvas").width(mainCanvasWidth);
          $('#topCanvas').height(mainCanvasHeight);
          fixCanvasSize()
        };
         img.crossOrigin="anonymous";     
        this.productDetailService.getProductAndImagesByProductID(this.productID).subscribe(response => {
         this.product = response["_batch"][0];
         if(this.product.categoryID == 1)
          this.canvasImage = canvasImg = this.product.productImages.filter(x => x.Colour === this.color)[4].ImageURL;
         else
          this.canvasImage = canvasImg =  this.product.productImages[0].ImageURL; 
         if(this.product.productID == 6 || this.color == "white" || this.product.productID == 10){
           borderColor = "black";
           fillColor = "black";
         } 
        img.src = this.canvasImage;
      });  
      
        $(function() {
         //$("#mainDiv").resizable({alsoResize:"#baseCanvas,.upper-canvas"});
         //$(".canvas-container").resizable({alsoResize:"#baseCanvas,.upper-canvas"});  
         //$(".canvas-container").draggable();
         canvas.width=canvasWidth;
         canvas.height=canvasHeight;  
         });
        if($.ui){
          console.log("UI Loaded");
        }
        var CurvedText = (function() {

            /**
            * Constructor
            * @method curvedText
            * @param canvas
            * @param {object} options
            * 
            */
            function CurvedText(text, canvas, options ){

                var defaults = {
                    top: 0,
                    left: 0,
                    spacing: 20,
                    rotate: 0,
                    radius: 50,
                    radiusX: null,
                    radiusY: null,
                    text: text,
                    align: 'center',
                    reverse: true,
                    fontSize: 20,
                    fontWeight: 'normal',
                    fontFamily: 'Arial',
                    fontStyle : 'normal',
                    fill: '#000',
                    selectable: true,
                    hasControls: true,
                    angle:45
                  };
        
              // Options
              this.opts = options || {};
              for ( var prop in defaults ) {
                 if (prop in this.opts) { continue; }
                 this.opts[prop] = defaults[prop];
              }
              this.canvas = canvas;
              this.group = new fabric.Group([], {
                selectable: this.opts.selectable,
                hasControls: this.opts.hasControls
              });
              this.canvas.add( this.group ) ;
        
              this._forceGroupCoords();
              this.set( 'text', this.opts.text );
            }
        
        
            /**
            * @method set
            * @param {string} param
            * @param value
            * @return false if the param name is unknown
            */
            CurvedText.prototype.set = function( param, value, render ) {
        
              if ( typeof param == "object" ) {
                for ( var i in param ) {
                  this.set( i, param[i], false );
                }
              } else {
                if ( this.opts[param] !== undefined ) {
                  this.opts[param] = value;
                  if ( param === 'fontSize' || param === 'fontWeight' || param === 'fill' || param === 'fontFamily' ) {
                    this._setFontStyles();
                  }
                  if ( param === 'selectable' ) {
                    this.group.selectable = value;
                  }
                  if ( param === 'top' || param === 'left' ) {
                    this._forceGroupCoords();
                  }
                  if ( param === 'text' ) {
                    this.setText( value );
                  }
        
                }
              }
        
              if ( render === undefined || render !== false ) {
                this._render();
              }
            };
            
            /**
            * @method get
            * @param {string} param
            * @return value of param, or false if unknown
            */
            CurvedText.prototype.get = function( param ) {
              if ( this.opts[param] !== undefined ) {
                return this.opts[param];
              } else {
                return false;
              }
            };
            
            /**
            * @method getParams
            * @return {object} value of every options
            */
            CurvedText.prototype.getParams = function() {
              return this.opts;
            };
            
        
            /**
            * Remove all letters from canvas
            * @method remove
            */
            CurvedText.prototype.remove = function() {
              var size = this.group.size();
              for ( var i=size; i>=0; i-- ){
                this.group.remove( this.group.item(i) );
              }
              this.canvas.remove( this.group );
              this.canvas.renderAll();
            };
            
            /**
            * Used to change the text
            * @method setText
            * @param {string} newText
            */
            CurvedText.prototype.setText = function( newText ) {
        
              while ( this.group.size() > newText.length ) {
                this.group.remove( this.group.item( this.group.size()-1 ) );
              }
              
              if ( newText.length > 0 ) {
                for ( var i=0; i<newText.length; i++ ){
                  if ( this.group.item(i) == undefined ){
                    var letter = new fabric.IText(newText[i], {
                      selectable: true,
                      centeredRotation: true,
                      originX: 'center',
                       originY: 'center'
                      
                    });
                    this.group.add( letter );
                  }
                  else{
                    this.group.item(i).text = newText[i];
                  }
                }
              }
              this.opts.text = newText;
              this._setFontStyles();
              this._render();
            };
            
            /**
            * Update font size and weight
            * @private
            * @method _setFontStyles
            */
            CurvedText.prototype._setFontStyles = function() {
              if ( this.group.size() > 0 ) {
                for ( var i=0; i<this.group.size(); i++ ){
                  this.group.item(i).set({
                    fontSize: this.opts.fontSize,
                    lineHeight: 1,
                    fontWeight: this.opts.fontWeight,
                    fontFamily: this.opts.fontFamily,
                    fontStyle: this.opts.fontStyle,
                    fill: this.opts.fill,
                    angle:this.opts.angle
                  });
                }
              }
            };
        
            /**
            * Force update group coords
            * @private
            * @method _forceGroupCoords
            */
            CurvedText.prototype._forceGroupCoords = function() {
              this.group.top = this.opts.top;
              this.group.left = this.opts.left;
            };
        
            
            /**
             * @method on
             */
            CurvedText.prototype.on = function( event, callback ){
              this.group.on( event, callback );
            };
            
            /**
            * calculate the position and angle of each letter
            * @private
            * @method _render
            */
            CurvedText.prototype._render = function() {
                var _self=this, curAngle=0,angleRadians=0, top, left, radiusX, radiusY, rx, ry, items = [], align;
        
                // Object may have been moved with drag&drop
                this.opts.top = this.group.top;
                this.opts.left = this.group.left;
        
                if ( this.opts.radiusX === null ) {
                  radiusX = this.opts.radius;
                } else {
                  radiusX = this.opts.radiusX;
                }
                if ( this.opts.radiusY === null ) {
                  radiusY = this.opts.radius;
                } else {
                  radiusY = this.opts.radiusY;
                }
        
                radiusX = parseInt(radiusX) - (this.opts.fontSize / 2);
                radiusY = parseInt(radiusY) - (this.opts.fontSize / 2);
        
        
                if ( this.group.size() > 0 ) {
                  // Text align
                  if ( this.opts.align == 'center' ) {
                    align = (this.opts.spacing / 2) * (this.group.size() - 1) ;
                  } else if ( this.opts.align == 'right' ) {
                    align = (this.opts.spacing) * (this.group.size() - 1) ;
                  } else {
                    align = 0;
                  }
                  
                  this.group.forEachObject(function(a, i) {
                    items[i] = a;
                  }); 
        
                  items.forEach(function (a) {
                    _self.group.removeWithUpdate(a);
                  }); 
        
                  this.canvas.remove( this.group );
        
        
                  for ( var i=0; i<items.length; i++ ) {
                    rx = radiusX;
                    ry = radiusY;
                    // Find coords of each letters (radians : angle*(Math.PI / 180)
                    curAngle = (i * parseInt( this.opts.spacing )) + parseInt( this.opts.rotate ) - align;
                    angleRadians = curAngle * (Math.PI / 180);
                    left = Math.sin( angleRadians ) * rx;
                    top = -Math.cos( angleRadians ) * ry;
        
                    if ( radiusX != radiusY ) {
                      var ratioX = rx / ( rx + ry ),
                          ratioY = ry / ( rx + ry ),
                          pct_left = Math.abs( left / rx ),
                          pct_top = Math.abs( -top / ry ),
                          ajustedAngle = ( (ratioY * 90 * pct_left) + ( ratioX * 90 * (1-pct_top)));
                      if ( left < 0 ) {
                        ajustedAngle = -ajustedAngle;
                      }
                      if ( -top < 0 ) {
                        ajustedAngle = 180 - ajustedAngle;
                      } 
                      curAngle = ajustedAngle;
                    }
                  
                    if ( this.opts.reverse ) {
                      curAngle = -curAngle;
                      top = -top;
                      //console.log( 'top', top, 'angle', curAngle );
                    }
                    
                    items[i].set({
                      'top': top,
                      'left': left,
                      'angle': curAngle
                    });
        
                    if ( this.opts.selectable ) {
                      this.group.addWithUpdate( items[i] );  
                    } else {
                      this.group.add( items[i] );
                    }
                  }
                }
        
                
                // Update group coords
                this.group.set({
                  top: this.opts.top,
                  left: this.opts.left
                });
        
                this.group.forEachObject(function(o){ o.set( 'active', false ); });
                this.canvas.renderAll();
                this.canvas.add(this.group);
            };
        
        
        
            /**
            * Default options
            */
        
            return CurvedText;
        })();


        debugger;
        var undo = [];
        var redo=[];
        var mods = 0;
        var redoIndex = 0;
       console.log(JSON.stringify(canvas));
       undo.push(JSON.stringify(canvas));
    $("#ImageFilters").change(function (event) {
      console.log(canvas);
      console.log(canvas.getActiveObject());
      switch($(this).val()){
          case 'clear' :{
                              if(canvas.getActiveObject() != undefined && canvas.getActiveObject().filters != undefined)    
                                  {
                                          canvas.getActiveObject().filters = [];
                                          canvas.getActiveObject().applyFilters(function () {
                                              canvas.renderAll();
                                              updateModifications();
                                          });
                                  }
                                  break;
                              }
          case 'Grayscale':
                          {
                              if(canvas.getActiveObject() != undefined && canvas.getActiveObject().filters != undefined)    
                              {
                                      canvas.getActiveObject().filters = [];
                                      canvas.getActiveObject().filters.push(new fabric.Image.filters.Grayscale()); 
                                      canvas.getActiveObject().applyFilters(function () {
                                          canvas.renderAll();
                                          updateModifications();
                                      });
                              }
                              break;
                          }
          case 'Sepia':
                        {
                              if(canvas.getActiveObject() != undefined && canvas.getActiveObject().filters != undefined)    
                              {   
                                  canvas.getActiveObject().filters = [];
                                  canvas.getActiveObject().filters.push(new fabric.Image.filters.Sepia()); 
                                  canvas.getActiveObject().applyFilters(function () {
                                      canvas.renderAll();
                                      updateModifications();
                                  })
                              };
                              break;
                        }
          case 'Convolute':
                          {
                              if(canvas.getActiveObject() != undefined && canvas.getActiveObject().filters != undefined)    
                              {
                                      canvas.getActiveObject().filters = [];
                                      canvas.getActiveObject().filters.push(new fabric.Image.filters.Convolute({
                                          matrix: [ 1,   1,  1,
                                                  1, 0.7, -1,
                                                  -1,  -1, -1 ]
                                          })); 
                                          canvas.getActiveObject().applyFilters(function () {
                                          canvas.renderAll();
                                          updateModifications();
                                      });
                              }
                              break;
                        }
      }
      canvas.renderAll();
  });

  $("#AddText").click(function (event) {
      canvas.add(new fabric.IText($('#EmbText').val(),{top:5,left:5,fill:fillColor}));
      canvas.setActiveObject(canvas._objects[canvas._objects.length -1]);
      HandleScaling(canvas);
      canvas.renderAll();
      updateModifications();
    });

    $('#CurveText').click(function (event){
     if( $('.curveProperties').is(":visible") == false )
        {
          $('.curveProperties').show();
        }
        else{
          $('.curveProperties').hide();
        }
        if(canvas.getActiveObject().text != undefined)
        {
          //canvas.getActiveObject().setFontWeight(canvas.getActiveObject().getFontWeight() == "bold" ? "normal":"bold");
          var curvedText = new CurvedText(canvas.getActiveObject().text,canvas, {

			      radius: $('#Radius').val() > canvas.width/2  ? canvas.width/2 : $('#Radius').val(),
            spacing: $('#Spacing').val(),
            fontSize: canvas.getActiveObject().getFontSize(),
            top: 65,
            left:0,
            fontWeight:canvas.getActiveObject().getFontWeight(),
            fontStyle: canvas.getActiveObject().getFontStyle(),
            fontFamily: canvas.getActiveObject().getFontFamily(),
            fill:canvas.getActiveObject().fill != undefined ? canvas.getActiveObject().fill : 'black'

        });
        canvas.remove(canvas.getActiveObject());
          canvas.renderAll();
          updateModifications();
        }
    });


    $("#Bold").click(function (event) {
      if(canvas.getActiveObject().text != undefined)
      {
        canvas.getActiveObject().setFontWeight(canvas.getActiveObject().getFontWeight() == "bold" ? "normal":"bold");
          HandleScaling(canvas);
          canvas.renderAll();
          updateModifications();
      }

  });

  $("#Italic").click(function (event) {
      if(canvas.getActiveObject().text != undefined)
      {
          canvas.getActiveObject().setFontStyle(canvas.getActiveObject().getFontStyle() == "italic" ? "normal":"italic");
          HandleScaling(canvas);
          canvas.renderAll();
          updateModifications();
      }

  });

  $('#FontFamily').change(function (event){
    if(canvas.getActiveObject().text != undefined)
      {
          //canvas.contextContainer.canvas.style["border"] = "2px dotted";
          canvas.getActiveObject().setFontFamily($(this).val());
          HandleScaling(canvas);
          canvas.renderAll();
          updateModifications();
      }
  });

  $("#fontColorPicker").change(function(event){
    if(canvas.getActiveObject().text != undefined)
    {
        canvas.getActiveObject().setColor($("#fontColorPicker").val());
        canvas.renderAll();
        updateModifications();
    }
  });

  $("#textBackgroundColorPicker").change(function(event){
    if(canvas.getActiveObject().text != undefined)
    {
        canvas.getActiveObject().setBackgroundColor($("#textBackgroundColorPicker").val());
        canvas.renderAll();
        updateModifications();
    }
  });

  $("#Angle").on("input change", function(event) {
    canvas.getActiveObject().setAngle($("#Angle").val());
    canvas.renderAll();
  });

  $("#MoveLeft").on("input change", function(event) {
    canvas.getActiveObject().setLeft(Number( $("#MoveLeft").val()));
    canvas.renderAll();
  });

  $("#MoveTop").on("input change", function(event) {
    canvas.getActiveObject().setTop(Number($("#MoveTop").val()));
    canvas.renderAll();
  });

  $('input[type=file]').click(function(){
      debugger;
      console.log("File upload click");
      $(this).val(null)
  });

  $("#FileUpload").on("input change",function (event) {
    debugger;

    for(var i =0; i<event.target.files.length; i++)
    {
        var reader  = new FileReader();
        var file    =   event.target.files[i];
 

      reader.onload= (function (theFile) {
        return function (e) {
            // Render thumbnail.
            fabric.Image.fromURL(e.target.result, 
                  function(img){
                    console.log("......");
                    console.log(img);
                    console.log(reader.result);
                    img.width = 200;
                      img.height = 200;
                      img.left=0;
                      img.top =0;
                      canvas.add(img);
                      updateModifications();
                  });
        };
    })(file);
  
    if (event.target.files[i]) {
       reader.readAsDataURL(event.target.files[i]);
    }
  }
  });
  canvas.on("object:moving", function (e) {

    $("#Angle").val(""+e.target.angle);
      $("#MoveLeft").val(""+e.target.left);
      $("#MoveTop").val( ""+e.target.top);
        var obj = e.target;
        var canvas = obj.canvas;
        canvas.contextContainer.canvas.style["border"] = "2px dotted "+borderColor;
        // if((canvas.getActiveObject().getLeft()?canvas.getActiveObject().getLeft():0)+(canvas.getActiveObject().getWidth()/2) == parseInt(canvasLeft)+(canvas.width/2))
        //   canvas.item(0).set({opacity:1});
        var top = obj.top;
        var left = obj.left;
        var zoom = canvas.getZoom();
        var pan_x = canvas.viewportTransform[4];
        var pan_y = canvas.viewportTransform[5];
      
        // width & height we are constraining to must be calculated by applying the inverse of the current viewportTransform
        var c_width = canvas.width / zoom;
        var c_height = canvas.height / zoom;
      
      
        var w = obj.width * obj.scaleX
        var left_adjust, right_adjust
        if(obj.originX == "center") {
          left_adjust = right_adjust = w / 2;
        } else {
          left_adjust = 0;
          right_adjust = w;
        }
      
        var h = obj.height * obj.scaleY;
        var top_adjust, bottom_adjust;
        if(obj.originY == "center") {
          top_adjust = bottom_adjust = h / 2;
        } else {
          top_adjust = 0;
          bottom_adjust = h;
        }
      
        // if you need margins set them here
        var top_margin = 0;
        var bottom_margin = 0;
        var left_margin = 0;
        var right_margin = 0;
      
      
        var top_bound = top_margin + top_adjust - pan_y;
        var bottom_bound = c_height - bottom_adjust - bottom_margin - pan_y;
        var left_bound = left_margin + left_adjust - pan_x;
        var right_bound = c_width - right_adjust - right_margin - pan_x;
      
        if( w > c_width ) {
          obj.setLeft(left_bound);
        } else {
          obj.setLeft(Math.min(Math.max(left, left_bound), right_bound));          
        }
      
        if( h > c_height ) {
          obj.setTop(top_bound);
        } else {
          obj.setTop(Math.min(Math.max(top, top_bound), bottom_bound));          
        }
  });
  canvas.on("object:scaling", function (e) {
    console.log("scaling");
    console.log("X:"+e.target.scaleX);
    console.log("Y:"+e.target.scaleY);
    $("#Angle").val(""+e.target.angle);
      $("#MoveLeft").val(""+e.target.left);
      $("#MoveTop").val( ""+e.target.top);
        var obj = e.target;
        var canvas = obj.canvas;
        canvas.contextContainer.canvas.style["border"] = "2px dotted "+borderColor;
        //canvas.item(0).set({opacity:1});
        var tempCanvas =<HTMLCanvasElement>(document.getElementById('topCanvas'));
        var tempContext = tempCanvas.getContext('2d');
        tempContext.moveTo(canvas.width/2,0);
        tempContext.lineTo(canvas.height,canvas.width/2);
        var top = obj.top;
        var left = obj.left;
        var zoom = canvas.getZoom();
        var pan_x = canvas.viewportTransform[4];
        var pan_y = canvas.viewportTransform[5];
      
        // width & height we are constraining to must be calculated by applying the inverse of the current viewportTransform
        var c_width = canvas.width / zoom;
        var c_height = canvas.height / zoom;
      
      
        var w = obj.width * obj.scaleX
        var left_adjust, right_adjust
        if(obj.originX == "center") {
          left_adjust = right_adjust = w / 2;
        } else {
          left_adjust = 0;
          right_adjust = w;
        }
      
        var h = obj.height * obj.scaleY;
        var top_adjust, bottom_adjust;
        if(obj.originY == "center") {
          top_adjust = bottom_adjust = h / 2;
        } else {
          top_adjust = 0;
          bottom_adjust = h;
        }
      
        // if you need margins set them here
        var top_margin = 0;
        var bottom_margin = 0;
        var left_margin = 0;
        var right_margin = 0;
      
      
        var top_bound = top_margin + top_adjust - pan_y;
        var bottom_bound = c_height - bottom_adjust - bottom_margin - pan_y;
        var left_bound = left_margin + left_adjust - pan_x;
        var right_bound = c_width - right_adjust - right_margin - pan_x;
      
        if( w > c_width ) {
          obj.setLeft(left_bound);
          e.target.scaleX =obj.canvas.getWidth()/obj.width;
        } else {
          obj.setLeft(Math.min(Math.max(left, left_bound), right_bound));         
        }
      
        if( h > c_height ) {
          obj.setTop(top_bound);
          e.target.scaleY = obj.canvas.getHeight()/obj.height;

        } else {
          obj.setTop(Math.min(Math.max(top, top_bound), bottom_bound));      
        }
  });
  canvas.on("object:rotating", function (e) {
      $("#Angle").val(""+e.target.angle);
  });

  canvas.on('object:modified', function(){
    canvas.contextContainer.canvas.style["border"] = "";
    canvas.item(0).set({opacity:0});
    updateModifications();
});

function HandleScaling(canvas){
  var obj = canvas.getActiveObject();
  //var canvas = obj.canvas;
  var top = obj.top;
  var left = obj.left;
  var zoom = canvas.getZoom();
  var pan_x = canvas.viewportTransform[4];
  var pan_y = canvas.viewportTransform[5];

  // width & height we are constraining to must be calculated by applying the inverse of the current viewportTransform
  var c_width = canvas.width / zoom;
  var c_height = canvas.height / zoom;


  var w = obj.width * obj.scaleX
  var left_adjust, right_adjust
  if(obj.originX == "center") {
    left_adjust = right_adjust = w / 2;
  } else {
    left_adjust = 0;
    right_adjust = w;
  }

  var h = obj.height * obj.scaleY;
  var top_adjust, bottom_adjust;
  if(obj.originY == "center") {
    top_adjust = bottom_adjust = h / 2;
  } else {
    top_adjust = 0;
    bottom_adjust = h;
  }

  // if you need margins set them here
  var top_margin = 0;
  var bottom_margin = 0;
  var left_margin = 0;
  var right_margin = 0;


  var top_bound = top_margin + top_adjust - pan_y;
  var bottom_bound = c_height - bottom_adjust - bottom_margin - pan_y;
  var left_bound = left_margin + left_adjust - pan_x;
  var right_bound = c_width - right_adjust - right_margin - pan_x;

  if( w > c_width ) {
    obj.setLeft(left_bound);
    //canvas.getActiveObject().setWidth(c_width);
    canvas.getActiveObject().scaleX =c_width/obj.width;

  } else {
    obj.setLeft(Math.min(Math.max(left, left_bound), right_bound));       
  }

  if( h > c_height ) {
    obj.setTop(top_bound);
    canvas.getActiveObject().scaleY = obj.canvas.getHeight()/obj.height;
  } else {
    obj.setTop(Math.min(Math.max(top, top_bound), bottom_bound));       
  }
}

  function updateModifications() {
      console.log("Object Modified");
          var myjson = JSON.stringify(canvas);
          undo.push(myjson);
          console.log("update stack:");
          console.log(undo);
  }

  $('#Undo').click(function() {
      if (mods < undo.length) {
          console.log("Undo");
          console.log("mods:"+mods);
          console.log("state length:"+undo.length);
          canvas.loadFromJSON(undo[undo.length - 1 - mods - 1], function(){canvas.renderAll();});
          mods += 1;
      }
  });

  $('#Redo').click(function() {
      if (mods > 0) {
          console.log("Redo");
          console.log("mods:"+mods);
          console.log("state length:"+undo.length);
          canvas.loadFromJSON(undo[undo.length - 1 - mods + 1], function(){canvas.renderAll();});
          mods -= 1;
      }
  });

    $('html').keydown(function(e){
      if (e.keyCode == 90 && e.ctrlKey) {
        canvas.loadFromJSON(undo[undo.length - 1 - mods - 1], function(){canvas.renderAll();});
          mods += 1;
      }
      if (e.keyCode == 89 && e.ctrlKey) {
        canvas.loadFromJSON(undo[undo.length - 1 - mods + 1], function(){canvas.renderAll();});
          mods -= 1;
      }
      if(e.keyCode == 46) {
        if(canvas.getActiveObject() == null){
            
            canvas.getActiveGroup()._objects.forEach(obj => {
                canvas.remove(obj);
            });
            canvas.discardActiveGroup();
            canvas.renderAll();
        }
        else{
            canvas.remove(canvas.getActiveObject());
            canvas.renderAll();
        }
    }
  });

    $("#Radius").on("input stop", function(event) {
      debugger;
          var curvedText = new CurvedText(canvas.getActiveObject()._objects.map(x =>x.text).join(""),canvas, {

		      	radius: $('#Radius').val(),
            spacing: $('#Spacing').val(),
            fontSize: canvas.getActiveObject()._objects[0].fontSize,
            top: canvas.getActiveObject().top,
            left:canvas.getActiveObject().left,
            fontWeight:canvas.getActiveObject()._objects[0].fontWeight,
            fontStyle: canvas.getActiveObject()._objects[0].fontStyle,
            fontFamily: canvas.getActiveObject()._objects[0].fontFamily,
            fill:canvas.getActiveObject()._objects[0].fill != undefined ? canvas.getActiveObject()._objects[0].fill : 'black'

        });
        canvas.remove(canvas.getActiveObject());
        canvas.setActiveObject(canvas._objects[canvas._objects.length -1]);
          canvas.renderAll();
          updateModifications();
        });

        $("#Spacing").on("input stop", function(event) {
          debugger;
              var curvedText = new CurvedText(canvas.getActiveObject()._objects.map(x =>x.text).join(""),canvas, {
    
                radius: $('#Radius').val(),
                spacing: $('#Spacing').val(),
                fontSize: canvas.getActiveObject()._objects[0].fontSize,
                top: canvas.getActiveObject().top,
                left:canvas.getActiveObject().left,
                fontWeight:canvas.getActiveObject()._objects[0].fontWeight,
                fontStyle: canvas.getActiveObject()._objects[0].fontStyle,
                fontFamily: canvas.getActiveObject()._objects[0].fontFamily,
                fill:canvas.getActiveObject()._objects[0].fill != undefined ? canvas.getActiveObject()._objects[0].fill : 'black'
    
            });
            canvas.remove(canvas.getActiveObject());
            canvas.setActiveObject(canvas._objects[canvas._objects.length -1]);
              canvas.renderAll();
              updateModifications();
            });

        $('#ToImage').click((event)=> { 
       var sourceImageData = canvas.toDataURL("image/jpeg");
       console.log("Source Image data");
       console.log(sourceImageData);
        var destCanvasContext = topCanvas.getContext('2d');
   
        var destinationImage = new Image;
        destinationImage.width = canvasWidth;
        destinationImage.height = canvasHeight;
        destinationImage.crossOrigin = "anonymous";
        destinationImage.onload = function(){
          console.log("Preview Image");
          console.log("left:"+parseInt(canvasLeft)*topCanvas.width/100+" top:"+parseInt(canvasTop)*topCanvas.height/100);
          destCanvasContext.drawImage(destinationImage,parseInt(canvasLeft)*4.8,parseInt(canvasTop)*topCanvas.height/100);
          var imgData = topCanvas.toDataURL("image/jpeg", 1.0);
         console.log("Image Data.....");
         console.log(imgData);

        var pdf = new jsPDF('p', 'px', [topCanvas.width,topCanvas.height]);
         pdf.addImage(imgData, 'JPEG', 0, 0);
        pdf.save("download.pdf");
        $("#topCanvas").get(0).toBlob(function(blob) {
          FileSaver.saveAs(blob, "sample.jpg");
      });
        destCanvasContext.clearRect(0, 0, topCanvas.width, topCanvas.height);
        var img = new Image();
        
        img.onload = function() {
          destCanvasContext.drawImage(img, 0, 0, img.width, img.height, 0, 0, topCanvas.width, topCanvas.height);
          
        };
        img.src = canvasImg;
       };
        destinationImage.src = sourceImageData;
        });

        $('#zoomIn').click(function() {
         var topCanvas = <HTMLCanvasElement>document.getElementById("topCanvas");
         var mainContext = topCanvas.getContext('2d');
         mainContext.clearRect(0, 0, topCanvas.width, topCanvas.height);
         var img = new Image();
        
        img.onload = function() {
          mainContext.setTransform(1.2,0,0,1.3,0,-100);
          $('#baseCanvas').left=parseInt(canvasLeft)-100+"%";
          $('.upper-canvas').height(canvasHeight);
          mainContext.drawImage(img, 0, 0, img.width, img.height, 0, 0, topCanvas.width, topCanvas.height);         
        };
                
        img.src = canvasImg;
      });

      $('#zoomOut').click(function() {
       var topCanvas = <HTMLCanvasElement>document.getElementById("topCanvas");
       var mainContext = topCanvas.getContext('2d');
       mainContext.clearRect(0, 0, topCanvas.width, topCanvas.height);
       var img = new Image();
      
      img.onload = function() {
        mainContext.setTransform(1,0,0,1,0,0);
        mainContext.drawImage(img, 0, 0, img.width, img.height, 0, 0, topCanvas.width, topCanvas.height);
        $('#baseCanvas').height(canvasHeight);
        $('.upper-canvas').height(canvasHeight);
        
      };
              
      img.src = canvasImg;
    });

    $('#Preview').click(function() {
      var sourceImageData = canvas.toDataURL("image/png");
        var destCanvasContext = topCanvas.getContext('2d');
        var destinationImage = new Image;
        destinationImage.setAttribute("backgroundColor","white");
        destinationImage.width = canvasWidth;
        destinationImage.height = canvasHeight;
        destinationImage.crossOrigin = "anonymous";
        destinationImage.onload = function(){
          console.log("Preview Image");
          console.log("left:"+parseInt(canvasLeft)*topCanvas.width/100+" top:"+parseInt(canvasTop)*topCanvas.height/100);

          //destCanvasContext.drawImage(destinationImage,parseInt(canvasLeft)*4.8,parseInt(canvasTop)*5);
          destCanvasContext.drawImage(destinationImage,parseInt(canvasLeft)*4.8,parseInt(canvasTop)*topCanvas.height/100);
          var imgData = topCanvas.toDataURL("image/jpeg", 1.0);
          console.log(imgData);
          $("#DemoImage")[0].style.height=$("#topCanvas").height()+"px";
           $("#DemoImage")[0].src=imgData;
           $("#DemoImage")[0].style.display="block";
          
        destCanvasContext.clearRect(0, 0, topCanvas.width, topCanvas.height);
        var img = new Image();
        
        img.onload = function() {
          destCanvasContext.drawImage(img, 0, 0, img.width, img.height, 0, 0, topCanvas.width, topCanvas.height);
          
        };
        img.src = canvasImg;
       };
        destinationImage.src = sourceImageData;
    });

    $('#Center').click(function() {
      canvas.centerObjectH(canvas.getActiveObject());
    })
    function fixCanvasSize(){
      canvas.width=canvasWidth;
        canvas.height=canvasHeight;
        var line = new fabric.Line([canvas.width/2,0,canvas.width/2,canvas.height],{
          strokeDashArray: [2, 2],
          strokeWidth:2,
          stroke: borderColor,
        });
        canvas.add(line);  
        canvas.item(0).set({opacity:0});
        topCanvas.width = mainCanvasWidth;
        topCanvas.height = mainCanvasHeight;
       var sourceImageData = canvas.toDataURL("image/jpeg");
        var destCanvasContext = topCanvas.getContext('2d');
   
        var destinationImage = new Image;
        
        destCanvasContext.clearRect(0, 0, topCanvas.width, topCanvas.height);
        destCanvasContext.fillStyle = "transparent";
        destCanvasContext.fillRect(0, 0, topCanvas.width, topCanvas.height);
        var img = new Image();
        
        img.onload = function() {
          destCanvasContext.drawImage(img, 0, 0, img.width, img.height, 0, 0, topCanvas.width, topCanvas.height);
          
        };       
        img.src = canvasImg;
        destinationImage.src = sourceImageData;
    }
     });
  }
}
