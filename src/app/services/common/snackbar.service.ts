import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(
    private _snackBar: MatSnackBar
  ) { }

  public open(message: string) {
    this._snackBar.open(message, '',{
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 3000
    })
  }
}
