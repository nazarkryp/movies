import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Movie } from 'app/models/view';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { PromptService } from 'app/services/prompt.service';
import { Prompt } from '../../../models/common';
import { filter } from 'rxjs/operators';
import { merge } from 'rxjs';
import { environment } from 'environments/environment';

@Component({
    selector: 'movies-movie-dialog',
    templateUrl: './movie-dialog.component.html',
    styleUrls: ['./movie-dialog.component.scss']
})
export class MovieDialogComponent implements OnInit {
    @ViewChild('video')
    private video: any;

    public title = environment.title;
    public uri = environment.uri;

    constructor(
        private dialogRef: MatDialogRef<MovieDialogComponent>,
        private promptService: PromptService,
        @Inject(MAT_DIALOG_DATA) public movie: Movie) {
        this.dialogRef.disableClose = true;
    }

    public play() {
        if (this.video.nativeElement.paused) {
            this.video.nativeElement.play();
        } else {
            this.video.nativeElement.pause();
        }
    }

    public ngOnInit() {
        const escapeEvents = this.dialogRef.keydownEvents().pipe(filter(e => e.key === 'Escape'));

        merge(escapeEvents, this.dialogRef.backdropClick())
            .subscribe(() => {
                const prompt = new Prompt('Closing video', 'Are you sure you want to close video?');
                const paused = !this.video.nativeElement.paused;
                this.video.nativeElement.pause();

                this.promptService.prompt(prompt)
                    .subscribe((result) => {
                        if (result) {
                            this.dialogRef.close();
                        } else if (paused) {
                            this.video.nativeElement.play();
                        }
                    });
            });
    }
}
