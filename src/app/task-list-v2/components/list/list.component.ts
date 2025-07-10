import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListOfTaskList, Task } from '../../interfaces/tasks.interface';

@Component({
  selector: 'task-list-list',
  templateUrl: './list.component.html'
})
export class ListComponent {

  @Output()
  onDelete: EventEmitter<Task> = new EventEmitter();

  @Output()
  onChangeState: EventEmitter<Task> = new EventEmitter()

  @Input()
  public listTitle: string = ""

  @Input()
  public edit: boolean = false;

  @Input()
  public taskList!: ListOfTaskList;


  onDeleteTask(task: Task):void {
    this.onDelete.emit(task);
  }

  onChangeStateTask(task: Task):void { //Emite evento con onChangeState para cambiar una task entre pendiente y completa
    this.onChangeState.emit(task)
  }
}
