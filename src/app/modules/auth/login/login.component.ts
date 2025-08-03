import { Component, OnInit, signal } from '@angular/core';
import { FormControl, Validators, FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth/auth.service';
import { ImagesService } from '@app/services/common/images.service';
import { NavigationService } from '@app/services/common/navigation.service';
import { SnackbarService } from '@app/services/common/snackbar.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  hide = signal(true);
  isLoading = signal(false);

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
        email: ['', [Validators.required]],
        password: ['', [Validators.required]]
      }
    )
  }

  ngOnInit(): void {
    document.title = 'Pede Música - Login';
    const latestUser = localStorage.getItem('lastUser');
    if(latestUser){
      this.form.patchValue({ email: String(latestUser) })
    }
    this.checkAuth()
  }

  public checkAuth() {
    const status = this._authService.isAuthenticated();

    if (status) {
      this._router.navigate(['/in/home']);
    }
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  focusInput() {
    const el = document.getElementById("user");
    el?.focus();
  }

  public doLogin() {

    if (this.form.invalid) {
      return
    }

    this.isLoading.set(true);

    const data = this.form.value;

    this._authService.login(data).subscribe(
      response => {
        localStorage.setItem('lastUser', data.email)
        this._authService.setToken(response.access_token);
        this._authService.setUser(response.user_name)
        this._authService.setExpires(response.expires_in);
        return this._router.navigate([this.navigationService.getPATH('home')])
      },
      excp => {
        this.isLoading.set(false);
        this.snackbarService.open(excp.error.message ?? 'Houve um erro inesperado')
      }
    )
  }

}
