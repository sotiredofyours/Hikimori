import {Component, OnInit} from '@angular/core';
import {AnimeFromList} from "../models/AnimeFromList";
import {AnimeDataService} from "../services/ShikimoriAPI/anime-data.service";
import {OrderType} from "../models/AnimeTypes";
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {RequestParams} from "../models/RequestParams";

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})


export class CardsComponent implements OnInit {

  titleName: string = 'Лучшие аниме';
  animes: AnimeFromList[] = [];
  nextPage: AnimeFromList[] = [];
  page: number = 1;

  isAnons:boolean = false;
  //filters
  status: string[] = [];

  constructor(private animeDataService: AnimeDataService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.getAnimeFromList(this.getParams());
    this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        this.getAnimeFromList(this.getParams());
      }
    })
  }

  getParams():RequestParams{
    let params:RequestParams = {limit:50, order: OrderType.ranked }
    let filter = this.route.snapshot.paramMap.get('type');
    let page =Number(this.route.snapshot.paramMap.get('page'));
    if (filter) params.status = filter;
    if (page) {
      this.page = page;
      params.page = page
    }
    console.log(JSON.stringify(params))
    return params;
  }

  getAnimeFromList(params:RequestParams): void {

    this.animeDataService.getAnimeList(params)
      .subscribe({
        next: (data: AnimeFromList[]) => this.animes = data
      });
    params.page = params.page!+1;
    this.animeDataService.getAnimeList(params)
      .subscribe({
        next: (data: AnimeFromList[]) => this.nextPage = data
      });
  }

  pageUp(): void {
    this.router.navigate(['/animes', ++this.page]);
  }

  pageDown(): void {
    this.router.navigate(['/animes', --this.page]);
  }

  addAnons(){
    this.status.push('anons');
    let url = this.status.join(',')
    this.router.navigate([`/animes/status/${url}/1`]);
    this.isAnons = !this.isAnons;
  }


}
