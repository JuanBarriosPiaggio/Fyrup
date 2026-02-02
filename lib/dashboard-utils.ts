// Helper function to extract status name from object or string
export function getStatusName(status: any): string {
  if (!status) return 'Unknown';
  return typeof status === 'object' ? status.Name : status;
}

// Calculate days between two dates
export function daysBetween(date1: Date, date2: Date): number {
  return Math.floor((date2.getTime() - date1.getTime()) / (1000 * 60 * 60 * 24));
}

// Check if invoice is overdue
export function isInvoiceOverdue(invoice: any, days: number = 30): boolean {
  if (invoice.IsPaid) return false;
  
  const issueDate = new Date(invoice.DateIssued);
  const today = new Date();
  const daysDiff = daysBetween(issueDate, today);
  
  return daysDiff > days;
}

// Calculate trend
export function calculateTrend(currentValue: number, previousValue: number) {
  if (previousValue === 0) return { change: 0, trend: 'up' as const };
  
  const change = ((currentValue - previousValue) / previousValue) * 100;
  
  return {
    change: Math.abs(change).toFixed(1),
    trend: change >= 0 ? 'up' as const : 'down' as const
  };
}

// Calculate metrics from invoices
export function calculateInvoiceMetrics(invoices: any[]) {
  const today = new Date();
  
  const total = invoices.length;
  const totalAmount = invoices.reduce((sum, inv) => sum + (inv.Total?.IncTax || 0), 0);
  
  const paid = invoices.filter(i => i.IsPaid === true);
  const paidAmount = paid.reduce((sum, inv) => sum + (inv.Total?.IncTax || 0), 0);
  
  const unpaid = invoices.filter(i => i.IsPaid === false);
  const unpaidAmount = unpaid.reduce((sum, inv) => sum + (inv.Total?.IncTax || inv.Total?.ExTax || 0), 0);
  
  const overdue = unpaid.filter(i => isInvoiceOverdue(i, 30));
  const overdueAmount = overdue.reduce((sum, inv) => sum + (inv.Total?.IncTax || inv.Total?.ExTax || 0), 0);
  
  return {
    total: {
      count: total,
      amount: totalAmount
    },
    paid: {
      count: paid.length,
      amount: paidAmount
    },
    outstanding: {
      count: unpaid.length,
      amount: unpaidAmount,
      overdueCount: overdue.length,
      overdueAmount: overdueAmount
    },
    overdue: {
      count: overdue.length,
      amount: overdueAmount
    }
  };
}

// Calculate metrics from quotes
export function calculateQuoteMetrics(quotes: any[]) {
  const openQuotes = quotes.filter(q => {
    const status = getStatusName(q.Status);
    return status?.toLowerCase() === 'open';
  });
  
  const acceptedQuotes = quotes.filter(q => {
    const status = getStatusName(q.Status);
    return status?.toLowerCase() === 'accepted';
  });
  
  const openAmount = openQuotes.reduce((sum, q) => sum + (q.Total?.IncTax || 0), 0);
  
  const acceptanceRate = quotes.length > 0 
    ? (acceptedQuotes.length / quotes.length) * 100 
    : 0;
  
  const pendingQuotes = openQuotes.filter(q => {
    const issueDate = new Date(q.DateIssued);
    const today = new Date();
    const daysDiff = daysBetween(issueDate, today);
    return daysDiff > 7;
  });
  
  const pendingAmount = pendingQuotes.reduce((sum, q) => sum + (q.Total?.IncTax || 0), 0);
  
  return {
    open: {
      count: openQuotes.length,
      amount: openAmount
    },
    accepted: {
      count: acceptedQuotes.length
    },
    acceptanceRate: acceptanceRate,
    pending: {
      count: pendingQuotes.length,
      amount: pendingAmount
    }
  };
}

// Calculate average days to pay
export function calculateAvgDaysToPay(invoices: any[]): number {
  const paidInvoices = invoices.filter(i => i.IsPaid === true && i.DatePaid);
  
  if (paidInvoices.length === 0) return 0;
  
  const totalDays = paidInvoices.reduce((sum, inv) => {
    const issued = new Date(inv.DateIssued);
    const paid = new Date(inv.DatePaid);
    const days = daysBetween(issued, paid);
    return sum + days;
  }, 0);
  
  return totalDays / paidInvoices.length;
}

