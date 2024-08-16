import { Component, OnInit, signal } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Regex } from '@app/resources/handlers/regex';
import { NavigationService } from '@app/services/common/navigation.service';
import { SnackbarService } from '@app/services/common/snackbar.service';
import { PersonService } from '@app/services/user/person.service';
import { UserService } from '@app/services/user/user.service';


interface userProps {
  id: string
  name: string
  email: string
  phone: string
  created_at: string
  isUser: boolean
  isProducer: boolean
  isCustomer: boolean
  User: any
  Producer: any
}

@Component({
  selector: 'app-person-list',
  templateUrl: './person-list.component.html',
  styleUrl: './person-list.component.scss'
})
export class PersonListComponent {

  public isLoading = signal(true);
  displayedColumns: string[] = ['name', 'email', 'status', 'created_at', 'action',];
  public personList: Array<userProps> = [];
  public personTotal: number = 0;
  public page_size: number = 10;
  public page_index: number = 0;

  public order: string = 'asc';
  public type: string = "";
  public isUser: boolean | string = '';
  public isProducer: boolean | string = '';
  public isCustomer: boolean | string = '';
  public search: string = '';


  constructor(
    public navigationService: NavigationService,
    private _personService: PersonService,
    private _snackbarService: SnackbarService,
    public regex: Regex,
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  get title() {
    return `${this.navigationService.getName('persons')}`;
  }

  get icon() {
    return this.navigationService.getIcon('persons');
  }

  public pageEvent(event: PageEvent) {
    this.page_size = event.length;
    this.page_index = event.pageIndex;
    this.page_size = event.pageSize;

    this.getUsers();
  }

  public filterOrder(event: Event) {
    this.order = (event.target as HTMLInputElement).value;
    this.getUsers();
  }


  public filterType(event: any) {
    const type = event?.target?.value;
    this.type = type;

    switch(type) {
      case 'user': {
        this.isUser = true;
        this.isProducer = '';
        this.isCustomer = '';
        break;
      }
      case 'producer': {
        this.isUser = '';
        this.isProducer = true;
        this.isCustomer = '';
        break;
      }
      case 'customer': {
        this.isUser = '';
        this.isProducer = '';
        this.isCustomer = true;
        break;
      }
      default: {
        this.isUser = '';
        this.isProducer = '';
        this.isCustomer = '';
        break;
      }
    }

    this.getUsers();
  }

  public getUsers() {
    this.isLoading.set(true);
    const params = {
      search: this.search,
      page: this.page_index + 1,
      pageSize: this.page_size,
      order: this.order,
      isUser: this.isUser,
      isProducer: this.isProducer,
      isCustomer: this.isCustomer
    }

    this._personService.paginate(params).subscribe(
      data => {
        this.personList = data.data;
        this.personTotal = data.total;
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

    this.getUsers();
  }
}
