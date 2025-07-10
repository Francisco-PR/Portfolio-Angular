import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Add_UpdateComponent } from '../../components/add_update/add_update.component';
import { Task, TaskList } from '../../interfaces/task-list.interface';
import { filter, map, tap } from 'rxjs';
import { CalendarOptions } from '@fullcalendar/core';
import  dayGridPlugin from '@fullcalendar/daygrid';
import { FullCalendarComponent } from '@fullcalendar/angular';


@Component({
  templateUrl: './task-list-page.component.html',
  styleUrl: './task-list-page.component.css'
})
export class TaskListPageComponent {


  @ViewChild('calendar') calendarComponent?: FullCalendarComponent;

  public tasksLists: TaskList[] = [];
  public showCalendar: boolean = false


  public calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: '',
      center: 'title',
      right: 'prev,next today'
    },
    aspectRatio: 0.9,
    handleWindowResize: true,
    windowResizeDelay: 100,
    plugins: [dayGridPlugin],
    datesSet: () => {setTimeout(() => {
      this.loadTasksEvents();
    }, 100)}
    };


  constructor(
    private dialog: MatDialog,
  ) {
      this.loadTaskLists()
  }

  ngAfterViewInit(): void {
    if ( this.showCalendar ) this.loadTasksEvents();
  }

  openDialog(type?: string, item?: TaskList | Task): void {
      const dialogRef = this.dialog.open(Add_UpdateComponent, { data: { lists: structuredClone(this.tasksLists) , type, item, calendar: this.calendarComponent } ,
        enterAnimationDuration: 400,
        exitAnimationDuration: 200,
        autoFocus: false,
        width:'31.25rem',
        maxHeight:'100%',
      } );
      dialogRef.afterClosed()
        .pipe(
          tap(res => console.log('Resultado: ', res)),
          filter(res => !!res),
          map(lists => {
            this.tasksLists = <TaskList[]>lists
          }),
          tap(() =>{ this.saveTaskLists(); this.loadTaskLists() }),
        ).subscribe()
  }

  public changeStateTask( task: Task) {
    task.completed = !task.completed
    this.saveTaskLists()
  }

  public deleteItem( item: TaskList | Task ): void {

    if ( 'tasks' in item ){
      const selectedList: TaskList = item
      this.tasksLists = this.tasksLists.filter(list => list.title !== selectedList.title)
    }
    else {
      const selectedTask: Task = item
      this.tasksLists.forEach(list => {
        this.removeEvent( selectedTask.id );
        list.tasks = list.tasks.filter(task => task.id !== selectedTask.id)
      })
    }
    this.saveTaskLists()
  }


  addEvent( task: Task) {
    if (!this.calendarComponent) return
    const calendarApi = this.calendarComponent!.getApi();

    console.log( 'Task Date' ,task.date);

    const date = new Intl.DateTimeFormat('en-CA').format(task.date);

    console.log('NEW DATE' ,date);

    calendarApi.addEvent({
      id: task.id,
      title: task.name,
      date: date
    });
  }

  removeEvent(eventId: string) {
    if (!this.calendarComponent) return
    const calendarApi = this.calendarComponent!.getApi();

    const event = calendarApi.getEventById(eventId);
    if (event) {
      event.remove();
    }
  }

  private saveTaskLists():void { //Se guarda la lista en el LocalStorage
    localStorage.setItem('tasksList', JSON.stringify(this.tasksLists));
  }

  private loadTaskLists():void { //Se recuperan si existe la lista del LocalStorage
    if(!localStorage.getItem('tasksList')) return;

    this.tasksLists = JSON.parse(localStorage.getItem('tasksList')!)
  }
  private loadTasksEvents():void {
    this.tasksLists.forEach( list => {
      list.tasks.forEach(task => {
        task.date = new Date(task.date)

        this.addEvent( task )
      })
    })
  }

  toggleCalendar(): void {
    this.showCalendar = !this.showCalendar
  }

}
