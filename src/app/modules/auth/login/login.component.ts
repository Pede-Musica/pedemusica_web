import { Component, signal } from '@angular/core';
import { FormControl, Validators, FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '@app/services/auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  public form: FormGroup;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  hide = signal(true);
  isLoading = signal(false);

  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService
  ) {
    this.form = this._formBuilder.group(
      {
        email: ['', [Validators.required]],
        password: ['', [Validators.required]]
      }
    )
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  public doLogin() {

    if(this.form.invalid){
      return
    }

    this.isLoading.set(true);

    const data = this.form.value;

    this._authService.login(data).subscribe(
      response => {
        this.isLoading.set(false);
      }
    )
  }

}
