import {Component, Input, OnInit} from '@angular/core';
import {AnimeDataService} from "../services/ShikimoriAPI/anime-data.service";
import {AnimeInfo} from "../models/AnimeInfo";

@Component({
  selector: 'app-pop-up-card',
  templateUrl: './pop-up-card.component.html',
  styleUrls: ['./pop-up-card.component.css']
})
export class PopUpCardComponent implements OnInit {

  @Input('id') id = '';
  anime!:AnimeInfo;
  description:string = '';
  constructor(private animeService:AnimeDataService) { }

  async ngOnInit(): Promise<void> {
    this.getAnime();
  }

  getAnime() {
    this.animeService.getAnimeById(Number(this.id)).subscribe(x=> {
      this.anime = x;
      this.description = x.description_html.replace(/<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g,'');
    });
  }

}
