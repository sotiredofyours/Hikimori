import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { AnimeFromList } from "../../models/AnimeFromList";
import { RequestParams } from 'src/app/models/RequestParams';
import { AnimeInfo } from 'src/app/models/AnimeInfo';

const ANIMELISTURL = "https://shikimori.one/api/animes/";

@Injectable({
  providedIn: 'root'
})

export class AnimeDataService {

  constructor(private httpClient: HttpClient) { }

  getAnimeList(params: RequestParams): Observable<AnimeFromList[]> {
    return this.httpClient
      .get<AnimeFromList[]>(ANIMELISTURL, {params: params as HttpParams});
  }

  getAnimeById(id: number): Observable<AnimeInfo> {
    return this.httpClient
      .get<AnimeInfo>(`${ANIMELISTURL + id}`);
  }

  getSimilarAnime(id: number): Observable<AnimeFromList[]> {
    return this.httpClient
      .get<AnimeFromList[]>(`${ANIMELISTURL + id}/similar`);
  }
}

