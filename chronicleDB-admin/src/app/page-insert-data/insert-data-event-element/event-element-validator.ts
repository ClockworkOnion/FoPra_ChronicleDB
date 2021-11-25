import { ValidationErrors } from "@angular/forms";
import { EventElementSingleOrList, EventElementSubtype } from "src/app/model/ChronicleEvent";

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

    // Validates the amount of elements in the List
    static validateList(value: string, singleOrList: EventElementSingleOrList, size: number | undefined): ValidationErrors | null {
        if (singleOrList == EventElementSingleOrList.constList && size) {
            // null == nein        
            let correctNumberOfElements = value.match(new RegExp(`^[^,]+(,[^,]+){${size-1}}$`));
            return !correctNumberOfElements ? {numberOfElements: "Not the right amount of elements!"} : null;
        }
        return null;
    }
}