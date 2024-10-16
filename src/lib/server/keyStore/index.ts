import type { Token } from "$generated/types";
import {
  superUserKey,
  jwtSecret,
  jwtExpireTime,
  jwtIssuer,
  publicRSAKey,
  privateRSAKey,
} from "$server/config";
import jwt from "jsonwebtoken";

export function isSuperUserKeyValid(headers: Headers): boolean {
  const authKeyBearer = headers.get("Authorization");
  const [preAuth, authKey] = authKeyBearer?.split(" ") ?? [null, null];

  if (preAuth === "Bearer" && authKey === superUserKey) {
    return true;
  }

  return false;
}

export function constructJWTToken(payload: object) {
  try {
    const signOptions: jwt.SignOptions = {
      expiresIn: jwtExpireTime,
      issuer: jwtIssuer,
    };

    return jwt.sign(payload, jwtSecret, signOptions);
  } catch (err) {
    console.log("construct token error:", String(err));
    return null;
  }
}

export function verifyJWTToken(token: string): Token | null {
  let jwtToken: Token | null = null;
  try {
    const decodedToken = jwt.verify(token, jwtSecret);
    jwtToken = {
      valid: true,
      decodedToken: {
        data: decodedToken,
      },
      error: null,
    };
  } catch (err) {
    jwtToken = {
      valid: false,
      decodedToken: null,
      error: String(err),
    };
  }
  return jwtToken;
}

export function constructRSAToken(payload: object): string {
  const signOptions: jwt.SignOptions = {
    algorithm: "RS256",
  };

  const token = jwt.sign(payload, privateRSAKey, {
    ...signOptions,
  });

  return token;
}

export function verifyRSAToken(token: string): Token | null {
  let jwtToken: Token | null = null;

  const verifyOptions: jwt.VerifyOptions = {
    algorithms: ["RS256"],
  };

  try {
    const decodedPayload = jwt.verify(token, publicRSAKey, verifyOptions);

    jwtToken = {
      valid: false,
      decodedToken: {
        data: decodedPayload,
      },
      error: null,
    };
  } catch (err) {
    jwtToken = {
      valid: false,
      decodedToken: null,
      error: String(err),
    };
  }

  return jwtToken;
}
