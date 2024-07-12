import { Component, OnInit, signal } from '@angular/core';
import { AuthService } from '@app/services/auth/auth.service';
import { ImagesService } from '@app/services/common/images.service';
import { Regex } from 'src/resources/handlers/regex';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent implements OnInit {

  public user_name = signal('');

  constructor(
    public imagesService: ImagesService,
    public authService: AuthService,
    private regex: Regex,
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
    const user_data = this.authService.getUser();
    const name = this.regex.getFirstAndLastName(user_data?.name)
    this.user_name.set(name)
  }

  public doLogout() {

    this._authService.clearAuthData();
  }

}
