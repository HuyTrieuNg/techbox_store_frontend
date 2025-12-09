/**
 * Date Utility Functions for Dashboard Reporting
 * Handles ISO date formatting and date range calculations
 */

/**
 * Format a date to ISO local datetime string (yyyy-MM-ddTHH:mm:ss)
 * @param date - Date object to format
 * @returns ISO formatted date string
 */
export function formatToISODateTime(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}

/**
 * Format a date to ISO date string (yyyy-MM-dd) with time set to 00:00:00
 * @param date - Date object to format
 * @returns ISO formatted date string with time 00:00:00
 */
export function formatToISODateStart(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}T00:00:00`;
}

/**
 * Format a date to ISO date string with time set to 23:59:59
 * @param date - Date object to format
 * @returns ISO formatted date string with time 23:59:59
 */
export function formatToISODateEnd(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}T23:59:59`;
}

/**
 * Parse ISO datetime string to Date object
 * @param isoString - ISO formatted date string
 * @returns Date object
 */
export function parseISODateTime(isoString: string): Date {
  return new Date(isoString);
}

/**
 * Get the start of current month
 * @returns Date set to first day of current month at 00:00:00
 */
export function getStartOfMonth(): Date {
  const today = new Date();
  return new Date(today.getFullYear(), today.getMonth(), 1, 0, 0, 0);
}

/**
 * Get the end of current month
 * @returns Date set to last day of current month at 23:59:59
 */
export function getEndOfMonth(): Date {
  const today = new Date();
  const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59);
  return lastDay;
}

/**
 * Get the start of current week (Monday)
 * @returns Date set to Monday of current week at 00:00:00
 */
export function getStartOfWeek(): Date {
  const today = new Date();
  const day = today.getDay();
  const diff = today.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Sunday
  return new Date(today.getFullYear(), today.getMonth(), diff, 0, 0, 0);
}

/**
 * Get the end of current week (Sunday)
 * @returns Date set to Sunday of current week at 23:59:59
 */
export function getEndOfWeek(): Date {
  const start = getStartOfWeek();
  const end = new Date(start);
  end.setDate(end.getDate() + 6);
  end.setHours(23, 59, 59, 999);
  return end;
}

/**
 * Get the start of last 30 days
 * @returns Date 30 days ago at 00:00:00
 */
export function getStartOf30Days(): Date {
  const today = new Date();
  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  thirtyDaysAgo.setHours(0, 0, 0, 0);
  return thirtyDaysAgo;
}

/**
 * Get today's date
 * @returns Date set to today at 23:59:59
 */
export function getTodayEnd(): Date {
  const today = new Date();
  return new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);
}

/**
 * Get start of today
 * @returns Date set to today at 00:00:00
 */
export function getTodayStart(): Date {
  const today = new Date();
  return new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0);
}

/**
 * Format display text for a date range (Vietnamese)
 * @param startDate - Start date
 * @param endDate - End date
 * @returns Formatted text like "01/01/2024 - 31/01/2024"
 */
export function formatDateRangeDisplay(startDate: Date, endDate: Date): string {
  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
}

/**
 * Check if a date range is valid
 * @param startDate - Start date
 * @param endDate - End date
 * @returns true if endDate is >= startDate
 */
export function isValidDateRange(startDate: Date, endDate: Date): boolean {
  return endDate >= startDate;
}

/**
 * Get number of days between two dates
 * @param startDate - Start date
 * @param endDate - End date
 * @returns Number of days
 */
export function getDaysDifference(startDate: Date, endDate: Date): number {
  const msPerDay = 24 * 60 * 60 * 1000;
  return Math.ceil((endDate.getTime() - startDate.getTime()) / msPerDay);
}
