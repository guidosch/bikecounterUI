import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { DeviceListComponent } from './device-list/device-list.component';
import { DeviceDetailsComponent } from './device-details/device-details.component';
import { DeviceFullDetailsComponent } from './device-full-details/device-full-details.component';
import { HttpClientModule } from '@angular/common/http';
import { NgChartsModule } from "ng2-charts";
import { LineChartComponent } from './line-chart/line-chart.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
//Material design modules
import { MatExpansionModule } from '@angular/material/expansion';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgChartsModule,
    RouterModule.forRoot([
      { path: '', component: DeviceListComponent },
      { path: 'devices/:deviceId', component: DeviceFullDetailsComponent },
    ]),
    NoopAnimationsModule,
    MatExpansionModule,
    MatBadgeModule,
    MatIconModule
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    DeviceListComponent,
    DeviceDetailsComponent,
    DeviceFullDetailsComponent,
    LineChartComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
