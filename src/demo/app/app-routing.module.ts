import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SingleKeybindingDemoComponent } from './components/single-keybinding-demo.component';
import { DirectiveButtonDemo } from './components/directive-button-demo.component';
import { ShortcutServiceDemoComponent } from './components/shortcut-service-demo.component';
import { BlacklistedShortcutsComponent } from './components/blacklisted-keys-demo.component';

const appRoutes: Routes = [
    {
        component: SingleKeybindingDemoComponent,
        path: 'single-keybinding-demo'
    },
    {
        component: DirectiveButtonDemo,
        path: 'directive-button-demo',
    },
    {
        component: ShortcutServiceDemoComponent,
        path: 'shortcut-service-demo'
    },
    {
        component: BlacklistedShortcutsComponent,
        path: 'blacklisted-key-demo'
    },
    {
        redirectTo: 'directive-button-demo',
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
