/*
**	Copyright 2025 Just You And Me.
**
**  Under GNU General Public License :) 
**	This program is free software: you can redistribute it and/or modify
**	it under the terms of the GNU General Public License as published by
**	the Free Software Foundation, either version 3 of the License, or
**	(at your option) any later version.
**
**	This program is distributed in the hope that it will be useful,
**	but WITHOUT ANY WARRANTY; without even the implied warranty of
**	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
**	GNU General Public License for more details.
**
**	You should have received a copy of the GNU General Public License
**	along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/***********************************************************************************************
 ***                  F A KE T E R M I N A L - F a k e L i nux S t u d i o s                 ***
 ***********************************************************************************************
 *                                                                                             *
 *                 Project Name : The Linux Project                                            *
 *                                                                                             *
 *                     $Archive:: /Sun/_WSProto.h                                              *
 *                                                                                             *
 *                      $Author:: Me                                                           *
 *                                                                                             *
 *                     $Modtime:: 8/06/24 5:31p                                                *
 *                                                                                             *
 *                    $Revision:: 3                                                            *
 *                                                                                             *
 *---------------------------------------------------------------------------------------------*
 * Functions:                                                                                  *
 * Obtain current time and some other data for timeouts                                        *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
// Cloth Config API

// Configuraciones generales
const defaultTimezone = "America/New_York"; // Zona horaria por defecto

// Funciones de manejo de fecha y hora
function getCurrentDateTime(timezone = defaultTimezone) {
  return new Date().toLocaleString("en-US", { timeZone: timezone });
}

function getCurrentDate(timezone = defaultTimezone) {
  return new Date().toLocaleDateString("en-US", { timeZone: timezone });
}

function getCurrentTime(timezone = defaultTimezone) {
  return new Date().toLocaleTimeString("en-US", { timeZone: timezone });
}

function getCurrentDay(timezone = defaultTimezone) {
  return new Date().getDate();
}

function getCurrentWeek(timezone = defaultTimezone) {
  const currentDate = new Date();
  const firstDay = new Date(currentDate.getFullYear(), 0, 1);
  const days = Math.floor((currentDate - firstDay) / (24 * 60 * 60 * 1000));
  return Math.ceil((days + firstDay.getDay() + 1) / 7);
}

function getCurrentMonth(timezone = defaultTimezone) {
  return new Date().toLocaleString("en-US", {
    month: "long",
    timeZone: timezone
  });
}

// Funciones de conversión entre zonas horarias
function convertToTimezone(date, fromTimezone, toTimezone) {
  const fromDate = new Date(date).toLocaleString("en-US", {
    timeZone: fromTimezone
  });
  return new Date(fromDate).toLocaleString("en-US", { timeZone: toTimezone });
}

function convertToUtc(date) {
  return new Date(date).toISOString();
}

function convertFromUtc(date, timezone = defaultTimezone) {
  return new Date(date).toLocaleString("en-US", { timeZone: timezone });
}

// Funciones de diferencia entre fechas
function getDateDifference(date1, date2) {
  const diff = Math.abs(new Date(date1) - new Date(date2));
  const duration = {
    years: Math.floor(diff / (1000 * 60 * 60 * 24 * 365)),
    months: Math.floor(diff / (1000 * 60 * 60 * 24 * 30)),
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor(diff / (1000 * 60 * 60)),
    minutes: Math.floor(diff / (1000 * 60)),
    seconds: Math.floor(diff / 1000)
  };
  return duration;
}

function getDateFromNow(amount, unit = "days") {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + amount);
  return currentDate.toLocaleString("en-US");
}

function getDateAgo(amount, unit = "days") {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - amount);
  return currentDate.toLocaleString("en-US");
}

// Funciones de validación de fechas
function isValidDate(date) {
  return !isNaN(Date.parse(date));
}

function isLeapYear(year) {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

function isToday(date) {
  const today = new Date();
  const inputDate = new Date(date);
  return today.toLocaleDateString() === inputDate.toLocaleDateString();
}

function isTomorrow(date) {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const inputDate = new Date(date);
  return tomorrow.toLocaleDateString() === inputDate.toLocaleDateString();
}

function isPast(date) {
  return new Date(date) < new Date();
}

function isFuture(date) {
  return new Date(date) > new Date();
}

// Funciones de inicio y fin de unidades de tiempo
function getStartOfYear(date = new Date()) {
  return new Date(date.getFullYear(), 0, 1).toLocaleString("en-US");
}

function getEndOfYear(date = new Date()) {
  return new Date(date.getFullYear(), 11, 31).toLocaleString("en-US");
}

function getStartOfMonth(date = new Date()) {
  return new Date(date.getFullYear(), date.getMonth(), 1).toLocaleString(
    "en-US"
  );
}

function getEndOfMonth(date = new Date()) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).toLocaleString(
    "en-US"
  );
}

function getStartOfWeek(date = new Date()) {
  const day = date.getDay(),
    diff = date.getDate() - day + (day == 0 ? -6 : 1); // Adjusting for Sunday
  const startOfWeek = new Date(date.setDate(diff));
  return startOfWeek.toLocaleString("en-US");
}

function getEndOfWeek(date = new Date()) {
  const day = date.getDay(),
    diff = date.getDate() - day + (day == 0 ? 0 : 6); // Adjusting for Sunday
  const endOfWeek = new Date(date.setDate(diff));
  return endOfWeek.toLocaleString("en-US");
}

function getStartOfDay(date = new Date()) {
  return new Date(date.setHours(0, 0, 0, 0)).toLocaleString("en-US");
}

function getEndOfDay(date = new Date()) {
  return new Date(date.setHours(23, 59, 59, 999)).toLocaleString("en-US");
}

// Funciones para manipulación de fechas
function addTimeToDate(date, amount, unit = "days") {
  const newDate = new Date(date);
  if (unit === "days") newDate.setDate(newDate.getDate() + amount);
  if (unit === "months") newDate.setMonth(newDate.getMonth() + amount);
  if (unit === "years") newDate.setFullYear(newDate.getFullYear() + amount);
  return newDate.toLocaleString("en-US");
}

function subtractTimeFromDate(date, amount, unit = "days") {
  const newDate = new Date(date);
  if (unit === "days") newDate.setDate(newDate.getDate() - amount);
  if (unit === "months") newDate.setMonth(newDate.getMonth() - amount);
  if (unit === "years") newDate.setFullYear(newDate.getFullYear() - amount);
  return newDate.toLocaleString("en-US");
}

function setTime(date, hour, minute = 0, second = 0) {
  const newDate = new Date(date);
  newDate.setHours(hour, minute, second);
  return newDate.toLocaleString("en-US");
}

// Funciones de días de la semana y meses
function getDayOfWeek(date) {
  return new Date(date).toLocaleString("en-US", { weekday: "long" });
}

function getMonthOfYear(date) {
  return new Date(date).toLocaleString("en-US", { month: "long" });
}

function getDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

// Funciones de formateo avanzado
function formatToCustomFormat(date, format) {
  // A simple example using toLocaleString with custom formatting
  return new Date(date).toLocaleString("en-US");
}

function parseFromCustomFormat(date, format) {
  return new Date(date);
}

// Funciones de comparación de fechas
function compareDates(date1, date2) {
  if (new Date(date1) < new Date(date2)) {
    return -1; // date1 es antes
  } else if (new Date(date1) > new Date(date2)) {
    return 1; // date1 es después
  } else {
    return 0; // ambas fechas son iguales
  }
}

module.exports = {
  getCurrentDateTime,
  getCurrentDate,
  getCurrentTime,
  getCurrentDay,
  getCurrentWeek,
  getCurrentMonth,
  convertToTimezone,
  convertToUtc,
  convertFromUtc,
  getDateDifference,
  getDateFromNow,
  getDateAgo,
  isValidDate,
  isLeapYear,
  isToday,
  isTomorrow,
  isPast,
  isFuture,
  getStartOfYear,
  getEndOfYear,
  getStartOfMonth,
  getEndOfMonth,
  getStartOfWeek,
  getEndOfWeek,
  getStartOfDay,
  getEndOfDay,
  addTimeToDate,
  subtractTimeFromDate,
  setTime,
  getDayOfWeek,
  getMonthOfYear,
  getDaysInMonth,
  formatToCustomFormat,
  parseFromCustomFormat,
  compareDates
};
