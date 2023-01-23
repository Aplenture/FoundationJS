import { ForbiddenError } from "../utils/error";
import { ErrorMessage } from "../enums/errorMessage";

const STRING_FALSE = "false";
const STRING_TRUE = "true";
const STRING_N = "n";
const STRING_NO = "no";
const STRING_Y = "y";
const STRING_YES = "yes";

export function parseToTime(value: string | number, key?: string) {
    if (undefined === value)
        throw new ForbiddenError(`${key}_${ErrorMessage.MissingDate}`);

    if (!isNaN(Number(value)))
        value = Number(value);

    const result = new Date(value).getTime();

    if (isNaN(result))
        throw new ForbiddenError(`${key}_${ErrorMessage.InvalidDate}`);

    return result;
}

export function parseToString(value: any, key?: string): string {
    if (undefined === value || value === '')
        throw new ForbiddenError(`${key}_${ErrorMessage.MissingString}`);

    return value.toString();
}

export function parseToNumber(value: string | number, key?: string) {
    if (undefined === value)
        throw new ForbiddenError(`${key}_${ErrorMessage.MissingNumber}`);

    const result = Number(value);

    if (isNaN(result))
        throw new ForbiddenError(`${key}_${ErrorMessage.InvalidNumber}`);

    return result;
}

export function parseToBool(value: string | number | boolean, key?: string) {
    if (undefined === value)
        throw new ForbiddenError(`${key}_${ErrorMessage.MissingBoolean}`);

    const lowercase = value
        .toString()
        .toLowerCase();

    if (lowercase === STRING_FALSE) return false;
    if (lowercase === STRING_N) return false;
    if (lowercase === STRING_NO) return false;

    if (lowercase === STRING_TRUE) return true;
    if (lowercase === STRING_Y) return true;
    if (lowercase === STRING_YES) return true;

    const number = Number(value);

    if (isNaN(number)) return true;
    if (number != 0) return true;

    return false;
}

export function parseToJSON<T>(data: string, def?: T): T {
    try {
        return JSON.parse(data) as T;
    } catch (e) {
        return def;
    }
}

export function toFirstUpperCase(value: string): string {
    return value[0].toUpperCase() + value.slice(1).toLowerCase();
}

export function toFirstLowerCase(value: string): string {
    return value[0].toLowerCase() + value.slice(1);
}

export function encodeString(value: string): string {
    return encodeURIComponent(value);
}

export function decodeString(value: string): string {
    return decodeURIComponent(value);
}

export function hexToByte(hex: string, index = 0) {
    return parseInt(hex.substr(index * 2, 2), 16);
}