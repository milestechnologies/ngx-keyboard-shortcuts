# Keyboard Shortcuts

[![Build Status](https://dev.azure.com/milestechnologies/ngx-keyboard-shortcuts/_apis/build/status/milestechnologies.ngx-keyboard-shortcuts?branchName=master)](https://dev.azure.com/milestechnologies/ngx-keyboard-shortcuts/_build/latest?definitionId=1&branchName=master) [![codecov](https://codecov.io/gh/milestechnologies/ngx-keyboard-shortcuts/branch/master/graph/badge.svg)](https://codecov.io/gh/milestechnologies/ngx-keyboard-shortcuts) [![Greenkeeper badge](https://badges.greenkeeper.io/milestechnologies/ngx-keyboard-shortcuts.svg)](https://greenkeeper.io/)

By using simple directives ngx-keyboard-shortcuts allows you to create and implement custom keybindings events in your angular applications.

**For Example**:

```html
<button [keyboardShortcut]="keyboardShortcutDef" (click)="save()">
    Save
</button>
```

```typescript
keyboardShortcutDef: IKeyboardShortcutListenerOptions = {
    description: 'save',
    keyBinding: [KeyboardKeys.Ctrl, KeyboardKeys.Shift, 's']
};
```

### Install

`npm --save install ngx-keyboard-shortcuts`.

### Usage

```typescript
import { NgxKeyboardShortcutModule } from 'ngx-keyboard-shortcuts';

@NgModule({
    imports: [NgxKeyboardShortcutModule.forRoot()]
})
export class AppModule {}
```

### Demos

see the demo site [https://milestechnologies.github.io/ngx-keyboard-shortcuts](https://milestechnologies.github.io/ngx-keyboard-shortcuts)

## Contributing

### Commands

`npm start` Run the demo environment

`npm test` Run tests

`npm run lint` Run linter

`npm run build` Build the package

## Built With

-   [Angular](https://angular.io/) - The web framework used
-   [Npm](https://www.npmjs.com/get-npm) - The package manager

## Version

1.0.1

## Contributors

Thank you to the [contributors](https://github.com/milestechnologies/ngx-keyboard-shortcuts/graphs/contributors) of this package.

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/milestechnologies/ngx-keyboard-shortcuts/blob/master/LICENSE) file for details.
