import { Component, OnInit, signal } from '@angular/core';
import { NavigationService } from '@app/services/common/navigation.service';
import { LocationService } from '@app/services/user/location.service';

@Component({
  selector: 'app-selector-location',
  templateUrl: './selector-location.component.html',
  styleUrl: './selector-location.component.scss'
})
export class SelectorLocationComponent implements OnInit {

  public locationList: Array<any> = [];
  public isLoading = signal(true);

  constructor(
    private _locationService: LocationService,
    public navigationService: NavigationService
  ) {}

  ngOnInit(): void {

    this._locationService.combolist().subscribe(
      data => {
        this.locationList = data;
        this.isLoading.set(false)
      }
    )
  }

  get icon() {
    return this.navigationService.getIcon('locations');
  }



}
