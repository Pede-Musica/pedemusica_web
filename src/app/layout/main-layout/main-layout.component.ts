import { Component, HostListener, inject, OnInit, signal, ViewChild } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SharedModule } from "../../shared/shared.module";
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationService } from '@app/services/common/navigation.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterModule, SharedModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent implements OnInit {

  public openSidebar = signal(true);
  public displayMode = signal('')

  constructor(
    public navigationService: NavigationService,
    private _route: Router
  ) {
    this._route.events.subscribe((val) => {
      console.log(val)
      if(this.displayMode() === 'mobile') {
        this.openSidebar.set(false)
      }
    })
  }

  ngOnInit(): void {
    const width = window.innerWidth;

    if(width >= 1024 ) {
      this.displayMode.set('desktop')
    } else {
      this.displayMode.set('mobile')
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    const width = event.target.innerWidth;
    if(width >= 1024 ) {
      this.displayMode.set('desktop')
      this.openSidebar.set(true)
    } else {
      this.displayMode.set('mobile')
      this.openSidebar.set(false)
    }
  }


}
