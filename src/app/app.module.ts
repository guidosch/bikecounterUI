import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';

//Material design modules - UI stuff
import { MatExpansionModule, MAT_EXPANSION_PANEL_DEFAULT_OPTIONS } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgChartsModule } from "ng2-charts";
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

//components
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { DeviceDetailsComponent } from './device-details/device-details.component';
import { DeviceFullDetailsComponent } from './device-full-details/device-full-details.component';
import { DeviceListComponent } from './device-list/device-list.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { LoadingIndicatorComponent } from './loading-indicator/loading-indicator.component';
import { DialogChartDialog } from './bar-chart/bar-chart.component';

//service
import { HttpInterceptService } from './http-intercept.service';


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
    MatIconModule,
    FontAwesomeModule,
    MatRadioModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    DeviceListComponent,
    DeviceDetailsComponent,
    DeviceFullDetailsComponent,
    LineChartComponent,
    BarChartComponent,
    LoadingIndicatorComponent,
    DialogChartDialog
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    {
      provide: MAT_EXPANSION_PANEL_DEFAULT_OPTIONS,
      useValue: {
        //expandedHeight: '500px',
      }
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptService,
      multi: true
    }
  ]
})
export class AppModule { }
