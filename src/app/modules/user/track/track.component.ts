import { Component, OnInit, signal } from '@angular/core';
import { NavigationService } from '@app/services/common/navigation.service';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrl: './track.component.scss'
})
export class TrackComponent {

  public pathname = window.location.pathname;
  public isLoading = signal(true);

  constructor(
    public navigationService: NavigationService
  ) { }

  ngOnInit(): void {
    this.getTrack();
  }

  get title() {
    return this.navigationService.getName('track');
  }

  get icon() {
    return this.navigationService.getIcon('track');
  }

  public getTrack() {
    this.isLoading.set(false)
  }

}
