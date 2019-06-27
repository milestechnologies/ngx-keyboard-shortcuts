import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DemoComponent } from './demo.component';
import { SingleKeybindingDemoComponent } from './components/single-keybinding-demo.component';
import { ShortcutServiceDemoComponent } from './components/shortcut-service-demo.component';

const appRoutes: Routes = [
    {
        component: DemoComponent,
        path: 'home'
    },
    {
        component: SingleKeybindingDemoComponent,
        path: 'skd'
    },
    {
        component: ShortcutServiceDemoComponent,
        path: 'ssdc'
    },
    {
        component: DemoComponent,
        path: '**'
    }
];

@NgModule({
    exports: [RouterModule],
    imports: [
        RouterModule.forRoot(appRoutes) // { onSameUrlNavigation: 'reload' } do we need this?
    ]
})
export class AppRoutingModule {}
