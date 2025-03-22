type PayStubInputData = {
    employer: string;
    employers_address: string;
    pay_period_start: string;
    pay_period_end: string;
    regular_earnings?: string | number | null;
    employee_name: string;
    employee_address: string;
    pay_basis: string;
    hours?: number | string | null;
    pay_rate?: number | string | null;
    tax_filing_status?: string | null;
  };

 type EmploymentData = {
    employer: string;
    employers_address: string;
    employee_name: string;
    employee_address: string;
    paid_weekly: boolean,
    paid_monthly: boolean,
    paid_hourly:boolean
    pay_per_period: number,
    hours_per_week?: number
 }  
  
  export function processPayData(payData: PayStubInputData): EmploymentData {
    const processedData = { ...payData };
  
    // Convert string numbers to actual numbers if necessary
    const hours = processedData.hours
      ? Number(processedData.hours)
      : 0;
  
    const payRate = processedData.pay_rate
      ? Number(processedData.pay_rate)
      : undefined;
  
    const regularEarnings = processedData.regular_earnings
      ? Number(
          typeof processedData.regular_earnings === "string"
            ? processedData.regular_earnings.replace(/[^0-9.-]+/g, "")
            : processedData.regular_earnings
        )
      : 0;
      const weeks = calculateWeeks(processedData.pay_period_start, processedData.pay_period_end);
  
     const output: EmploymentData = {
        employer: payData.employer,
        employers_address: payData.employee_address,
        employee_name: payData.employee_name ,
        employee_address: payData.employee_address,
        paid_weekly: false,
        paid_monthly: false,
        paid_hourly: false,
        pay_per_period: 0
      };   
    // Switch on pay_basis
    switch (processedData.pay_basis?.toLowerCase()) {
      case "hourly":
        // Try to fill missing values based on the available data
        output.paid_hourly = true;
        let hoursPerWeek;
        if (!hours && payRate && regularEarnings) {
            const totalHours = regularEarnings / payRate;
            // Calculate hours per week based on the pay period duration
            hoursPerWeek = totalHours / weeks;
            output.hours_per_week = hoursPerWeek;
          }else if(hours){
            hoursPerWeek = hours/weeks;
            output.hours_per_week = hoursPerWeek;
          }
  
        if (!payRate && hoursPerWeek && regularEarnings) {
            output.pay_per_period = regularEarnings / hoursPerWeek;
        }
        if (payRate) {
            output.pay_per_period = payRate;
        }
        break;
      // You can add other cases for "Salaried", "Contract", etc.
      default:
        if(weeks===1){
            output.paid_weekly = true;
        }else{
            const weekly_pay = regularEarnings/weeks;
            output.paid_monthly = true;
            output.pay_per_period = weekly_pay * 4;
        }
        
      break;
    }
  
    return output;
  }

  function calculateWeeks(start: string, end: string): number {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffInMs = Math.abs(endDate.getTime() - startDate.getTime());
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    const weeks = diffInDays / 7;
  
    // Always return an integer, rounding up, with a minimum of 1
    return Math.max(Math.ceil(weeks), 1);
  }