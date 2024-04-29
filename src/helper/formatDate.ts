/** 
 * Is a helper function, formatDate(), that is used anytime a user
 * is asked to give a date to the database. This funciton helps with
 * unifying the dates for our program.
 * 
 * Help From: https:
 *      stackoverflow.com/questions/1643320/get-month-name-from-date
 *      https://stackoverflow.com/questions/2013255/how-to-get-year-month-day-from-a-date-object
 *      https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDate
 *      https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getMonth
 *      https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getFullYear
 * 
 * Author: Clayton Nolen
 * Last Modified: April 28, 2024
 */

export function formatDate(dateString: string) {
    // Creates a new date object for dateString.
    const date = new Date(dateString);
    
    // Formats the day.
    const day = date.getDate() + 1;

    // Formats the month.
    const monthIndex = date.getMonth();

    // Formats the year.
    const year = date.getFullYear();

    // Creates the name for each month in a year and stores it in an array of monthNames.
    const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec'
    ];

    // Formats each month name with the order at which they appear in the year.
    // This is made up by the order the monthNames array is sorted in by the programmer.
    const month = monthNames[monthIndex];

    // Constructs the formatted date as a string in the order of dd/mm/yyyy.
    const formattedDate = `${day} ${month} ${year}`;

    // Returns the formatted date as a string.
    return formattedDate;
}