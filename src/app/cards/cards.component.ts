import {Component, OnInit} from '@angular/core';
import {AnimeFromList} from "../models/AnimeFromList";
import {AnimeDataService} from "../services/ShikimoriAPI/anime-data.service";
import {OrderType} from "../models/AnimeTypes";

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  animes: AnimeFromList[] = [];

  constructor(private animeDataService: AnimeDataService) { }

  ngOnInit(): void {
    this.getAnimeFromList();
  }

  getAnimeFromList() : void{
    this.animeDataService.getAnimeList({order:OrderType.ranked, limit: 10})
      .subscribe({next:(data: AnimeFromList[]) => this.animes = data});
  }

}
