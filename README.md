# flutter-react-native

`flutter-react-native` is an npm package that creates a function bridge between Flutter and React Native. Currently, it only supports logic.

## Installation

Make sure your app is already integrated with Flutter and React Native, you can read how to integrate with Flutter [here](https://docs.flutter.dev/add-to-app) and React Native [here](https://reactnative.dev/docs/integration-with-existing-apps).

Or you can see full [example code here](https://github.com/NoobCode-Alfa/flutter_react_native_example) 

### React Native

To install `flutter-react-native` in your React Native project, simply add the package to your `package.json` file and import the `ReactModule` from `flutter-react-native`.

```javascript
import { ReactModule } from 'flutter-react-native';
```

### Flutter

To install `flutter-react-native` in your Flutter project, add the `flutter_react_native` package from [pub.dev](https://pub.dev/packages/flutter_react_native) to your `pubspec.yaml` file.

```yaml
dependencies:
  flutter_react_native: ^latest_version
```

Then, run `flutter packages get` to install the package.

## Usage

## Flutter to React Native

### React Native

To define a function, use the `define` method of the `ReactModule` object. The first argument is the name of the function, and the second argument is an asynchronous function that takes in parameters and returns a value if needed.

```javascript
ReactModule.define("function name", async (params) => {
  // Logic here with return value if needed
});
```

It supports both synchronous and asynchronous functions.

### Flutter

To call a function defined in the React Native module from your Flutter project, use the `call` method of the `FlutterReactNative` object. The first argument is the name of the function, specified as the value of the `method` key. The second argument is an object containing the parameters to pass to the function, specified as the value of the `params` key. The third argument is a callback function that takes in a value and is called when the function returns a value.

```dart
FlutterReactNative.call(
  method: "function name",
  params: {"key": "value"},
  callback: (value) {
    // use return value from react module here
  },
);
```

## React Native to Flutter

### Flutter

To define a function, use the `define` method of the `FlutterModule` object. The first argument is the name of the function, and the second argument is an asynchronous function that takes in parameters and returns a value if needed.

```dart
FlutterModule.define("function name", (params) async {
  // Logic here with return value if needed
});
```

It supports both synchronous and asynchronous functions.

### React Native

To call a function defined in the Flutter module from your React Native project, use the `call` method of the `FlutterReactNative` object. The first argument is the name of the function, specified as the value of the `method` key. The second argument is an object containing the parameters to pass to the function, specified as the value of the `params` key. The third argument is a callback function that takes in a value and is called when the function returns a value.

```javascript
FlutterReactNative.call("function name", { "key": "value" }, (value) => {
    // use return value from flutter module here
});
```
