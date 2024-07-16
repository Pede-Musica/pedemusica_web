import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from '@app/services/common/dialog.service';
import { NavigationService } from '@app/services/common/navigation.service';
import { SnackbarService } from '@app/services/common/snackbar.service';
import { ProductService } from '@app/services/user/product.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {

  public isLoading = signal(false);
  public isEditing = signal(false);
  public showError = signal(false);
  public form: FormGroup
  public product_id = signal('');

  constructor(
    public navigationService: NavigationService,
    private _formBuilder: FormBuilder,
    public dialogService: DialogService,
    private _productService: ProductService,
    private _router: Router,
    private _snackService: SnackbarService,
    private _activeRoute: ActivatedRoute
  ) {
    this.form = this._formBuilder.group({
      name: ['', [Validators.required]],
      isActive: [true, [Validators.required]],
    })
  }

  ngOnInit(): void {
    const producer_id = this._activeRoute.snapshot.params['id'];

    if (producer_id) {
      this.isEditing.set(true);
      this.product_id.set(producer_id)
      this.detail(producer_id);
    }
  }


  get icon() {
    return this.navigationService.getIcon('products');
  }

  get type() {
    return this.form.get(['type'])?.value;
  }

  get phoneLength() {
    const value = this.form.get(['phone'])?.value;

    if(value?.length < 11) {
      return '(00) 0000-00000'
    } else {
      return '(00) 00000-0000'
    }
  }

  public detail(id: string) {
    this.isLoading.set(true);

    this._productService.detail(id).subscribe(
      data => {
        this.form.patchValue(data);
        this.isLoading.set(false);
      },
      error => {
        this.isLoading.set(false);
        this._snackService.open(error.error.message)
      }
    )
  }

  public create() {

    if (this.form.invalid) {
      this.showError.set(true)
      return
    }

    const data = this.form.value;

    data.phone = String(data.phone)

    this.isLoading.set(true);

    let observable: Observable<any>;

    if (this.isEditing()) {
      data.id = this.product_id();
      observable = this._productService.update(data);
    } else {
      observable = this._productService.create(data);
    }

    observable.subscribe(
      response => {
        this.dialogService.open(true, response.message, response.type, response.submessage);
        this._router.navigate([this.navigationService.getPATH('products')]);
      },
      error => {
        this.isLoading.set(false);
        this._snackService.open(error.error.message)
      }
    )
  }
}
