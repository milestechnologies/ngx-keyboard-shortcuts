import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { NgxKeyboardShortcutModule } from '../../../dist';

import { AppComponent } from './app.component';
import { DemoComponent } from './demo.component';
import { SingleKeybindingDemoComponent } from './components/single-keybinding-demo.component';
import { ShortcutServiceDemoComponent } from './components/shortcut-service-demo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectiveButtonDemo } from './components/directive-button-demo.component';
import { BlacklistedShortcutsComponent } from './components/blacklisted-keys-demo.component';

@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        DemoComponent,
        SingleKeybindingDemoComponent,
        ShortcutServiceDemoComponent,
        BlacklistedShortcutsComponent,
        DirectiveButtonDemo
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        NgxKeyboardShortcutModule.forRoot(),
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }]
})
export class AppModule {}
