
export interface RequestParams{
    page?: number,
    limit?: number,
    order?: string,
    kind?: string,
    status?: string,
    season?: string,
    score?: string,
    duration?: string,
    rating?: string,
    consored?: boolean,
    ids?: number[],
    excludeIds?: number[],
    search?:string
}
