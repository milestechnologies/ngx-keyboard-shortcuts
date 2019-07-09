import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import {} from 'jasmine';

import { KeyboardShortcutService } from '../keyboard-shortcut.service';
import { KeyboardShortcutDirective } from '../keyboard-shortcut.directive';
import {
    IKeyboardShortcutListenerOptions,
    KeyboardKeys
} from '../libraries/listener.library';

@Component({
    template: `
        <a
            *ngIf="haveElement"
            (click)="onClick()"
            [keyboardShortcut]="keyboardShortcut"
        ></a>
    `
})
class TestKeyboardShortcutDirectiveComponent {
    keyboardShortcut: IKeyboardShortcutListenerOptions = {
        description: 'close',
        keyBinding: [KeyboardKeys.Alt, 'C']
    };

    haveElement = true;

    onClick(): void {}
}

describe('KeyboardShortcutDirective', () => {
    let service: KeyboardShortcutService;
    let fixture: ComponentFixture<TestKeyboardShortcutDirectiveComponent>;
    let component: TestKeyboardShortcutDirectiveComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                TestKeyboardShortcutDirectiveComponent,
                KeyboardShortcutDirective
            ],
            imports: [BrowserModule],
            providers: [KeyboardShortcutService]
        });

        service = TestBed.get(KeyboardShortcutService);
        fixture = TestBed.createComponent(
            TestKeyboardShortcutDirectiveComponent
        );
        component = fixture.componentInstance;
    }));

    // ================================================

    describe(':: testing shortcut', () => {
        beforeEach(async(() => {
            fixture.detectChanges();
        }));

        it('should click when combination matches', () => {
            spyOn(component, 'onClick');
            const event = <KeyboardEvent>{ altKey: true, key: 'C' };
            service.sendKeyboardEventToHandler(event);
            expect(component.onClick).toHaveBeenCalled();
        });

        it('should not click when combination does not match', () => {
            spyOn(component, 'onClick');
            const event = <KeyboardEvent>{ altKey: true, key: 'Z' };
            service.sendKeyboardEventToHandler(event);
            expect(component.onClick).not.toHaveBeenCalled();
        });

        it('should remove listener when element is removed', () => {
            const startingCount = service.listeners_read_only.length;
            expect(startingCount).toBe(1);
            component.haveElement = false;
            fixture.detectChanges();
            const endingCount = service.listeners_read_only.length;
            expect(endingCount).toBe(0);
        });
    });
});
