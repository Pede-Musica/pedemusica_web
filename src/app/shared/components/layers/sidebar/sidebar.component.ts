import { Component, EventEmitter, Output, signal } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationService } from '@app/services/common/navigation.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})

export class SidebarComponent {

  @Output() openEvent = new EventEmitter<boolean>();
  public pathname = window.location.pathname;

  constructor(
    public navigationService: NavigationService,
    private _router: Router
  ) { }


  public navigate(path: string) {
    this.openEvent.emit(false);
    this._router.navigate([path])

  }

  public checkType(item: any) {

    if (this.navigationService.isClientAdmin()) return true

    let found: boolean = false;

    item.child.map((c: any) => {
      if (c.needAdmin === false) {
        found = true
      }
    })

    return found;
  }

  public checkChild(child: any) {

    if (this.navigationService.isClientAdmin()) return true

    return child.needAdmin ? false : true
  }


}
