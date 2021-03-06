import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlSerializer } from '@angular/router';

import { MoviesComponent } from 'app/components/movies/movies.component';
import { MovieDetailsComponent } from 'app/components/movie-details/movie-details.component';
import { LowerCaseUrlSerializer } from 'app/core/serializers';
import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';

const routes: Routes = [
    {
        path: 'recent/:page',
        component: MoviesComponent
    },
    {
        path: 'scene/:movieId',
        component: MovieDetailsComponent
    },
    {
        path: '404',
        component: PageNotFoundComponent
    },
    {
        path: '**',
        redirectTo: 'recent/1'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        {
            provide: UrlSerializer,
            useClass: LowerCaseUrlSerializer
        }
    ]
})
export class MoviesRoutingModule { }
