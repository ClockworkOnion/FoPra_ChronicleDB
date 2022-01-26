export interface ChronicleEventElement {
    singleOrList: EventElementSingleOrList,
    type: EventElementType,
    subtype: EventElementSubtype,
    size?: number
}

export let getShortEventString = (event : ChronicleEventElement) : string => {
    let text : string = "";

    if (event.singleOrList == EventElementSingleOrList.single) {
        if (event.type == EventElementType.string) {
            text = "" + event.subtype;
        } else {
            text += event.type.charAt(0);
            text += event.subtype;
        }
    } else {
        text = (event.singleOrList == EventElementSingleOrList.constList) ? "Const" : "Var";
        if (event.type == EventElementType.string) {
            text += "String";
        } else {
            text += event.type.charAt(0);
            text += event.subtype;
        }
        text += "List"
    }

    return text;
}

export enum EventElementSingleOrList {
    single="single", constList="constList", varList="varList"
}

export enum EventElementType {
    integer="Integer", string="String", float="Float", unsigned="Unsigned"
}

export enum EventElementSubtype {
    eight=8, sixteen=16, thirtytwo=32, sixtyfour=64, constString="ConstString", varString="VarString"
}

export enum EventCompoundType {
    single="single", compound="Compound", varCompound="VarCompound"
}