import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  trigger,
  Renderer2,
} from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { ProductService } from '../../core/services';

@Component({
  selector: 'admin-product-form',
  templateUrl: './admin-product-form.component.html',
})
export class AdminProductForm implements OnInit {
  //storing the form type
  public editMode: boolean = false;
  public imageUploadProgress: boolean = false;

  // product structure
  public product = {
    _id: null,
    productTitle: null,
    productQty: null,
    productPrice: null,
    productP_cat: '',
    productC_cat: '',
    productFeatures: null,
    product_desc: null,
  };

  // storing imgSrc for EditMode
  public imgSrc: String;

  // store progress upload %
  public percentageUpload: Number = 0;

  //creating productForm for storing formData
  productForm: FormGroup;

  // storing template reference of #input
  // and progress Bar
  @ViewChild('upload') fileUpload: ElementRef;
  @ViewChild('progress') progress: ElementRef;

  // getting all categories and child category
  categories: Category[];
  c_Categories: any[] = [];

  // form button state
  disable:boolean = false;

  constructor(
    public p_service: ProductService,
    public router: Router,
    public route: ActivatedRoute,
    public renderer: Renderer2
  ) {}

  ngOnInit() {
    // check for editMode with route params
    this.route.params.subscribe((params: Params) => {
      let { id } = params;
      //get product if id is available
      if (id) {
        // fetch product with id
        this.p_service.getProduct(id).subscribe(
          (data: any) => {
            // extract product details from response
            // and store that in product property
            let { product } = data.body;
            this.product = product;
            //set editMode to true
            this.editMode = true;
            //set image in form
            this.imgSrc = `images/${product.productImg}`;
            // createForm
            this.createForm();
            // Load Child categories
            this.loadChild(product.productP_cat);
          },
          (error: any) => {
            alert('Something went wrong!!');
            this.router.navigateByUrl('admin');
          }
        );
      }
    });

    // creating product form
    this.createForm();

    //store all categories
    this.categories = this.p_service.categories;
  }

  /*
    >=> Function to create product form structure
    >=> and setting its default values according to
    >=> type of form mode.
  */

  public createForm() {
    let featureKeys = [new FormControl(null, Validators.required)],
      featureValues = [new FormControl(null, Validators.required)];

    //Form update for edit mode only
    if (this.editMode) {
      // setting featureKeys & featureValues to []
      featureKeys = [];
      featureValues = [];
      let features = JSON.parse(this.product.productFeatures);

      // loop through feature keys and add
      //push that in to featureKeys and same for values
      Object.keys(features).map(key => {
        featureKeys.push(new FormControl(key, Validators.required));
        featureValues.push(new FormControl(features[key], Validators.required));
      });
    }

    // creating form group with default
    // value according to mode of form
    this.productForm = new FormGroup({
      product_name: new FormControl(this.product.productTitle, [
        Validators.required,
      ]),
      product_price: new FormControl(this.product.productPrice, [
        Validators.required,
      ]),
      product_qty: new FormControl(this.product.productQty || 1, [
        Validators.required,
      ]),
      product_p_cat: new FormControl(this.product.productP_cat, [
        Validators.required,
      ]),
      product_c_cat: new FormControl(this.product.productC_cat, [
        Validators.required,
      ]),
      product_f_types: new FormArray(featureKeys),
      product_f_values: new FormArray(featureValues),
      product_upload: new FormControl(null),
      product_desc: new FormControl(this.product.product_desc, [
        Validators.required,
      ]),
    });
  }

  /*
    >=> Function to add Product
    >=> details in database and
    >=> upload product image to server
    >=> with a content type as FormData
  */

  public addProduct() {
    // set upload file
    let { files } = this.fileUpload.nativeElement;
    // if file length is 0 @return
    if (files.length == 0) {
      alert('Please upload file');
      return;
    }
    // set file to product form
    this.productForm.get('product_upload').setValue(files.item(0));
    let { value } = this.productForm;
    //create form Data for "multipart/form-data"
    //submission from the frontend Form
    const productData = this.getFormData(value);

    // change disable state
    this.disable = true;

    //use productService to save product
    this.p_service.storeProduct(productData).subscribe(
      (data: any) => {
        let { message } = data.body;
        alert(message);
        this.disable = false;
        this.productForm.reset();
        // set value of child and parent category to ''
        this.productForm.get('product_p_cat').setValue('');
        this.productForm.get('product_c_cat').setValue('');
      },
      (error: any) => {
        let { message } = error.error;
        this.disable = false;
        alert(message || 'Server is not responding.');
      }
    );
  }

  /*
    >=> Function to update product details
    >=> in database without a image
    >=> using content type as JSON
  */

