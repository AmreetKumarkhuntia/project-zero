import { isJSON, decodeString, decodeArray } from 'type-decoder';

/**
 * @type { ServerAccess }
 */
export type ServerAccess =   {
  /**
   * @type { string }
   * @memberof ServerAccess
   */
  name: string;
  /**
   * @type { string[] }
   * @memberof ServerAccess
   */
  paths: string[];
  /**
   * @type { ServerAPIAccessEnum }
   * @memberof ServerAccess
   */
  serverAPIAccess: ServerAPIAccessEnum;
};

export function decodeServerAccess(rawInput: unknown): ServerAccess | null {
  if (isJSON(rawInput)) {
    const decodedName =  decodeString(rawInput['name']);
    const decodedPaths =  decodeArray(rawInput['paths'], decodeString);
    const decodedServerAPIAccess =  decodeServerAPIAccessEnum(rawInput['serverAPIAccess']);

    if (
      decodedName === null ||
      decodedPaths === null ||
      decodedServerAPIAccess === null
    ) {
      return null;
    }

    return {
      name: decodedName,
      paths: decodedPaths,
      serverAPIAccess: decodedServerAPIAccess,
    };
  }
  return null;
}
/**
 * @type { ServerAPIAccessEnum }
 */
export type ServerAPIAccessEnum =
  | 'READ'
  | 'WRITE'
  | 'ANY'
;

export function decodeServerAPIAccessEnum(rawInput: unknown): ServerAPIAccessEnum | null {
  switch (rawInput) {
    case 'READ':
    case 'WRITE':
    case 'ANY':
     return rawInput;
  }
  return null;
}



