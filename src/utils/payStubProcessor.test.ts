

import { processPayData } from './payStubProcessor';

const salaried = 
{
  "employer": "Some Inc",
  "employers_address": "8878 Some Street Suite 304 SomePlace, ST 15237",
  "pay_period_start": "11/03/2024",
  "pay_period_end": "11/16/2024",
  "regular_earnings": "6590.31",
  "employee_name": "Jimmie Cho",
  "employee_address": "35 Shoe Way, CA 10011-1867",
  "pay_basis": "Salaried",
  "tax_filing_status": "married",
  "hours": "0.00",
  "pay_rate": null
} 

const hourly = 
    {
      "employer": "Design LLC",
      "employers_address": "41, Any Street Any Town, CA 94578",
      "pay_period_start": "Jan 01, 2023",
      "pay_period_end": "Jan 07, 2023",
      "regular_earnings": "$600.00",
      "employee_name": "George Mathew",
      "employee_address": "1839, Echo Lane San Leandro, CA 94578",
      "pay_basis": "Hourly",
      "tax_filing_status": null,
      "hours": "40"
    };

    const hourly2 = 
    {
      "employer": "Design LLC",
      "employers_address": "41, Any Street Any Town, CA 94578",
      "pay_period_start": "Jan 01, 2023",
      "pay_period_end": "Jan 07, 2023",
      "regular_earnings": "$600.00",
      "employee_name": "George Mathew",
      "employee_address": "1839, Echo Lane San Leandro, CA 94578",
      "pay_basis": "Hourly",
      "tax_filing_status": null,
      "pay_rate":"15"
    };    


describe('processPayData', () => {
  it('calculates hours per week for hourly pay', () => {
    
    const result = processPayData(hourly);
    expect(result.hours_per_week).toBeCloseTo(40);
  });
});

describe('processPayData', () => {
    it('calculates hours per week for hourly pay', () => {
      
      const result = processPayData(hourly2);
      expect(result.pay_per_period).toBeCloseTo(15);
    });
  });

  describe('processPayData', () => {
    it('calculates hours per week for hourly pay', () => {
      
      const result = processPayData(salaried);
      expect(result.pay_per_period).toBeCloseTo(13180.62);
    });
  });  
