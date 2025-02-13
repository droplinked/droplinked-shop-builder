/**
 * DateTypes
 * Represents different time ranges for filtering hot products.
 */
export type DateTypes = 
  | { label: 'Today'; value: 'daily' }
  | { label: 'This week'; value: 'weekly' }
  | { label: 'This month'; value: 'monthly' };

/**
 * dates_constant
 * A predefined list of date filter options.
 */
export const dates_constant: DateTypes[] = [
  { label: 'Today', value: 'daily' },       
  { label: 'This week', value: 'weekly' },  
  { label: 'This month', value: 'monthly' } 
];
