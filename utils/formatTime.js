export function formatDateToIST(dateString) {
    const [datePart] = dateString.split(" ");
    const [year, month, day] = datePart.split("-");

    // Create a Date object (assuming input is UTC)
    const date = new Date(Date.UTC(year, month - 1, day));

    // Convert to IST by adding 5 hours 30 minutes
    date.setHours(date.getHours() + 5);
    date.setMinutes(date.getMinutes() + 30);

    // Format date as DD/MM/YYYY
    return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });
}

export function formatTimeToIST(dateString) {
    const [datePart, timePart] = dateString.split(" ");
    const [year, month, day] = datePart.split("-");
    const [hour, minute, second] = timePart.split(":");

    // Create a Date object (assuming input is UTC)
    const date = new Date(Date.UTC(year, month - 1, day, hour, minute, second));

    // Convert to IST by adding 5 hours 30 minutes
    date.setHours(date.getHours() + 5);
    date.setMinutes(date.getMinutes() + 30);

    // Format time as HH:MM AM/PM
    return date.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        // second: "2-digit",
        hour12: true
    });
}
