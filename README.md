[![npm](https://img.shields.io/npm/v/react-native-app-state-higher-order-component.svg)](https://www.npmjs.com/package/react-native-app-state-higher-order-component)
[![npm downloads](https://img.shields.io/npm/dt/react-native-app-state-higher-order-component.svg)](https://www.npmjs.com/package/react-native-app-state-higher-order-component)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)]()
[![GitHub issues](https://img.shields.io/github/issues/joeyschroeder/npm-package-starter.svg)](https://github.com/joeyschroeder/npm-package-starter/issues)
[![GitHub stars](https://img.shields.io/github/stars/joeyschroeder/npm-package-starter.svg)](https://github.com/joeyschroeder/npm-package-starter/stargazers)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

# 🌈 react-native-app-state-higher-order-component

A [React Native](https://reactnative.dev/) [higher-order component](https://reactjs.org/docs/higher-order-components.html) listening to [AppState](https://reactnative.dev/docs/appstate) changes.

## Installation

`npm install react-native-app-state-higher-order-component --save`

## Usage

Import **withAppStateListener** from this library.

```
import { withAppStateListener } from 'react-native-app-state-higher-order-component';
```

Call **withAppStateListener** with the component you'd like to extend with it's functionality.

```
const EnhancedComponent = withAppStateListener(YourComponent);
```

Your component now receives an `appState` prop, which updates to the AppState.currentValue **(i.e. `'active'`, `'inactive'`, `'background'`)** value every time [AppState](https://reactnative.dev/docs/appstate) updates.

```
import { Text } from 'react-native';
import { withAppStateListener } from 'react-native-app-state-higher-order-component';

const YourComponent = (props) => {
  const { appState } = props;
  return <Text>{appState}</Text>;
}

const YourComponentWithAppState = withAppStateListener(YourComponent);
```

### Extended Props

A component enhanced with `withAppStateListener` is extended with three optional, additional props:

| prop             | type/valid values | default     | description                                                                                                |
| ---------------- | ----------------- | ----------- | ---------------------------------------------------------------------------------------------------------- |
| onAppStateChange | func              | `undefined` | a function called with the `appState` value when [AppState](https://reactnative.dev/docs/appstate) changes |
| onBackground     | func              | `undefined` | a function called when [AppState](https://reactnative.dev/docs/appstate) is `'background'` or `'inactive'` |
| onForeground     | func              | `undefined` | a function called when [AppState](https://reactnative.dev/docs/appstate) is `'active'`                     |

Pass these optional props to your component enhanced with `withAppStateListener`:

```
import { Text } from 'react-native';
import { withAppStateListener } from 'react-native-app-state-higher-order-component';

const YourComponent = (props) => {
  const { appState } = props;
  return <Text>{appState}</Text>;
}

const YourComponentWithAppState = withAppStateListener(YourComponent);

const YourApp = () => {
  const onAppStateChange = (appState) => {
    console.log(`AppState updated to: ${appState}`);
  }

  const onBackground = () => console.log('App is in the background.');
  const onForeground = () => console.log('App is active.');

  return (
    <YourComponentWithAppState
      onAppStateChange={onAppStateChange}
      onBackground={onBackground}
      onForeground={onForeground}
    />
  );
}
```

## Versioning

I use [SemVer](https://docs.npmjs.com/getting-started/semantic-versioning) for versioning. For the versions available, see the [tags on this repository](https://github.com/joeyschroeder/npm-package-starter/tags).

## Authors

- **Joey Schroeder** - _Initial work_ - [joeyschroeder.com](https://joeyschroeder.com)

See also the list of [contributors](https://github.com/joeyschroeder/npm-package-starter/graphs/contributors) who participated in this project.

## Contributing

Please submit a pull request with any features/fixes for the project. I apologize in advance for the slow action on pull requests and issues. Please follow the [ESLint rules](https://github.com/joeyschroeder/npm-package-starter/blob/master/.eslintrc.json) for the project.

## License

This project is licensed under the MIT License - see the [MIT Open Source Initiative](https://opensource.org/licenses/MIT) for details.

## Acknowledgments

Hat tip to anyone who's code was used! 🤠
