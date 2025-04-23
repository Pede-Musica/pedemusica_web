import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-transform',
  templateUrl: './dialog-transform.component.html',
  styleUrl: './dialog-transform.component.scss'
})
export class DialogTransformComponent {

  readonly dialogRef = inject(MatDialogRef<DialogTransformComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

}
