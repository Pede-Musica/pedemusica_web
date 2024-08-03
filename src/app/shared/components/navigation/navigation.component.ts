import { Component, EventEmitter, OnInit, Output, signal } from '@angular/core';
import { AuthService } from '@app/services/auth/auth.service';
import { ImagesService } from '@app/services/common/images.service';
import { Regex } from '@app/resources/handlers/regex';
import { NavigationService } from '@app/services/common/navigation.service';

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
    private regex: Regex,
    private _authService: AuthService,
    public navigationService: NavigationService
  ) { }

  ngOnInit(): void {
    const user_data = this.authService.getUser();
    const name = this.regex.getFirstAndLastName(user_data?.name)

    const user_name = this.regex.getFirstNameAndLastNameInitial(name)
    this.user_name.set(user_name);
  }

  public doLogout() {
    this._authService.clearAuthData();
  }

  public openSideBar() {
    this.openEvent.emit();
  }

}
