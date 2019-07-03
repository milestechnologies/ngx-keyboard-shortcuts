import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    styleUrls: ['app.component.css'],
    template: `
        <nav class="navbar navbar-expand-sm navbar-dark bg-primary">
            <div class="container">
                <div class="navbar-expand mr-auto navbar-nav">
                    <a class="navbar-brand" routerLink="/home"
                        >ngx-keyboard-shortcuts</a
                    >
                    <a
                        class="nav-link"
                        routerLink="/directive-button-demo"
                        routerLinkActive="active"
                        >directive</a
                    >
                    <a
                        class="nav-link"
                        routerLink="/single-keybinding-demo"
                        routerLinkActive="active"
                        >single keybinding</a
                    >
                    <a
                        class="nav-link"
                        routerLink="/shortcut-service-demo"
                        routerLinkActive="active"
                        >service</a
                    >
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
                </div>
            </div>
        </nav>
        <br />
        <div class="router container">
            <router-outlet></router-outlet>
        </div>
        <nav
            class="navbar navbar-expand-sm navbar-dark bg-primary fixed-bottom"
        >
            <div class="container">
                <div class="navbar-expand ml-auto navbar-nav">
                    <div class="navbar-text">
                        authored by
                        <a
                            target="_blank"
                            href="https://www.milestechnologies.com/software-development"
                            >Miles Technologies</a
                        >
                    </div>

                    <a
                        class="nav-link"
                        href="https://github.com/milestechnologies"
                        target="_blank"
                    >
                        <i class="fa fa-github"></i>
                    </a>
                    <a
                        class="nav-link"
                        href="https://twitter.com/milestech"
                        target="_blank"
                    >
                        <i class="fa fa-twitter"></i>
                    </a>
                </div>
            </div>
        </nav>
    `
})
export class AppComponent {
    constructor() {}
}
