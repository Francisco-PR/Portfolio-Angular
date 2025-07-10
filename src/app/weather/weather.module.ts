import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';

import { WeatherRoutingModule } from './weather-rounting.module';

import { SearchWeatherComponent } from './components/search-weather/search-weather.component';
import { DisplayWeatherComponent } from './components/display-weather/display-weather.component';
import { WeatherPageComponent } from './pages/main-page.component';






@NgModule({
  declarations: [
    WeatherPageComponent,
    SearchWeatherComponent,
    DisplayWeatherComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    WeatherRoutingModule,
  ],
})
export class WeatherModule { }
