//% color="#EEAA00" icon="\uf028"
//% block="ET: Audio"
//% block.loc.nl="ET: Audio"
namespace EtAudio {
    let MODULE = "EtAudio"

    let ISPLAYING = false
    // set true by the routine 'play'
    // set false by the routine 'stop' or by the event 'ready'

    let EventFinished: EtCommon.eventHandler

    export function onEventFinished(id: string) {
        if (EventFinished) EventFinished(id)
        ISPLAYING = false
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
        if (ISPLAYING)
            onEventFinished(id)
    }

    //% block="play %file at %id"
    //% block.loc.nl="speel %file af op %id"
    //% id.defl="EtAudio"
    //% file.min=1 file.max=100 file.defl=1
    export function play(file: number, id: string) {
        EtCommon.setValue(id, "play", file.toString())
        ISPLAYING = true
    }

    //% block="set the volume of %id to %vol \\%"
    //% block.loc.nl="stel het volume van %id in op %vol \\%"
    //% id.defl="EtAudio"
    //% vol.min=0 vol.max=100 vol.defl=100
    export function volume(id: string, vol: number) {
        EtCommon.setValue(id, "play", vol.toString())
    }

    //% block="when playing finished at %id"
    //% block.loc.nl="wanneer het afspelen op %id stopt"
    //% id.defl="EtAudio"
    export function onFinished(id: string, programmableCode: () => void): void {
        let item2: EtCommon.eventItem
        item2 = { handler: onEventFinished, module: id, signal: "finished" }
        EtCommon.eventArray.push(item2)
        EventFinished = programmableCode
    }

    //% block="module %id is playing"
    //% block.loc.nl="module %id speelt af"
    //% id.defl="EtAudio"
    export function isBusy(id: string): boolean {
        EtCommon.askValue(MODULE, "busy")
        let ret: string
        do {
            ret = EtCommon.getValue(MODULE, "A", "busy")
        }
        while (ret.isEmpty())
        ISPLAYING = (ret == "true")
        return ISPLAYING
    }
}
