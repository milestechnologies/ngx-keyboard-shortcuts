import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    template: `
        <app-header></app-header>
        <br />
        <div class="router container">
            <router-outlet></router-outlet>
        </div>
        <app-footer></app-footer>
    `
})
export class AppComponent {
    constructor() {}
}
