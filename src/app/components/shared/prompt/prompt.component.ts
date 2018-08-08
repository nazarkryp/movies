import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Prompt } from 'app/models/common';

@Component({
    selector: 'movies-prompt',
    templateUrl: './prompt.component.html',
    styleUrls: ['./prompt.component.scss']
})
export class PromptComponent {
    constructor(
        private dialogRef: MatDialogRef<PromptComponent>,
        @Inject(MAT_DIALOG_DATA) public prompt: Prompt) {
        this.dialogRef.beforeClose().subscribe(result => {
            if (result === undefined) {
                this.dialogRef.close(false);
            }
        });
    }

    public submit() {
        this.dialogRef.close(true);
    }

    public cancel() {
        this.dialogRef.close(false);
    }
}
