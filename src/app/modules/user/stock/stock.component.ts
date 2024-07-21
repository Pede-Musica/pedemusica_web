import { Component, OnInit, signal } from '@angular/core';
import { NavigationService } from '@app/services/common/navigation.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.scss'
})
export class StockComponent implements OnInit {

  public isLoading = signal(true);

  constructor(
    public navigationService: NavigationService
  ) { }

  ngOnInit(): void {
    this.getStock();
  }

  get title() {
    return this.navigationService.getName('stock');
  }

  get icon() {
    return this.navigationService.getIcon('stock');
  }

  public getStock() {
    this.isLoading.set(false)
  }

}
