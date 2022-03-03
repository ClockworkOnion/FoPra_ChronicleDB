import { EventElementSubtype, EventElementSingleOrList, EventElementType } from "src/app/model/ChronicleEvent";
import { EventElementValidator } from "./event-element-validator";

describe("EventElementValidator", () => {
    it("validateFloat: Expect Float to be true", () => {
        expect(EventElementValidator.validateFloat("2.64", EventElementSubtype.sixtyfour)).toBeNull();
        expect(EventElementValidator.validateFloat("52.0", EventElementSubtype.sixtyfour)).toBeNull();
    })
    it("validateFloat: Expect negative Float to be true", () => {
        expect(EventElementValidator.validateFloat("-2.64", EventElementSubtype.sixtyfour)).toBeNull();
    })
    it("validateFloat: Expect Int to be false", () => {
        expect(EventElementValidator.validateFloat("264", EventElementSubtype.sixtyfour)).not.toBeNull();
    })
    it("validateFloat: Expect empty Float to be false", () => {
        expect(EventElementValidator.validateFloat("", EventElementSubtype.sixtyfour)).not.toBeNull();
    })
    it("validateFloat: Expect false Float to be false", () => {
        expect(EventElementValidator.validateFloat("abc", EventElementSubtype.sixtyfour)).not.toBeNull();
    })

////////////////////////////////////////////////////////
    it("validateInteger: Expect Int to be true", () => {
        expect(EventElementValidator.validateInteger("264", EventElementSubtype.sixtyfour)).toBeNull();
        expect(EventElementValidator.validateInteger("52", EventElementSubtype.sixtyfour)).toBeNull();
    })
    it("validateInteger: Expect negative Int to be true", () => {
        expect(EventElementValidator.validateInteger("-24", EventElementSubtype.sixtyfour)).toBeNull();
    })
    it("validateInteger: Expect float to be false", () => {
        expect(EventElementValidator.validateInteger("264.0", EventElementSubtype.sixtyfour)).not.toBeNull();
        expect(EventElementValidator.validateInteger("264.76", EventElementSubtype.sixtyfour)).not.toBeNull();
    })
    it("validateInteger: Expect empty int to be false", () => {
        expect(EventElementValidator.validateInteger("", EventElementSubtype.sixtyfour)).not.toBeNull();
    })
    it("validateInteger: Expect false int to be false", () => {
        expect(EventElementValidator.validateInteger("abc", EventElementSubtype.sixtyfour)).not.toBeNull();
    })

////////////////////////////////////////////////////////
    it("validateUnsigned: Expect Unsigned to be true", () => {
        expect(EventElementValidator.validateUnsigned("264", EventElementSubtype.sixtyfour)).toBeNull();
        expect(EventElementValidator.validateUnsigned("52", EventElementSubtype.sixtyfour)).toBeNull();
    })
    it("validateUnsigned: Expect negative Unsigned to be false", () => {
        expect(EventElementValidator.validateUnsigned("-24", EventElementSubtype.sixtyfour)).not.toBeNull();
    })
    it("validateUnsigned: Expect float to be false", () => {
        expect(EventElementValidator.validateUnsigned("264.0", EventElementSubtype.sixtyfour)).not.toBeNull();
        expect(EventElementValidator.validateUnsigned("264.76", EventElementSubtype.sixtyfour)).not.toBeNull();
    })
    it("validateUnsigned: Expect empty Unsigned to be false", () => {
        expect(EventElementValidator.validateUnsigned("", EventElementSubtype.sixtyfour)).not.toBeNull();
    })
    it("validateUnsigned: Expect false Unsigned to be false", () => {
        expect(EventElementValidator.validateUnsigned("abc", EventElementSubtype.sixtyfour)).not.toBeNull();
    })
////////////////////////////////////////////////////////
    it("validateString: Expect String to be true", () => {
        expect(EventElementValidator.validateString('"264"', EventElementSubtype.constString, 3)).toBeNull();
        expect(EventElementValidator.validateString('"26dfg4"', EventElementSubtype.constString, 6)).toBeNull();
        expect(EventElementValidator.validateString('"52"', EventElementSubtype.varString, 2)).toBeNull();
    })
    it("validateString: Expect empty const String to be false", () => {
        expect(EventElementValidator.validateString('""', EventElementSubtype.constString, 5)).not.toBeNull();
    })
    it("validateString: Expect false Length to be false", () => {
        expect(EventElementValidator.validateString('"abc"', EventElementSubtype.constString, 6)).not.toBeNull();
        expect(EventElementValidator.validateString('"abc"', EventElementSubtype.constString, 1)).not.toBeNull();
    })
////////////////////////////////////////////////////////
    it("validateList: Expect List to be true", () => {
        expect(EventElementValidator.validateList('3, 64, 4, 74', {
            singleOrList: EventElementSingleOrList.constList,
            type: EventElementType.integer,
            subtype: EventElementSubtype.sixtyfour,
            size: 4
        })).toBeNull(); 
    })
    it("validateList: Expect wrong size List to be false", () => {
        expect(EventElementValidator.validateList('3, 64, 4, 74, 6', {
            singleOrList: EventElementSingleOrList.constList,
            type: EventElementType.integer,
            subtype: EventElementSubtype.sixtyfour,
            size: 4
        })).not.toBeNull(); 
        expect(EventElementValidator.validateList('3, 64', {
            singleOrList: EventElementSingleOrList.constList,
            type: EventElementType.integer,
            subtype: EventElementSubtype.sixtyfour,
            size: 4
        })).not.toBeNull(); 
    })
    it("validateList: Expect wrong items List to be false", () => {
        expect(EventElementValidator.validateList('3, 64.0, 4, 74, 6', {
            singleOrList: EventElementSingleOrList.constList,
            type: EventElementType.integer,
            subtype: EventElementSubtype.sixtyfour,
            size: 4
        })).not.toBeNull(); 
        expect(EventElementValidator.validateList('3, 6g4', {
            singleOrList: EventElementSingleOrList.constList,
            type: EventElementType.integer,
            subtype: EventElementSubtype.sixtyfour,
            size: 4
        })).not.toBeNull(); 
    })
    it("validateList: Expect wrong formated List to be false", () => {
        expect(EventElementValidator.validateList('3, 64.0, 4, 74, 6,', {
            singleOrList: EventElementSingleOrList.constList,
            type: EventElementType.integer,
            subtype: EventElementSubtype.sixtyfour,
            size: 4
        })).not.toBeNull(); 
        expect(EventElementValidator.validateList('3 64', {
            singleOrList: EventElementSingleOrList.constList,
            type: EventElementType.integer,
            subtype: EventElementSubtype.sixtyfour,
            size: 2
        })).not.toBeNull(); 
    })
})