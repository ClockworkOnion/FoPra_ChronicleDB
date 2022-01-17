import * as CryptoJS from 'crypto-js';

export class UserAuthenticator {

  constructor() {}

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

  static signToken(payload: any, key: string) {
    var secret = key;
    let token: any = this.encodeToken(payload);

    var signature: any = CryptoJS.HmacSHA256(token, secret);
    signature = this.base64url(signature);

    var signedToken = token + '.' + signature;
    return signedToken;
  }
}
