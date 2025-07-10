import { Component, EventEmitter, Output } from '@angular/core';
import { Task } from '../../interfaces/tasks.interface';
import { v4 as uuid } from "uuid";

@Component({
  selector: 'task-list-add-task',
  templateUrl: './add-task.component.html'
})
export class AddTaskComponent {

  @Output()
  onNewtask: EventEmitter<Task> = new EventEmitter();

  public task:Task = {
    id: uuid(),
    name: "",
    completed: false
  };

  emitTask():void { //Si el nombre no esta vacio lo emite con onNewtask
    if (this.task.name.length === 0 ) return;

    this.onNewtask.emit(this.task);

    this.task = {id: uuid(), name: "", completed: false} //Crea un ID para la siguiente tarea y resetea los otros atributos
  }
}
