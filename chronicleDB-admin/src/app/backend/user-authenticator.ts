import { Injectable } from '@angular/core';
import { LoginCredentials } from '../model/LoginCredentials';
import * as CryptoJS from 'crypto-js';

interface User {
  username: string;
  password: string;
  isAdmin: boolean;
  canCreateStreams: boolean;
  allStreams: boolean;
  allowedStreams?: Array<number>;
}

export class UserAuthenticator {
  private static userMap = new Map<string, User>([
    [
      'Admin',
      {
        username: 'Admin',
        password: '1234',
        isAdmin: true,
        canCreateStreams: true,
        allStreams: true,
      },
    ],
    [
      'User',
      {
        username: 'User',
        password: '1234',
        isAdmin: false,
        canCreateStreams: false,
        allStreams: false,
        allowedStreams: [0, 1]
      },
    ],
  ]);

  constructor() {}

  /**
   * Checks login and returns JWT or null if login is not correct
   * @param credentials Login data
   * @returns JWT or null if login is not correct
   */
  public static authenticate(credentials: LoginCredentials) {
    let user = UserAuthenticator.userMap.get(credentials.username);
    if (user && user?.password === credentials.password) {
      let payload = {
        username: user.username,
        isAdmin: user.isAdmin,
        canCreateStreams: user.canCreateStreams,
        allStreams: user.allStreams,
        allowedStreams: user.allowedStreams
      };

      return this.signToken(payload, "Passwort");
    } else {
      return null;
    }
  }


  private static base64url(source: any) {
    let encodedSource = CryptoJS.enc.Base64.stringify(source);

    encodedSource = encodedSource.replace(/=+$/, '');

    encodedSource = encodedSource.replace(/\+/g, '-');
    encodedSource = encodedSource.replace(/\//g, '_');

    return encodedSource;
  }

  private static encodeToken(payload: any) {
    var header = {
      alg: 'HS256',
      typ: 'JWT',
    };

    var stringifiedHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(header));
    var encodedHeader = this.base64url(stringifiedHeader);

    var stringifiedData = CryptoJS.enc.Utf8.parse(JSON.stringify(payload));
    var encodedData = this.base64url(stringifiedData);
    
    return encodedHeader + '.' + encodedData;
  }

  private static signToken(payload: any, key: string) {
    var secret = key;
    let token: any = this.encodeToken(payload);

    var signature: any = CryptoJS.HmacSHA256(token, secret);
    signature = this.base64url(signature);

    var signedToken = token + '.' + signature;
    return signedToken;
  }
}
