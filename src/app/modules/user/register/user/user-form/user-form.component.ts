import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from '@app/services/common/dialog.service';
import { NavigationService } from '@app/services/common/navigation.service';
import { SnackbarService } from '@app/services/common/snackbar.service';
import { PersonService } from '@app/services/user/person.service';
import { UserService } from '@app/services/user/user.service';
import { DialogComponent } from '@app/shared/components/dialogs/dialog/dialog.component';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent {

  public isLoading = signal(false);
  public isEditing = signal(false);
  public showError = signal(false);
  public form: FormGroup;
  public user_id = signal('');
  public allPermissionChecked = signal(false);

  constructor(
    public navigationService: NavigationService,
    private _formBuilder: FormBuilder,
    public dialogService: DialogService,
    private _router: Router,
    private _snackService: SnackbarService,
    private _activeRoute: ActivatedRoute,
    private _userService: UserService
  ) {
    this.form = this._formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      phone2: [''],
      address: [''],
      type: [1, [Validators.required]],
      cpf_cnpj: ['', [Validators.required]],
      is_active: [false, Validators.required],
      client_admin: [false, Validators.required]
    });

  }

  ngOnInit(): void {
    const user_id = this._activeRoute.snapshot.params['id'];

    if (user_id) {
      this.isEditing.set(true);
      this.user_id.set(user_id)
      this.detail(user_id);
    } else {
      document.title = 'Novo usuário'
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

    this._userService.detail(id).subscribe(
      data => {
        this.form.patchValue(data);
        document.title = data?.name ?? 'Editar usuário';
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
      observable = this._userService.update(data);
    } else {
      observable = this._userService.create(data);
    }

    observable.subscribe(
      response => {
        const dialogRef = this.dialogService.open(true, 'Usuário criado com sucesso!', 'success', `Um e-mail foi enviado para ${data.email} para realizar o primeiro acesso.`)
        this._router.navigate([this.navigationService.getPATH('users')]);
      },
      error => {
        this.isLoading.set(false);
        this._snackService.open(error.error.message)
      }
    )
  }

  public setPermission(event: any) {
    const toggle = event.checked;
    this.allPermissionChecked.set(toggle)
  }
}
