import{ KeyboardShortcutListener } from './listener.library';
import { BlackListedKeyboardShortcutChecker } from './black-listed-key-bindings.library';

export interface IKeyboardShortcutConfig {
    defaultCheckBlackList?: boolean;
}
