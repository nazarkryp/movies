import { Page } from '../common/page';
import { MovieResponse } from './movie.response';
import { StudioResponse } from './studio.response';

export class StudioPageResponse extends Page<MovieResponse> {
    public studio: StudioResponse;
}
