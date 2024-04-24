// Helper function that checks if a string input is a whole number
// Converting string to a number in TS: https://www.tutorialspoint.com/how-to-convert-string-to-number-in-typescript
// using isNan() in TS: https://www.w3schools.com/jsref/jsref_isnan.asp
export function wholeCheck(input: string) {
    if(isNaN(Number(input))) {
        return false;
    }
    // Because input is a number at this point, change it to a number type
    let numInput: number = +input;
    // Make sure that the number is not a decomal
     if(!(Number.isInteger(numInput))) {
        return false;
    } else if (numInput < 1) {
        return false;
    } else {
        return true;
    }
}
