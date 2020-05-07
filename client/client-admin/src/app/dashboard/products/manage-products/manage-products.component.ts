import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/shared/services/product.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CategoriesHomeComponent } from '../../categories/categories-home/categories-home.component';
import { PartyHomeComponent } from '../../party/party-home/party-home.component';
import { CategoryService } from 'src/shared/services/category.service';
import { PartyService } from 'src/shared/services/party.service';
import { UtilityService } from 'src/shared/services/utility.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.scss']
})
export class ManageProductsComponent implements OnInit {

  constructor(private productService: ProductService,  
    private utilityService: UtilityService,
    private categoryService: CategoryService, 
    private ngxService: NgxUiLoaderService,
    private partyService: PartyService) { }

  public products: any = [];
  public productsLength = this.products.length || 0;

  categoriesHomeComponent = new CategoriesHomeComponent(this.categoryService, this.ngxService)

  partyHomeComponent = new PartyHomeComponent(this.partyService);

  categories: any = []

  parties: any = []

  category: any

  showAddCategory: boolean = false

  showAddPacking: boolean = false

  packing: any

  uploadsServer: string;


  async ngOnInit() {
    this.uploadsServer = environment.UPLOADS_API;
    this.ngxService.startBackground()
    this.products = await this.getAllProducts()
    this.categories = await this.getCategories()
    this.parties = await this.getParties()
    this.ngxService.stopBackground()
  }

  openModal(content: any){
    this.utilityService.openModal(content,
      {
        size: 'xl',
      })
  }

  /**
   * Fetches all the products from the server
   */
  getAllProducts() {
    return new Promise((resolve, reject) => {
      this.productService.getAllProducts()
        .then((res) => resolve(res['data']))
        .catch(() => reject([]))
    })
  }

  editProduct(itemDetails){
    this.utilityService.asyncNotification('Please wait we are editing the product...', new Promise((resolve, reject)=>{
      this.productService.updateProduct(itemDetails)
      .then(()=>{
        resolve(this.utilityService.resolveAsyncPromise('Product edited!'))
      })
      .catch(()=>{
        reject(this.utilityService.rejectAsyncPromise('Unable to edit the product, please try again!'))
      })
    }))
  }

  setCategory(category: any){
    console.log(category)
    this.category = category;
  }

  addNewCategory(product: any, category: any){
    this.utilityService.asyncNotification('Please wait we are adding new category to the product...', new Promise((resolve, reject)=>{
      this.productService.addNewCategory(product.itemId, category.id)
      .then(()=>{
        product.categories.push(category);
        resolve(this.utilityService.resolveAsyncPromise('New Category added!'))
      })
      .catch(()=>{
        reject(this.utilityService.rejectAsyncPromise('Unable to add the category, please try again!'))
      })
    }))
  }

  removeCategory(product: any, category: any, index: number){
    this.utilityService.asyncNotification('Please wait we are removing category from the product...', new Promise((resolve, reject)=>{
      this.productService.removeCategory(product.itemId, category.id)
      .then(()=>{
        product.categories.splice(index, 1);
        resolve(this.utilityService.resolveAsyncPromise('Category removed!'))
      })
      .catch(()=>{
        reject(this.utilityService.rejectAsyncPromise('Unable to remove the category, please try again!'))
      })
    }))
  }

  addPacking(product: any){
    this.utilityService.asyncNotification('Please wait we are adding new packing...', new Promise((resolve, reject)=>{

      let itemDetails = {
        itemId: product.itemId,
        itemPackingDetails: [{size: this.packing}]
      }
      console.log(itemDetails);
      this.productService.addPacking(itemDetails)
      .then(()=>{
        product.itemPackingDetails.push({size: this.packing, status: 'y'})
        resolve(this.utilityService.resolveAsyncPromise('New packing added!'))
      })
      .catch(()=>{
        reject(this.utilityService.rejectAsyncPromise('Unable to add the packing, please try again!'))
      })
    }))
  }

  disableProduct(itemId: number, index: number){
    this.utilityService.asyncNotification('Please wait we are disabling the product...', new Promise((resolve, reject)=>{
      this.productService.disableProduct(itemId)
      .then(()=>{
        this.products[index].status = 'n'
        resolve(this.utilityService.resolveAsyncPromise('Product Disabled!'))
      })
      .catch(()=>{
        reject(this.utilityService.rejectAsyncPromise('Unable to disable the product, please try again!'))
      })
    }))

  }

  enableProduct(itemId, index){
    this.utilityService.asyncNotification('Please wait we are enabling the product...', new Promise((resolve, reject)=>{
      this.productService.enableProduct(itemId)
      .then(()=>{
        this.products[index].status = 'y'
        resolve(this.utilityService.resolveAsyncPromise('Product Enabled!'))
      })
      .catch(()=>{
        reject(this.utilityService.rejectAsyncPromise('Unable to enable the product, please try again!'))
      })
    }))

  }

  enablePacking(product, index){
    this.utilityService.asyncNotification('Please wait we are enabling the packing...', new Promise((resolve, reject)=>{

      let itemDetails = {
        itemId: product.itemId,
        itemPackingDetails: [{size: product.itemPackingDetails[index].size }]
      }

      this.productService.enablePacking(product.itemId, product.itemPackingDetails[index].id)
      .then(()=>{
        product.itemPackingDetails[index].status = 'y'
        resolve(this.utilityService.resolveAsyncPromise('Packing Enabled!'))
      })
      .catch(()=>{
        reject(this.utilityService.rejectAsyncPromise('Unable to enable the packing, please try again!'))
      })
    }))
  }

  disablePacking(product, index){
    this.utilityService.asyncNotification('Please wait we are enabling the packing...', new Promise((resolve, reject)=>{

      let itemDetails = {
        itemId: product.itemId,
        itemPackingDetails: [{size: product.itemPackingDetails[index].size }]
      }

      this.productService.removePacking(itemDetails)
      .then(()=>{
        product.itemPackingDetails[index].status = 'n'
        resolve(this.utilityService.resolveAsyncPromise('Packing Disabled!'))
      })
      .catch(()=>{
        reject(this.utilityService.rejectAsyncPromise('Unable to disable the packing, please try again!'))
      })
    }))
   
  }

  async getCategories(){
    return new Promise((resolve)=>{
      this.categoriesHomeComponent.getAllCategories()
      .then((res)=> resolve(res['data']))
    })
  }

  async getParties(){
    return new Promise((resolve)=>{
      this.partyHomeComponent.getAllParties()
      .then((res)=> resolve(res['data']))
    })
  }


}
