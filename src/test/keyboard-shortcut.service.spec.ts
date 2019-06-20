import { BrowserModule } from '@angular/platform-browser';
import { async, TestBed } from '@angular/core/testing';
import { } from 'jasmine';

import { KeyboardShortcutsService } from '../keyboard-shortcut.service';
import { KeyboardKeys, KeyboardShortcutCombination } from '../libraries/listener.library';

describe('KeyboardShortcutService', () => {

    let service: KeyboardShortcutsService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
            ],
            imports: [
                BrowserModule,
            ],
            providers: [
                KeyboardShortcutsService,
            ],
        });
        service = TestBed.get(KeyboardShortcutsService);
    }));

    // ================================================

    describe(':: testing methods', () => {

        describe(':: listen', () => {

            it('should return an IListenerHandle', () => {
                const answer = service.listen({keyBinding: [], handler: () => '', description: ''});
                const isIListenerHandle = answer.remove ? true : false;
                expect(isIListenerHandle).toBe(true);
            });

            it('should add a listener to the collection', () => {
                const startingCount = service.listeners_read_only.length;
                expect(startingCount).toBe(0);
                service.listen({keyBinding: [], handler: () => '', description: ''});
                const endingCount = service.listeners_read_only.length;
                expect(endingCount).toBe(1);
            });

            it('should warn if keyBinding is black listed', () => {
                spyOn(console, 'warn');
                service.listen({keyBinding: [KeyboardKeys.Ctrl, 'c'], handler: () => '', description: ''});
                expect(console.warn).toHaveBeenCalled();
            });

            it('should not warn if keyBinding is not black listed', () => {
                spyOn(console, 'warn');
                service.listen({keyBinding: [KeyboardKeys.Ctrl, KeyboardKeys.Alt, 'x'], handler: () => '', description: ''});
                expect(console.warn).not.toHaveBeenCalled();
            });

        });

        describe(':: remove', () => {

            it('should remove a listener from the collection', () => {
                const startingCount = service.listeners_read_only.length;
                expect(startingCount).toBe(0);
                const answer = service.listen({keyBinding: [], handler: () => '', description: ''});
                const afterAddingCount = service.listeners_read_only.length;
                expect(afterAddingCount).toBe(1);
                answer.remove();
                const endingCount = service.listeners_read_only.length;
                expect(endingCount).toBe(0);
            });

        });

    });

    describe(':: testing handleKeyboardEvent', () => {

        it('should trigger the handler when key event matches', () => {
            const keyCombination: KeyboardShortcutCombination = [KeyboardKeys.Alt, 'C'];
            let result = null;
            service.listen({keyBinding: keyCombination, handler: () => result = true, description: ''});
            const event = <KeyboardEvent>{ altKey: true, key: 'C' };
            service.sendKeyboardEventToHandler(event);
            expect(result).not.toBeNull();
        });

        it('should not trigger the handler when key event does not match', () => {
            const keyCombination: KeyboardShortcutCombination = [KeyboardKeys.Alt, 'C'];
            let result = null;
            service.listen({keyBinding: keyCombination, handler: () => result = true, description: ''});
            const event = <KeyboardEvent>{ altKey: true, key: 'Z' };
            service.sendKeyboardEventToHandler(event);
            expect(result).toBeNull();
        });

        describe(':: when multiple matches', () => {

            it('should trigger the higher priority listener and no others when passToLowerPriorities false ', () => {
                const keyCombination: KeyboardShortcutCombination = [KeyboardKeys.Alt, 'C'];
                let higherPriorityResult = null;
                let lowerPriorityResult = null;
                service.listen({keyBinding: keyCombination, handler: () => higherPriorityResult = true, description: '', priority: 100, passToLowerPriorities: false});
                service.listen({keyBinding: keyCombination, handler: () => lowerPriorityResult = true, description: ''});
                const event = <KeyboardEvent>{ altKey: true, key: 'C' };
                service.sendKeyboardEventToHandler(event);
                expect(higherPriorityResult).not.toBeNull();
                expect(lowerPriorityResult).toBeNull();
            });

            it('should trigger the higher priority listener and lower when passToLowerPriorities true ', () => {
                const keyCombination: KeyboardShortcutCombination = [KeyboardKeys.Alt, 'C'];
                let higherPriorityResult = null;
                let lowerPriorityResult = null;
                service.listen({keyBinding: keyCombination, handler: () => higherPriorityResult = true, description: '', priority: 100, passToLowerPriorities: true});
                service.listen({keyBinding: keyCombination, handler: () => lowerPriorityResult = true, description: ''});
                const event = <KeyboardEvent>{ altKey: true, key: 'C' };
                service.sendKeyboardEventToHandler(event);
                expect(higherPriorityResult).not.toBeNull();
                expect(lowerPriorityResult).not.toBeNull();
            });

        });

    });

});
