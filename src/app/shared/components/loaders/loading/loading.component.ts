import { Component } from '@angular/core';
import { ImagesService } from '@app/services/common/images.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingComponent {

  constructor(
    public imagesService: ImagesService
  ) {}

}
