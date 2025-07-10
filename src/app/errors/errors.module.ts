import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ErrorsRoutingModule } from './errors-routing.module';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [
    Error404PageComponent
  ],
  imports: [
    CommonModule,
    ErrorsRoutingModule,
    MaterialModule,
  ]
})
export class ErrorsModule { }
