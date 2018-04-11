import { ProductService } from './../../core/services/products.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';


@Component({
    selector:'admin-product-form',
    templateUrl:'./admin-product-form.component.html'
})

export class AdminProductForm implements OnInit{

    productForm: FormGroup;
    @ViewChild('upload') fileUpload;

    constructor(private p_service:ProductService){}

    ngOnInit(){
        this.productForm = new FormGroup({
            product_name : new FormControl(null,[
                Validators.required
            ]),
            product_price : new FormControl(null,[
                Validators.required
            ]),
            product_qty : new FormControl(1,[
                Validators.required
            ]),
            product_p_cat : new FormControl('Electronics',[
                Validators.required
            ]),
            product_c_cat : new FormControl('Computers',[
                Validators.required
            ]),
            product_f_types : new FormArray([
                new FormControl('Weight',Validators.required)
            ]),
            product_f_values : new FormArray([
                new FormControl('1.2kg',[Validators.required])
            ]),
            product_upload : new FormControl(null),
            product_desc : new FormControl(null,[
                Validators.required
            ])
        });
    }

    addProduct(){
        // set upload file
        let {files} = this.fileUpload.nativeElement;
        // if file length is 0 @return
        if(files.length == 0) {
            alert("Please upload file");
            return;
        }
        // set file to product form
        this.productForm.get('product_upload').setValue(files.item(0));
        let { value } = this.productForm;
        //create form Data for "multipart/form-data"
        //submission from the frontend Form
        const productData = this.getFormData(value);
        //use productService to request product save route
        this.p_service.storeProduct(productData)
            .subscribe((response) => {
                console.log(response);
                if(response.type === "error"){
                    let {msg:message}= response.errors;
                    alert(message);
                }else{
                    let {msg:message}= response;
                    this.productForm.reset();
                    alert(message);
                }
            });
    }

    addFeatures(){
        const formControl1 = new FormControl(null,[Validators.required]);
        const formControl2 = new FormControl(null,[Validators.required]);
        //add Form control in both types and features
        (<FormArray> this.productForm.get('product_f_types')).push(formControl1);
        (<FormArray> this.productForm.get('product_f_values')).push(formControl2);
    }

    private getFormData(data){
        const formData = new FormData();
        const [types,values] = [data.product_f_types,data.product_f_values];
        let features = types.map((value,index) => {
            return `"${value}":"${values[index] || ''}"`;
        });
        // append data in formData Object
        formData.append('productTitle',data.product_name);
        formData.append('productPrice',data.product_price);
        formData.append('productQty',data.product_qty);
        formData.append('productP_cat',data.product_p_cat);
        formData.append('productC_cat',data.product_c_cat);
        formData.append('productFeatures',`{${features.join(',')}}`);
        formData.append('productImage',data.product_upload);
        formData.append('product_desc',data.product_desc);
        return formData;
    }

}