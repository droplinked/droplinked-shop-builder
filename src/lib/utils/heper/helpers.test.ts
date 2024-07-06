import { time_ago } from "./helpers";

describe('time_ago', () => {
  it('should return "Invalid date" for an invalid date string', () => {
    expect(time_ago('invalid-date')).toBe('Invalid date');
  });

  it('should return "less than a day ago" for dates within the same day', () => {
    const now = new Date();
    const date_string = now.toISOString();
    expect(time_ago(date_string)).toBe('less than a day ago');
  });

  it('should return "1 day ago" for a date exactly one day ago', () => {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    const date_string = date.toISOString();
    expect(time_ago(date_string)).toBe('1 day ago');
  });

  it('should return "5 days ago" for a date five days ago', () => {
    const date = new Date();
    date.setDate(date.getDate() - 5);
    const date_string = date.toISOString();
    expect(time_ago(date_string)).toBe('5 days ago');
  });

  it('should return "1 month ago" for a date one month ago', () => {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    const date_string = date.toISOString();
    expect(time_ago(date_string)).toBe('1 month ago');
  });

  it('should return "5 months ago" for a date five months ago', () => {
    const date = new Date();
    date.setMonth(date.getMonth() - 5);
    const date_string = date.toISOString();
    expect(time_ago(date_string)).toBe('5 months ago');
  });

  it('should return the formatted date for a date more than five months ago', () => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 1);
    date.setMonth(date.getMonth() - 6);
    const date_string = date.toISOString();
    const expected_format = new Intl.DateTimeFormat('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
    expect(time_ago(date_string)).toBe(expected_format);
  });
});