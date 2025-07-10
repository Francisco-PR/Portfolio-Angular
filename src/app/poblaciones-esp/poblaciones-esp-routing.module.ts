import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PoblacionesEspComponent } from './pages/main-page/main-page.component';

const routes: Routes = [
  { path: '', component: PoblacionesEspComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PoblacionesEspRoutingModule { }
