# Dashboard API Integration Specification

## 📋 Overview

This document provides the exact API calls and data transformations needed to populate each dashboard component with live Simpro data.

---

## 🔑 Authentication

All API calls require Bearer token authentication:

```javascript
const headers = {
  'Authorization': `Bearer ${process.env.SIMPRO_API_TOKEN}`,
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

const BASE_URL = `${process.env.SIMPRO_API_URL}/companies/${process.env.SIMPRO_COMPANY_ID}`;
```

---

## 📊 Financial Summary Cards

### 1. Total Invoices Card

**API Call:**
```javascript
GET ${BASE_URL}/invoices/?pageSize=250&columns=ID,DateIssued,Total,IsPaid

// Filter by date range
const startDate = getStartDate(dateFilter); // e.g., 30 days ago
const invoices = data.filter(i => new Date(i.DateIssued) >= startDate);
```

**Data Transformation:**
```javascript
const totalInvoices = {
  value: invoices.length,
  amount: invoices.reduce((sum, i) => sum + (i.Total?.IncTax || 0), 0),
  change: calculateTrend(invoices.length, previousPeriodCount),
  trend: invoices.length > previousPeriodCount ? 'up' : 'down'
};

// Format amount
const formattedAmount = `£${totalInvoices.amount.toLocaleString('en-GB', { minimumFractionDigits: 0 })}`;
```

**Response Schema:**
```typescript
interface Invoice {
  ID: number;
  DateIssued: string; // ISO date
  IsPaid: boolean;
  Total: {
    IncTax: number;
    ExTax: number;
    BalanceDue: number;
  };
}
```

---

### 2. Outstanding Invoices Card

**API Call:**
```javascript
GET ${BASE_URL}/invoices/?pageSize=250&columns=ID,DateIssued,Total,IsPaid

// Filter unpaid invoices
const outstanding = invoices.filter(i => i.IsPaid === false);

// Calculate overdue (> 30 days)
const today = new Date();
const overdue = outstanding.filter(i => {
  const issueDate = new Date(i.DateIssued);
  const daysDiff = Math.floor((today - issueDate) / (1000 * 60 * 60 * 24));
  return daysDiff > 30;
});
```

**Data Transformation:**
```javascript
const outstandingData = {
  value: outstanding.length,
  amount: outstanding.reduce((sum, i) => sum + (i.Total?.BalanceDue || 0), 0),
  overdueCount: overdue.length,
  overdueAmount: overdue.reduce((sum, i) => sum + (i.Total?.BalanceDue || 0), 0),
  change: calculateTrend(outstanding.length, previousOutstanding),
  trend: outstanding.length < previousOutstanding ? 'down' : 'up' // Lower is better
};
```

---

### 3. Paid Invoices Card

**API Call:**
```javascript
GET ${BASE_URL}/invoices/?pageSize=250&columns=ID,DateIssued,Total,IsPaid

const paid = invoices.filter(i => i.IsPaid === true);
```

**Data Transformation:**
```javascript
const paidData = {
  value: paid.length,
  amount: paid.reduce((sum, i) => sum + (i.Total?.IncTax || 0), 0),
  change: calculateTrend(paid.length, previousPaid),
  trend: paid.length > previousPaid ? 'up' : 'down'
};
```

---

### 4. Open Quotes Card

**API Call:**
```javascript
GET ${BASE_URL}/quotes/?pageSize=250&columns=ID,DateIssued,Status,Total

// Filter open quotes
const openQuotes = quotes.filter(q => {
  const status = typeof q.Status === 'object' ? q.Status.Name : q.Status;
  return status?.toLowerCase() === 'open';
});
```

**Data Transformation:**
```javascript
const quoteData = {
  value: openQuotes.length,
  amount: openQuotes.reduce((sum, q) => sum + (q.Total?.IncTax || 0), 0),
  change: calculateTrend(openQuotes.length, previousOpen),
  trend: openQuotes.length > previousOpen ? 'up' : 'down'
};
```

**Note:** Handle Status field being object or string:
```javascript
function getStatusName(status) {
  return typeof status === 'object' ? status.Name : status;
}
```

---

### 5. Quote Acceptance Rate Card

**API Call:**
```javascript
GET ${BASE_URL}/quotes/?pageSize=250&columns=ID,DateIssued,Status

const periodQuotes = quotes.filter(q => isInDateRange(q.DateIssued, dateFilter));
const acceptedQuotes = periodQuotes.filter(q => {
  const status = getStatusName(q.Status);
  return status?.toLowerCase() === 'accepted';
});
```

**Data Transformation:**
```javascript
const acceptanceRate = {
  value: Math.round((acceptedQuotes.length / periodQuotes.length) * 100),
  change: calculateTrend(currentRate, previousRate),
  trend: currentRate > previousRate ? 'up' : 'down',
  acceptedCount: acceptedQuotes.length,
  totalCount: periodQuotes.length
};
```

