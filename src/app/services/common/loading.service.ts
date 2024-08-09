import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  public isLoading = signal(false)

  constructor() { }

  public setIsLoading(status: boolean) {
    this.isLoading.set(status)
  }
}
