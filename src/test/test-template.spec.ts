import { BrowserModule } from '@angular/platform-browser';
import { async, TestBed } from '@angular/core/testing';
import {} from 'jasmine';

describe('KeyboardShortcutsTestTemplate', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [],
            imports: [BrowserModule],
            providers: [],
        });
    }));

    // ================================================

    describe(':: testing methods', () => {
        it('should return true', () => {
            expect(true).toBe(true);
        });
    });
});
