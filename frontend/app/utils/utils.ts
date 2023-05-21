export function calcDuration(start: string, end: string): number  {
    const millisecondsPerDay = 24 * 60 * 60 * 1000; // Number of milliseconds in a day

    const startDate = Date.parse(start);
    const endDate = Date.parse(end)

    if (isNaN(startDate) || isNaN(endDate)) {
        throw new Error("Invalid date format")
    }
    const differenceMilliseconds = Math.abs(startDate - endDate);
    const daysDifference = Math.floor(differenceMilliseconds / millisecondsPerDay);

    return daysDifference;
}

export const generateRandomNumber = () => {
    const min = Math.pow(10, 4); // Minimum value for 5 digits (10000)
    const max = Math.pow(10, 5) - 1; // Maximum value for 5 digits (99999)
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
};
