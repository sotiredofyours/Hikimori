import { HttpClientModule } from '@angular/common/http';
import { TestBed,waitForAsync } from '@angular/core/testing';
import { DurationType, KindType } from 'src/app/models/AnimeTypes';
import { AnimeDataService } from './anime-data.service';

describe('AnimeListService', () => {
  let service: AnimeDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [AnimeDataService]
    });
    service = TestBed.inject(AnimeDataService);
  });

  it('SHIKIMORI API - should be created', () => {
    expect(service).toBeTruthy();
  });

  it('SHIKIMORI API - should return 50 animes', waitForAsync(() => {
    service.getAnimeList({ limit: 50 }).subscribe(animeList => expect(animeList.length === 50).toBeTrue());
  }));

  it('SHIKIMORI API - should return animes with score >= 8.0', waitForAsync(() => {
    service.getAnimeList({ score: 8.0 }).subscribe(animeList => {
      animeList.map((anime) => expect(anime.score >= "8.0").toBeTrue());
    });

  }));

  it('SHIKIMORI API - should return animes with kind tv', waitForAsync(() => {
    service.getAnimeList({ kind: KindType.tv }).subscribe(animeList => {
      animeList.map((anime) => expect(anime.kind === "tv").toBeTrue());
    })
  }));

  it('SHIKIMORI API - should return animes with duration S', waitForAsync(() => {
    service.getAnimeList({duration:DurationType.S, limit: 3}).subscribe(animeList => {
      animeList.map((anime) => service.getAnimeById(anime.id).subscribe( (a) => expect(a.duration <= 10).toBeTrue()))
   });
  }));


});
