import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {provideNativeDateAdapter} from '@angular/material/core';

import { DinamicTaskListRoutingModule } from './dinamic-task-list-routing.module';
import { TaskListPageComponent } from './pages/task-list-page/task-list-page.component';
import { ListComponent } from './components/list/list.component';
import { Add_UpdateComponent } from './components/add_update/add_update.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AddPipe } from './pipes/add.pipe';
import { FullCalendarModule } from '@fullcalendar/angular';


@NgModule({
  declarations: [
    TaskListPageComponent,
    ListComponent,
    Add_UpdateComponent,
    AddPipe,
  ],
  imports: [
    CommonModule,
    DinamicTaskListRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FullCalendarModule,
  ],
  providers:[
    provideNativeDateAdapter()
  ]
})
export class DinamicTaskListModule { }
