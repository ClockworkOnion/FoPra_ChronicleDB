export interface User {
  username: string;
  isAdmin: boolean;
  canCreateStreams: boolean;
  allStreams: boolean;
  allowedStreams?: Array<number>;
}
