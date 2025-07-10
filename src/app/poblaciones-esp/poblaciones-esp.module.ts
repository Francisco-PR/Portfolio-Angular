import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PoblacionesEspRoutingModule } from './poblaciones-esp-routing.module';
import { PoblacionesEspComponent } from './pages/main-page/main-page.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PoblacionesMapComponent } from './components/poblaciones-map/poblaciones-map.component';


@NgModule({
  declarations: [
    PoblacionesEspComponent,
    PoblacionesMapComponent,
  ],
  imports: [
    CommonModule,
    PoblacionesEspRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ]
})
export class PoblacionesEspModule { }
