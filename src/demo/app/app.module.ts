import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DemoComponent } from './demo.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
    bootstrap: [AppComponent],
    declarations: [AppComponent, DemoComponent],
    imports: [BrowserModule, HttpClientModule, AppRoutingModule],
    providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
})
export class AppModule {}
