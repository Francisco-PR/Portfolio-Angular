import { Component, Inject } from '@angular/core';
import { CountriesService } from '../../services/countries-service.service';
import { Subscription } from 'rxjs';
import { Country, DialogData } from '../../interfaces/country.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'countries-modal',
  templateUrl: './country-modal.component.html',
  styleUrl: './country-modal.component.css'
})
export class CountryModalComponent {


  private countrySuscribe?:Subscription

    constructor(
      private countriesService : CountriesService,
      private dialogRef: MatDialogRef<CountryModalComponent>,
      private router: Router,
      @Inject(MAT_DIALOG_DATA) private data: DialogData
    ) {  }

    public country?: Country;

    //Al crearse el modal hace la peticion a la api mandando el codigo del pais especifico y el filtro por parametros
    ngOnInit(): void {
      this.countrySuscribe = this.countriesService.getCountriesRequest(this.data.code, "name,flags,capital,population,currencies,languages")
      .subscribe( (country) => {
        if(!country) return this.dialogRef.close(); //En caso de no recibir el pais de la api cierra el modal
        return this.country = country;
      });
    }
    ngOnDestroy(): void {
      this.countrySuscribe?.unsubscribe(); //Al destruirse el modal se desuscribe para ahorrar memoria
    }

    onClose(): void {
      this.dialogRef.close();
    }

    goToWeather(): void {
      const countryName = this.country?.name.common;
      if ( !countryName ) return
      this.router.navigateByUrl(`/weather/${countryName}`)
    }
  }
