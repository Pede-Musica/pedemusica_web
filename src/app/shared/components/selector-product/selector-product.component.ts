import { Component, OnInit, signal } from '@angular/core';
import { ImagesService } from '@app/services/common/images.service';
import { NavigationService } from '@app/services/common/navigation.service';
import { SnackbarService } from '@app/services/common/snackbar.service';
import { ProductService } from '@app/services/user/product.service';

@Component({
  selector: 'app-selector-product',
  templateUrl: './selector-product.component.html',
  styleUrl: './selector-product.component.scss'
})
export class SelectorProductComponent {

  public isLoading = signal(true);
  public productList: Array<any> = [];
  public productTotal: number = 0;
  public page_size: number = 10;
  public page_index: number = 0;
  public order: string = 'asc';

  constructor(
    public navigationService: NavigationService,
    private _productService: ProductService,
    private _snackbarService: SnackbarService,
    public image: ImagesService
  ){}

  ngOnInit(): void {
    this.getProduct()
  }

  get icon() {
    return this.navigationService.getIcon('products');
  }

  public getProduct() {

    this.isLoading.set(true);

    const params = {
      search: '',
      page: this.page_index + 1,
      pageSize: this.page_size,
      order: this.order,
      isActive: true
    }

    this._productService.paginate(params).subscribe(
      data => {
        this.productList = data.data;
        this.productTotal = data.total;
        this.isLoading.set(false);
      },
      error => {
        this._snackbarService.open(error.error.message)
      }
    )
  }

}
