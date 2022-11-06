import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AnimeInfo} from "../models/AnimeInfo";
import {AnimeDataService} from "../services/ShikimoriAPI/anime-data.service";

@Component({
  selector: 'app-p-anime',
  templateUrl: './p-anime.component.html',
  styleUrls: ['./p-anime.component.css']
})
export class PAnimeComponent implements OnInit {

  anime!:AnimeInfo;
  description:string = '';

  constructor(private router:ActivatedRoute, private animeService:AnimeDataService) { }

  ngOnInit(): void {
    let id = (Number) (this.router.snapshot.paramMap.get("id"));
    this.getAnime(id);
  }

  getAnime(id:number) {
    this.animeService.getAnimeById(id).subscribe(x => {
      this.anime = x;
      this.description = x.description_html.replace(/<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g, '');
    });
  }
}
