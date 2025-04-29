import { Component } from '@angular/core';
import { ImagesService } from '@app/services/common/images.service';

@Component({
  selector: 'app-loading-food',
  templateUrl: './loading-food.component.html',
  styleUrl: './loading-food.component.scss'
})
export class LoadingFoodComponent {

  constructor(
    public imageService: ImagesService
  ){}

}
