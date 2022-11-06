import { Component, Input, OnInit } from '@angular/core';
import { AnimeFromList } from '../models/AnimeFromList';

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
    if (this.anime.russian) this.name = this.anime.russian;
    else this.name = this.anime.name;
  }
}
