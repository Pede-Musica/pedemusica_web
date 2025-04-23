import { inject, Injectable, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '@app/shared/components/dialogs/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  public isOpen = signal(true);
  public isDeliveryOpen = signal(false);

  constructor() { }

}
