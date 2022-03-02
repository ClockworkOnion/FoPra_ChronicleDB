import { LoginCredentials } from "../model/LoginCredentials";
import { RegisterCredentials } from "../model/RegisterCredentials";
import { User } from "../model/User";
import { UserAuthenticator } from "./user-authenticator";

interface UserBackend {
  username: string;
  password: string;
  isAdmin: boolean;
  canCreateStreams: boolean;
  allStreamsAllowed: boolean;
  allowedStreams?: Array<number>;
  canInsertAll?: boolean;
  allowedInsertStreams?: Array<number>;
}

export class UserManager {
  private static userMap = new Map<string, UserBackend>([
    [
      'Admin',
      {
        username: 'Admin',
        password: '1234',
        isAdmin: true,
        canCreateStreams: true,
        allStreamsAllowed: true,
        canInsertAll: true,
      },
    ],
    [
      'User',
      {
        username: 'User',
        password: '1234',
        isAdmin: false,
        canCreateStreams: false,
        allStreamsAllowed: false,
        allowedStreams: [0, 2, 4, 5],
        canInsertAll: false,
        allowedInsertStreams: [0, 1, 4],
      },
    ],
  ]);

  /**
   * Checks login and returns JWT or null if login is not correct
   * @param credentials Login data
   * @returns JWT or null if login is not correct
   */
  public static authenticate(credentials: LoginCredentials) {
    let user = UserManager.userMap.get(credentials.username);
    if (user && user?.password === credentials.password) {
      return UserAuthenticator.signToken(UserManager.getUserDetails(user), 'ChronicleDB');
    } else {
      return null;
    }
  }

  public static register(credentials : RegisterCredentials) : boolean {
    if (this.userMap.has(credentials.username)) {
        return false;
    } else {
        UserManager.userMap.set(credentials.username, {
            username: credentials.username,
            password: credentials.password,
            isAdmin: false,
            canCreateStreams: false,
            allStreamsAllowed: false
        });
        return true;
    }
  }

  public static getUsers() : Array<string> {
    return Array.from(this.userMap.values()).map((userBackend) => JSON.stringify(UserManager.getUserDetails(userBackend)));
  }

  public static getUserByName(name : string) : User | null {
    return this.userMap.has(name) ? UserManager.getUserDetails(this.userMap.get(name)!) : null;
  }

  public static deleteUser(name : string) : boolean {
    // Berechtigungsabfrage fehlt...
    this.userMap.delete(name);
    return true;
  }

  private static getUserDetails(user : UserBackend) : User {
    return {
        username: user.username,
        isAdmin: user.isAdmin,
        canCreateStreams: user.canCreateStreams,
        allStreamsAllowed: user.allStreamsAllowed,
        allowedStreams: user.allowedStreams,
        canInsertAll: user.canInsertAll,
        allowedInsertStreams: user.allowedInsertStreams,
      };
  }
}
