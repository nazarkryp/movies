import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'movies-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
    public signInWithGoogle() {
        location.href = 'https://localhost:44397/v1/account/authorize';
    }
}
