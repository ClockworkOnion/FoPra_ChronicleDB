import { ValidationErrors } from "@angular/forms";
import { ChronicleEventElement, EventElementSingleOrList, EventElementSubtype, EventElementType } from "src/app/model/ChronicleEvent";

export class EventElementValidator {
    static validateFloat(value: string, subtype: EventElementSubtype): ValidationErrors | null {
        if (!value.match(/^(\+|\-)?\d+\.\d+$/))
            return {error: "No Float!"}
        return null;
    }

    static validateInteger(value: string, subtype: EventElementSubtype): ValidationErrors | null {
        if (!value.match(/^(\+|\-)?\d+$/))
            return {error: "No Integer!"}
        return null;
    }

    static validateString(value: string, subtype: EventElementSubtype, size: number | undefined): ValidationErrors | null {
        if (subtype == EventElementSubtype.constString && size! != value.length-2) { // -2 weil "..."
            return {error: "Not the correct length of the string!"};
        }
        
        if (value.charAt(0) != '"' || value.charAt(value.length-1) != '"' || value.length < 2) {
            return {error: 'Please use "..." when entering a string.'};
        }
        return null;
    }

    static validateUnsigned(value: string, subtype: EventElementSubtype): ValidationErrors | null {
        if (!value.match(/^\d+$/))
            return {error: "No Integer!"}
        return null;
    }

    // Validates the amount of elements in the List
    static validateList(value: string, eventElement: ChronicleEventElement): ValidationErrors | null {

        // wenn constList, teste anzahl der Elemente
        if (eventElement.singleOrList == EventElementSingleOrList.constList && eventElement.size) {
            // null == nein        
            let correctNumberOfElements = value.match(new RegExp(`^[^,]+(,[^,]+){${eventElement.size-1}}$`));
            if (!correctNumberOfElements)
                return {error: "Not the right amount of elements!"};
        }

        let listElements: string[] = value.split(",").map(s => s.trim());
        
        let error: ValidationErrors | null = null;
        switch (eventElement.type) {
            case EventElementType.integer:
                listElements.forEach(element => {
                    let result = this.validateInteger(element, eventElement.subtype);                        
                    if (result != null) {
                        error = result;
                    }
                });
                break;
            case EventElementType.unsigned:
                listElements.forEach(element => {
                    let result = this.validateUnsigned(element, eventElement.subtype);                        
                    if (result != null) {
                        error = result;
                    }
                });
                break;
            case EventElementType.float:
                listElements.forEach(element => {
                    let result = this.validateFloat(element, eventElement.subtype);                        
                    if (result != null) {
                        error = result;
                    }
                });
                break;
        
            default:
                return {error: "not implemented"};
        }
        
        return error;
    }
}