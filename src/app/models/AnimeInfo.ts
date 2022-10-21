import { ratingType } from "./AnimeTypes";

export interface AnimeInfo {
    id: number,
    name: string,
    russian: string,
    url: string,
    kind: string,
    score: string,
    status: string,
    episodes: number,
    episodesAired: number,
    aired_on: Date,
    released_on: Date,
    rating: ratingType,
    english: string[],
    japanese: string[],
    synonyms: string[],
    duration: number,
    description: string,
    ongoing: boolean
}
