import { Component, OnInit, signal } from '@angular/core';
import { Regex } from '@app/resources/handlers/regex';
import { LoadingService } from '@app/services/common/loading.service';
import { NavigationService } from '@app/services/common/navigation.service';
import { SnackbarService } from '@app/services/common/snackbar.service';
import { RequestService } from '@app/services/user/request.service';

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
  public isLoading = signal(true);
  public requestList: Request[] = [];
  public favoriteList: Request[] = [];

  constructor(
    public navigationService: NavigationService,
    public loadingService: LoadingService,
    private _requestServices: RequestService,
    private _snackService: SnackbarService,
    public regex: Regex
  ) { }

  ngOnInit(): void {
    document.title = 'Pedidos'
    this.isLoading.set(false);

    this.getRequests();

    setInterval(() => {
      this.getRequests();
    }, 5000)

  }

  get title() {
    return this.navigationService.getName('requests');
  }

  get icon() {
    return this.navigationService.getIcon('requests');
  }

  public getRequests() {
    const data = {};

    this._requestServices.paginate(data).subscribe(
      data => {
        this.requestList = data.requests;
        this.favoriteList = data.favorites
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
        this.getRequests()
      },
      excp => {
        this._snackService.open('Falha ao atualizar música');
        setTimeout(() => {
          window.location.reload()
        }, 1500)
      }
    )
  }
}
