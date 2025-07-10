import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { PresentationComponent } from './components/presentation/presentation.component';
import { authCanActivate, authMatch } from '../auth/guards/auth.guard';
import { roleCanActivate } from '../auth/guards/role.guard';

const routes: Routes = [
  { path: '',
    component: MainPageComponent,
  children:[
    { path: '',  component: PresentationComponent },
    { path: 'tasklist', loadChildren: () => import('../dinamic-task-list/dinamic-task-list.module').then(m => m.DinamicTaskListModule) },
    { path: 'weather', loadChildren: () => import('../weather/weather.module').then(m => m.WeatherModule), canActivate: [ authCanActivate ], canMatch: [ authMatch ] },
    { path: 'countries', loadChildren: () => import('../countries/countries.module').then(m => m.CountriesModule), canActivate: [ roleCanActivate ] },
    { path: 'poblaciones-esp', loadChildren: () => import('../poblaciones-esp/poblaciones-esp.module').then(m => m.PoblacionesEspModule) ,canActivate: [ authCanActivate ], canMatch: [ authMatch ] },

  ] },
];

@NgModule({
  imports: [ RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortfolioRoutingModule { }
