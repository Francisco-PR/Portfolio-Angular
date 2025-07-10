import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeSwitcherComponent } from './components/theme-switcher/theme-switcher.component';
import { MaterialModule } from '../material/material.module';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';



@NgModule({
  declarations: [
    ThemeSwitcherComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    ThemeSwitcherComponent,
    LoadingSpinnerComponent,
  ]
})
export class SharedModule { }
