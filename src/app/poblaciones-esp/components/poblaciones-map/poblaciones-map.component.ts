import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges, ViewChild, Output, EventEmitter } from '@angular/core';
import mapboxgl, { Map, LngLat, } from 'mapbox-gl';
import { MunicipalityProperties } from '../../interfaces/poblaciones.interfaces';

const mapbox_key: string = "pk.eyJ1IjoiZnJhbmNpc2NvLXByIiwiYSI6ImNtODFqbW9lcDAzazMyanNhdGdnbTFpc2UifQ.U1y0DEMYmsVJni0kNcVX4w";
mapboxgl.accessToken = mapbox_key; //Le indicamos la key Mapbox

@Component({
  selector: 'poblaciones-map',
  templateUrl: './poblaciones-map.component.html',
  styleUrl: './poblaciones-map.component.css'
})
export class PoblacionesMapComponent  implements AfterViewInit, OnChanges, OnDestroy{

  @ViewChild('map') divMap?: ElementRef;

  @Input() coords?: LngLat;
  //Envia los datos main-page para asignarlos al formulario
  @Output() onMapSelect: EventEmitter<MunicipalityProperties> = new EventEmitter<MunicipalityProperties>()

  private zoom: number = 4; //Zoom inicial del mapa
  private map?: Map;

  ngAfterViewInit(): void {

    if ( !this.divMap ) throw 'El elemento HTML no fue encontrado';

    this.map = new Map({ //Creacion de mapa con valores iniciales
      container: this.divMap.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: this.coords,
      zoom: this.zoom,
    });

    this.map.on('load', () => { //En la carga le añadimos el recurso de los municipios
      this.map!.addSource('municipalities', {
            'type': 'vector',
            'url': 'mapbox://francisco-pr.6v4jcx8x'
        });
    })
    this.map.once('load', () => { //Al finalizar la carga agregamos los dos layers al mapa
      this.map!.addLayer({ //Layer principal
        'id': 'municipalities-vector',
        'type': 'fill',
        'source': 'municipalities',
        'maxzoom': 14,
        'minzoom': 3,
        'source-layer': 'georefspain-7aczr8',
        'paint': {
          'fill-outline-color': 'rgba(0, 0, 0, 0.04)',
          'fill-color': 'rgba(255, 255, 255, 0)'
        }
      }, 'building');
      this.map!.addLayer({ //Layer para resaltados
            'id': 'municipalities-vector-hightlighted',
            'type': 'fill',
            'source': 'municipalities',
            'source-layer': 'georefspain-7aczr8',
            'paint': {
                'fill-outline-color': 'rgba(0, 0, 0, 0.7)',
                'fill-color': 'rgb(0, 0, 0)',
                'fill-opacity': 0.20
            },
            'filter': ['in', 'MUNICIPALITIES', '']
        }, 'building'
    );
    })

    this.mapListeners();
  }

  ngOnChanges(changes: SimpleChanges): void {

    if ( changes['coords'] ) { //Cuando cambian las cordenadas le pasamos el valor anterior a la funcion moveMap()
      this.moveMap(changes['coords'].previousValue)
    }
  }
  ngOnDestroy(): void { //Limpia el mapa, principalmente los listeners
    this.map?.remove();
  }

  moveMap( prevCoords: LngLat ) {
    if ( !this.map || !this.coords || !this.zoom ) return; //Asegura lo necesario para mover el mapa

    if ( this.coords.toString() === "LngLat(-4, 40)" ) {
      //Si las cordenadas son las iniciales vuelve a la posicion inicial
      this.map.flyTo({zoom:4, center: this.coords});

      }

    else if ( prevCoords.toString() !== this.coords.toString() ) {
      //Si las cordenadas son distintas a iniciales y a las previas se mueve a esa posicion
      this.map.flyTo({zoom:10.2, center: this.coords});

      this.map.once('moveend', () => { //Cuando el movimiento finaliza
        const features = this.map!.queryRenderedFeatures(this.map!.project(this.coords!), {
            layers: ['municipalities-vector']
        }); //Obtiene del layer la feature que se encuentra en el centro de la pantalla
          if (features.length > 0) { //si existe obtenemos sus propiedades
            const properties = features[0].properties!;

          if (this.map!.getLayer('municipalities-vector-hightlighted')) { //Si el layer resaltados existe
              this.map!.setFilter('municipalities-vector-hightlighted', [
                  '==',
                  'mun_name',
                  properties['mun_name']
              ]); //Filtramos sus features para resaltar la que coincida
          }
        }
      });
    }
  }

  mapListeners() { //Funcion para llamar a los listeners del mapa
    if ( !this.map ) throw 'Mapa no inicializado';

    this.map.on('renderstart', () => { //Al renderizarse se reajusta el tamaño para evitar bug de styles
      this.map?.resize()
    })

    this.map.on('zoomend', () => { //Si el zoom es superior a 18 vuelve a 18
      if ( this.map!.getZoom() < 18 ) return;
      this.map!.zoomTo(18);
    });

    this.map.on('click', 'municipalities-vector', (event) => { //En el click actua en el layer
      const properties = event.features![0].properties! //Obtenemos sus propiedades de la feature clicada

      this.map!.setFilter('municipalities-vector-hightlighted', [
        '==',
        'mun_name',
        properties['mun_name']
      ]); //Filtramos sus features para resaltar la que coincida con la clicada
      const municipality: MunicipalityProperties = {
        acom_name: properties['acom_name'],
        prov_name: properties['prov_name'],
        mun_name: properties['mun_name'],
      } //Se crea el objeto con los datos extraidos de las propiedades de la feature

      this.emitMapSelection(municipality) //Se le pasa a la funcion para emitirlo

    })

  }

  emitMapSelection(Municipality :MunicipalityProperties) :void {
    this.onMapSelect.emit(Municipality) //El objeto es emitio al padre
  }

}
