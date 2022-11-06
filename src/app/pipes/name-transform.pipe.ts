import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameTranform'
})
export class NameTransformPipe implements PipeTransform {

  transform(value: string, englishTitle:string): string {
    let result = '';
    if (value){
      return result.concat(value, ' / ', englishTitle);
    }
    else return englishTitle
  }

}

@Pipe({
  name: 'ratingTranform'
})
export class RatingTransformPipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case 'pg_13': return 'PG-13';
      case 'pg': return 'PG';
      case 'r': return 'R-17';
      case 'g': return 'G';
      case 'rx': return 'Rx'
      case 'r_plus': return 'R+'
    }
    return '';
  }

}
