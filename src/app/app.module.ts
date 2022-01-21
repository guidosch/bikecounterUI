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

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgChartsModule,
    RouterModule.forRoot([
      { path: '', component: DeviceListComponent },
      { path: 'devices/:deviceId', component: DeviceFullDetailsComponent },
    ])
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
