import {
    KeyboardKeys,
    KeyboardShortcutCombination,
    mapKeyboardShortcutCombination,
    IKeyboardShortcutListener
} from './listener.library';

export const blacklistedKeyCombinations = [
    [KeyboardKeys.Ctrl, 'D'], // bookmark
    [KeyboardKeys.Ctrl, 'F'], // find
    [KeyboardKeys.Ctrl, 'G'], // find next
    [KeyboardKeys.Ctrl, KeyboardKeys.Shift, 'G'], // find previous
    [KeyboardKeys.Ctrl, 'H'], // history
    [KeyboardKeys.Ctrl, 'J'], // downloads
    [KeyboardKeys.Ctrl, 'O'], // open file
    [KeyboardKeys.Ctrl, 'S'], // save
    [KeyboardKeys.Ctrl, 'P'], // print
    [KeyboardKeys.Ctrl, 'U'], // view source
    [KeyboardKeys.Ctrl, 'N'], // open in new window
    [KeyboardKeys.Ctrl, 'T'], // open in new tab
    [KeyboardKeys.Ctrl, KeyboardKeys.Shift, 'T'], // open recently closed tab
    [KeyboardKeys.Ctrl, 'C'], // copy
    [KeyboardKeys.Ctrl, 'X'], // cut
    [KeyboardKeys.Ctrl, 'V'], // paste
    [KeyboardKeys.Alt, 'F'], // show menu bar
    [KeyboardKeys.Ctrl, '1'], // goes to tab 1
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
    [KeyboardKeys.Escape] // stop
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
