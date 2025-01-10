import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { employeeReducer } from './store/Employee.Reducer';
import { EmployeeEffects } from './store/Employee.Effects';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes), provideAnimationsAsync(),
  provideHttpClient(), provideToastr(), provideStore({ 'emp': employeeReducer }),
  provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }), provideEffects([EmployeeEffects])]
};
