import { Component } from '@angular/core';

@Component({
    selector: 'app-header',
    template: `
        <nav class="navbar navbar-expand-sm navbar-dark bg-primary">
            <div class="container">
                <div class="navbar-expand mr-auto navbar-nav">
                    <a class="navbar-brand" routerLink="/home"
                        >Keyboard Shortcuts Demo</a
                    >
                    <a
                        class="nav-link"
                        routerLink="/directive-button-demo"
                        routerLinkActive="active"
                        >Directive</a
                    >
                    <a
                        class="nav-link"
                        routerLink="/single-keybinding-demo"
                        routerLinkActive="active"
                        >Single Keybinding</a
                    >
                    <a
                        class="nav-link"
                        routerLink="/shortcut-service-demo"
                        routerLinkActive="active"
                        >Service</a
                    >
                    <a
                        class="nav-link"
                        routerLink="/blacklisted-key-demo"
                        routerLinkActive="active"
                        >Blacklisted Keys</a
                    >
                    <a
                        class="nav-link"
                        routerLink="/help-display-demo"
                        routerLinkActive="active"
                        >Help Display</a
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
    `
})
export class HeaderComponent {
    constructor() {}
}
