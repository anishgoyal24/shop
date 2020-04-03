import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/shared/services/product.service';
import { UtilityService } from 'src/shared/services/utility.service';
import { CategoriesHomeComponent } from '../../categories/categories-home/categories-home.component';
import { CategoryService } from 'src/shared/services/category.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { PartyHomeComponent } from '../../party/party-home/party-home.component';
import { PartyService } from 'src/shared/services/party.service';

@Component({
  selector: 'app-new-products',
  templateUrl: './new-products.component.html',
  styleUrls: ['./new-products.component.scss']
})
export class NewProductsComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private utilityService: UtilityService,
    private categoryService: CategoryService, 
    private ngxService: NgxUiLoaderService,
    private partyService: PartyService
  ) { }

  productDetails ={
    itemName: '',
    customerAllowed: '',
    categories: [],
    itemPackingDetails:{
      size: 0
    },
    description: ''
  }

  image: any

  categories: any;

  category: any

  categoriesHomeComponent = new CategoriesHomeComponent(this.categoryService, this.ngxService)

  partyHomeComponent = new PartyHomeComponent(this.partyService);

  parties: any;

  selectedParty

  async ngOnInit() {
    await this.getCategories()
    .then((res)=>{
      this.categories = res['data'];
    })

    await this.getParties()
    .then((res)=>{
      this.parties = res
    })
  }

  onAttach(image: any){
    return this.image = image.target.files[0]
  }

  setCategory(category: any){
    console.log(category)
    this.category = category.category;
    this.productDetails.categories.push({ id: category.id })
  }

  onCreateProduct(productDetails: any){

    // console.log(productDetails)
    productDetails.itemPackingDetails = [{size: productDetails.itemPackingDetails.size}]
    let formData = new FormData();
    console.log(
      {
        itemDetails: JSON.stringify(productDetails),
        image: this.image
      }
    )
    formData.append('itemDetails', JSON.stringify(productDetails))
    // formData.append('customerAllowed', productDetails.customerAllowed)
    // formData.append('category', productDetails.category)
    // formData.append('itemPackingDetails', productDetails.itemPackingDetails)
    formData.append('image', this.image, this.image.name)

    this.createNewProduct(formData);
  }

  createNewProduct(productDetails: any){
    this.utilityService.asyncNotification('Creating New Product', 
    new Promise((resolve, reject)=>{
      this.productService.createNewProduct(productDetails)
      .then(()=>{
        resolve(this.utilityService.resolveAsyncPromise('Product Created!'))
      })
      .catch(()=>{
        reject(this.utilityService.rejectAsyncPromise('Some error occured, while creating the product!'))
      })
    }))
  }

  async getCategories(){
    return new Promise((resolve)=>{
      this.categoriesHomeComponent.getAllCategories()
      .then((res)=> resolve(res))
    })
  }

  async getParties(){
    return new Promise((resolve)=>{
      this.partyHomeComponent.getAllParties()
      .then((res)=> resolve(res))
    })
  }

}
