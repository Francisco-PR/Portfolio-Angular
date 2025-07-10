import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { SearchResponse, SpinerProperties, WeatherDetails } from '../interfaces/weather.interfaces';

@Injectable({
  providedIn: 'root'
})
export class WeatherService implements OnInit{

  private apiKey = "e1a2bf222a4d4a908aa8f6b744912d6e";
  private apiUrl = "https://api.openweathermap.org/data/2.5/weather"
  constructor( private http: HttpClient ) {  }

  ngOnInit(): void {
    this.searchTag('Caceres');
  }

  private spiner: SpinerProperties  = {
    color: undefined,
    mode: "determinate",
    value: 0,
  }


  public firstSearh: boolean = false;

  public weatherData:WeatherDetails = {
    name: '',
    description: '',
    icon: '',
    temperature: 0,
    feelsLike: 0,
    windSpeed: 0,
    pressure: 0,
    humidity: 0,
    visibility: 0,
    temperatureSpiner: { ...this.spiner },
    humiditySpiner: { ...this.spiner },
    pressureSpiner: { ...this.spiner },
    windSpiner: { ...this.spiner},
    activitiRecom: ''
  }


  async searchTag (tag: string): Promise<void> {
    if(tag.length === 0) return;

    const params = new HttpParams()
      .set("q", tag)
      .set("appid", this.apiKey)
      .set("units", "metric")
      .set("lang", "es");

    this.http.get<SearchResponse>(`${this.apiUrl}?`, { params })
      .subscribe(resp=> {
        this.weatherData = {
          name: resp.name,
          description: resp.weather[0].description,
          icon: `https://openweathermap.org/img/wn/${resp.weather[0].icon}@2x.png`,
          temperature: resp.main.temp,
          feelsLike: resp.main.feels_like,
          windSpeed: resp.wind.speed,
          pressure: resp.main.grnd_level,
          humidity: resp.main.humidity,
          visibility:  this.visibilityToString(resp.visibility),
          temperatureSpiner: this.createSpinerProperties(resp.main.temp, "temperature"),
          humiditySpiner: this.createSpinerProperties(resp.main.humidity, "humidity"),
          pressureSpiner: this.createSpinerProperties(resp.main.grnd_level, "pressure"),
          windSpiner: this.createSpinerProperties(resp.wind.speed, "wind"),
          activitiRecom: this.makeRecomendation(resp.weather[0].icon),
        }
      })
      this.firstSearh = true
    }

    private makeRecomendation(code: string):string {
      //code posiblilities (01d 02d 03d 04d asignar Deporte en la calle,09d 10d 11d asignar Deporte en casa, 13d 50d asignar Braserito y pelis )
      let recomendation: string = ""
      switch (code) {
        case "01d":
        case "02d":
        case "03d":
        case "04d":
          recomendation = "Deporte en la calle";
          break;

        case "09d":
        case "10d":
        case "11d":
          recomendation = "Juegos de mesa en casa";
          break;

        case "13d":
        case "50d":
          recomendation = "Braserito y pelis";
          break;

        default:
          recomendation = "No se recomienda ninguna actividad";
          break;
      }
      return recomendation
    }

    /*   estar comprendida entre 500 y 1.000 metros si es niebla débil, entre 50 y 500 metros
        si es moderada y menos de 50 metros si es densa. Para los casos de bruma o calima,
        como hemos visto anteriormente, la visibilidad se encuentra comprendida entre 1 y 10
        kilómetros. */

    private visibilityToString(visibilityNum: number ): string {
      let visibilityString: string = ""

      if (visibilityNum === 1000) {
        visibilityString = "La visibilidad es optima"
      }
      else if (visibilityNum < 500) {
        visibilityString = "La visibilidad es buena"
      }
      else if (visibilityNum < 50) {
        visibilityString = "La visibilidad es reducida"
      }
      else {
        visibilityString = "La visibilidad es mala"
      }

      return visibilityString
    }

    private createSpinerProperties(value :number, type :string):SpinerProperties {
      let newSpiner:SpinerProperties = { ...this.spiner }
      newSpiner.value = value
      switch ( type) {

        case "temperature":
            const valueTemp: number = value + 50;
            newSpiner.value = valueTemp
            if (valueTemp > 90) {
              newSpiner.color = "warn"
            }
            else if(valueTemp > 85) {
              newSpiner.color = "accent"
            }
            else if(valueTemp > 65) {
              newSpiner.color = "primary"
            }
            else if(valueTemp > 47) {
              newSpiner.color = "accent"
            }
            else {
              newSpiner.color = "warn"
            }
          break;

        case "humidity":
            if (value > 85) {
              newSpiner.color = "warn"
            }
            else if(value > 60) {
              newSpiner.color = "accent"
            }
            else if(value > 30) {
              newSpiner.color = "primary"
            }
            else if(value > 15) {
              newSpiner.color = "accent"
            }
            else {
              newSpiner.color = "warn"
            }
          break;

        case "pressure"://MAX 1083.8mb --- MIN 870.0mb
             const valuePressure: number = ((value - 870)/213)*100;
            newSpiner.value = valuePressure
            if (valuePressure > 87) {
              newSpiner.color = "warn"
            }
            else if(valuePressure > 70) {
              newSpiner.color = "accent"
            }
            else if(valuePressure > 50) {
              newSpiner.color = "primary"
            }
            else if(valuePressure > 30) {
              newSpiner.color = "accent"
            }
            else {
              newSpiner.color = "warn"
            }
          break;
          case "wind":
            if (value > 62) {
              newSpiner.color = "warn"
            }
            else if(value > 25) {
              newSpiner.color = "accent"
            }
            else {
              newSpiner.color = "primary"
            }
          break;

        default:
          newSpiner.color = "primary";
          break;
      }
      return newSpiner
    }
}
