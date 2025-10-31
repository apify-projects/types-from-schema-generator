import { hash } from 'crypto';
import { removeBlockComments } from './comments.ts';

export function isTsWithoutCommentsEqual(a: string, b: string) {
    return hash('sha256', removeBlockComments(a), 'hex') === hash('sha256', removeBlockComments(b), 'hex');
}
