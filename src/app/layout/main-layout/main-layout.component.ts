import { Component, inject, signal, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from "../../shared/shared.module";
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterModule, SharedModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {

  public openSidebar = signal(false)

}
