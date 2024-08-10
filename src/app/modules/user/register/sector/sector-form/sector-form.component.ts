import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from '@app/services/common/dialog.service';
import { NavigationService } from '@app/services/common/navigation.service';
import { SnackbarService } from '@app/services/common/snackbar.service';
import { LocationService } from '@app/services/user/location.service';
import { ProductService } from '@app/services/user/product.service';
import { SectorService } from '@app/services/user/sector.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-sector-form',
  templateUrl: './sector-form.component.html',
  styleUrl: './sector-form.component.scss'
})
export class SectorFormComponent {


  public isLoading = signal(false);
  public isEditing = signal(false);
  public showError = signal(false);
  public form: FormGroup
  public sector_id = signal('');
  public sectorList: Array<any> = [];

  constructor(
    public navigationService: NavigationService,
    private _formBuilder: FormBuilder,
    public dialogService: DialogService,
    private _sectorService: SectorService,
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
    const sector_id = this._activeRoute.snapshot.params['id'];

    if (sector_id) {
      this.isEditing.set(true);
      this.sector_id.set(sector_id)
      this.detail(sector_id);
    }
  }


  get icon() {
    return this.navigationService.getIcon('sectors');
  }


  public detail(id: string) {
    this.isLoading.set(true);

    this._sectorService.detail(id).subscribe(
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

    this.isLoading.set(true);

    let observable: Observable<any>;

    if (this.isEditing()) {
      data.id = this.sector_id();
      observable = this._sectorService.update(data);
    } else {
      observable = this._sectorService.create(data);
    }

    observable.subscribe(
      response => {
        this._snackService.open(response.message);
        this._router.navigate([this.navigationService.getPATH('sectors')]);
      },
      error => {
        this.isLoading.set(false);
        this._snackService.open(error.error.message)
      }
    )
  }
}
