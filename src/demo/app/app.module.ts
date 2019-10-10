import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgxKeyboardShortcutModule } from '../../../dist';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentKeybindingDemoComponent } from './components/component-keybinding-demo.component';
import { DirectiveButtonDemo } from './components/directive-button-demo.component';
import { BlacklistedShortcutsComponent } from './components/blacklisted-keys-demo.component';
import { ShortcutsListDemo } from './components/shortcuts-list-demo.component';

import { HighlightModule } from 'ngx-highlightjs';

import xml from 'highlight.js/lib/languages/xml';
import typescript from 'highlight.js/lib/languages/typescript';
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
        BlacklistedShortcutsComponent,
        DirectiveButtonDemo,
        ShortcutsListDemo,
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
