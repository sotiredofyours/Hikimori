import { Component, Input, OnInit } from '@angular/core';
import { withDisabledInitialNavigation } from '@angular/router';
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
    if (
      this.anime.kind == KindType.tv ||
      this.anime.kind == KindType.tv_13 ||
      this.anime.kind == KindType.tv_24 ||
      this.anime.kind == KindType.tv_48
    )
      this.type = 'TV Сериал';
    else {
      this.type = this.anime.kind.toString();
    }
    if (this.anime.kind == KindType.movie) this.type = 'Фильм';
    if (this.anime.russian) this.name = this.anime.russian;
    else this.name = this.anime.name;
  }
}
