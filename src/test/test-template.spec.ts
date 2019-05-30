import { BrowserModule } from '@angular/platform-browser';
import { async, TestBed } from '@angular/core/testing';
import {} from 'jasmine';

import { KeyboardShortcutsService } from '../keyboard-shortcut.service';

describe('KeyboardShortcutsTestTemplate', () => {
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
        it('should return true', () => {
            spyOn(console, 'log');
            service.goDoSomething();
            expect(console.log).toHaveBeenCalled();
        });
    });
});
