import { FullCalendarComponent } from "@fullcalendar/angular";

export interface TaskList {
  title: string,
  tasks: Task[],

}

export interface Task {
  id: string,
  name: string,
  date: Date,
  completed: boolean,
}

export interface DialogData {
  type?: dialogType,
  item?: TaskList | Task,
  lists: TaskList[],
  calendar: FullCalendarComponent,
}

export enum dialogType { list = 'list' , task = 'task'}
