// Helper function that checks if a string input is a whole number

export function wholeCheck(input: string) {
    if(isNaN(Number(input))) {
        return alert('Pease enter a positive whole number for max weight.');
    }
    
    let numInput: number = +input;
    if(numInput > 0)
}