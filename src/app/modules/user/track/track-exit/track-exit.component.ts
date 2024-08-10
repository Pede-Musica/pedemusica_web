import { routes } from './../../../../app.routes';
import { Component, OnInit, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DateTime } from '@app/resources/handlers/datetime';
import { DialogService } from '@app/services/common/dialog.service';
import { LoadingService } from '@app/services/common/loading.service';
import { NavigationService } from '@app/services/common/navigation.service';
import { SnackbarService } from '@app/services/common/snackbar.service';
import { RegisterService } from '@app/services/user/register.service';
import { DialogConfirmComponent } from '@app/shared/components/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-track-exit',
  templateUrl: './track-exit.component.html',
  styleUrl: './track-exit.component.scss'
})
export class TrackExitComponent implements OnInit {

  public isLoading = signal(true);
  public exitData: any = {};
  public date = '';

  constructor(
    public navigationService: NavigationService,
    private _registerService: RegisterService,
    private _activeRoute: ActivatedRoute,
    public dateTime: DateTime,
    public dialog: MatDialog,
    private _loadingService: LoadingService,
    public snackService: SnackbarService,
    public router: Router
  ) { }

  ngOnInit(): void {

    const exit_id = this._activeRoute.snapshot.params['id'];

    this.getExit(exit_id);
    this.date = this.dateTime.getDateTime()
  }

  get title() {
    return this.navigationService.getName('register');
  }

  get icon() {
    return this.navigationService.getIcon('register');
  }

  public getExit(id: number) {


    this._registerService.detailExit(id).subscribe(
      data => {
        this.exitData = data;
        this.isLoading.set(false);
      }
    )
  }

  public closeExit() {

    if(['', null, undefined, false].includes(this.date)) {
      this.snackService.open('Selecione a data e horário de saída')
      return
    }

    if(this.exitData?.VolumeExit?.length === 0) {
      this.snackService.open('Saída sem volumes adicionados')
      return
    }

    this._loadingService.setIsLoading(true);
  }

  public confirm(){

    const dialogRef = this.dialog.open(DialogConfirmComponent);

    dialogRef.afterClosed().subscribe(
      response => {
        if(response) {

          const data = {
            exit_id: this.exitData.id,
            date: new Date(this.date).toISOString()
          }

          this._registerService.closeExit(data).subscribe(
            response => {
              this.snackService.open(response.message)
              this.router.navigate(['/in/track'])
            }
          )
        }
      }
    )
  }
}

