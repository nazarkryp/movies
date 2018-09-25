import { DataResponse } from 'app/models/response/data';

export interface IMapper<TSource, TResult> {
    mapFromResponse(response: TSource): TResult;
    mapFromResponseArray(response: TSource[]): TResult[];
}

export interface IDataResponseMapper<TSource, TResult> extends IMapper<TSource, TResult> {
    mapFromDataResponse(response: DataResponse<TSource>): TResult[];
}
