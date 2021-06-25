
# @nghinv/react-native-dropdown-alert

A dropdown alert component with react-native-reanimated

---


[![Version][version-badge]][package]
[![MIT License][license-badge]][license]
[![All Contributors][all-contributors-badge]][all-contributors]


<img src="./assets/example.gif" height="600"/>

# Installation

## Installing the package

* Use yarn

```sh
yarn add @nghinv/react-native-dropdown-alert
```

* Use npm

```sh
npm install @nghinv/react-native-dropdown-alert
```

* dependencies 
	- [react-native-safe-area-context](https://github.com/th3rdwave/react-native-safe-area-context)

# How to use

1. Wrapper `DropdownAlertService` in the `Root Component`

```javascript
  import { DropdownAlertService } from '@nghinv/react-native-dropdown-alert';

  ...
  return (
    <DropdownAlertService>
      <RootComponent />
    </DropdownAlertService>
  );
  ...
```

2. Use `DropdownAlert.show()` and `DropdownAlert.hide()`

```javascript
import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { DropdownAlert } from '@nghinv/react-native-dropdown-alert';

export default function Example() {
  const onPress = () => {
    DropdownAlert.show({
      title: 'Thông báo',
      message: 'Đã kích hoạt cảnh',
      timeDismiss: 1000,
    });
    DropdownAlert.show({
      title: 'Thông báo',
      message: 'Đã kích hoạt cảnh',
      type: 'error',
    });
    DropdownAlert.show({
      title: 'Thông báo',
      message: 'Đã kích hoạt cảnh',
      type: 'info',
      // autoHide: false,
    });
  };

  return (
    <View style={styles.container}>
      <Button title='Show notification' onPress={onPress} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'skyblue'
  }
});
```

[version-badge]: https://img.shields.io/npm/v/@nghinv/react-native-dropdown-alert.svg?style=flat-square
[package]: https://www.npmjs.com/package/@nghinv/react-native-dropdown-alert
[license-badge]: https://img.shields.io/npm/l/@nghinv/react-native-dropdown-alert.svg?style=flat-square
[license]: https://opensource.org/licenses/MIT
[all-contributors-badge]: https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square
[all-contributors]: #contributors