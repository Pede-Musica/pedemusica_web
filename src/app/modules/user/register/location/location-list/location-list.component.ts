import { LocationService } from './../../../../../services/user/location.service';
import { Component, signal } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Regex } from '@app/resources/handlers/regex';
import { NavigationService } from '@app/services/common/navigation.service';
import { SnackbarService } from '@app/services/common/snackbar.service';
import { ProductService } from '@app/services/user/product.service';

interface props {

}


@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrl: './location-list.component.scss'
})
export class LocationListComponent {

  public isLoading = signal(true);
  displayedColumns: string[] = ['name', 'sector', 'status', 'created_at', 'action',];
  public locationList: Array<props> = [];
  public locationTotal: number = 0;
  public page_size: number = 10;
  public page_index: number = 0;
  public order: string = 'asc';

  constructor(
    public navigationService: NavigationService,
    private _locationService: LocationService,
    private _snackbarService: SnackbarService,
    public regex: Regex,
  ) { }


  ngOnInit(): void {
    this.getProducers();
  }

  get title() {
    return this.navigationService.getName('locations');
  }

  get icon() {
    return this.navigationService.getIcon('locations');
  }

  public filterOrder(event: Event) {
    this.order = (event.target as HTMLInputElement).value;
    this.getProducers();
  }

  public pageEvent(event: PageEvent) {
    this.page_size = event.length;
    this.page_index = event.pageIndex;
    this.page_size = event.pageSize;

    this.getProducers();
  }

  public getProducers() {

    this.isLoading.set(true);

    const params = {
      search: '',
      page: this.page_index + 1,
      pageSize: this.page_size,
      order: this.order
    }

    this._locationService.paginate(params).subscribe(
      data => {
        this.locationList = data.data;
        this.locationTotal = data.total;
        this.isLoading.set(false);
      },
      error => {
        this._snackbarService.open(error.error.message)
      }
    )
  }

}
