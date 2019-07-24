# Keyboard Shortcuts

[![Build Status](https://dev.azure.com/milestechnologies/ngx-keyboard-shortcuts/_apis/build/status/milestechnologies.ngx-keyboard-shortcuts?branchName=develop)](https://dev.azure.com/milestechnologies/ngx-keyboard-shortcuts/_build/latest?definitionId=1&branchName=develop) [![codecov](https://codecov.io/gh/milestechnologies/ngx-keyboard-shortcuts/branch/develop/graph/badge.svg)](https://codecov.io/gh/milestechnologies/ngx-keyboard-shortcuts)

By using simple directives ngx-keyboard-shortcuts allows you to create and implement custom keybindings events in your angular applications.

**For Example**:
```html
   <button
       [keyboardShortcut]="keyboardShortcutDef"
       (click)="save()">
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
    imports: [NgxKeyboardShortcutModule.forRoot()],
})
export class AppModule {
}
```

### Demos

To access direct implementations of ngx-keyboard-shortcuts (demos), you're required to either clone or download the repository onto your machine. Next run `npm install`, then `npm start` to run the demo project, which can then be accessed via **localhost:4200**.

## Contributing

### Commands

`npm start` Run the demo environment

`npm test` Run tests

`npm run lint` Run linter

`npm run build` Build the package

## Built With

-   [Angular](<[https://angular.io/](https://angular.io/)>) - The web framework used
-   [Npm](<[https://www.npmjs.com/get-npm](https://www.npmjs.com/get-npm)>) - The package manager

## Version

Not released

## Contributors

Thank you to the [contributors](<[https://github.com/milestechnologies/ngx-keyboard-shortcuts/graphs/contributors](https://github.com/milestechnologies/ngx-keyboard-shortcuts/graphs/contributors)>) of this package.

## License

This project is licensed under the MIT License - see the [LICENSE.md]([https://github.com/milestechnologies/ngx-keyboard-shortcuts/blob/develop/LICENSE]) file for details.
