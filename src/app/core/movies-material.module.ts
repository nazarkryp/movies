import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRippleModule } from '@angular/material';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
    imports: [
        MatButtonModule,
        MatGridListModule,
        MatRippleModule,
        MatProgressBarModule
    ],
    exports: [
        MatButtonModule,
        MatGridListModule,
        MatRippleModule,
        MatProgressBarModule
    ]
})
export class MoviesMaterialModule { }
