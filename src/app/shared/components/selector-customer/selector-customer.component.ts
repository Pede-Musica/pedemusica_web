import { Component, OnInit, signal } from '@angular/core';
import { ImagesService } from '@app/services/common/images.service';
import { NavigationService } from '@app/services/common/navigation.service';
import { SnackbarService } from '@app/services/common/snackbar.service';
import { PersonService } from '@app/services/user/person.service';

@Component({
  selector: 'app-selector-customer',
  templateUrl: './selector-customer.component.html',
  styleUrl: './selector-customer.component.scss'
})
export class SelectorCustomerComponent {

  public isLoading = signal(true);
  public producerList: Array<any> = [];
  public producerTotal: number = 0;
  public search: string = '';
  public page_size: number = 9999999;
  public page_index: number = 0;
  public order: string = 'asc';

  constructor(
    public navigationService: NavigationService,
    private _personService: PersonService,
    private _snackbarService: SnackbarService,
    public image: ImagesService
  ){}

  ngOnInit(): void {
    this.getProducers()
  }

  get icon() {
    return this.navigationService.getIcon('persons');
  }

  public getProducers() {

    this.isLoading.set(true);

    const params = {
      search: this.search,
      page: this.page_index + 1,
      pageSize: this.page_size,
      order: this.order,
      isCustomer: true
    }

    this._personService.paginate(params).subscribe(
      data => {
        this.producerList = data.data;
        this.producerTotal = data.total;
        this.isLoading.set(false);
      },
      error => {
        this._snackbarService.open(error.error.message)
      }
    )
  }

  public filter(event: any) {
    const value = event?.target?.value;
    this.search = value;

    this.getProducers();
  }

}
