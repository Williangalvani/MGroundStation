import { GamepadListener } from "gamepad.js"


type gamepadEvent = {
    type: String,
    detail: Object,
}
type callbackType = (event: Object) => void

class JoystickManager {
    private static instance = new JoystickManager();

    private callbacks: Array<callbackType> = [];
    private gamepadListener = new GamepadListener();

    private constructor() {
        this.gamepadListener.start()
        this.connectEvents()
    }

    static self(): JoystickManager {
        return JoystickManager.instance
    }

    onChanged(callback: callbackType) {
        this.callbacks.push(callback)
    }

    private connectEvents() {
        const eventNames = ["connected", "disconnected", "axis", "button"]
        for(const name of eventNames) {
            this.gamepadListener.on(`gamepad:${name}`, (event: gamepadEvent) => {
                for(const callback of this.callbacks) {
                    const { detail } = event
                    callback(detail)
                }
            })
        }
    }
}

const joystickManager = JoystickManager.self()

export default joystickManager