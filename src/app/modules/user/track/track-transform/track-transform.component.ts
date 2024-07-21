import { Component, OnInit, signal } from '@angular/core';
import { NavigationService } from '@app/services/common/navigation.service';

@Component({
  selector: 'app-track-transform',
  templateUrl: './track-transform.component.html',
  styleUrl: './track-transform.component.scss'
})
export class TrackTransformComponent implements OnInit {

  public isLoading = signal(true);

  constructor(
    public navigationService: NavigationService
  ) { }

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
}

