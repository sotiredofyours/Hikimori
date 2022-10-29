import {Component, OnInit} from '@angular/core';
import {AnimeFromList} from "../models/AnimeFromList";
import {AnimeDataService} from "../services/ShikimoriAPI/anime-data.service";
import {KindType, OrderType, StatusType} from "../models/AnimeTypes";
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

  resetFilters():void {
    let filters:string[] = [];
    let keys = this.route.snapshot.paramMap.keys;
      keys.map((str, index) =>{
      if (index % 2 != 0 && index != keys.length){
        filters.push(this.route.snapshot.paramMap.get(str)!);
      }
    });
    console.log(filters);
    filters.map((statusType) => {
      switch (statusType) {
        case StatusType.anons:
          this.isAnons = true;
          break;
        case StatusType.ongoing:
          this.isOngoing = true;
          break;
        case StatusType.released:
          this.isReleased = true;
          break;
      }
    });
    filters.map((kindType) =>{
      switch (kindType) {
        case KindType.tv:
          this.isTV = true;
          break;
        case KindType.movie:
          this.isMovie = true;
          break;
        case KindType.ova:
          this.isOva = true;
          break;
        case KindType.ona:
          this.isOna = true;
          break;
        case KindType.special:
          this.isSpecial = true;
          break;
        case KindType.music:
          this.isMusic = true;
          break;
        case KindType.tv_13:
          this.isTV13 = true;
          break;
        case KindType.tv_24:
          this.isTV24 = true;
          break;
        case KindType.tv_48:
          this.isTV48 = true;
          break;
      }
    })
  }

  getParams(): RequestParams {
    let params: RequestParams = {limit: 50, order: OrderType.ranked}
    let filterType = this.route.snapshot.paramMap.keys;
    filterType.map( (param, index) => {
      if (index %2 == 0 && index!=filterType.length){
        switch (this.route.snapshot.paramMap.get(param)) {
          case 'kind': params.kind = this.getKindFilter().join(','); break;
          case 'status': params.status = this.getStatusFilter().join(','); break;
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
    setTimeout(()=>this.animeDataService.getAnimeList(params)
      .subscribe({
        next: (data: AnimeFromList[]) => this.nextPage = data
      }), 1000);
  }

  pageUp(): void {
    this.router.navigate(['/animes', ++this.page]);
  }

  pageDown(): void {
    this.router.navigate(['/animes', --this.page]);
  }

  getStatusFilter(): StatusType[] {
    let status:StatusType[] = [];
    if (this.isAnons) status.push(StatusType.anons);
    if (this.isOngoing) status.push(StatusType.ongoing);
    if (this.isReleased) status.push(StatusType.released);
    return status;
  }

  getKindFilter():KindType[]{
    let kinds:KindType[] = [];
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

  addFilters():void{
    let str = 'animes/';
    let status = this.getStatusFilter();
    if (status.length!=0){
      str = str.concat('status/',status.join(','),'/');
    }
    let kind = this.getKindFilter();
    if (kind.length!=0) str = str.concat('kind/',kind.join(','),'/');
    str = str.concat('1');
    this.router.navigate([str]);
  }
}
