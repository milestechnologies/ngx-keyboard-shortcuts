import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { DemoComponent } from './demo.component';
import { AppComponent } from './app.component';

const appRoutes: Routes = [
  {
    component: DemoComponent,
    path: 'home'
  },
  {
    component: AppComponent,
    path: 'wikiRedirect',
    resolve: {
      url: 'externalUrlRedirectResolver'
    },
    data: {
      externalUrl:
        'https://github.com/milestechnologies/ngx-keyboard-shortcuts/wiki'
    }
  },
  {
    component: AppComponent,
    path: 'repoRedirect',
    resolve: {
      url: 'externalUrlRedirectResolver'
    },
    data: {
      externalUrl: 'https://github.com/milestechnologies/ngx-keyboard-shortcuts'
    }
  },
  {
    component: DemoComponent,
    path: '**'
  }
];

@NgModule({
  providers: [
    {
      provide: 'externalUrlRedirectResolver',
      useValue: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        window.location.href = (route.data as any).externalUrl;
      }
    }
  ],
  exports: [RouterModule],
  imports: [RouterModule.forRoot(appRoutes, { onSameUrlNavigation: 'reload' })]
})
export class AppRoutingModule {}
