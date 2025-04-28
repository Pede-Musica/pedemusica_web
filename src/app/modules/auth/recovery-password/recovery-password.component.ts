import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth/auth.service';
import { NavigationService } from '@app/services/common/navigation.service';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrl: './recovery-password.component.scss'
})
export class RecoveryPasswordComponent {

  public form: FormGroup;
  isLoading = signal(false);
  step = signal(1);
  email = signal('');


  constructor(
    private _formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    public navigationService: NavigationService
  ) {
    this.form = this._formBuilder.group(
      {
        email: ['', [Validators.required]],
      }
    )
  }

  public send() {

    if (this.form.invalid) {
      return
    }

    this.isLoading.set(true);

    const data = this.form.value;
    this.email.set(data.email)

    this._authService.forgotPassword(data).subscribe(
      response => {
        this.step.set(2)
      },
      excp => {
        this.isLoading.set(false);
      }
    )
  }


}
