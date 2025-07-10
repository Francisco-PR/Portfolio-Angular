import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap, switchMap, map, of} from 'rxjs';
import { PoblacionesEspService } from '../../services/poblaciones-esp.service';
import { Region, Province, Municipality, MunicipalityProperties } from '../../interfaces/poblaciones.interfaces';
import { LngLat } from 'mapbox-gl';
import { Router } from '@angular/router';

@Component({
  selector: 'poblaciones-esp-main-page',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css'
})
export class PoblacionesEspComponent {

  //Form Group
  public poblacionesForm: FormGroup = this.fb.group({
    regions: ['', Validators.required],
    provinces: ['', Validators.required],
    municipalities: ['', Validators.required],
  })

  //Arrays para almacenar respuestas de la API
  public regions: Region[] = [];
  public provincesByRegion: Province[] = [];
  public municipalitiesByProvinces: Municipality[] = [];

  //Variable para input del mapa
  public mapCoords: LngLat = new LngLat(-4, 40);


  constructor(
    private fb: FormBuilder,
    private poblacionesService: PoblacionesEspService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getAllRegions();
    this.onRegionChanged();
    this.onProvincesChanged();
    this.onMunicipalitiesChanged();
  }

  //Llamada inicial
  private getAllRegions(){
   this.poblacionesService.getRegions()
      .subscribe( regions => {
        this.regions = regions
      })
  }
  /*
    Cuando el control 'regions' cambia se limpian los otros controls
    y se pide a la api las privincias en funcion de la region.
  */
  onRegionChanged(): void {
    this.poblacionesForm.get('regions')!.valueChanges
      .pipe(
        tap( () => this.resetField(this.poblacionesForm.get('provinces')!) ),
        tap( () => {
          this.municipalitiesByProvinces = [];
          this.resetField(this.poblacionesForm.get('municipalities')!) }),
        switchMap( region => this.poblacionesService.getProvinces( region ))
      )
        .subscribe( provinces => {
          this.provincesByRegion = provinces
        })
  }
  /*
    Cuando el control 'provinces' cambia se limpia 'municipalities' y se
    pide a la api los nuevos municipios en funcion de la provincia.
  */
  onProvincesChanged(): void {
    this.poblacionesForm.get('provinces')!.valueChanges
      .pipe(
        tap( () => this.resetField(this.poblacionesForm.get('municipalities')!) ),
        switchMap( province => this.poblacionesService.getMunicipalities( province ))
      )
        .subscribe( municipalities => {
          this.municipalitiesByProvinces = municipalities
        })
  }
  /*
    Cuando el control 'municipalities' pide a la api las coordenadas del municipio
    y en caso de no tener valor devuelve coordenadas predeterminadas.
  */
  onMunicipalitiesChanged(): void {
    this.poblacionesForm.get('municipalities')!.valueChanges
      .pipe(
        switchMap( municipality => {
          if ( !municipality ) return of([-4, 40])

          return this.poblacionesService.getMunicipalityCoords( municipality )
            .pipe(
              map( ({ geo_point_2d }) => [geo_point_2d.lon, geo_point_2d.lat] )
            )

          }),
      )
        .subscribe( ([ lng, lat ]) => {
          this.mapCoords = new LngLat( lng, lat )

        })
  }
  /*
    Modifica todos los valores del formulario con los valores del municipio que
    se envia desde el poblaciones-map
  */
  changeFormValues(municipality: MunicipalityProperties){
    this.poblacionesForm.get('regions')?.setValue(municipality.acom_name)
    this.poblacionesForm.get('provinces')?.setValue(municipality.prov_name)
    this.poblacionesForm.get('municipalities')?.setValue(municipality.mun_name)
  }

  resetField( field: AbstractControl ): void { //Limpia el valor y errores de un select
    field.setValue('')
    field.reset()
  }

  goToWeather(): void {
    const municipality = this.poblacionesForm.get('municipalities')?.value;
    if (!municipality) return
    this.router.navigateByUrl(`/weather/${municipality},ES`)
  }

}


  /* private getProvincesByRegion( region: string ){
    console.log(region);
    region = region.normalize( 'NFD' ).replace(/[\u0301]/g, "");
    console.log(region);
    return this.poblacionesService.getProvinces( region )
      'georef-spain-province',
       new HttpParams()
        .set ('select', 'prov_name')
        .set('limit', '20')
        .set('refine', `acom_name:"${region}"`)

  } */
/*   private getMunicipalities( province: string ){
    return this.poblacionesService.getApiData(
      'georef-spain-municipio',
      new HttpParams()
        .set('select', 'mun_name')
        .set('limit', '100')
        .set('refine', `prov_name%3D%22${province}%22`))
      .subscribe( municipalities => {
        this.municipalitiesByProvinces = <Municipalities[]>municipalities
      })
  }
 */
