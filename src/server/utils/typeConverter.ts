
export function stringToNumber(string: any): number|number[] {
    if (string) {

        if(typeof string === "string") {
            try {
                return parseInt(string);
            } catch (e) {
                throw Error('ID needs to be a number!')
            }
        } else {
            let result: number[] = [];
            string.forEach((str: any) => {
                try {
                    result.push(parseInt(str));
                } catch (e) {
                    throw Error('A string you have given could not be converted!');
                }
            });

            return result;
        }
    } else {
        throw Error('No string was given!');
    }
}