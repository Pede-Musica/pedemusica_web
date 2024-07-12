import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '@app/services/common/navigation.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})

export class SidebarComponent {

  public pathname = window.location.pathname;

  constructor(
    public navigationService: NavigationService,
    private _router: Router
  ) {}


  public navigate(path: string) {
    this._router.navigate([path])
  }
}
