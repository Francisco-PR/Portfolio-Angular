import { Component, Input } from '@angular/core';
import { WeatherDetails, SpinerProperties } from '../../interfaces/weather.interfaces';


@Component({
  selector: 'display-weather',
  templateUrl: './display-weather.component.html',
  styleUrl: './display-weather.component.css'
})
export class DisplayWeatherComponent {

  @Input()
  public weather!: WeatherDetails;


}
