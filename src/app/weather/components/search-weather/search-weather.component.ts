import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'search-weather',
  templateUrl: './search-weather.component.html',
  styleUrl: './search-weather.component.css'
})
export class SearchWeatherComponent implements OnInit{

  @ViewChild("txtTagInput")
  public tagInput!: ElementRef<HTMLInputElement>;

  constructor(
    private weatherService:WeatherService,
    private activatedRoute:ActivatedRoute,
  ) {  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe( ({ name }) => {
      if ( !name ) this.weatherService.searchTag('Caceres');

      this.weatherService.searchTag( name )

    })
  }

  public searchTag() {
    const newTag = this.tagInput.nativeElement.value;

    this.weatherService.searchTag(newTag);

    this.tagInput.nativeElement.value = "";
  }

}
