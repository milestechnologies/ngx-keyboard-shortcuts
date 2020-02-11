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

import { FooterComponent } from './footer.component';
import { HeaderComponent } from './header.component';

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
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgxKeyboardShortcutModule.forRoot()
    ],
    providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }]
})
export class AppModule {}
