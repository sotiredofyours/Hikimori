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
    let reqParams = new HttpParams();
    let keys = Object.keys(params);
    let values = Object.values(params);
    for (let i = 0; i < keys.length; i++) {
      reqParams = reqParams.append(keys[i].toString(), values[i]);
    }

    return this.httpClient
      .get<AnimeFromList[]>(ANIMELISTURL, {params: reqParams});
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

