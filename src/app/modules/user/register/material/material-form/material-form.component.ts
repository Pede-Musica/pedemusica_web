import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from '@app/services/common/dialog.service';
import { NavigationService } from '@app/services/common/navigation.service';
import { SnackbarService } from '@app/services/common/snackbar.service';
import { MaterialService } from '@app/services/user/material.service';
import { ProductService } from '@app/services/user/product.service';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-material-form',
  templateUrl: './material-form.component.html',
  styleUrl: './material-form.component.scss'
})
export class MaterialFormComponent {

  public isLoading = signal(false);
  public isEditing = signal(false);
  public showError = signal(false);
  public form: FormGroup
  public material_id = signal('');

  constructor(
    public navigationService: NavigationService,
    private _formBuilder: FormBuilder,
    public dialogService: DialogService,
    private _materialService: MaterialService,
    private _router: Router,
    private _snackService: SnackbarService,
    private _activeRoute: ActivatedRoute
  ) {
    this.form = this._formBuilder.group({
      name: ['', [Validators.required]],
      isActive: [true, [Validators.required]],
      volume: [0, [Validators.required, Validators.min(0), Validators.max(999999999)]],
      in_stock: [0, [Validators.required, Validators.min(0), Validators.max(999999999)]],
      traceable: [false, [Validators.required]],
      description: [''],
    })
  }

  ngOnInit(): void {
    const material_id = this._activeRoute.snapshot.params['id'];

    if (material_id) {
      this.isEditing.set(true);
      this.material_id.set(material_id)
      this.detail(material_id);
    }
  }


  get icon() {
    return this.navigationService.getIcon('materials');
  }


  public detail(id: string) {
    this.isLoading.set(true);

    this._materialService.detail(id).subscribe(
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
      data.id = this.material_id();
      observable = this._materialService.update(data);
    } else {
      observable = this._materialService.create(data);
    }

    observable.subscribe(
      response => {
        this._snackService.open(response.message);
        this._router.navigate([this.navigationService.getPATH('materials')]);
      },
      error => {
        this.isLoading.set(false);
        this._snackService.open(error.error.message)
      }
    )
  }
}
