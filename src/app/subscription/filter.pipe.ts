import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLowerCase();
    return items.filter(item => {
      // Add the conditions to filter the data based on your requirements
      return item.name.toLowerCase().includes(searchText) || item.contractDate.toLowerCase().includes(searchText) ||
      item.lastName.toLowerCase().includes(searchText) || item.status.toLowerCase().includes(searchText) ||
      item.firstName.toLowerCase().includes(searchText) ;
    });
  }
}
