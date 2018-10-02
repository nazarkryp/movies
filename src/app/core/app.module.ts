import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { NgProgressModule } from '@ngx-progressbar/core';

import { MoviesMaterialModule, MoviesRoutingModule } from '.';

import { MoviesLayoutComponent } from '../layout/movies-layout.component';
import { HeaderComponent } from '../components/header/header.component';

import { StudioListComponent } from '../components/movies-studios-filter/movies-studios-filter.component';

import { StoreModule } from '@ngrx/store';

import { MoviesModule } from './movies.module';
import { AuthenticationInterceptor } from '../services/interceptors';
import { userReducer } from './security/state';
import { CategoriesFilterComponent } from '../components/shared/categories-filter/categories-filter.component';


@NgModule({
    declarations: [
        MoviesLayoutComponent,
        HeaderComponent,
        StudioListComponent,
        CategoriesFilterComponent
    ],
    imports: [
        BrowserModule,
        MoviesRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MoviesMaterialModule,
        HttpClientModule,
        FlexLayoutModule,
        MoviesModule,
        StoreModule.forRoot({
            user: userReducer
        }),
        NgProgressModule.forRoot()
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthenticationInterceptor,
            multi: true
        }
    ],
    bootstrap: [MoviesLayoutComponent]
})
export class AppModule { }
