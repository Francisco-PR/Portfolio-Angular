import { Component } from '@angular/core';
import { ListOfTaskList, Task } from '../../interfaces/tasks.interface';

@Component({
  selector: 'taskList-v2-main-page',
  templateUrl: './main-page.component.html'
})

export class TaskListV2PageComponent {

  constructor() {
    this.loadTaskLists();
  }

  public listMode: boolean = false

  public creatingTask: boolean = false

  public tasksList: Array<ListOfTaskList> = []



  addTask(task: Task):void {
    this.tasksList[0].tasks.push(task); //Añade la tarea
    this.creatingTask = false;  //Oculta el formulario
    this.saveTaskLists() //Guarda las modificaciones
  }

  onChangeStateTask(task: Task):void {
    //Cambia la task de lista en funcion del atributo booleano completed
    //copiandola al otro array y eliminanodola del anterior y lo guarda
    const currentTaskId = task.id
    if (!task.completed){
      task.completed = true
      this.tasksList[1].tasks.push(task)
      this.tasksList[0].tasks = this.tasksList[0].tasks.filter(task => task.id !== currentTaskId)
    }
    else {
      task.completed = false
      this.tasksList[0].tasks.push(task)
      this.tasksList[1].tasks = this.tasksList[1].tasks.filter(task => task.id !== currentTaskId)
    }
    this.saveTaskLists()
  }

  deleteTaskById ({id, completed}:Task):void {
    //filtra el array en el que se encuentra la task por id y le iguala el resultado
    if (!completed){
      this.tasksList[0].tasks = this.tasksList[0].tasks.filter(task => task.id !== id)
    }
    else {
      this.tasksList[1].tasks = this.tasksList[1].tasks.filter(task => task.id !== id)
    }
    this.saveTaskLists() //Guarda las modificaciones
  }

  creatingTask_Visibility() {
    this.creatingTask = !this.creatingTask; //Niega el valor actual de creatingTask para que ngIf muestre o no el formulario
  }

  changeMode():void {
    this.listMode = !this.listMode; //Niega el valor actual de listMode para que se muestren o no los botones de borrado
  }

  basicLists():void {
    const pending:ListOfTaskList  = {
      title: "Pendientes",
      tasks: []
    }
    const completed:ListOfTaskList  = {
      title: "Completadas",
      tasks: []
    }
    this.tasksList.push(pending)
    this.tasksList.push(completed)
  }

  private saveTaskLists():void { //Se guarda la lista en el LocalStorage
    localStorage.setItem('tasksList', JSON.stringify(this.tasksList));
  }

  private loadTaskLists():void { //Se recuperan si existe la lista del LocalStorage
    if(localStorage.getItem('tasksList')) {
      this.tasksList = JSON.parse(localStorage.getItem('tasksList')!)
    }
    else{
      this.basicLists();
    }
  }
}
