export interface ChronicleEventElement {
    singleOrList: EventElementSingleOrList,
    type: EventElementType,
    subtype: EventElementSubtype,
    size?: number
}

export enum EventElementSingleOrList {
    single, constList, varList
}

export enum EventElementType {
    integer, string, float, unsigned
}

export enum EventElementSubtype {
    constString, varString, eight, sixteen, thirtytwo, sixtyfour
}