---

## 🚨 Actionable Insights Cards

### 1. Overdue Invoices Alert

**API Call:**
```javascript
GET ${BASE_URL}/invoices/?pageSize=250&columns=ID,DateIssued,Total,IsPaid,Customer

const overdueInvoices = invoices.filter(i => {
  if (i.IsPaid === true) return false;
  
  const issueDate = new Date(i.DateIssued);
  const today = new Date();
  const daysDiff = Math.floor((today - issueDate) / (1000 * 60 * 60 * 24));
  
  return daysDiff > 30;
});
```

**Data Transformation:**
```javascript
const overdueAlert = {
  type: 'critical',
  count: overdueInvoices.length,
  text: 'Invoices overdue > 30 days',
  value: `£${overdueInvoices.reduce((sum, i) => sum + (i.Total?.BalanceDue || 0), 0).toLocaleString('en-GB')}`,
  details: overdueInvoices.map(i => ({
    id: i.ID,
    customer: i.Customer?.CompanyName,
    amount: i.Total?.BalanceDue,
    daysOverdue: Math.floor((new Date() - new Date(i.DateIssued)) / (1000 * 60 * 60 * 24))
  }))
};
```

---

### 2. Pending Quotes Alert

**API Call:**
```javascript
GET ${BASE_URL}/quotes/?pageSize=250&columns=ID,DateIssued,Status,Total

const pendingQuotes = quotes.filter(q => {
  const status = getStatusName(q.Status);
  if (status?.toLowerCase() !== 'open') return false;
  
  const issueDate = new Date(q.DateIssued);
  const today = new Date();
  const daysDiff = Math.floor((today - issueDate) / (1000 * 60 * 60 * 24));
  
  return daysDiff > 7;
});
```

**Data Transformation:**
```javascript
const pendingAlert = {
  type: 'warning',
  count: pendingQuotes.length,
  text: 'Quotes pending approval > 7 days',
  value: `£${pendingQuotes.reduce((sum, q) => sum + (q.Total?.IncTax || 0), 0).toLocaleString('en-GB')}`
};
```

---

### 3. Completed Jobs Not Invoiced Alert

**API Call:**
```javascript
// Get completed jobs
GET ${BASE_URL}/jobs/?pageSize=250&columns=ID,Status,Customer,Total

// Get all invoices for matching
GET ${BASE_URL}/invoices/?pageSize=250&columns=ID,Customer

const completedJobs = jobs.filter(j => {
  const status = getStatusName(j.Status);
  return status?.toLowerCase() === 'completed';
});

// Match jobs to invoices by customer
const jobsNotInvoiced = completedJobs.filter(job => {
  const hasInvoice = invoices.some(inv => 
    inv.Customer?.ID === job.Customer?.ID
  );
  return !hasInvoice;
});
```

**Data Transformation:**
```javascript
const notInvoicedAlert = {
  type: 'info',
  count: jobsNotInvoiced.length,
  text: 'Jobs completed but not invoiced',
  value: `£${jobsNotInvoiced.reduce((sum, j) => sum + (j.Total?.IncTax || 0), 0).toLocaleString('en-GB')}`
};
```

---

## 📈 Chart Data

### Invoice Status Donut Chart

**API Call:**
```javascript
GET ${BASE_URL}/invoices/?pageSize=250&columns=ID,DateIssued,IsPaid,Total

const today = new Date();

const paidInvoices = invoices.filter(i => i.IsPaid === true);
const unpaidInvoices = invoices.filter(i => i.IsPaid === false);

const overdueInvoices = unpaidInvoices.filter(i => {
  const daysDiff = Math.floor((today - new Date(i.DateIssued)) / (1000 * 60 * 60 * 24));
  return daysDiff > 30;
});

const currentOutstanding = unpaidInvoices.filter(i => {
  const daysDiff = Math.floor((today - new Date(i.DateIssued)) / (1000 * 60 * 60 * 24));
  return daysDiff <= 30;
});
```

**Chart Data:**
```javascript
const donutData = {
  labels: ['Paid', 'Outstanding', 'Overdue'],
  values: [paidInvoices.length, currentOutstanding.length, overdueInvoices.length],
  colors: ['#10b981', 'var(--primary)', '#ef4444'],
  total: invoices.length
};
```

---

### Conversion Funnel Chart

