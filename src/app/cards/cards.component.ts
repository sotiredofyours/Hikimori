import {Component, OnInit} from '@angular/core';
import {AnimeFromList} from "../models/AnimeFromList";
import {AnimeDataService} from "../services/ShikimoriAPI/anime-data.service";
import {OrderType} from "../models/AnimeTypes";
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

@Component({
	selector: 'app-cards',
	templateUrl: './cards.component.html',
	styleUrls: ['./cards.component.css']
})


export class CardsComponent implements OnInit {
  titleName: string = 'Лучшие аниме';
	animes: AnimeFromList[] = [];
  nextPage: AnimeFromList[] = [];
	page!: number;

  isAnons:boolean = false;
  isOngoing:boolean = false;
  isReleased:boolean = false;


	constructor(private animeDataService: AnimeDataService, private route: ActivatedRoute, private router:Router) { }

	ngOnInit(): void {
		this.page = Number(this.route.snapshot.paramMap.get('page'));
		this.getAnimeFromList();
    this.router.events.subscribe(val =>{
      if (val instanceof NavigationEnd){
        this.getAnimeFromList();
      }
    })
	}

	getAnimeFromList(): void {
		this.animeDataService.getAnimeList({limit:50, order:OrderType.ranked, page:this.page})
			.subscribe({ next: (data: AnimeFromList[]) => this.animes = data });
    this.animeDataService.getAnimeList({limit:50, order:OrderType.ranked, page:this.page+1})
      .subscribe({next: (data: AnimeFromList[]) => this.nextPage = data});
	}

	pageUp(): void{
		this.router.navigate(['/animes', ++this.page]);
	}

	pageDown():void{
		this.router.navigate(['/animes', --this.page]);
	}

}
