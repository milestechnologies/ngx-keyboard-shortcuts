import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DirectiveButtonDemo } from './components/directive-button-demo.component';
// import { ShortcutServiceDemoComponent } from './components/shortcut-service-demo.component';
import { BlacklistedShortcutsComponent } from './components/blacklisted-keys-demo.component';
// import { HelpDisplayDemoComponent } from './components/help-display-demo.component';
import { ComponentKeybindingDemoComponent } from './components/component-keybinding-demo.component';

const appRoutes: Routes = [
    {
        component: ComponentKeybindingDemoComponent,
        path: 'component-keybinding-demo'
    },
    {
        component: DirectiveButtonDemo,
        path: 'directive-button-demo'
    },
    // {
    //     component: ShortcutServiceDemoComponent,
    //     path: 'shortcut-service-demo'
    // },
    {
        component: BlacklistedShortcutsComponent,
        path: 'blacklisted-key-demo'
    },
    // {
    //     component: HelpDisplayDemoComponent,
    //     path: 'help-display-demo'
    // },
    {
        redirectTo: 'directive-button-demo',
        path: '**'
    }
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forRoot(appRoutes)]
})
export class AppRoutingModule {}
