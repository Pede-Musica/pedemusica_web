import { inject, Injectable, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '@app/shared/components/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  public isOpen = signal(false);
  readonly dialog = inject(MatDialog);

  constructor() { }

  public open(status: boolean, text: string, type: string, submessage?: string) {

    if(status) {
      this.dialog.open(DialogComponent, {
        data: {
          text: text,
          submessage: submessage,
          type: type
        }
      });
    }
  }
}
