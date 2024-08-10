import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from '@app/services/common/dialog.service';
import { NavigationService } from '@app/services/common/navigation.service';
import { SnackbarService } from '@app/services/common/snackbar.service';
import { ProducerService } from '@app/services/user/producer.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-producer-form',
  templateUrl: './producer-form.component.html',
  styleUrl: './producer-form.component.scss'
})
export class ProducerFormComponent {

  public isLoading = signal(false);
  public isEditing = signal(false);
  public showError = signal(false);
  public form: FormGroup
  public producer_id = signal('');

  constructor(
    public navigationService: NavigationService,
    private _formBuilder: FormBuilder,
    public dialogService: DialogService,
    private _producerService: ProducerService,
    private _router: Router,
    private _snackService: SnackbarService,
    private _activeRoute: ActivatedRoute
  ) {
    this.form = this._formBuilder.group({
      name: ['', [Validators.required]],
      isActive: [true, [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      cad_pro: [''],
      ggn: ['']
    })
  }

  ngOnInit(): void {
    const producer_id = this._activeRoute.snapshot.params['id'];

    if(producer_id){
      this.isEditing.set(true);
      this.producer_id.set(producer_id)
      this.detail(producer_id);
    }
  }


  get icon() {
    return this.navigationService.getIcon('producers');
  }

  public detail(id: string) {
    this.isLoading.set(true);

    this._producerService.detail(id).subscribe(
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

    if(this.isEditing()) {
      data.id = this.producer_id();
      observable = this._producerService.update(data);
    } else {
      observable = this._producerService.create(data);
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
