import { Component, OnInit, signal } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Regex } from '@app/resources/handlers/regex';
import { NavigationService } from '@app/services/common/navigation.service';
import { SnackbarService } from '@app/services/common/snackbar.service';
import { CustomerService } from '@app/services/user/customer.service';

interface props {

}


@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss'
})
export class CustomerListComponent {

  public isLoading = signal(true);
  displayedColumns: string[] = ['name', 'email', 'status', 'created_at', 'action',];
  public customerList: Array<props> = [];
  public customerTotal: number = 0;
  public page_size: number = 10;
  public page_index: number = 0;
  public order: string = 'asc';

  constructor(
    public navigationService: NavigationService,
    private _customerService: CustomerService,
    private _snackbarService: SnackbarService,
    public regex: Regex,
  ) {}


  ngOnInit(): void {
    this.getProducers();
  }

  get title() {
    return this.navigationService.getName('customers');
  }

  get icon() {
    return this.navigationService.getIcon('customers');
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

    this._customerService.paginate(params).subscribe(
      data => {
        this.customerList = data.data;
        this.customerTotal = data.total;
        this.isLoading.set(false);
      },
      error => {
        this._snackbarService.open(error.error.message)
      }
    )
  }

}
