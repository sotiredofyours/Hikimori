import { Component, OnInit } from '@angular/core';
import { AnimeFromList } from "../models/AnimeFromList";
import { AnimeDataService } from "../services/ShikimoriAPI/anime-data.service";
import { OrderType } from "../models/AnimeTypes";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  animes: AnimeFromList[] = [];
  page!: number;

  constructor(private animeDataService: AnimeDataService, private route: ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.page = Number(this.route.snapshot.paramMap.get('id'));
    this.getAnimeFromList();
  }

  getAnimeFromList(): void {
    this.animeDataService.getAnimeList({ order: OrderType.ranked, limit: 10, page: this.page })
      .subscribe({ next: (data: AnimeFromList[]) => this.animes = data });
  }

  pageUp(): void{
    this.router.navigate(['/animes/', ++this.page]).then(() => {
      window.location.reload();
    });
  }

  pageDown():void{
    this.router.navigate(['/animes', --this.page]).then(() => {
      window.location.reload();
    });
  }
}
