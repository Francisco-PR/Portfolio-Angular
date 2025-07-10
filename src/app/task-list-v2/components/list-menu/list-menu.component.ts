import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'task-list-list-menu',
  templateUrl: './list-menu.component.html'
})
export class ListMenuComponent {

  @Output()
  creatingTask_Visibility: EventEmitter<boolean> = new EventEmitter();

  @Output()
  changeMode: EventEmitter<boolean> = new EventEmitter();

  onChangeMode():void { //Evento para que se mustren los botones de borrado
    this.changeMode.emit()
  }

  onCreatingTaskVisibility():void { //Evento para que se muestre el formulario de creación de las tasks
    this.creatingTask_Visibility.emit()
  }
}
