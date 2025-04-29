import { Component, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ImagesService } from '@app/services/common/images.service';
import { SharedModule } from "../../shared/shared.module";

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterModule, SharedModule],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss'
})
export class AuthLayoutComponent implements OnInit {

  constructor(
    public imagesService: ImagesService
  ) { }

  ngOnInit(): void {

  }



}
