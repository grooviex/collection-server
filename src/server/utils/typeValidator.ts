export function stringToNumber(string: string|undefined) {
    if (string) {
        let number = parseInt(string) || undefined;
        return number || "";

    } else throw Error('No string was given for converting!');

}