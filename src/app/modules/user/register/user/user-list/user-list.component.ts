import { Component, OnInit, signal } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Regex } from '@app/resources/handlers/regex';
import { NavigationService } from '@app/services/common/navigation.service';
import { SnackbarService } from '@app/services/common/snackbar.service';
import { PersonService } from '@app/services/user/person.service';
import { UserService } from '@app/services/user/user.service';


interface userProps {
  id: string
  is_active: boolean
  name: string
  email: string
  phone: string
  created_at: string
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {

  public isLoading = signal(true);
  displayedColumns: string[] = ['status','name', 'email', 'phone',];
  public userList: Array<userProps> = [];
  public userTotal: number = 0;
  public page_size: number = 10;
  public page_index: number = 0;

  public order: string = 'asc';
  public type: string = "";
  public active: boolean | string = '';
  public search: string = '';


  constructor(
    public navigationService: NavigationService,
    private _userService: UserService,
    private _snackbarService: SnackbarService,
    public regex: Regex,
  ) {}

  ngOnInit(): void {
    document.title = 'Usuários do sistema';
    this.getUsers();
  }

  get title() {
    return `${this.navigationService.getName('users')}`;
  }

  get icon() {
    return this.navigationService.getIcon('users');
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


  public filterStatus(event: any) {
    const active = event?.target?.value;
    this.active = active

    this.getUsers();
  }

  public getUsers() {
    this.isLoading.set(true);
    const params = {
      search: this.search,
      page: this.page_index + 1,
      pageSize: this.page_size,
      order: this.order,
      active: this.active
    }

    this._userService.paginate(params).subscribe(
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

  public filter(event: any) {
    const value = event?.target?.value;
    this.search = value;

    this.getUsers();
  }
}
