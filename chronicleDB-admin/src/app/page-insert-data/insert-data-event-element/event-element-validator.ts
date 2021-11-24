import { ValidationErrors } from "@angular/forms";
import { EventElementSubtype } from "src/app/model/ChronicleEvent";

export class EventElementValidator {
    static validateFloat(value: string, subtype: EventElementSubtype): ValidationErrors | null {
        if (!value.match(/^\d+\.\d+$/))
            return {error: "No Float!"}
        return null;
    }

    static validateInteger(value: string, subtype: EventElementSubtype): ValidationErrors | null {
        if (!value.match(/^(\+|\-)?\d+$/))
            return {error: "No Integer!"}
        return null;
    }

    static validateString(value: string, subtype: EventElementSubtype, size: number | undefined): ValidationErrors | null {
        if (subtype == EventElementSubtype.constString && size! != value.length) {            
            return {error: "Not the correct length of the string!"}
        }
        return null;
    }

    static validateUnsigned(value: string, subtype: EventElementSubtype): ValidationErrors | null {
        if (!value.match(/^\d+$/))
            return {error: "No Integer!"}
        return null;
    }
}