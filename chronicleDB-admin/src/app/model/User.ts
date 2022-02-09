export interface User {
  username: string;
  isAdmin: boolean;
  canCreateStreams: boolean;
  allStreamsAllowed: boolean;
  usesJavaVersion?: boolean;
  allowedStreams?: Array<number>;
  canInsertAll?: boolean;
  allowedInsertStreams?: Array<number>;
}