  public updateProduct() {
    let { value: data } = this.productForm;
    // converting feature and types
    // into a JSON string
    const [types, values] = [data.product_f_types, data.product_f_values];
    let features = this.getJSONString(types, values);

    // storing all data in to a
    // brand new object with updated values
    let formData = {
      productTitle: data.product_name,
      productQty: data.product_qty,
      productPrice: data.product_price,
      productP_cat: data.product_p_cat,
      productC_cat: data.product_c_cat,
      productFeatures: `{${features.join(',')}}`,
      product_desc: data.product_desc,
    };

    // change disable state
    this.disable = true;

    // makeing a http request via ProductService
    // to update product details
    this.p_service.updateProduct(formData, this.product._id).subscribe(
      (data: any) => {
        let { message } = data.body;
        alert(message);
        this.disable = false;
        this.router.navigate(['admin/products']);
      },
      (error: any) => {
        let { message } = error.error;
        this.disable = false;
        alert(message || 'Server is not responding.');
      }
    );
  }

  /*
    >=> Function to update image
    >=> of given product
  */

  public updateProductImage() {

    //set protgress status to true
    // set upload file
    let { files } = this.fileUpload.nativeElement;

    // if file length is 0 @return
    if (files.length == 0) {
      alert('Please upload file');
      return;
    }

    this.imageUploadProgress = true;

    // create form data object for image
    let data = new FormData();
    data.append('productImage', files.item(0));

    this.p_service.updateProductImage(data, this.product._id).subscribe(
      (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.disable = true;
          // This is an upload progress event. Compute and show the % done:
          const percentDone = Math.round(100 * event.loaded / event.total);
          this.percentageUpload = percentDone;
          this.renderer.setStyle(
            this.progress.nativeElement,
            'width',
            `${percentDone}%`
          );
        }
        if (event instanceof HttpResponse) {
          this.disable = false;
          let { message, product } = event.body;
          this.imgSrc = `images/${product.productImg}`;
          //hide progress bar after 2seconds
          // and set percentageUpload back to 0
          setTimeout(() => {
            this.imageUploadProgress = false;
            this.percentageUpload = 0;
          }, 1000);
        }
      },
      (error: any) => {
        let { message } = error.error;
        this.disable = false;
        alert(message || 'Server is not responding.');
      }
    );
  }

  /*
    >=> Function is responsible to convert
    >=> two array into a common JSON string
  */

  public getJSONString(types, values) {
    return types.map((value, index) => {
      return `"${value.trim()}":"${values[index].trim() || ''}"`;
    });
  }

  /*
    >=> Function to add more feature
    >=> types and values field
    >=> in form by pushing new controls
    >=> formArray
  */

  public addFeatures() {
    const formControl1 = new FormControl(null, [Validators.required]);
    const formControl2 = new FormControl(null, [Validators.required]);
    //add Form control in both types and features
    const type = this.productForm.get('product_f_types') as FormArray;
    const feature = this.productForm.get('product_f_values') as FormArray;
    type.push(formControl1);
    feature.push(formControl2);
  }

  get featureTypes(){
    return <FormArray>this.productForm.get('product_f_types');
  }

  get featureValues(){
    return <FormArray> this.productForm.get('product_f_values');
  }

  /*
    >=> Function to append all the values
    >=> coming from "add Product" form in
    >=> to a new FormData object.
    >=> Why ? Because we're uploading image on server
  */

  public getFormData(data) {
    const formData = new FormData();
    // converting feature and types
    // into a JSON string
    const [types, values] = [data.product_f_types, data.product_f_values];
    let features = this.getJSONString(types, values);
    // append data in formData Object
    formData.append('productTitle', data.product_name);
    formData.append('productPrice', data.product_price);
    formData.append('productQty', data.product_qty);
    formData.append('productP_cat', data.product_p_cat);
    formData.append('productC_cat', data.product_c_cat);
    formData.append('productFeatures', `{${features.join(',')}}`);
    formData.append('productImage', data.product_upload);
    formData.append('product_desc', data.product_desc);
    return formData;
  }

  /*
    >=> Function to remove product
    >=> by id
  */

  public removeProduct() {
    this.p_service.removeProduct(this.product._id).subscribe(
      (data: any) => {
        let { message } = data.body;
        alert(message);
        this.router.navigateByUrl('/admin/products');
      },
      (error: any) => {
        alert("Something went wrong.Product can't be removed");
      }
    );
  }

  /*
   >=> Function to load child categories
   >=> according to selected parent
  */

  public loadChild(value) {
    let parent = value;
    this.categories.map(category => {
      if (category.name === parent && category.childs.length > 0) {
        this.c_Categories = category.childs;
      }
    });
  }
}
