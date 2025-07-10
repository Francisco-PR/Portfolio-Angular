import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortfolioRoutingModule } from './portfolio-routing.module';
import { MaterialModule } from '../material/material.module';

import { MainPageComponent } from './pages/main-page/main-page.component';
import { PresentationComponent } from './components/presentation/presentation.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    MainPageComponent,
    PresentationComponent
  ],
  imports: [
    PortfolioRoutingModule,
    CommonModule,
    MaterialModule,
    SharedModule,
  ],
  exports: [
    MainPageComponent,
  ]
})
export class PortfolioModule { }
