import {Pipe, PipeTransform} from '@angular/core';
import { Option } from '../option/option';

@Pipe({
    name: 'optionName'
  })
  export class OptionNamePipe implements PipeTransform {
    transform(id: number, options: Option[]): string {
      const option = options.find(o => o.id === id);
      return option ? option.name : 'Unknown';
    }
  }  