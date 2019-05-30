import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DemoComponent } from './demo.component';

const appRoutes: Routes = [
    {
        component: DemoComponent,
        path: 'home',
    },
    {
        component: DemoComponent,
        path: '**',
    },
];

@NgModule({
    exports: [RouterModule],
    imports: [
        RouterModule.forRoot(appRoutes, { onSameUrlNavigation: 'reload' }),
    ],
})
export class AppRoutingModule {}
