import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task, TaskList } from '../../interfaces/task-list.interface';

@Component({
  selector: 'list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
 @Output()
  onDelete: EventEmitter<Task | TaskList> = new EventEmitter();

  @Output()
  onModify: EventEmitter<Task | TaskList> = new EventEmitter();

  @Output()
  onChangeState: EventEmitter<Task> = new EventEmitter()

  @Input()
  public taskList!: TaskList;


  deleteItem(item: Task | TaskList ):void {
    this.onDelete.emit(item);
  }

  modifyItem(item: Task | TaskList ):void {
    this.onModify.emit(item);
  }

  changeStateTask(task: Task):void { //De pendiente a completada
    this.onChangeState.emit(task)
  }
}
