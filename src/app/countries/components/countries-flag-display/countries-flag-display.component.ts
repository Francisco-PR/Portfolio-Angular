import { Component, OnDestroy, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries-service.service';
import { Subscription, switchMap } from 'rxjs';
import { CountryFlag } from '../../interfaces/country.interface';
import { MatDialog } from '@angular/material/dialog';
import { CountryModalComponent } from '../country-modal/country-modal.component';

@Component({
  selector: 'countries-flag-display',
  templateUrl: './countries-flag-display.component.html',
  styleUrl: './countries-flag-display.component.css'
})
export class CountriesFlagDisplayComponent implements OnInit, OnDestroy {

  private flagsSuscribe?:Subscription

  constructor(
    private countriesService : CountriesService,
    private dialog: MatDialog
  ) {  }

  countriesFlags: CountryFlag[] = [];

  ngOnInit(): void { //Al crearse el componente hace la peticion a la api mandando el filtro por parametros
    this.flagsSuscribe = this.countriesService.getFlagsRequest("flags,cca3")
    .subscribe( countries => {
      this.countriesFlags = countries
    });
  }

  ngOnDestroy(): void { //Al destruirse el componente se desuscribe (pensado para proxima tarea)
    this.flagsSuscribe?.unsubscribe();
  }

  openDialog(code: string): void { //Abre el modal pasandole por parametro el Codigo de pais y Velocidad de animaciones
    this.dialog.open(CountryModalComponent, { data: { code: code } ,
      enterAnimationDuration: 400,
      exitAnimationDuration: 200,
      autoFocus: false,
      maxHeight: '98%',
      height: '98%',

    } );
  }
}
