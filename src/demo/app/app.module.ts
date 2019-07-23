import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { NgxKeyboardShortcutModule } from '../../../dist';

import { AppComponent } from './app.component';
import { ComponentKeybindingDemoComponent } from './components/component-keybinding-demo.component';
// import { ShortcutServiceDemoComponent } from './components/shortcut-service-demo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectiveButtonDemo } from './components/directive-button-demo.component';
import { BlacklistedShortcutsComponent } from './components/blacklisted-keys-demo.component';

import { HighlightModule } from 'ngx-highlightjs';

import xml from 'highlight.js/lib/languages/xml';
import typescript from 'highlight.js/lib/languages/typescript';
// import { HelpDisplayDemoComponent } from './components/help-display-demo.component';
import { FooterComponent } from './footer.component';
import { HeaderComponent } from './header.component';

export function hljsLanguages(): any {
    return [
        { name: 'typescript', func: typescript },
        { name: 'xml', func: xml }
    ];
}

@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        ComponentKeybindingDemoComponent,
        // ShortcutServiceDemoComponent,
        BlacklistedShortcutsComponent,
        DirectiveButtonDemo,
        // HelpDisplayDemoComponent,
        FooterComponent,
        HeaderComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        NgxKeyboardShortcutModule.forRoot(),
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HighlightModule.forRoot({
            languages: hljsLanguages
        })
    ],
    providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }]
})
export class AppModule {}
