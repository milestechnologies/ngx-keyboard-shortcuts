import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { NgxKeyboardShortcutModule } from '../../../dist';

import { AppComponent } from './app.component';
import { DemoComponent } from './demo.component';
import { SingleKeybindingDemoComponent } from './components/single-keybinding-demo.component';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [AppComponent, DemoComponent, SingleKeybindingDemoComponent],
  imports: [BrowserModule, HttpClientModule, NgxKeyboardShortcutModule.forRoot(), AppRoutingModule],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }]
})
export class AppModule {}
