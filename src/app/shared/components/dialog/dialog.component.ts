import { Component, inject, model } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogService } from '@app/services/common/dialog.service';
import { SharedModule } from '@app/shared/shared.module';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    SharedModule
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {

  readonly dialogRef = inject(MatDialogRef<DialogComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  readonly text = model(this.data.text);
  readonly type = model(this.data.type);
  readonly submessage = model(this.data.submessage);

  constructor(
    public dialogService: DialogService,

  ) {}

}
