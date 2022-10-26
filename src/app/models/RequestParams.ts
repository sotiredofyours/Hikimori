import { durationType, KindType, OrderType, ratingType } from "./AnimeTypes";

export interface RequestParams{
    page?: number,
    limit?: number,
    order?: OrderType,
    kind?: KindType,
    status?: string,
    season?: string,
    score?: number,
    duration?: durationType
    rating?: ratingType,
    consored?: boolean,
    ids?: number[],
    excludeIds?: number[],
    search?:string
}