**API Calls:**
```javascript
// 1. Quotes sent
GET ${BASE_URL}/quotes/?pageSize=250&columns=ID,DateIssued,Status

const quotesSent = quotes.filter(q => isInDateRange(q.DateIssued, dateFilter));

// 2. Quotes accepted
const quotesAccepted = quotesSent.filter(q => {
  const status = getStatusName(q.Status);
  return status?.toLowerCase() === 'accepted';
});

// 3. Jobs created (from accepted quotes)
GET ${BASE_URL}/jobs/?pageSize=250&columns=ID,DateCreated,Status

const jobsCreated = jobs.filter(j => isInDateRange(j.DateCreated, dateFilter));

// 4. Jobs completed
const jobsCompleted = jobsCreated.filter(j => {
  const status = getStatusName(j.Status);
  return status?.toLowerCase() === 'completed';
});

// 5. Invoices issued
GET ${BASE_URL}/invoices/?pageSize=250&columns=ID,DateIssued

const invoicesIssued = invoices.filter(i => isInDateRange(i.DateIssued, dateFilter));
```

**Chart Data:**
```javascript
const funnelData = [
  { label: 'Quotes Sent', value: quotesSent.length, percentage: 100 },
  { label: 'Quotes Accepted', value: quotesAccepted.length, percentage: (quotesAccepted.length / quotesSent.length) * 100 },
  { label: 'Jobs Created', value: jobsCreated.length, percentage: (jobsCreated.length / quotesSent.length) * 100 },
  { label: 'Jobs Completed', value: jobsCompleted.length, percentage: (jobsCompleted.length / quotesSent.length) * 100 },
  { label: 'Invoices Issued', value: invoicesIssued.length, percentage: (invoicesIssued.length / quotesSent.length) * 100 }
];
```

---

## 📋 Recent Jobs Table

**API Call:**
```javascript
GET ${BASE_URL}/jobs/?pageSize=250&columns=ID,Customer,Status,Total,DateCreated

// Sort by most recent
const recentJobs = jobs
  .sort((a, b) => new Date(b.DateCreated) - new Date(a.DateCreated))
  .slice(0, 5); // Top 5 most recent
```

**Data Transformation:**
```javascript
const tableData = recentJobs.map(job => {
  const today = new Date();
  const createdDate = new Date(job.DateCreated);
  const daysOpen = Math.floor((today - createdDate) / (1000 * 60 * 60 * 24));
  
  return {
    id: job.ID,
    client: job.Customer?.CompanyName || 'Unknown',
    status: getStatusName(job.Status)?.toLowerCase(),
    value: `£${(job.Total?.IncTax || 0).toLocaleString('en-GB')}`,
    daysOpen: daysOpen
  };
});
```

---

## 👥 Top Estimators Panel

**API Call:**
```javascript
GET ${BASE_URL}/quotes/?pageSize=250&columns=ID,Estimator,Total,Status,DateIssued

const periodQuotes = quotes.filter(q => isInDateRange(q.DateIssued, dateFilter));

// Group by estimator
const estimatorStats = periodQuotes.reduce((acc, quote) => {
  const estimator = quote.Estimator?.Name || 'Unassigned';
  
  if (!acc[estimator]) {
    acc[estimator] = {
      name: estimator,
      revenue: 0,
      jobs: 0,
      accepted: 0
    };
  }
  
  const revenue = quote.Total?.IncTax || 0;
  const status = getStatusName(quote.Status);
  
  acc[estimator].revenue += revenue;
  acc[estimator].jobs++;
  if (status?.toLowerCase() === 'accepted') {
    acc[estimator].accepted++;
  }
  
  return acc;
}, {});
```

**Data Transformation:**
```javascript
const topEstimators = Object.values(estimatorStats)
  .map(e => ({
    name: e.name,
    revenue: `£${e.revenue.toLocaleString('en-GB')}`,
    jobs: e.jobs,
    rate: Math.round((e.accepted / e.jobs) * 100)
  }))
  .sort((a, b) => parseFloat(b.revenue.slice(1).replace(/,/g, '')) - parseFloat(a.revenue.slice(1).replace(/,/g, '')))
  .slice(0, 5); // Top 5
```

---

## 📊 KPI Calculations

### 1. Average Days to Pay

**API Call:**
```javascript
GET ${BASE_URL}/invoices/?pageSize=250&columns=ID,DateIssued,DatePaid,IsPaid

const paidInvoices = invoices.filter(i => i.IsPaid === true && i.DatePaid);
```

**Calculation:**
```javascript
const avgDaysToPay = paidInvoices.reduce((sum, inv) => {
  const issued = new Date(inv.DateIssued);
  const paid = new Date(inv.DatePaid);
  const days = Math.floor((paid - issued) / (1000 * 60 * 60 * 24));
  return sum + days;
}, 0) / paidInvoices.length;

const kpi = {
  label: 'Avg Days to Pay',
  value: avgDaysToPay.toFixed(1),
  unit: 'days',
  trend: avgDaysToPay < previousAvg ? 'down' : 'up' // Lower is better
};
```

