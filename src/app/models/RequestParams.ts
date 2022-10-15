import { durationType, KindType, OrderType, ratingType, statusType } from "./AnimeTypes";

export interface RequestParams{
    page?: number,
    limit?: number,
    order?: OrderType,
    kind?: KindType,
    status?: statusType,
    season?: string,
    score?: number,
    duration?: durationType
    rating?: ratingType,
    consored?: boolean,
    ids?: number[],
    excludeIds?: number[],
    search?:string
}
