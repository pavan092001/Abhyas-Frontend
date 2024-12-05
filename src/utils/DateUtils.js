export function getFormattedDate(date) {
    const today = date;  // Get current date
    const year = today.getFullYear();  // Get the year
    const month = String(today.getMonth() + 1).padStart(2, '0');  // Get month (add 1 as months are 0-indexed)
    const day = String(today.getDate()).padStart(2, '0');  // Get day of the month
  
    // Return the formatted date in yyyy-MM-dd format
    return `${year}-${month}-${day}`;
  }