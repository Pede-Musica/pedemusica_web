import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DateTime } from '@app/resources/handlers/datetime';
import { Regex } from '@app/resources/handlers/regex';
import { DialogService } from '@app/services/common/dialog.service';
import { LoadingService } from '@app/services/common/loading.service';
import { NavigationService } from '@app/services/common/navigation.service';
import { SnackbarService } from '@app/services/common/snackbar.service';
import { LocationService } from '@app/services/user/location.service';
import { MaterialService } from '@app/services/user/material.service';
import { VolumeService } from '@app/services/user/volume.service';

@Component({
  selector: 'app-track-transform',
  templateUrl: './track-transform.component.html',
  styleUrl: './track-transform.component.scss'
})
export class TrackTransformComponent implements OnInit {

  public isLoading = signal(true);
  public template = signal('location');
  public volumeData: any = {};
  public locationList: Array<any> = [];
  public volumeList: Array<any> = [];
  public materialList: Array<any> = [];

  constructor(
    public navigationService: NavigationService,
    public activeRoute: ActivatedRoute,
    public router: Router,
    private _volumeService: VolumeService,
    public regex: Regex,
    public dateTime: DateTime,
    private _locationService: LocationService,
    private _materialService: MaterialService,
    public snackService: SnackbarService,
    public loadingService: LoadingService,
    public dialogService: DialogService,
  ) { }

  ngOnInit(): void {
    this.getLocation();
    this.getMaterial();
    const location_id = this.activeRoute.snapshot.params['id'];

    if (location_id) {
      this.getVolume(location_id)
    }
    else {
      this.router.navigate(['/in/track'])
    }
  }

  get totalVolume() {
    const amount = this.volumeData?.amount;
    const volume = this.volumeData?.volume;

    return amount * volume;
  }

  get totalDrawn() {
    let total = 0;

    this.volumeList.map((volume) => {
      const material = this.materialList.find(m => m.id === volume?.material_id)
      total = total + (volume?.amount * material?.volume);
    })

    return total
  }

  get remaining() {

    return this.totalVolume - this.totalDrawn
  }

  public getBackRoute(volume: any) {

    const path = `/in/track/location/detail/${volume?.Location?.id}`;
    return path;
  }

  public getVolume(id: string) {
    this._volumeService.detail(id).subscribe(
      data => {
        this.volumeData = data;
        if (data?.exited) {
          this.router.navigate([this.getBackRoute(data)]);
          this.snackService.open('Este volume não existe mais')
        } else {
          this.addVolume(data)
          this.isLoading.set(false);
        }
      },
      excp => {
        this.snackService.open(excp.error.message)
        this.router.navigate(['/in/track'])
      }
    )
  }

  public getLocation() {

    this._locationService.combolist().subscribe(
      data => {
        this.locationList = data;
      }
    )
  }

  public addVolume(data: any) {

    const volume = {
      amount: 0,
      location_id: '',
      material_id: data?.Material?.id,
      volume: data?.Material?.volume,
    }

    this.volumeList.push(volume);
  }

  public getTotalVolume(volume: any) {
    try {
      const material = this.materialList.find(m => m.id === volume?.material_id)
      const total = `${volume.amount} x ${material.volume ? material.volume : '0'} kg = ${volume.amount * material.volume} kg`
      return total
    }
    catch (error) {
      return 'Erro ao calcular total'
    }
  }

  public getMaterial() {

    this._materialService.combolist().subscribe(
      data => {
        this.materialList = data
      },
    )
  }

  public deleteVolume(index: number) {
    this.volumeList.splice(index, 1)
  }

  public send() {

    if(this.volumeList.length === 0) {
      this.dialogService.open(true, 'Sem novos volumes', 'warning')
      return;
    }

    if(this.remaining < 0) {
      this.dialogService.open(true, 'O volume restante não pode ser negativo', 'warning')
      return;
    }

    const data = {
      current_volume: this.volumeData,
      updated_at: this.volumeData.created_at,
      new_volumes: this.volumeList
    }

    this.loadingService.setIsLoading(true);
  }
}

