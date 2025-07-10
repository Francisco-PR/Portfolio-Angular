import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TaskListV2RoutingModule } from './task-list-v2-rounting.module';

import { ListComponent } from './components/list/list.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { ListMenuComponent } from './components/list-menu/list-menu.component';
import { TaskListV2PageComponent } from './pages/main-page/main-page.component';




@NgModule({
  declarations: [
    TaskListV2PageComponent,
    ListComponent,
    AddTaskComponent,
    ListMenuComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    TaskListV2RoutingModule,
  ],
})
export class TaskListV2Module { }
