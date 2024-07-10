import { Component, OnInit, signal } from '@angular/core';
import { ImagesService } from '@app/services/common/images.service';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [],
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
