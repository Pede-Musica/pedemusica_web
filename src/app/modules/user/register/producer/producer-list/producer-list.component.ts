import { Component, OnInit, signal } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Regex } from '@app/resources/handlers/regex';
import { NavigationService } from '@app/services/common/navigation.service';
import { SnackbarService } from '@app/services/common/snackbar.service';
import { ProducerService } from '@app/services/user/producer.service';

interface producerProps {

}

@Component({
  selector: 'app-producer-list',
  templateUrl: './producer-list.component.html',
  styleUrl: './producer-list.component.scss'
})
export class ProducerListComponent implements OnInit {

  public isLoading = signal(true);
  displayedColumns: string[] = ['name', 'email', 'status', 'created_at', 'action',];
  public userList: Array<producerProps> = [];
  public userTotal: number = 0;
  public page_size: number = 10;
  public page_index: number = 0;
  public order: string = 'asc';

  constructor(
    public navigationService: NavigationService,
    private _producerService: ProducerService,
    private _snackbarService: SnackbarService,
    public regex: Regex,
  ) {}


  ngOnInit(): void {
    this.getProducers();
  }

  get title() {
    return this.navigationService.getName('users');
  }

  get icon() {
    return this.navigationService.getIcon('users');
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

    this._producerService.paginate(params).subscribe(
      data => {
        this.userList = data.data;
        this.userTotal = data.total;
        this.isLoading.set(false);
      },
      error => {
        this._snackbarService.open(error.error.message)
      }
    )
  }

}
