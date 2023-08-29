import { AppRegistry } from "react-native";

const { ReactModule, FlutterReactNative, component, componentCallback } = require("./react-module-core");

AppRegistry.registerComponent('reactModule', () => component);

export { ReactModule, FlutterReactNative }