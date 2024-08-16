import { Component, OnInit, signal } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Regex } from '@app/resources/handlers/regex';
import { NavigationService } from '@app/services/common/navigation.service';
import { RegisterService } from '@app/services/user/register.service';

interface props {
  id: number
  type: string
  created_at: string
  Exit: any,
  Register: any,
  Entry: {
    id: any
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
    VolumeEnter: Array<any>
  }
  Product: {
    name: string
  }
  Material: {
    name: string
  }
}

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss'
})
export class ReportComponent implements OnInit {

  public isLoading = signal(true);
  public registerList: Array<props> = [];
  public total: number = 0;
  public page_size: number = 10;
  public page_index: number = 0;
  public order: string = 'desc';

  constructor(
    public navigationService: NavigationService,
    private _registerService: RegisterService,
    public regex: Regex
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

    const params = {
      page: this.page_index + 1,
      pageSize: this.page_size,
      order: this.order
    }

    this._registerService.paginate(params).subscribe(
      data => {
        this.registerList = data?.data;
        this.total = data?.total;
        this.isLoading.set(false)
      }
    )
  }

  public pageEvent(event: PageEvent) {
    this.page_size = event.length;
    this.page_index = event.pageIndex;
    this.page_size = event.pageSize;

    this.getReport();
  }
}
