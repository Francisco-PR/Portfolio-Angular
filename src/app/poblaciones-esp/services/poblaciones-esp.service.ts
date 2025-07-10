import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMPTY, expand, map, Observable, reduce} from 'rxjs';
import { APIResponse, Municipality, Province, Region } from '../interfaces/poblaciones.interfaces';

@Injectable({
  providedIn: 'root'
})
export class PoblacionesEspService {

  private baseUrl: string = 'https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/';


  constructor(
    private http:HttpClient
  ) { }

  getRegions( ): Observable<Region[]> {
    const params: string = 'select=acom_code%2C%20acom_name&order_by=acom_name&limit=20&exclude=acom_code%3A%2220%22';
    const url: string = `${ this.baseUrl }georef-spain-comunidad-autonoma/records?${ params }`
    return this.http.get<APIResponse>( url )
      .pipe(
        map( apiResp => ( <Region[]>apiResp.results ))
      )
  }
  getProvinces( region: string ): Observable<Province[]> {
    const params: string = `select=prov_name&order_by=prov_name&limit=20&refine=acom_name%3A%22${ region }%22`
    const url: string = `${ this.baseUrl }georef-spain-provincia/records?${ params }`
    return this.http.get<APIResponse>( url )
      .pipe(
        map( apiResp => ( <Province[]>apiResp.results ))
      )
  }
  getMunicipalities( province: string ): Observable<Municipality[]> {
    const params: string = `select=mun_name%20%2C%20geo_point_2d&order_by=mun_name&limit=100&refine=prov_name%3A%22${ province }%22`
    const url: string = `${ this.baseUrl }georef-spain-municipio//records?${ params }`
    return this.http.get<APIResponse>( url + '&offset=0' )
      .pipe(
        expand( (apiResp, index) =>{
          const totalRecords = apiResp.total_count;
          const nextOffset = (index + 1) * 100;

          if ( nextOffset >= totalRecords ) return EMPTY;

          return this.http.get<APIResponse>( url + `&offset=${nextOffset}` )
        }),
        map( apiResp => ( <Municipality[]>apiResp.results )),
        reduce((AllResults: Municipality[], newResults) => [...AllResults, ...newResults],[])
      )
  }
  getMunicipalityCoords( municipality: string ): Observable<Municipality> {
    const params: string = `select=mun_name%2C%20geo_point_2d&limit=20&refine=mun_name%3A%22${ municipality }%22`
    const url: string = `${ this.baseUrl }georef-spain-municipio//records?${ params }`
    return this.http.get<APIResponse>( url )
      .pipe(
        map( apiResp => ( <Municipality>apiResp.results[0] )),
      )
  }
}


 /*  getApiData( dataset: string, params: HttpParams ): Observable<Region[] | Province[] | Municipalities[]> {
    const url: string = `${ this.baseUrl + dataset}/records?`
    console.log(params.toString());
    return this.http.get<APIResponse>( `${url + params.toString()}` )
      .pipe(
        map( apiResp => ( apiResp.results ))
      )
  } */
