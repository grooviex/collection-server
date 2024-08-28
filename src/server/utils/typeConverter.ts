export function stringToNumber(string: string|string[]|undefined, throwError:boolean = false): number|number[]|undefined {
    if (string) {

        if(typeof string === "string") {
            try {
                return parseInt(string);
            } catch (e) {
                throw Error('ID needs to be a number!')
            }
        }

        let result: number[] = [];
        for (const st in string) {
            try {
                result.push(parseInt(st));
            } catch (e) {
                if (throwError) throw Error('A string you have given could not be converted!');
            }
        }
        return result;

    } else {
        if (throwError) throw Error('No string was given!');
        else return undefined
    }
}