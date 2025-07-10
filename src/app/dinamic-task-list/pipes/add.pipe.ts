import { Pipe, PipeTransform } from '@angular/core';
import { dialogType } from '../interfaces/task-list.interface';

@Pipe({
  name: 'addPipe'
})
export class AddPipe implements PipeTransform {

  transform(value: string, type: dialogType ): string {
    let newValue: string = ''

    if ( type === 'task' ) {
      newValue = value + 'tarea'
    }

    else if ( type === 'list' ){
      newValue = value + 'lista'
    }

    return newValue;
  }

}
