import { GamepadListener } from "gamepad.js"

export enum EventType {
    Unknown = "unknown",
    Connected = "connected",
    Disconnected = "disconnected",
    Axis = "axis",
    Button = "button",
}

type GamepadEvent = {
    type: String,
    detail: Object,
}

export type JoystickEvent = {
    type: EventType,
    detail: Object,
}

export namespace EventType {
    export function events(): Array<String> {
        return Object.keys(EventType).map(name => name.toLowerCase())
    }

    export function fromGamepadEventType(type: String): EventType {
        const fields = type.split(":")
        if (fields.length <= 1) {
            return EventType.Unknown
        }

        const name = fields[1]

        for(const eventName of EventType.events()) {
            if(eventName == name) {
                return eventName as EventType
            }
        }

        return EventType.Unknown
    }
}

type callbackType = (event: JoystickEvent) => void

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
        for(const name of EventType.events()) {
            this.gamepadListener.on(`gamepad:${name}`, (event: GamepadEvent) => {
                for(const callback of this.callbacks) {
                    const joystickEvent = event as JoystickEvent
                    joystickEvent.type = EventType.fromGamepadEventType(joystickEvent.type)
                    callback(joystickEvent)
                }
            })
        }
    }
}

export const joystickManager = JoystickManager.self()