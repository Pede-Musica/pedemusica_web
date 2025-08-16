import { Component, OnInit, signal } from '@angular/core';
import { Regex } from '@app/resources/handlers/regex';
import { LoadingService } from '@app/services/common/loading.service';
import { NavigationService } from '@app/services/common/navigation.service';
import { SnackbarService } from '@app/services/common/snackbar.service';
import { RequestService } from '@app/services/user/request.service';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';

interface Request {
  id: number
  song_name: string
  favorite: boolean
  created_at: string
  table: string
  user_name: string
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  public pathname = window.location.pathname;
  public isLoading = signal(false);
  public requestList: Request[] = [];
  public favoriteList: Request[] = [];
  public filter = new FormControl('today');
  public favorite = false;


  constructor(
    public navigationService: NavigationService,
    public loadingService: LoadingService,
    private _requestServices: RequestService,
    private _snackService: SnackbarService,
    public regex: Regex
  ) { }

  ngOnInit(): void {
    document.title = 'Pedidos';

    this.isLoading.set(true);

    this.getRequests(this.filter.value!, this.favorite);

    setInterval(() => {
      this.getRequests(this.filter.value!, this.favorite);
    }, 5000)

  }

  get title() {
    return this.navigationService.getName('requests');
  }

  get icon() {
    return this.navigationService.getIcon('requests');
  }

  public getRequests(filter: string, favorite: boolean) {

    const params = {
      filter: filter,
      favorite: favorite
    };

    this._requestServices.paginate(params).subscribe(
      data => {
        this.requestList = data.requests;
        this.isLoading.set(false);
      }
    )
  }

  public favoriteRequest(id: any, favorite: boolean) {

    const data = {
      id: id,
      favorite: !favorite
    }

    this._requestServices.updateFavorite(data).subscribe(
      response => {
        if (favorite) {
          this._snackService.open('Música retirada da lista de favoritos');
        } else {
          this._snackService.open('Música adicionada na lista de favoritos');
        }
        this.getRequests(this.filter.value!, this.favorite)
      },
      excp => {
        this._snackService.open('Falha ao atualizar música');
        setTimeout(() => {
          window.location.reload()
        }, 1500)
      }
    )
  }

  public filterRequests(selected: MatSelectChange) {
    this.filter.setValue(selected.value)
    this.getRequests(selected.value, this.favorite)
  }

  public filterRequestsType(selected: any) {
    const favoriteValue = selected === 'favorites' ? true : false
    this.favorite = favoriteValue
    this.getRequests(this.filter.value!, favoriteValue)
  }
}
