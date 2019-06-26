import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
        <a class="navbar-brand" routerLink="/home">Miles Technologies</a>
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
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <a class="nav-link" routerLink="/wikiRedirect">Git Wiki</a>
              <a class="nav-link" routerLink="/repoRedirect">Git Repo</a>
            </li>
          </ul>
        </div>
        <form class="form-search" method="get" id="s" action="/">
          <div class="input-append">
            <input
              type="text"
              class="input-medium search-query"
              name="s"
              placeholder="Search"
              value=""
            />
            <button type="submit" class="add-on">
              <i class="glyphicon glyphicon-search"></i>
            </button>
          </div>
        </form>
      </nav>
    </div>
    <br />
    <div class="router container">
      <router-outlet></router-outlet>
    </div>
  `,
})
export class AppComponent {
  constructor() {}
}
