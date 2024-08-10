import { Component, EventEmitter, OnInit, Output, signal } from '@angular/core';
import { AuthService } from '@app/services/auth/auth.service';
import { ImagesService } from '@app/services/common/images.service';
import { Regex } from '@app/resources/handlers/regex';
import { NavigationService } from '@app/services/common/navigation.service';
import { RegisterService } from '@app/services/user/register.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit {

  @Output() openEvent = new EventEmitter<boolean>();
  public user_name = signal('');
  public open = signal(true);

  constructor(
    public imagesService: ImagesService,
    public authService: AuthService,
    public regex: Regex,
    private _authService: AuthService,
    public navigationService: NavigationService,
    private _registerService: RegisterService
  ) { }

  ngOnInit(): void {
    const user_data = this.authService.getUser();
    const name = this.regex.getFirstAndLastName(user_data?.name)

    this.user_name.set(name);
  }

  public doLogout() {
    this._authService.clearAuthData();
  }

  public openSideBar() {
    this.openEvent.emit();
  }

  get checkExits() {
    if(this.navigationService.hasExits() > 0){
      return false
    } else {
      return true
    }
  }

}
