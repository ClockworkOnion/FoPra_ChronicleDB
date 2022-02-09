export interface ChronicleJavaCreateBody {
  streamName: string;
  schema: Array<ChronicleJavaStreamAttribute>;
}

export interface ChronicleJavaStreamAttribute {
  name: string;
  type: ChronicleJavaAttributeType;
  properties?: { nullable?: boolean; index?: boolean };
}

export enum ChronicleJavaAttributeType {
  BOOLEAN = 'BOOLEAN',
  BYTE = 'BYTE',
  SHORT = 'SHORT',
  INTEGER = 'INTEGER',
  LONG = 'LONG',
  FLOAT = 'FLOAT',
  DOUBLE = 'DOUBLE',
  STRING = 'STRING',
  GEOMETRY = 'GEOMETRY',
}

//////////////////////////////

export interface ChronicleJavaStreamInfo {
  name: string;
  eventCount: number;
  timeInterval: {
    lower: number;
    upper: number;
    lowerInclusive: boolean;
    upperInclusive: boolean;
  };
  schema: Array<ChronicleJavaStreamAttribute>;
}

//////////////////////////////

export interface ChronicleJavaQuery {
  queryString: string;
  startTime: number;
  endTime: number;
}

//////////////////////////////

export interface ChronicleJavaInsert {
  streamName: string;
  events: Array<any>;
}

//   {
//     "streamName": "S",
//     "events": [
//       {
//         "X": 42.0,
//         "Y": 1337.0,
//         "TSTART": 12
//       },
//       {
//         "X": 17.0,
//         "Y": 137.0,
//         "TSTART": 14
//       }
//     ]
//   }
