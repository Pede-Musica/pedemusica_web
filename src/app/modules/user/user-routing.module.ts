import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocationListComponent } from './register/location/location-list/location-list.component';
import { LocationFormComponent } from './register/location/location-form/location-form.component';
import { MaterialListComponent } from './register/material/material-list/material-list.component';
import { MaterialFormComponent } from './register/material/material-form/material-form.component';
import { ProductListComponent } from './register/product/product-list/product-list.component';
import { ProductFormComponent } from './register/product/product-form/product-form.component';
import { ReportComponent } from './report/report.component';
import { StockComponent } from './stock/stock.component';
import { TrackComponent } from './track/track.component';
import { TrackTransformComponent } from './track/track-transform/track-transform.component';
import { TrackEnterComponent } from './track/track-enter/track-enter.component';
import { TrackExitComponent } from './track/track-exit/track-exit.component';
import { SectorListComponent } from './register/sector/sector-list/sector-list.component';
import { SectorFormComponent } from './register/sector/sector-form/sector-form.component';
import { PersonListComponent } from './register/person/person-list/person-list.component';
import { PersonFormComponent } from './register/person/person-form/person-form.component';
import { ProfileListComponent } from './system/profile/profile-list/profile-list.component';
import { ProfileFormComponent } from './system/profile/profile-form/profile-form.component';
import { TrackLocationComponent } from './track/track-location/track-location.component';
import { SettingComponent } from './setting/setting.component';
import { ReportDetailComponent } from './report/report-detail/report-detail.component';
import { TrackExitListComponent } from './track/track-exit-list/track-exit-list.component';
import { TrackExitFormComponent } from './track/track-exit-form/track-exit-form.component';

const routes: Routes = [
  // Rastreabilidade
  { path: 'track', component: TrackComponent },
  { path: 'track/enter', component: TrackEnterComponent },
  { path: 'track/transform/:id', component: TrackTransformComponent },
  { path: 'track/exit/detail/:id', component: TrackExitComponent },
  { path: 'track/exit/init', component: TrackExitFormComponent },
  { path: 'track/exit/list', component: TrackExitListComponent },
  { path: 'track/location/detail/:id', component: TrackLocationComponent },

  { path: 'register', component: ReportComponent },
  { path: 'register/:id', component: ReportDetailComponent },
  { path: 'stock', component: StockComponent },

  // Cadastros
  { path: 'users', component: PersonListComponent },
  { path: 'users/new', component: PersonFormComponent },
  { path: 'users/:id', component: PersonFormComponent },

  { path: 'products', component: ProductListComponent },
  { path: 'products/new', component: ProductFormComponent },
  { path: 'products/:id', component: ProductFormComponent },

  { path: 'sectors', component: SectorListComponent },
  { path: 'sectors/new', component: SectorFormComponent },
  { path: 'sectors/:id', component: SectorFormComponent },

  { path: 'locations', component: LocationListComponent },
  { path: 'locations/new', component: LocationFormComponent },
  { path: 'locations/:id', component: LocationFormComponent },

  { path: 'materials', component: MaterialListComponent },
  { path: 'materials/new', component: MaterialFormComponent },
  { path: 'materials/:id', component: MaterialFormComponent },

  { path: 'profiles', component: ProfileListComponent },
  { path: 'profiles/new', component: ProfileFormComponent },
  { path: 'profiles/:id', component: ProfileFormComponent },

  { path: 'setting', component: SettingComponent },

  {
    path: '**',
    redirectTo: 'track',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
