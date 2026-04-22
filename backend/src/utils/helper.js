import { nanoid } from 'nanoid';
export function generateShortId(length = 8) {
    return nanoid(length);
}
