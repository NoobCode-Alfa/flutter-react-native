import { NativeModules } from 'react-native';
import uuid from 'react-native-uuid'
const { RNShare } = NativeModules;

let functionList: Array<ReactModuleComponent> = [];
let queueList: Array<FlutterCallback> = [];

class ReactModule {
    public static define(functionName: string, action: ({ params: any })) {
        functionList.push(new ReactModuleComponent(functionName, action));
    }
};

class ReactModuleComponent {
    name: String;
    action: (any);
    constructor(functionName: string, action: (any)) {
        this.name = functionName;
        this.action = action;
    }
}

async function _actionCall(action: (any), props: any) {
    let result = await action(props.params)
    let data = { "requestId": props.requestId, "value": result };

    RNShare.callback(data);
}

class FlutterReactNative {
    public static call(method: String, params: any, callback: ({ value: any })) {
        let requestId = uuid.v4()
        if (callback != null) {
            queueList.push(new FlutterCallback(requestId.toString(), callback))
        }

        RNShare.call({
            "requestId": requestId,
            "method": method,
            "params": params,
        });
    }
}

class FlutterCallback {
    id: String;
    action: (any);
    constructor(requestId: string, action: (any)) {
        this.id = requestId;
        this.action = action;
    }
}

const component = (props) => {
    if (props.type == "module") {
        for (const component in functionList) {
            if (Object.prototype.hasOwnProperty.call(functionList, component)) {
                const element = functionList[component];
                if (element.name == props.method) {
                    _actionCall(element.action, props)
                }
            }
        }
    } else if (props.type == "callback") {
        for (const component in queueList) {
            if (Object.prototype.hasOwnProperty.call(queueList, component)) {
                const element = queueList[component];
                if (element.id == props.requestId) {
                    element.action(props.value);
                }
            }
        }
    }
};

export { ReactModule, FlutterReactNative, component }