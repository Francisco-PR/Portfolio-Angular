import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task, TaskList, DialogData, dialogType } from '../../interfaces/task-list.interface';
import { v4 as uuid } from "uuid";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Calendar } from '@fullcalendar/core';




@Component({
  selector: 'add-list',
  templateUrl: './add_update.component.html',
  styleUrl: './add_update.component.css'
})
export class Add_UpdateComponent  implements OnInit{

  public type?: dialogType;
  public tasksLists?: TaskList[];
  private task?: Task;
  private taskslist?: TaskList;
  private listName?: boolean;

  minDate: Date;

  public get item() {
    return !!this.data.item
  };

  constructor(
      private dialogRef: MatDialogRef<Add_UpdateComponent>,
      @Inject(MAT_DIALOG_DATA) private data: DialogData,
      private fb: FormBuilder,
  ) {
    this.type = data.type;
    this.tasksLists = data.lists;
    this.itemDeterm();
    this.minDate = new Date();
   }
  ngOnInit(): void {
    console.log(this.type);
    if (this.tasksLists && this.tasksLists.length === 0)  this.dialogForm.get('listName')!.disable()

    console.log(`LISTA NAME`, this.listName);


    console.log(this.task, 'Aqui');
    console.log(this.tasksLists, 'Aqui');
    console.log(this.data.type, 'Aqui datatype');

    if ( this.type === 'task' || this.task ) {

      this.dialogForm.get('date')?.setValidators(Validators.required);
      this.dialogForm.get('date')?.updateValueAndValidity();
    }

    if ( this.taskslist ) {
      this.dialogForm.get('name')?.setValue(this.taskslist.title);

    }
    else if ( this.task && this.tasksLists ) {
      this.dialogForm.get('name')?.setValue(this.task.name)
      const taskLocatedList = this.tasksLists.find(list =>
        list.tasks.some(task => task.id === this.task!.id)
      );
        this.dialogForm.get('date')?.setValue(this.task.date)
        this.dialogForm.get('listName')?.setValue(taskLocatedList!.title)

    }
  }

  public dialogForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    listName: [''],
    date: [''],

  });



  onClose(): void {
    this.dialogRef.close();
  }

  onSubmit(){
    if ( this.dialogForm.invalid || !this.tasksLists )return

    if ( !this.taskslist && !this.task ) {

      if ( this.type === 'list' ) {
        const { name }  = this.dialogForm.value
        const newList: TaskList = {
          title: name,
          tasks: [],
        }
        this.tasksLists.push( newList )
        console.log(this.tasksLists + 'Push');

      }
      else if (this.type === 'task') {
        const { name, listName, date } = this.dialogForm.value
        const newTask: Task = {
          id: uuid(),
          name: name,
          date: date,
          completed: false
        }
        let selectedList = this.tasksLists.find(list => list.title === listName);
        if (!selectedList) {
          selectedList = this.defaultList();
        }
        console.log(newTask);

        selectedList?.tasks.push( newTask );
        this.addEvent( newTask );

        this.dialogRef.close(this.tasksLists);
      }
      console.log('Cerrando diálogo con:', this.tasksLists);

    }
    else{
      if ( this.taskslist ) {
        const LocatedList = this.tasksLists?.find(lists => lists.title === this.taskslist!.title);
        LocatedList!.title = this.dialogForm.get('name')!.value;
      }
      else if ( this.task ) {
        const taskLocatedList = this.tasksLists.find(list => list.tasks.some(task => task.id === this.task!.id) )
        const realTask = taskLocatedList?.tasks.find(task => task.id === this.task!.id)

        if ( realTask ) {
          realTask.name = this.dialogForm.get('name')!.value;
          realTask.date = this.dialogForm.get('date')!.value;
          this.removeEvent( realTask.id )
          this.addEvent( realTask )
        }


        if ( taskLocatedList!.title !== this.dialogForm.get('listName')!.value ) {
          const targetList = this.tasksLists.find(list => list.title === this.dialogForm.get('listName')!.value)
          targetList?.tasks.push( this.task )
          taskLocatedList!.tasks= taskLocatedList!.tasks.filter(tasks => tasks.id !== this.task!.id)
        }

      }
    }

    this.dialogRef.close(this.tasksLists);


  }

  itemDeterm(): void {
    if ( !this.data.item ) return;
    if ( 'tasks' in this.data.item! ) {
      this.taskslist = this.data.item;


      this.type = dialogType.list
      console.log(this.type, 'AQUIIIIIIIIIIIIIIIIIIIIII');
    }
    else {
      this.task = this.data.item;
      this.type = dialogType.task
    }
  }

   private defaultList(): TaskList {
    let defaultList = this.tasksLists?.find(list => list.title === 'Lista 1');
    if (!defaultList) {
      defaultList = { title: 'Lista 1', tasks: [] }
      this.tasksLists?.push( defaultList )
    }

    return defaultList
  }


  private addEvent( task: Task) {
    if (!this.data.calendar) return
    const calendarApi = this.data.calendar.getApi();
    console.log('En creaccion' ,task.date);

    const date = new Intl.DateTimeFormat('en-CA').format(task.date);

    console.log('ID', task.date );

    calendarApi.addEvent({
      id: task.id,
      title: task.name,
      date: date
    });
  }

  private removeEvent(eventId: string) {
    if (!this.data.calendar) return
    const calendarApi = this.data.calendar.getApi();
    const event = calendarApi.getEventById(eventId);
    if (event) {
      event.remove();
    }
  }
}
