import { Injectable } from '@angular/core';

import { IMapper } from './mapper';
import { ModelResponse } from 'app/models/response';
import { Model } from 'app/models/view';

@Injectable({
    providedIn: 'root'
})
export class ModelMapper implements IMapper<ModelResponse, Model> {
    constructor(
    ) { }

    public mapFromResponse(response: ModelResponse): Model {
        const model = new Model();

        model.modelId = response.modelId;
        model.name = response.name;

        return model;
    }

    public mapFromResponseArray(responseArray: ModelResponse[]): Model[] {
        return responseArray.map(response => this.mapFromResponse(response));
    }
}
