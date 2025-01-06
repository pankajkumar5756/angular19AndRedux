import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class DateValidatorService {
  constructor() {}

  // Custom date validator method
  static dateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      // If value is not a valid date object, return error
      if (!value || !(value instanceof Date) || isNaN(value.getTime())) {
        return { invalidDate: 'Invalid date.' };
      }

      // Format the date to "31 Jan 2022"
      const formattedDate = this.formatDate(value);

      // You can add your custom validation logic for the formatted date here if needed.

      // Just for demonstration, logging the formatted date
      console.log(formattedDate); // Example output: "31 Jan 2022"

      // Example additional validation: check if it's a valid date in the required format (dd MMM yyyy)
      const regex = /^(0[1-9]|[12][0-9]|3[01])\s[A-Za-z]{3}\s\d{4}$/;
      if (!regex.test(formattedDate)) {
        return { invalidDateFormat: 'Invalid date format. Please use dd MMM yyyy.' };
      }

      return null; // Valid date
    };
  }

  // Helper method to format a date object to "31 Jan 2022"
  static formatDate(date: Date): string {
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' }); // Gets the short month name
    const year = date.getFullYear();

    // Format date as "31 Jan 2022"
    return `${day.toString().padStart(2, '0')} ${month} ${year}`;
  }
}
