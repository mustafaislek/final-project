import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject, takeUntil} from 'rxjs';
import {Product} from 'src/app/models/product';
import {ProductService} from 'src/app/services/product.service';
import {SnackbarService} from "../../../services/snackbar.service";

@Component({
  selector: 'app-products-update',
  templateUrl: './products-update.component.html',
  styleUrls: ['./products-update.component.scss']
})
export class ProductsUpdateComponent implements OnInit {


  private formData = new FormData();
  productForm!: FormGroup;
  product: Product = new Product();
  formTitle = 'Add';
  coverImagePath: any;
  productId: any;
  files: any;
  categoryList: any;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private snackBarService: SnackbarService) {

    this.productForm = this.fb.group({
      id: [],
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      url: [''],
    });
  }

  get title() {
    return this.productForm.get('title');
  }

  get description() {
    return this.productForm.get('description');
  }

  get category() {
    return this.productForm.get('category');
  }

  get price() {
    return this.productForm.get('price');
  }

  ngOnInit() {

    this.categoryList = ['notebook', 'phone', 'mouse', 'keyboard', 'microphone'];
    // todo: olmazsa burada categorylisti statik verebilirim
    // this.productService.categories$
    //   .pipe(takeUntil(this.unsubscribe$))
    //   .subscribe(
    //     (categoryData: []) => {
    //       this.categoryList = categoryData;
    //     }, (error: any) => {
    //       console.log('Error ocurred while fetching category List : ', error);
    //     });

    this.route.params.subscribe(
      (params: any) => {
        if (params.id) {
          this.productId = +params.id;
          // console.log('productId: route.params.', this.productId);
          this.fetchProductData();
        }
      }
    );
  }

  fetchProductData() {
    this.formTitle = 'Edit';
    this.productService.getProductById(this.productId)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (result: any) => {
          // console.log('result', result);

          this.setProductFormData(result);
        }, (error: any) => {
          console.log('Error ocurred while fetching product data : ', error);
        });
  }

  onFormSubmit() {
    if (!this.productForm.valid) {
      return;
    }
    if (this.files && this.files.length > 0) {
      for (let j = 0; j < this.files.length; j++) {
        this.formData.append('file' + j, this.files[j]);
      }
    }
    const res = this.formData.append('productFormData', JSON.stringify(this.productForm.value));
    // console.log('res',res);
    // console.log('this.formData',this.formData);

    if (this.productId) {
      this.editProductDetails();
    } else {
      this.saveProductDetails();
    }
  }

  editProductDetails() {
    // this.productService.updateProductDetails(this.formData)
    // console.log('editProductDetails this.productForm.value', this.productForm.value);
    this.productService.updateProductDetails(this.productForm.value)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        () => {
          this.router.navigate(['/admin/products']);
          this.snackBarService.showSnackBar('Product updated successfully');
        }, (error: any) => {
          console.log('Error ocurred while updating product data : ', error);
        });
  }

  saveProductDetails() {
    // this.productService.addProduct(this.formData)
    // console.log('saveProductDetails this.productForm.value', this.productForm.value);
    this.productService.addProduct(this.productForm.value)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        () => {
          this.router.navigate(['/admin/products']);
          this.snackBarService.showSnackBar('Product added successfully');

        }, (error: any) => {
          this.productForm.reset();
          console.log('Error ocurred while adding product data : ', error);
        });
  }

  cancel() {
    this.router.navigate(['/admin/products']);
  }

  setProductFormData(productFormData: any) {
    this.productForm.setValue({
      id: productFormData.id,
      title: productFormData.title,
      description: productFormData.description,
      category: productFormData.category,
      price: productFormData.price,
      url: productFormData.url,
    });
    this.coverImagePath = productFormData.url;
  }

  uploadImage(event: any) {
    this.files = event.target.files;
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (myevent: ProgressEvent) => {
      this.coverImagePath = (myevent.target as FileReader).result;
      // console.log('this.coverImagePath', this.coverImagePath);
    };
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
