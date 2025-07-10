import { ThemePalette } from "@angular/material/core";
import { ProgressSpinnerMode } from "@angular/material/progress-spinner";

export interface SearchResponse {
  coord:      Coord;
  weather:    Weather[];
  base:       string;
  main:       Main;
  visibility: number;
  wind:       Wind;
  clouds:     Clouds;
  dt:         number;
  sys:        Sys;
  timezone:   number;
  id:         number;
  name:       string;
  cod:        number;
}

export interface Clouds {
  all: number;
}

export interface Coord {
  lon: number;
  lat: number;
}

export interface Main {
  temp:       number;
  feels_like: number;
  temp_min:   number;
  temp_max:   number;
  pressure:   number;
  humidity:   number;
  sea_level:  number;
  grnd_level: number;
}

export interface Sys {
  country: string;
  sunrise: number;
  sunset:  number;
}

export interface Weather {
  id:          number;
  main:        string;
  description: string;
  icon:        string;
}

export interface Wind {
  speed: number;
  deg:   number;
  gust:  number;
}

export interface SpinerProperties {
  color: ThemePalette;
  mode: ProgressSpinnerMode;
  value: number;
}

export interface WeatherDetails {
  name: string;
  description: string;
  icon: string;
  temperature: number;
  feelsLike: number;
  windSpeed: number;
  pressure:   number;
  humidity:   number;
  visibility: number | string;
  temperatureSpiner: SpinerProperties;
  humiditySpiner: SpinerProperties;
  pressureSpiner: SpinerProperties;
  windSpiner: SpinerProperties;
  activitiRecom: string;
}

