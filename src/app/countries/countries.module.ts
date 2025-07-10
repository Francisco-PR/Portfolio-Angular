import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from '../material/material.module';
import { CountriesRoutingModule } from './countries-routing.module';

import { CountriesFlagDisplayComponent } from './components/countries-flag-display/countries-flag-display.component';
import { CountryModalComponent } from './components/country-modal/country-modal.component';
import { CountriesPageComponent } from './pages/main-page/main-page.component';



@NgModule({
  declarations: [
    CountriesPageComponent,
    CountriesFlagDisplayComponent,
    CountryModalComponent,

  ],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    CountriesRoutingModule,
  ],
})
export class CountriesModule { }