---

### 2. Quote Response Time

**API Call:**
```javascript
GET ${BASE_URL}/quotes/?pageSize=250&columns=ID,DateIssued,DateAccepted,Status

const acceptedQuotes = quotes.filter(q => {
  const status = getStatusName(q.Status);
  return status?.toLowerCase() === 'accepted' && q.DateAccepted;
});
```

**Calculation:**
```javascript
const avgResponseTime = acceptedQuotes.reduce((sum, quote) => {
  const issued = new Date(quote.DateIssued);
  const accepted = new Date(quote.DateAccepted);
  const days = Math.floor((accepted - issued) / (1000 * 60 * 60 * 24));
  return sum + days;
}, 0) / acceptedQuotes.length;
```

---

### 3. Job Completion Rate

**API Call:**
```javascript
GET ${BASE_URL}/jobs/?pageSize=250&columns=ID,Status,DateCreated

const periodJobs = jobs.filter(j => isInDateRange(j.DateCreated, dateFilter));
const completedJobs = periodJobs.filter(j => {
  const status = getStatusName(j.Status);
  return status?.toLowerCase() === 'completed';
});
```

**Calculation:**
```javascript
const completionRate = {
  label: 'Job Completion Rate',
  value: Math.round((completedJobs.length / periodJobs.length) * 100),
  unit: '%',
  trend: currentRate > previousRate ? 'up' : 'down'
};
```

---

## 🔄 Helper Functions

### Date Range Filter

```javascript
function isInDateRange(dateString, filter) {
  const date = new Date(dateString);
  const today = new Date();
  const startDate = new Date(today);
  
  switch(filter) {
    case '7':
      startDate.setDate(today.getDate() - 7);
      break;
    case '30':
      startDate.setDate(today.getDate() - 30);
      break;
    case '90':
      startDate.setDate(today.getDate() - 90);
      break;
    default:
      return true;
  }
  
  return date >= startDate && date <= today;
}
```

### Trend Calculation

```javascript
function calculateTrend(currentValue, previousValue) {
  if (previousValue === 0) return { change: 0, trend: 'up' };
  
  const change = ((currentValue - previousValue) / previousValue) * 100;
  
  return {
    change: Math.abs(change).toFixed(1),
    trend: change >= 0 ? 'up' : 'down'
  };
}
```

### Status Name Extractor

```javascript
function getStatusName(status) {
  if (!status) return 'Unknown';
  return typeof status === 'object' ? status.Name : status;
}
```

---

## 🎯 API Response Caching Strategy

```javascript
// Use SWR for automatic caching and revalidation
import useSWR from 'swr';

function useDashboardData(dateFilter) {
  const { data: invoices } = useSWR(
    `/api/simpro/invoices?filter=${dateFilter}`,
    fetcher,
    { refreshInterval: 60000 } // Refresh every minute
  );
  
  const { data: quotes } = useSWR(
    `/api/simpro/quotes?filter=${dateFilter}`,
    fetcher,
    { refreshInterval: 60000 }
  );
  
  return { invoices, quotes };
}
```

---

## 📦 Complete Data Fetching Example

```javascript
async function fetchDashboardData(dateFilter = '30') {
  const headers = {
    'Authorization': `Bearer ${process.env.SIMPRO_API_TOKEN}`,
    'Content-Type': 'application/json'
  };
  
  const baseUrl = 'https://fyrup.simprosuite.com/api/v1.0/companies/0';
  
  // Fetch all data in parallel
  const [invoices, quotes, jobs] = await Promise.all([
    fetch(`${baseUrl}/invoices/?pageSize=250&columns=ID,DateIssued,IsPaid,Total,Customer`, { headers })
      .then(r => r.json()),
    fetch(`${baseUrl}/quotes/?pageSize=250&columns=ID,DateIssued,Status,Total,Customer,Estimator`, { headers })
      .then(r => r.json()),
    fetch(`${baseUrl}/jobs/?pageSize=250&columns=ID,Status,Customer,Total,DateCreated`, { headers })
      .then(r => r.json())
  ]);
  
  // Filter by date range
  const startDate = getStartDate(dateFilter);
  
  const filteredInvoices = invoices.filter(i => new Date(i.DateIssued) >= startDate);
  const filteredQuotes = quotes.filter(q => new Date(q.DateIssued) >= startDate);
  const filteredJobs = jobs.filter(j => new Date(j.DateCreated) >= startDate);
  
  return {
    invoices: filteredInvoices,
    quotes: filteredQuotes,
    jobs: filteredJobs
  };
}
```

---

**Last Updated:** January 23, 2026  
**API Version:** v1.0  
**Simpro Instance:** fyrup.simprosuite.com
