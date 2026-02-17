import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule, LOCALE_ID } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { registerLocaleData } from '@angular/common';
import localeDECH from '@angular/common/locales/de-CH';
registerLocaleData(localeDECH);

import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

//Material design modules - UI stuff
import { MatExpansionModule, MAT_EXPANSION_PANEL_DEFAULT_OPTIONS } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from "ng2-charts";
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';

//components
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { DeviceDetailsComponent, GatewaysDialog } from './device-details/device-details.component';
import { DeviceFullDetailsComponent } from './device-full-details/device-full-details.component';
import { DeviceListComponent } from './device-list/device-list.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { LoadingIndicatorComponent } from './loading-indicator/loading-indicator.component';
import { DialogChartDialog } from './bar-chart/bar-chart.component';
import { AuthGuard, AuthModule } from '@auth0/auth0-angular';
import { DeviceEuiTrailMappingComponent } from './device-eui-trail-mapping/device-eui-trail-mapping.component';

//service
import { HttpInterceptService } from './http-intercept.service';
import LoginButtonComponent from './login-button/login-button.component';
import { UserProfileComponent } from './user-profile/user-profile.component';


@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    DeviceListComponent,
    DeviceDetailsComponent,
    GatewaysDialog,
    DeviceFullDetailsComponent,
    LineChartComponent,
    BarChartComponent,
    LoadingIndicatorComponent,
    DialogChartDialog,
    LoginButtonComponent,
    UserProfileComponent,
    DeviceEuiTrailMappingComponent
  ],
  bootstrap: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BaseChartDirective,
    RouterModule.forRoot([
      { path: '', component: DeviceListComponent, canActivate: [AuthGuard] },
      { path: 'devices/:deviceId', component: DeviceFullDetailsComponent, canActivate: [AuthGuard] },
      { path: 'mapping', component: DeviceEuiTrailMappingComponent, canActivate: [AuthGuard] }
    ]),
    MatExpansionModule,
    MatBadgeModule,
    MatIconModule,
    FontAwesomeModule,
    MatRadioModule,
    FormsModule,
    MatDialogModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    AuthModule.forRoot({
      domain: 'dev-bwfmsrrxqbduxtt7.eu.auth0.com',
      clientId: 'x0BdHatdCZ2E9XEzGdotMPYx4uoLVeFN',
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: 'https://dev-bwfmsrrxqbduxtt7.eu.auth0.com/api/v2/',
      }
    }),
  ],
  providers: [
    {
      provide: MAT_EXPANSION_PANEL_DEFAULT_OPTIONS,
      useValue: {}
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptService,
      multi: true
    },
    { provide: LOCALE_ID, useValue: 'de-CH' },
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimationsAsync(),
    provideCharts(withDefaultRegisterables())
  ]
})
export class AppModule { }
