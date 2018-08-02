import { MovieAction } from './action';
import * as fromRoot from '../../../state/app.state';
import { StudioPage } from '../../../models/view/studio-page';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface State extends fromRoot.State {
    movies: MovieState;
}

export interface MovieState {
    movies: StudioPage;
}

const getMoviesFeatureState = createFeatureSelector<MovieState>('movies');

export const getMoviesPage = createSelector(
    getMoviesFeatureState,
    state => state.movies
);

// const initialState: MovieState = {
//     movies: {
//         currentPage: 1,
//         data: [],
//         pagesCount: 0,
//         pageSize: 0,
//         studio: null,
//         total: 0
//     }
// };

const initialState: MovieState = {
    movies: null
};

export function reducer(state = initialState, action): MovieState {
    switch (action.type) {
        case MovieAction.SET_MOVIES:
            return {
                ...state,
                movies: action.payload
            };
        default:
            return state;
    }
}
