import { Injectable } from '@angular/core';

import { StudioResponse } from 'app/models/response';
import { Studio } from 'app/models/view';
import { IDataResponseMapper } from './mapper';
import { DataResponse } from '../models/response/data';

@Injectable({
    providedIn: 'root'
})
export class StudioMapper implements IDataResponseMapper<StudioResponse, Studio> {
    public mapFromResponse(response: StudioResponse): Studio {
        const studio = new Studio();

        studio.studioId = response.studioId;
        studio.name = response.name;

        return studio;
    }

    public mapFromDataResponse(studioResponse: DataResponse<StudioResponse>): Studio[] {
        return studioResponse.data.map(response => this.mapFromResponse(response));
    }

    public mapFromResponseArray(studioResponse: StudioResponse[]): Studio[] {
        return studioResponse.map(response => this.mapFromResponse(response));
    }
}
