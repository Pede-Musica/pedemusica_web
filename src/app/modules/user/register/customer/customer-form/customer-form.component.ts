import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from '@app/services/common/dialog.service';
import { NavigationService } from '@app/services/common/navigation.service';
import { SnackbarService } from '@app/services/common/snackbar.service';
import { CustomerService } from '@app/services/user/customer.service';
import { ProducerService } from '@app/services/user/producer.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.scss'
})
export class CustomerFormComponent {

  public isLoading = signal(false);
  public isEditing = signal(false);
  public showError = signal(false);
  public form: FormGroup
  public customer_id = signal('');

  constructor(
    public navigationService: NavigationService,
    private _formBuilder: FormBuilder,
    public dialogService: DialogService,
    private _customerService: CustomerService,
    private _router: Router,
    private _snackService: SnackbarService,
    private _activeRoute: ActivatedRoute
  ) {
    this.form = this._formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      isActive: [true, [Validators.required]],
      address: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      type: [1, [Validators.required]],
      cpf_cnpj: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    const producer_id = this._activeRoute.snapshot.params['id'];

    if (producer_id) {
      this.isEditing.set(true);
      this.customer_id.set(producer_id)
      this.detail(producer_id);
    }
  }


  get icon() {
    return this.navigationService.getIcon('customers');
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

    this._customerService.detail(id).subscribe(
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
      data.id = this.customer_id();
      observable = this._customerService.update(data);
    } else {
      observable = this._customerService.create(data);
    }

    observable.subscribe(
      response => {
        this._snackService.open(response.message);
        this._router.navigate([this.navigationService.getPATH('customers')]);
      },
      error => {
        this.isLoading.set(false);
        this._snackService.open(error.error.message)
      }
    )
  }
}
