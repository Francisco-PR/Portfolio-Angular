import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Country, CountryFlag } from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private apiUrl: string = "https://restcountries.com/v3.1/";

  constructor( private http: HttpClient ) { }

  //Obtiene datos de paises de la api especificando el filtro de campos
  public getFlagsRequest(fields: string): Observable<CountryFlag[]> {
    const params = new HttpParams()
    .set ("fields", fields)
    return this.http.get<CountryFlag[]>( this.apiUrl +  "all" , { params } )
      .pipe(
        catchError( () => of([])) //En caso de error devuelve un array vacio
      )
  }
  //Obtiene datos de un pais de la api por su codigo especificando el filtro de campos
  public getCountriesRequest(code: string, fields: string): Observable<Country|null> {
    const params = new HttpParams()
    .set ("fields", fields)
    return this.http.get<Country|null>( this.apiUrl + `alpha/${code}`  , { params } )
      .pipe(
        catchError( () => of(null)) //En caso de error devuelve un null
      )
  }
}
