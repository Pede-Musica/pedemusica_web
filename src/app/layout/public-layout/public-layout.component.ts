import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { AuthRoutingModule } from "@app/modules/auth/auth-routing.module";
import { ImagesService } from '@app/services/common/images.service';

@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [AuthRoutingModule, RouterModule],
  templateUrl: './public-layout.component.html',
  styleUrl: './public-layout.component.scss'
})
export class PublicLayoutComponent {

  constructor(
    public imagesService: ImagesService
  ) {}

}
