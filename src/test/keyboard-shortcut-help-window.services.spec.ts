
import { Component, ViewContainerRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { } from 'jasmine';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { KeyboardShortcutHelpWindowService } from '../keyboard-shortcut-help-window.service';
import { KeyboardShortcutsService } from '../keyboard-shortcut.service';
import { KeyboardKeys } from '../libraries/listener.library';

@Component({
    template: ``,
})
class MockWindowServiceComponent {
    constructor(public viewContainerRef: ViewContainerRef) {
    }

}

describe('KeyboardShortcutHelpWindowService', () => {

    let service: KeyboardShortcutHelpWindowService;
    let fixture: ComponentFixture<MockWindowServiceComponent>;
    let component: MockWindowServiceComponent;
    let keyboardShortcutsService: KeyboardShortcutsService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                MockWindowServiceComponent,
            ],
            imports: [
                BrowserModule, SweetAlert2Module.forRoot(),
            ],
            providers: [
                KeyboardShortcutHelpWindowService, KeyboardShortcutsService,
            ],
        });
        service = TestBed.get(KeyboardShortcutHelpWindowService);
        keyboardShortcutsService = TestBed.get(KeyboardShortcutsService);
        fixture = TestBed.createComponent(MockWindowServiceComponent);
        component = fixture.componentInstance;
    }));

    // ===================================================

    describe(':: testing Methods/Properties', () => {

        describe(':: showHelpWindow', () => {

            it('should return a Help Window when swallinstance is set and listener registered', () => {
                service.setViewContainerRef(component.viewContainerRef);
                keyboardShortcutsService.listen({ keyBinding: [KeyboardKeys.Ctrl, 'j'], handler: () => '', description: '' });
                spyOn(service.swalInstance, 'show');
                service.showHelpWindow();
                expect(service.swalInstance.show).toHaveBeenCalled();
            });
            it('should not return a Help Window when swallinstance is set', () => {
                spyOn(console, 'warn');
                service.showHelpWindow();
                expect(console.warn).toHaveBeenCalledWith('KeyboardShortcutHelpWindowService: Failed to show help window since swalInstance was not found.  Ensure setViewContainerRef has been called');
            });
        });

        describe(':: helpWindowAvailable', () => {
            it('should return true when setViewContainerRef has been called', () => {
                service.setViewContainerRef(component.viewContainerRef);
                spyOn(service, 'helpWindowAvailable');
                expect(service.helpWindowAvailable).toBe(true);
            });
            it('should return false when setViewContainerRef has not been called', () => {
                spyOn(service, 'helpWindowAvailable');
                expect(service.helpWindowAvailable).toBe(false);
            });
        });

        describe(':: setViewContainer', () => {
            it('keyboardShortcutsService.listen should be called the first time', () => {
                spyOn(keyboardShortcutsService, 'listen');
                service.setViewContainerRef(component.viewContainerRef);
                expect(keyboardShortcutsService.listen).toHaveBeenCalled();
            });
            it('keyboardShortcutsService.listen should not be called the second time', () => {
                service.setViewContainerRef(component.viewContainerRef);
                spyOn(keyboardShortcutsService, 'listen');
                service.setViewContainerRef(component.viewContainerRef);
                expect(keyboardShortcutsService.listen).not.toHaveBeenCalled();
            });
        });

    });
});
