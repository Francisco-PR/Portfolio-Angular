import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TaskListV2PageComponent } from './pages/main-page/main-page.component';

const routes: Routes = [
  { path: '', component: TaskListV2PageComponent },
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class TaskListV2RoutingModule {}
