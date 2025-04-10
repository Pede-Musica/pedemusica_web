import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  public logo = './assets/img/logo.png';
  public background_login = './assets/img/background.png';
  public loading = './assets/img/loading.gif';

  //Icons
  public user_icon = './assets/img/icons/user.jpg';
  public fruit_icon = './assets/img/icons/fruit.jpg';
}
