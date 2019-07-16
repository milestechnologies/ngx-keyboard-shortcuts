import {
    KeyboardKeys,
    KeyboardShortcutCombination,
    mapKeyboardShortcutCombination,
    IKeyboardShortcutListener
} from './listener.library';

export const blacklistedKeyCombinations = [
    [KeyboardKeys.Ctrl, 'd'], // bookmark
    [KeyboardKeys.Ctrl, 'f'], // find
    [KeyboardKeys.Ctrl, 'g'], // find next
    [KeyboardKeys.Ctrl, KeyboardKeys.Shift, 'g'], // find previous
    [KeyboardKeys.Ctrl, 'h'], // history
    [KeyboardKeys.Ctrl, 'j'], // downloads
    [KeyboardKeys.Ctrl, 'o'], // open file
    [KeyboardKeys.Ctrl, 's'], // save
    [KeyboardKeys.Ctrl, 'p'], // print
    [KeyboardKeys.Ctrl, 'u'], // view source
    [KeyboardKeys.Ctrl, 'n'], // open in new window
    [KeyboardKeys.Ctrl, 't'], // open in new tab
    [KeyboardKeys.Ctrl, KeyboardKeys.Shift, 't'], // open recently closed tab
    [KeyboardKeys.Ctrl, 'c'], // copy
    [KeyboardKeys.Ctrl, 'x'], // cut
    [KeyboardKeys.Ctrl, 'v'], // paste
    [KeyboardKeys.Alt, 'f'], // show menu bar
    [KeyboardKeys.Ctrl, '0'], // default zoom level
    [KeyboardKeys.Ctrl, '1'], // goes to tab 1y
    [KeyboardKeys.Ctrl, '2'], // goes to tab 2
    [KeyboardKeys.Ctrl, '3'], // goes to tab 3
    [KeyboardKeys.Ctrl, '4'], // goes to tab 4
    [KeyboardKeys.Ctrl, '5'], // goes to tab 5
    [KeyboardKeys.Ctrl, '6'], // goes to tab 6
    [KeyboardKeys.Ctrl, '7'], // goes to tab 7
    [KeyboardKeys.Ctrl, '8'], // goes to tab 8
    [KeyboardKeys.Ctrl, '9'], // goes to tab 9
    [KeyboardKeys.Shift, '1'], // character key
    [KeyboardKeys.Shift, '2'], // character key
    [KeyboardKeys.Shift, '3'], // character key
    [KeyboardKeys.Shift, '4'], // character key
    [KeyboardKeys.Shift, '5'], // character key
    [KeyboardKeys.Shift, '6'], // character key
    [KeyboardKeys.Shift, '7'], // character key
    [KeyboardKeys.Shift, '8'], // character key
    [KeyboardKeys.Shift, '9'], // character key
    [KeyboardKeys.Shift, '0'], // character key
    [KeyboardKeys.Escape], // stop
    [KeyboardKeys.Ctrl, 'tab'], // switch to next tab
    [KeyboardKeys.Ctrl, KeyboardKeys.Shift, 'tab'], // switch to previous tab
    [KeyboardKeys.Ctrl, 'w'], // close current tab
    [KeyboardKeys.Alt, '4'], // close current window
    [KeyboardKeys.Alt, 'arrowleft'], // back
    [KeyboardKeys.Alt, 'backspace'], // back
    [KeyboardKeys.Ctrl, KeyboardKeys.Shift, 'delete'] // open the clear browsing history window
];

export class BlackListedKeyboardShortcutChecker {
    private blackListedKeyBindings: KeyboardShortcutCombination[] = blacklistedKeyCombinations;
    private mappedBlackListedKeyBindings = this.blackListedKeyBindings.map(
        (blkb) => mapKeyboardShortcutCombination(blkb)
    );

    check(listener: IKeyboardShortcutListener): void {
        // this is where the test was deleted
        for (let blkb of this.mappedBlackListedKeyBindings) {
            if (blkb === listener.mappedKeyboardShortcutCombination) {
                const warningMessage = `Keyboard Shortcut [${
                    listener.displayShortcutCombination
                }] is blacklisted as a common keyboard shortcut.  Consider changing your keybinding for this shortcut.`;
                console.warn(warningMessage);
                return;
            }
        }
    }
}
