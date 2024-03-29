import {Component, OnInit} from '@angular/core';
import {AnimeFromList} from "../models/AnimeFromList";
import {AnimeDataService} from "../services/ShikimoriAPI/anime-data.service";
import {KindType, OrderType, RatingType, StatusType} from "../models/AnimeTypes";
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

  isAnons: boolean = false;
  isOngoing: boolean = false;
  isReleased: boolean = false;
  isTV: boolean = false;
  isTV13: boolean = false;
  isTV24: boolean = false;
  isTV48: boolean = false;
  isMovie: boolean = false;
  isOva: boolean = false;
  isOna: boolean = false;
  isSpecial: boolean = false;
  isMusic: boolean = false;
  isRatingOrder: boolean = true;
  isPopularOrder: boolean = false;
  isNameOrder: boolean = false;
  isAiredOrder: boolean = false;
  isRandomOrder: boolean = false;
  isIdOrder: boolean = false;
  isScore8: boolean = false;
  isScore7: boolean = false;
  isScore6: boolean = false;
  isG: boolean = false;
  isPG: boolean = false;
  isPG13: boolean = false;
  isR17: boolean = false;
  isRPlus: boolean = false;
  isRx: boolean = false;

  constructor(private animeDataService: AnimeDataService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.resetFilters();
    this.getAnimeFromList(this.getParams());
    this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd) {
        this.getAnimeFromList(this.getParams());
      }
    })
  }

  resetFilters(): void {
    let filters: string[] = [];
    let keys = this.route.snapshot.paramMap.keys;
    keys.map((str, index) => {
      if (index % 2 != 0 && index != keys.length) {
        filters.push(this.route.snapshot.paramMap.get(str)!);
      }
    });
    filters.map((statusType) => {
      switch (statusType) {
        case StatusType.anons:
          this.isAnons = true; break;
        case StatusType.ongoing:
          this.isOngoing = true; break;
        case StatusType.released:
          this.isReleased = true; break;
      }
    });
    filters.map((kindType) => {
      switch (kindType) {
        case KindType.tv:
          this.isTV = true; break;
        case KindType.movie:
          this.isMovie = true; break;
        case KindType.ova:
          this.isOva = true; break;
        case KindType.ona:
          this.isOna = true; break;
        case KindType.special:
          this.isSpecial = true; break;
        case KindType.music:
          this.isMusic = true; break;
        case KindType.tv_13:
          this.isTV13 = true; break;
        case KindType.tv_24:
          this.isTV24 = true; break;
        case KindType.tv_48:
          this.isTV48 = true; break;
      }
    })
    filters.map(scoreFilter => {
      switch (scoreFilter) {
        case '8':
          this.isScore8 = true;break;
        case '7':
          this.isScore7 = true;break;
        case '6':
          this.isScore6 = true;break;
      }
    })
    filters.map(ratingFilter =>{
      switch (ratingFilter){
        case RatingType.g:
          this.isG = true; break;
        case RatingType.pg:
          this.isPG = true; break;
        case RatingType.pg_13:
          this.isPG13 = true; break;
        case RatingType.r:
          this.isR17 = true; break;
        case RatingType.r_plus:
          this.isRPlus = true; break;
        case RatingType.rx:
          this.isRx = true; break;
      }
    })
    filters.map((orderType) => {
      switch (orderType) {
        case OrderType.ranked:
          this.isRatingOrder = true; break;
        case OrderType.popularity:
          this.isPopularOrder = true; break;
        case OrderType.name:
          this.isNameOrder = true; break;
        case OrderType.airedOn:
          this.isAiredOrder = true; break;
        case OrderType.random:
          this.isRandomOrder = true; break;
        case OrderType.id:
          this.isIdOrder = true; break;
      }
    })
  }

  getParams(): RequestParams {
    let params: RequestParams = {limit: 50, order: OrderType.ranked}
    let filterType = this.route.snapshot.paramMap.keys;
    filterType.map((param, index) => {
      if (index % 2 == 0 && index != filterType.length) {
        switch (this.route.snapshot.paramMap.get(param)) {
          case 'kind':
            params.kind = this.getKindFilter().join(','); break;
          case 'status':
            params.status = this.getStatusFilter().join(','); break;
          case 'score':
            params.score = this.getScoreFilter().join(','); break;
          case 'rating':
            params.rating = this.getRatingFilter().join(','); break;
          case 'orderby':
            params.order = this.getOrderFilter().toString(); break;
        }
      }
    });
    let page = Number(this.route.snapshot.paramMap.get('page'));
    this.page = page;
    params.page = page;
    return params;
  }

  getAnimeFromList(params: RequestParams): void {
    this.animeDataService.getAnimeList(params)
      .subscribe({
        next: (data: AnimeFromList[]) => this.animes = data
      });

    params.page = params.page! + 1;
    setTimeout(() => this.animeDataService.getAnimeList(params)
      .subscribe({
        next: (data: AnimeFromList[]) => this.nextPage = data
      }), 2000);
  }

  pageUp(): void {
    this.addFilters(++this.page);
  }

  pageDown(): void {
    this.addFilters(--this.page);
  }

  getStatusFilter(): StatusType[] {
    let status: StatusType[] = [];
    if (this.isAnons) status.push(StatusType.anons);
    if (this.isOngoing) status.push(StatusType.ongoing);
    if (this.isReleased) status.push(StatusType.released);
    return status;
  }

  getKindFilter(): KindType[] {
    let kinds: KindType[] = [];
    if (this.isTV) kinds.push(KindType.tv);
    if (this.isMovie) kinds.push(KindType.movie);
    if (this.isOva) kinds.push(KindType.ova);
    if (this.isOna) kinds.push(KindType.ona);
    if (this.isSpecial) kinds.push(KindType.special);
    if (this.isMusic) kinds.push(KindType.music);
    if (this.isTV13) kinds.push(KindType.tv_13);
    if (this.isTV24) kinds.push(KindType.tv_24);
    if (this.isTV48) kinds.push(KindType.tv_48);
    return kinds;
  }

  getOrderFilter(): OrderType {
    console.log(this.isNameOrder)
    if (this.isPopularOrder) return OrderType.popularity;
    if (this.isNameOrder) return OrderType.name;
    if (this.isAiredOrder) return OrderType.airedOn;
    if (this.isRandomOrder) return OrderType.random;
    if (this.isIdOrder) return OrderType.id;
    if (this.isRatingOrder) return OrderType.ranked;
    return OrderType.ranked;
  }

  getScoreFilter(): string[] {
    let ratingType: string[] = [];
    if (this.isScore8) ratingType.push('8');
    if (this.isScore7) ratingType.push('7');
    if (this.isScore6) ratingType.push('6');
    return ratingType;
  }

  getRatingFilter(): RatingType[] {
    let ratingFilters = [];
    if (this.isG) ratingFilters.push(RatingType.g);
    if (this.isPG) ratingFilters.push(RatingType.pg);
    if (this.isPG13) ratingFilters.push(RatingType.pg_13);
    if (this.isR17) ratingFilters.push(RatingType.r);
    if (this.isRPlus) ratingFilters.push(RatingType.r_plus);
    if (this.isRx) ratingFilters.push(RatingType.rx);
    return ratingFilters;
  }

  addFilters(page?:number): void {
    let str = 'animes/';
    let status = this.getStatusFilter();
    if (status.length != 0) str = str.concat('status/', status.join(','), '/');
    let kind = this.getKindFilter();
    if (kind.length != 0) str = str.concat('kind/', kind.join(','), '/');
    let score = this.getScoreFilter();
    if (score.length != 0) str = str.concat('score/', score.join(','), '/');
    let rating = this.getRatingFilter();
    if (rating.length != 0) str = str.concat('rating/', rating.join(','), '/');
    let order = this.getOrderFilter();
    str = str.concat('orderby/', order.toString(), '/');
    if (page) str = str.concat(page.toString());
    else str = str.concat('1');
    this.router.navigate([str]);
  }

  resetOrder():void{
    this.isNameOrder = false;
    this.isRandomOrder = false;
    this.isIdOrder = false;
    this.isPopularOrder = false;
    this.isAiredOrder = false;
    this.isRatingOrder = false;
  }
}
