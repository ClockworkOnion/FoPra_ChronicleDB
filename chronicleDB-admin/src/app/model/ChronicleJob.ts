import { MatDialogConfig } from "@angular/material/dialog";

export interface ChronicleJob {
    startDate: Date;
    interval: {value: number, text: string}; // in seconds
    requestType: ChronicleRequest;
    config?: MatDialogConfig<any>;
    info?: string
}

export enum ChronicleRequest {
    STREAM_INFO="Stream Info", SYSTEM_INFO="System Info", TIME_TRAVEL="Time Travel", RIGHT_FLANK="Right Flank", MAX_KEY="Max Key", MIN_KEY="Min Key", TREE_HEIGHT="Tree Height"
}