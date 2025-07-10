import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherPageComponent } from './pages/main-page.component';

const routes: Routes = [
  { path: '', component: WeatherPageComponent},
  { path: ':name', component: WeatherPageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WeatherRoutingModule {}
