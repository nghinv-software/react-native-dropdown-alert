
# @nghinv/react-native-dropdown-alert

A dropdown alert component with react-native-reanimated

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

* Peer dependencies 
	- [react-native-safe-area-context](https://github.com/th3rdwave/react-native-safe-area-context)

# How to use

1. Wrapper `DropdownService` in the `Root Component`

```javascript
  import { DropdownService } from '@nghinv/react-native-dropdown-alert';

  ...
  return (
    <DropdownService>
      <RootComponent />
    </DropdownService>
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
      timeDissmiss: 1000,
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