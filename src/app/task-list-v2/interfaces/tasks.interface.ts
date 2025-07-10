export interface Task {
  id: string,
  name: string,
  completed: boolean
}
export interface ListOfTaskList {
  title: string,
  tasks: Array<Task>

}
