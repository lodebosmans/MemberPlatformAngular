// translate-gender.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translateGender'
})
export class TranslateGenderPipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case 'Male':
        return 'Man';
      case 'female':
        return 'Vrouw';
      default:
        return value;
    }
  }
}