// Format currency
export function formatCurrency(amount: number): string {
  return `£${amount.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

// Get recent jobs from jobs array
export function getRecentJobs(jobs: any[], limit: number = 5) {
  return jobs
    .sort((a, b) => new Date(b.DateIssued).getTime() - new Date(a.DateIssued).getTime())
    .slice(0, limit)
    .map(job => {
      const today = new Date();
      const issuedDate = new Date(job.DateIssued);
      const daysOpen = daysBetween(issuedDate, today);
      const status = getStatusName(job.Status)?.toLowerCase() || 'unknown';
      
      return {
        id: job.ID,
        client: job.Customer?.CompanyName || job.Customer?.GivenName + ' ' + job.Customer?.FamilyName || 'Unknown',
        status: status,
        value: formatCurrency(job.Total?.IncTax || 0),
        daysOpen: daysOpen
      };
    });
}

// Calculate top estimators (would need estimator data in quotes)
export function calculateTopEstimators(quotes: any[], limit: number = 5) {
  // Group by estimator
  const estimatorMap = quotes.reduce((acc: any, quote) => {
    const estimatorName = quote.Estimator?.Name || 'Unassigned';
    
    if (!acc[estimatorName]) {
      acc[estimatorName] = {
        name: estimatorName,
        revenue: 0,
        jobs: 0,
        accepted: 0
      };
    }
    
    const revenue = quote.Total?.IncTax || 0;
    const status = getStatusName(quote.Status)?.toLowerCase();
    
    acc[estimatorName].revenue += revenue;
    acc[estimatorName].jobs++;
    if (status === 'accepted') {
      acc[estimatorName].accepted++;
    }
    
    return acc;
  }, {});
  
  // Convert to array and calculate rates
  return Object.values(estimatorMap)
    .map((e: any) => ({
      name: e.name,
      revenue: formatCurrency(e.revenue),
      jobs: e.jobs,
      rate: Math.round((e.accepted / e.jobs) * 100)
    }))
    .sort((a: any, b: any) => {
      const aRevenue = parseFloat(a.revenue.slice(1).replace(/,/g, ''));
      const bRevenue = parseFloat(b.revenue.slice(1).replace(/,/g, ''));
      return bRevenue - aRevenue;
    })
    .slice(0, limit);
}

// Calculate invoice status distribution for donut chart
export function calculateInvoiceDistribution(invoices: any[]) {
  const metrics = calculateInvoiceMetrics(invoices);
  
  const currentOutstanding = metrics.outstanding.count - metrics.overdue.count;
  
  return {
    labels: ['Paid', 'Outstanding', 'Overdue'],
    values: [metrics.paid.count, currentOutstanding, metrics.overdue.count],
    colors: ['#10b981', 'var(--primary)', '#ef4444'],
    total: metrics.total.count
  };
}

// Calculate conversion funnel data
export function calculateConversionFunnel(quotes: any[], jobs: any[], invoices: any[]) {
  const quotesSent = quotes.length;
  const quotesAccepted = quotes.filter(q => {
    const status = getStatusName(q.Status)?.toLowerCase();
    return status === 'accepted';
  }).length;
  
  const jobsCreated = jobs.length;
  const jobsCompleted = jobs.filter(j => {
    const status = getStatusName(j.Status)?.toLowerCase();
    return status === 'completed' || status === 'complete';
  }).length;
  
  const invoicesIssued = invoices.length;
  
  return [
    { label: 'Quotes Sent', value: quotesSent, percentage: 100 },
    { label: 'Quotes Accepted', value: quotesAccepted, percentage: quotesSent > 0 ? (quotesAccepted / quotesSent) * 100 : 0 },
    { label: 'Jobs Created', value: jobsCreated, percentage: quotesSent > 0 ? (jobsCreated / quotesSent) * 100 : 0 },
    { label: 'Jobs Completed', value: jobsCompleted, percentage: quotesSent > 0 ? (jobsCompleted / quotesSent) * 100 : 0 },
    { label: 'Invoices Issued', value: invoicesIssued, percentage: quotesSent > 0 ? (invoicesIssued / quotesSent) * 100 : 0 }
  ];
}

// Calculate job completion rate
export function calculateJobCompletionRate(jobs: any[]): number {
  if (jobs.length === 0) return 0;
  
  const completedJobs = jobs.filter(j => {
    const status = getStatusName(j.Status)?.toLowerCase();
    return status === 'completed' || status === 'complete';
  });
  
  return Math.round((completedJobs.length / jobs.length) * 100);
}
