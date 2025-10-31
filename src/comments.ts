export function removeBlockComments(str: string) {
    // .*? is a non-greedy match, so it will match as few characters as possible
    // this is important so code between blocks is not removed
    return str.replaceAll(/\/\*.*?\*\//g, '');
}
