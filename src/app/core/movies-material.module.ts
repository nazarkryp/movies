import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatRippleModule } from '@angular/material';

@NgModule({
    imports: [
        MatButtonModule,
        MatGridListModule,
        MatRippleModule,
    ],
    exports: [
        MatButtonModule,
        MatGridListModule,
        MatRippleModule
    ]
})
export class MoviesMaterialModule { }
