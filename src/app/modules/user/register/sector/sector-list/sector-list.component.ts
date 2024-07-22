import { LocationService } from './../../../../../services/user/location.service';
import { Component, signal } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Regex } from '@app/resources/handlers/regex';
import { NavigationService } from '@app/services/common/navigation.service';
import { SnackbarService } from '@app/services/common/snackbar.service';
import { SectorService } from '@app/services/user/sector.service';

interface props {

}



@Component({
  selector: 'app-sector-list',
  templateUrl: './sector-list.component.html',
  styleUrl: './sector-list.component.scss'
})
export class SectorListComponent {

  public isLoading = signal(true);
  displayedColumns: string[] = ['name', 'status', 'created_at', 'action',];
  public sectorList: Array<props> = [];
  public sectorTotal: number = 0;
  public page_size: number = 10;
  public page_index: number = 0;
  public order: string = 'asc';

  constructor(
    public navigationService: NavigationService,
    private _sectorService: SectorService,
    private _snackbarService: SnackbarService,
    public regex: Regex,
  ) { }


  ngOnInit(): void {
    this.getSectors();
  }

  get title() {
    return this.navigationService.getName('sectors');
  }

  get icon() {
    return this.navigationService.getIcon('sectors');
  }

  public filterOrder(event: Event) {
    this.order = (event.target as HTMLInputElement).value;
    this.getSectors();
  }

  public pageEvent(event: PageEvent) {
    this.page_size = event.length;
    this.page_index = event.pageIndex;
    this.page_size = event.pageSize;

    this.getSectors();
  }

  public getSectors() {

    this.isLoading.set(true);

    const params = {
      search: '',
      page: this.page_index + 1,
      pageSize: this.page_size,
      order: this.order
    }

    this._sectorService.paginate(params).subscribe(
      data => {
        this.sectorList = data.data;
        this.sectorTotal = data.total;
        this.isLoading.set(false);
      },
      error => {
        this._snackbarService.open(error.error.message)
      }
    )
  }

}
