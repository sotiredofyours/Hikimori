import { Component, Input, OnInit } from '@angular/core';
import { AnimeFromList } from '../models/AnimeFromList';
import { KindType } from '../models/AnimeTypes';

@Component({
  selector: 'app-card-poster',
  templateUrl: './card-poster.component.html',
  styleUrls: ['./card-poster.component.css'],
})
export class CardPosterComponent implements OnInit {
  @Input() anime!: AnimeFromList;
  date!: Date;
  type!: string;
  name!: string;

  constructor() {}

  ngOnInit(): void {
    this.date = new Date(this.anime.aired_on);
    switch (this.anime.kind) {
      case KindType.tv:
      case KindType.tv_13:
      case KindType.tv_24:
      case KindType.tv_48: this.type = 'TV Сериал'; break;
      case KindType.movie: this.type = 'Фильм'; break;
      case KindType.ova: this.type = 'OVA'; break;
      case KindType.ona: this.type = 'ONA'; break;
      case KindType.special: this.type = 'Спешл'; break;
      case KindType.music: this.type = 'Клип'; break;
    }
    if (this.anime.russian) this.name = this.anime.russian;
    else this.name = this.anime.name;
  }
}
