import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationService } from '@app/services/common/navigation.service';
import { SnackbarService } from '@app/services/common/snackbar.service';
import { LocationService } from '@app/services/user/location.service';
import { RegisterService } from '@app/services/user/register.service';

interface locationProps {
  name: string
  Sector: {
    name: string
  }
  description: string
  Volume: Array<any>
}

@Component({
  selector: 'app-track-location',
  templateUrl: './track-location.component.html',
  styleUrl: './track-location.component.scss'
})
export class TrackLocationComponent implements OnInit {

  public isLoading = signal(true);
  public locationData: locationProps = {
    name: '',
    Sector: {
      name: ''
    },
    description: '',
    Volume: []
  };

  constructor(
    private _locationService: LocationService,
    public activeRoute: ActivatedRoute,
    public navigationService: NavigationService,
    public router: Router,
    public snackService: SnackbarService
  ) {}

  ngOnInit(): void {
    const location_id = this.activeRoute.snapshot.params['id'];

    if(location_id) {
      this.getDetail(location_id)
    }
    else{
      this.router.navigate(['/in/track'])
    }
  }

  get icon() {
    return this.navigationService.getIcon('locations');
  }


  public getDetail(id: string) {

    this.isLoading.set(true)

    this._locationService.detail(id).subscribe(
      data => {
        this.locationData = data;
        this.isLoading.set(false);
      },
      excp => {
        this.snackService.open(excp.error.message)
        this.router.navigate(['/in/track'])
      }
    )
  }

}
