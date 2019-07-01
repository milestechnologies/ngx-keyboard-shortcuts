import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    styleUrls: ['app.component.css'],
    template: `
        <div class="container">
            <nav class="navbar navbar-expand-sm navbar-dark bg-dark horizontal">
                <a class="navbar-brand" routerLink="/home">Demo App</a>
                <button
                    class="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span class="navbar-toggler-icon"></span>
                </button>
                <a class="nav-link" routerLink="/home">Home</a>
                <a class="nav-link" routerLink="/skd">single keybinding demo</a>
                <a class="nav-link" routerLink="/ssdc">shortcut service demo</a>
            </nav>
        </div>
        <br />
        <div class="router container">
            <router-outlet></router-outlet>
        </div>
    `
})
export class AppComponent {
    constructor() {}
}
