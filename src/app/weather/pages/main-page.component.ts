import { Component } from '@angular/core';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'weather-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class WeatherPageComponent {
  constructor ( private weatherService:WeatherService ){
   /* const { name, description, icon, temperature, windSpeed, pressure, humidity } = this.weatherService.weatherData; */


  }
  get firstSearh() {
    return this.weatherService.firstSearh
  }

  get weatherData() {
    return this.weatherService.weatherData
  }
}
