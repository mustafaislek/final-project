import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'short',
})
export class ShortPipe implements PipeTransform {
  transform(text: string | null | undefined): any {
    if (text) {
      const len = text.length;
      if (len > 30) {
        // only shorten if greater than 30
        // change value 21 and 9 as per requirement
        return text.substr(0, 25) + '...' ;
      }
      return text;
    }
    return text;
  }
}
