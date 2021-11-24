export interface ChronicleEventElement {
    singleOrList: EventElementSingleOrList,
    type: EventElementType,
    subtype: EventElementSubtype,
    size?: number
}

export enum EventElementSingleOrList {
    single="single", constList="constList", varList="varList"
}

export enum EventElementType {
    integer="Integer", string="String", float="Float", unsigned="Unsigned"
}

export enum EventElementSubtype {
    eight=8, sixteen=16, thirtytwo=32, sixtyfour=64, constString="const", varString="var"
}

export enum EventCompoundType {
    single, compound, varCompund
}