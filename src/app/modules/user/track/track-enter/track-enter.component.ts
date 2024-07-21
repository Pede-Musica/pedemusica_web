import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DateTime } from '@app/resources/handlers/datetime';
import { NavigationService } from '@app/services/common/navigation.service';
import { SelectorProducerComponent } from '@app/shared/components/selector-producer/selector-producer.component';
import { SelectorProductComponent } from '@app/shared/components/selector-product/selector-product.component';

@Component({
  selector: 'app-track-enter',
  templateUrl: './track-enter.component.html',
  styleUrl: './track-enter.component.scss'
})
export class TrackEnterComponent implements OnInit {

  public isLoading = signal(true);
  public showError = signal(false);
  public selectedProducer = signal(false);
  public producer: any = {};
  public productList: Array<any> = [];
  public form: FormGroup;

  constructor(
    public navigationService: NavigationService,
    private _formBuilder: FormBuilder,
    public dateTime: DateTime,
    public dialog: MatDialog
  ) {
    this.form = this._formBuilder.group({
      field: ['', [Validators.required]],
      date: [this.dateTime.getDateTime(), [Validators.required]],
      observation: ['', [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.getReport();
  }

  get title() {
    return this.navigationService.getName('register');
  }

  get icon() {
    return this.navigationService.getIcon('register');
  }

  public getReport() {
    this.isLoading.set(false);
  }

  public dialogProducer() {
    const dialogRef = this.dialog.open(SelectorProducerComponent);

    dialogRef.afterClosed().subscribe(
      response => {
        if (response) {
          this.selectedProducer.set(true)
          this.producer = response
          console.log(response)
        }
      }
    )
  }

  public dialogProduct() {
    const dialogRef = this.dialog.open(SelectorProductComponent);

    dialogRef.afterClosed().subscribe(
      response => {
        if (response) {
          this.productList.push(response)
          console.log(response)
        }
      }
    )
  }
}
