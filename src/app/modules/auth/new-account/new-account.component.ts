import { Component, OnInit, signal } from '@angular/core';
import { FormControl, Validators, FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth/auth.service';
import { ImagesService } from '@app/services/common/images.service';
import { NavigationService } from '@app/services/common/navigation.service';
import { SnackbarService } from '@app/services/common/snackbar.service';


@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrl: './new-account.component.scss'
})
export class NewAccountComponent {

  public form: FormGroup;
  hide = signal(true);
  hide2 = signal(true);
  isLoading = signal(false);
  error = signal('');

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    public imagesService: ImagesService,
    public snackbarService: SnackbarService,
    private _router: Router,
    public navigationService: NavigationService
  ) {
    this.form = this._formBuilder.group(
      {
        password: ['', [Validators.required]],
        confirm: ['', [Validators.required]]
      }
    )
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  public createPassword() {

    if(this.form.invalid) {
      return
    }

    const data = this.form.value;

    if(data.password.length < 6) {
      this.error.set('É necessário no mínimo 6 caracteres');
      return
    } else {
      this.error.set('')
    }

    if(data.password !== data.confirm) {
      this.error.set('Senhas digitadas não coincidem');
      return
    } else {
      this.error.set('')
    }

    this.isLoading.set(true);


    this._authService.setPassword(data).subscribe(
      response => {
        this.snackbarService.open(response.message);
        this._router.navigate(['/auth'])
      },
      error => {
        this.isLoading.set(false);
        this.snackbarService.open(error.error.message)
      }
    )
  }

}
