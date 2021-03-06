import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MoviesMaterialModule, MoviesRoutingModule } from 'app/core';

import { MoviesLayoutComponent } from 'app/layout/movies-layout.component';
import { MoviesComponent } from 'app/components/movies/movies.component';
import { HeaderComponent } from 'app/components/header/header.component';
import { MovieDetailsComponent } from 'app/components/movie-details/movie-details.component';
import { PaginationComponent } from 'app/components/shared/pagination/pagination.component';

import { TruncatePipe } from 'app/pipes/truncate.pipe';

import { StoreModule, ActionReducerMap } from '@ngrx/store';
import { movieReducer } from 'app/movies/infrastructure/state';
import { MovieDialogComponent } from '../components/shared/movie-dialog/movie-dialog.component';
import { PromptComponent } from '../components/shared/prompt/prompt.component';
import { SigninComponent } from '../components/signin/signin.component';
import { MovieItemComponent } from '../components/shared/movie-item/movie-item.component';
import { PreviewComponent } from '../components/shared/preview/preview.component';

export const reducers: ActionReducerMap<any> = {
    movies: movieReducer
};

@NgModule({
    declarations: [
        MoviesComponent,
        MovieDetailsComponent,
        TruncatePipe,
        PaginationComponent,
        MovieDialogComponent,
        PromptComponent,
        SigninComponent,
        MovieItemComponent,
        PreviewComponent,
    ],
    entryComponents: [
        MovieDialogComponent,
        PromptComponent,
        PreviewComponent,
        SigninComponent
    ],
    imports: [
        MoviesRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MoviesMaterialModule,
        FlexLayoutModule,
        StoreModule.forFeature('movies', movieReducer)
    ],
    providers: []
})
export class MoviesModule { }
