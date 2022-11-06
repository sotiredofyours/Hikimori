import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameTranform'
})
export class NameTransformPipe implements PipeTransform {

  transform(englishTitle: string, value:string): string {
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

@Pipe({
  name: 'statusTranform'
})
export class StatusTransformPipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case 'anons': return 'Анонс'
      case 'ongoing': return 'Выходит'
      case 'released': return 'Вышло'
    }
    return '';
  }
}

@Pipe({
  name: 'dateTranform'
})
export class DateTransformPipe implements PipeTransform {

  transform(value: Date, dateReleased:Date): string {
    value = new Date(value);
    if (!dateReleased) return `c ${value.getDate()} ${transformMonth(value.getMonth())} ${value.getFullYear()} г.`
    dateReleased = new Date(dateReleased)
    if (value.getFullYear() === dateReleased.getFullYear()){
      let res = '';
      let monthAired = value.getMonth();
      let monthReleased = dateReleased.getMonth();
      let beginDate = `${value.getDate()} ${transformMonth(monthAired)} ${value.getFullYear()} г.`
      let outDate = `${dateReleased.getDate()} ${transformMonth(monthReleased)} ${dateReleased.getFullYear()} г.`
      res = res.concat(`с ${beginDate} по ${outDate}`);
      return res;
    }
    return `${value.getFullYear()} - ${dateReleased.getFullYear()} гг.`;
  }
}

function transformMonth(month:number):string{
  switch (month) {
    case 0: return 'янв.'
    case 1: return 'фев.'
    case 2: return 'марта'
    case 3: return 'апр.'
    case 4: return 'мая'
    case 5: return 'июня'
    case 6: return 'июля'
    case 7: return 'авг.'
    case 8: return 'сент.'
    case 9: return 'окт'
    case 10: return 'нояб.'
    case 11: return 'дек.'
  }
  return '';
}

@Pipe({
  name: 'episodesTranform'
})
export class EpisodesTransformPipe implements PipeTransform {

  transform(episodes: number, episodesAired:number, status:string): string {
    if (episodes == 0) return `${episodesAired} / ?`;
    if (status == 'anons') return `0 / ${episodes}`
    if (status == 'released') return `${episodes}`
    return `${episodesAired} / ${episodes}`;
  }
}
