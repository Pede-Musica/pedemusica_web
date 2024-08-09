import { Component, signal } from '@angular/core';
import { NavigationService } from '@app/services/common/navigation.service';

@Component({
  selector: 'app-track-exit-form',
  templateUrl: './track-exit-form.component.html',
  styleUrl: './track-exit-form.component.scss'
})
export class TrackExitFormComponent {

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
