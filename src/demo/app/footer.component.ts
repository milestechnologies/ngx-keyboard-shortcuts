import { Component } from '@angular/core';

@Component({
    selector: 'app-footer',
    template: `
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
export class FooterComponent {
    constructor() {}
}
