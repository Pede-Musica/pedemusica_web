import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from '@app/services/common/dialog.service';
import { NavigationService } from '@app/services/common/navigation.service';
import { SnackbarService } from '@app/services/common/snackbar.service';
import { PersonService } from '@app/services/user/person.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrl: './person-form.component.scss'
})
export class PersonFormComponent {

  public isLoading = signal(false);
  public isEditing = signal(false);
  public showError = signal(false);
  public form: FormGroup;
  public user_id = signal('');

  constructor(
    public navigationService: NavigationService,
    private _formBuilder: FormBuilder,
    public dialogService: DialogService,
    private _personService: PersonService,
    private _router: Router,
    private _snackService: SnackbarService,
    private _activeRoute: ActivatedRoute
  ) {
    this.form = this._formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      phone2: [''],
      address: ['', [Validators.required]],
      type: [1, [Validators.required]],
      cpf_cnpj: ['', [Validators.required]],
    });

  }

  ngOnInit(): void {
    const user_id = this._activeRoute.snapshot.params['id'];

    if (user_id) {
      this.isEditing.set(true);
      this.user_id.set(user_id)
      this.detail(user_id);
    }
  }


  get icon() {
    return this.navigationService.getIcon('users');
  }

  get type() {
    return this.form.get(['type'])?.value;
  }

  public detail(id: string) {
    this.isLoading.set(true);

    this._personService.detail(id).subscribe(
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

    this.isLoading.set(true);

    const data = this.form.value;
    data.isUser = true;

    let observable: Observable<any>;

    if (this.isEditing()) {
      data.id = this.user_id();
      observable = this._personService.update(data);
    } else {
      observable = this._personService.create(data);
    }

    observable.subscribe(
      response => {
        this._snackService.open(response.message);
        this._router.navigate([this.navigationService.getPATH('users')]);
      },
      error => {
        this.isLoading.set(false);
        this._snackService.open(error.error.message)
      }
    )
  }
}
