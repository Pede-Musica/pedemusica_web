import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DateTime } from '@app/resources/handlers/datetime';
import { Regex } from '@app/resources/handlers/regex';
import { VolumeService } from '@app/services/user/volume.service';
import { SelectorLocationComponent } from '../selector-location/selector-location.component';
import { DialogService } from '@app/services/common/dialog.service';
import { Router } from '@angular/router';
import { LoadingService } from '@app/services/common/loading.service';
import { SnackbarService } from '@app/services/common/snackbar.service';


interface volumeProps {
  id: string
  entry_id: string
  exit_id: string
  product_name: string
  type: string
  size: string
  weight: number
  amount: number
  volume: number
  volume_type: string
  created_at: string
  Entry: {
    Register: any
    observation: string
    Producer: {
      Person: {
        name: string
      }
    }
    User: {
      Person: {
        name: string
      }
    }
  }
  Product: {
    name: string
  }
  Material: {
    name: string
  }
}


@Component({
  selector: 'app-volume-card-2',
  templateUrl: './volume-card-2.component.html',
  styleUrl: './volume-card-2.component.scss'
})
export class VolumeCard2Component {


  @Input() public volume: volumeProps = {
    id: '',
    entry_id: '',
    exit_id: '',
    product_name: '',
    weight: 0,
    amount: 0,
    created_at: '',
    size: '',
    type: '',
    volume: 0,
    volume_type: '',
    Entry: {
      Register: {},
      observation: '',
      Producer: {
        Person: {
          name: ''
        }
      },
      User: {
        Person: {
          name: ''
        }
      }
    },
    Material: {
      name: ''
    },
    Product: {
      name: ''
    }
  }

  @Input() type: string = 'volume';

  constructor(
    public regex: Regex,
    public dateTime: DateTime,
    private _volumeService: VolumeService,
    public dialog: MatDialog,
    private _dialog: DialogService,
    public router: Router,
    private _loadingService: LoadingService,
    public snackService: SnackbarService
  ) { }

  public returnOrigin() {

    const dialogRef =this.dialog.open(SelectorLocationComponent);

    dialogRef.afterClosed().subscribe(
      response => {
        this._loadingService.setIsLoading(true);
        const data = {
          volume_id: this.volume.id,
          location_id: response.id
        }

        this._volumeService.returnVolume(data).subscribe(
          response => {
            this.snackService.open(response.message);
            this._loadingService.setIsLoading(false);
            this.router.navigate(['/in/track']);
          }
        )
      }
    )
  }

}
