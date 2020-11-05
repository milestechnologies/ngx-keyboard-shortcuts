import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgxKeyboardShortcutModule } from 'ngx-keyboard-shortcuts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentKeybindingDemoComponent } from './components/component-keybinding-demo.component';
import { DirectiveButtonDemo } from './components/directive-button-demo.component';
import { BlacklistedShortcutsComponent } from './components/blacklisted-keys-demo.component';

import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';

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
        FooterComponent,
        HeaderComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        NgxKeyboardShortcutModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HighlightModule
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        {
            provide: HIGHLIGHT_OPTIONS,
            useValue: {
                languages: {
                    typescript: () =>
                        import('highlight.js/lib/languages/typescript'),
                    xml: () => import('highlight.js/lib/languages/xml')
                }
            }
        }
    ]
})
export class AppModule {}
