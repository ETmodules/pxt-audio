//% color="#EEAA00" icon="\uf028"
//% block="ET: Audio"
//% block.loc.nl="ET: Audio"
namespace EtAudio {
    let MODULE = "EtAudio"

    let EventStarted: EtCommon.eventHandler
    let EventStopped: EtCommon.eventHandler
    let EventPlaying: EtCommon.eventHandler
    let ISPLAYING = "isplaying"

    export function onEventStarted(id: string) {
        if (EventStarted) EventStopped(id)
    }

    export function onEventStopped(id: string) {
        if (EventStopped) EventStopped(id)
    }

    export function onEventPlaying(id: string) {
        if (EventPlaying) EventPlaying(id)
    }

    //% block="ID"
    //% block.loc.nl="ID"
    export function id(): string {
        return MODULE
    }

    //% block="set module id to %id"
    //% block.loc.nl="stel de module id in op %id"
    //% id.defl="EtAudio"
    export function setModuleId(id: string) {
        MODULE = id
    }

    //% block="stop playing at %id"
    //% block.loc.nl="stop het afspelen op %id"
    //% id.defl="EtAudio"
    export function stop(id: string) {
        EtCommon.setValue(id, "stop", "")
    }

    //% block="play %file at %id"
    //% block.loc.nl="speel %file af op %id"
    //% id.defl="EtAudio"
    //% file.min=1 file.max=100 file.defl=1
    export function play(file: number, id: string) {
        EtCommon.setValue(id, "play", file.toString())
    }

    //% block="set the volume of %id to %vol \\%"
    //% block.loc.nl="stel het volume van %id in op %vol \\%"
    //% id.defl="EtAudio"
    //% vol.min=0 vol.max=100 vol.defl=100
    export function volume(id: string, vol: number) {
        EtCommon.setValue(id, "volume", vol.toString())
    }

    //% block="when playing Stopped at %id"
    //% block.loc.nl="wanneer het afspelen op %id stopt"
    //% id.defl="EtAudio"
    export function onStopped(id: string, programmableCode: () => void): void {
        EtCommon.events.register(MODULE, ISPLAYING, "false", onEventStopped)
        EventStopped = programmableCode
    }

    //% block="when playing Stopped at %id"
    //% block.loc.nl="wanneer het afspelen op %id stopt"
    //% id.defl="EtAudio"
    export function onStarted(id: string, programmableCode: () => void): void {
        EtCommon.events.register(MODULE, ISPLAYING, "true", onEventStarted)
        EventStopped = programmableCode
    }

    //% block="module %id is playing"
    //% block.loc.nl="module %id speelt af"
    //% id.defl="EtAudio"
    export function isBusy(id: string): boolean {
        return EtCommon.events.testEvent( MODULE, ISPLAYING,"true")
    }
}
