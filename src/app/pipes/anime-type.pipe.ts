import {Pipe, PipeTransform} from '@angular/core';
import {KindType} from "../models/AnimeTypes";

@Pipe({
  name: 'animeType'
})
export class AnimeTypePipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case KindType.tv:
      case KindType.tv_13:
      case KindType.tv_24:
      case KindType.tv_48:
        return 'TV Сериал';
      case KindType.movie:
        return 'Фильм';
      case KindType.ova:
        return 'OVA';
      case KindType.ona:
        return 'ONA';
      case KindType.special:
        return 'Спешл';
      case KindType.music:
        return 'Клип';
    }
    return 'None'
  }
}
