# Simpro Dashboard - Implementation Guide

## 🎯 Overview

A clean, modern SaaS-style dashboard providing executive-level business insights from Simpro data. Inspired by minimal, card-based UI design with clear sections and intuitive navigation.

**Route:** `/dashboard`

---

## 📊 Dashboard Sections

### 1. Header & Controls

**Features:**
- Business Health Snapshot title
- Date range selector (7/30/90 days or custom)
- Branch/team filter
- Export to PDF/CSV button
- Theme toggle (inherits from site-wide theme system)

**Implementation:**
```tsx
<select value={dateFilter} onChange={...}>
  <option value="7">Last 7 days</option>
  <option value="30">Last 30 days</option>
  <option value="90">Last 90 days</option>
  <option value="custom">Custom range</option>
</select>
```

---

### 2. Financial Summary Cards (Top Row)

Five key metric cards displaying:

| Metric | Data Point | Calculation |
|--------|-----------|-------------|
| **Total Invoices** | Count + £ value | Count of invoices issued in period |
| **Outstanding** | Count + £ value + overdue count | Unpaid invoices (IsPaid: false) |
| **Paid Invoices** | Count + £ value | Paid invoices (IsPaid: true) |
| **Open Quotes** | Count + £ value | Active quotes (Status: Open) |
| **Acceptance Rate** | Percentage | (Accepted quotes / Total quotes) × 100 |

**Features:**
- Trend indicators (up/down arrows)
- % change vs previous period
- Color-coded variants (success, warning, primary)
- Hover effects

**API Data Required:**
```javascript
// Simpro API Endpoints
GET /api/v1.0/companies/0/invoices/?columns=ID,DateIssued,IsPaid,Total&pageSize=250
GET /api/v1.0/companies/0/quotes/?columns=ID,DateIssued,Status,Total&pageSize=250
```

---

### 3. Actionable Insights (Alert Cards)

Three critical alert cards:

| Alert | Condition | Data Source |
|-------|----------|-------------|
| **Overdue Invoices** | Invoices > 30 days unpaid | Filter invoices by `DateIssued` + `IsPaid: false` |
| **Pending Quotes** | Quotes unapproved > 7 days | Filter quotes by `Status: Open` + `DateIssued` |
| **Completed Not Invoiced** | Jobs completed but no invoice | Match jobs to invoices by customer |

**Alert Types:**
- `critical` (red) - Requires immediate action
- `warning` (yellow) - Needs attention
- `info` (blue) - Informational

**Features:**
- Count badge
- Total value display
- "View Details" link for drill-down
- Color-coded by severity

---

### 4. Visual Charts

#### A. Invoice Status Distribution (Donut Chart)
**Purpose:** Show breakdown of paid/outstanding/overdue invoices

**Data Calculation:**
```javascript
const paid = invoices.filter(i => i.IsPaid === true).length;
const outstanding = invoices.filter(i => i.IsPaid === false && !isOverdue(i)).length;
const overdue = invoices.filter(i => i.IsPaid === false && isOverdue(i, 30)).length;
```

**Visual:**
- Donut chart with 3 segments
- Legend with counts below
- Interactive hover states

#### B. Conversion Funnel
**Purpose:** Track quote → job → invoice conversion

**Stages:**
1. Quotes Sent (100% baseline)
2. Quotes Accepted (% of sent)
3. Jobs Created (% of accepted)
4. Jobs Completed (% of created)
5. Invoices Issued (% of completed)

**Data Sources:**
```javascript
// Simpro API
GET /quotes/?Status=Sent
GET /quotes/?Status=Accepted
GET /jobs/?Status=InProgress
GET /jobs/?Status=Completed
GET /invoices/
```

---

### 5. Recent Jobs Table

**Columns:**
- Job ID (clickable link)
- Client name
- Status badge (color-coded)
- Job value
- Days open

**Status Types:**
- `completed` (green)
- `in-progress` (blue)
- `overdue` (red)
- `scheduled` (purple)

**Features:**
- Sortable columns
- Hover row highlighting
- "View all" link to full jobs list
- Responsive design

---

### 6. Top Estimators Panel

**Metrics per Estimator:**
- Name
- Total revenue
- Number of jobs
- Acceptance rate %

**Sorting:** By revenue (descending)

**Data Calculation:**
```javascript
// Group quotes by estimator
const estimators = quotes.reduce((acc, quote) => {
  const estimator = quote.Estimator?.Name;
  if (!acc[estimator]) acc[estimator] = { revenue: 0, jobs: 0, accepted: 0 };
  acc[estimator].revenue += quote.Total?.IncTax || 0;
  acc[estimator].jobs++;
  if (quote.Status === 'Accepted') acc[estimator].accepted++;
  return acc;
}, {});

// Calculate acceptance rate
estimators.forEach(e => {
  e.rate = (e.accepted / e.jobs) * 100;
});
```

---

### 7. KPI Footer Cards

Four key performance indicators:

| KPI | Metric | Calculation |
|-----|--------|-------------|
| **Avg Days to Pay** | Days | Average of `(DatePaid - DateIssued)` for paid invoices |
| **Quote Response Time** | Days | Average of `(DateAccepted - DateIssued)` for quotes |
| **Job Completion Rate** | % | `(Completed jobs / Total jobs) × 100` |
| **Customer Satisfaction** | Rating | From customer feedback (if available) |

---

## 🎨 Design System

### Color Palette
Uses existing theme system with CSS variables:

```css
--primary: #B37D56 (Copper) or #f97316 (Orange)
--primary-hover: #D4A07E (Light) or #ea580c (Orange hover)
--accent: #D4A07E (Light) or #fb923c (Orange accent)
--heading: #4D3124 (Dark Earth) or #1c1917
```

### Card Design
- White background (`bg-white`)
- Subtle border (`border-gray-200`)
- Soft shadow (`shadow-sm`)
- Rounded corners (`rounded-xl`)
- Hover lift effect (`hover:shadow-md`)

### Typography
- **Headings:** Bold, uses `--heading` color
- **Body:** Medium weight, gray-700
- **Labels:** Small, uppercase, gray-600
- **Values:** Bold, large, heading color

### Spacing
- Section gaps: `mb-8` (32px)
- Card padding: `p-6` (24px)
- Grid gaps: `gap-6` (24px)

---

## 🔌 API Integration

### Current Status
Dashboard uses **mock data** for demonstration. To connect to live Simpro data:

### Step 1: Create API Utility

```typescript
// lib/simpro.ts
const SIMPRO_API_URL = 'https://fyrup.simprosuite.com/api/v1.0';
const SIMPRO_TOKEN = process.env.SIMPRO_API_TOKEN;

export async function getInvoices(dateFilter: string) {
  const response = await fetch(
    `${SIMPRO_API_URL}/companies/0/invoices/?pageSize=250&columns=ID,DateIssued,IsPaid,Total,Customer`,
    {
      headers: {
        'Authorization': `Bearer ${SIMPRO_TOKEN}`,
        'Content-Type': 'application/json'
      }
    }
  );
  return response.json();
}

export async function getQuotes(dateFilter: string) {
  const response = await fetch(
    `${SIMPRO_API_URL}/companies/0/quotes/?pageSize=250&columns=ID,DateIssued,Status,Total,Customer`,
    {
      headers: {
        'Authorization': `Bearer ${SIMPRO_TOKEN}`,
        'Content-Type': 'application/json'
      }
    }
  );
  return response.json();
}
```

### Step 2: Add Environment Variable

```env
# .env.local
SIMPRO_API_TOKEN=c035c60b6a535c7f515627cd15fd76d4a7a25231
```

### Step 3: Fetch Data in Component

```typescript
'use client';

import { useState, useEffect } from 'react';
import { getInvoices, getQuotes } from '@/lib/simpro';

export default function Dashboard() {
  const [invoices, setInvoices] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const [invoicesData, quotesData] = await Promise.all([
        getInvoices('30'),
        getQuotes('30')
      ]);
      setInvoices(invoicesData);
      setQuotes(quotesData);
      setLoading(false);
    }
    loadData();
  }, [dateFilter]);

  // Calculate metrics from real data
  const metrics = calculateMetrics(invoices, quotes);
  
  // ... rest of component
}
```

---

## 📈 Data Calculations

### Metric: Outstanding Invoices

```javascript
function calculateOutstanding(invoices) {
  const today = new Date();
  const unpaid = invoices.filter(i => i.IsPaid === false);
  
  const overdue = unpaid.filter(i => {
    const issueDate = new Date(i.DateIssued);
    const daysDiff = Math.floor((today - issueDate) / (1000 * 60 * 60 * 24));
    return daysDiff > 30;
  });

  return {
    count: unpaid.length,
    overdueCount: overdue.length,
    totalValue: unpaid.reduce((sum, i) => sum + (i.Total?.BalanceDue || 0), 0),
    overdueValue: overdue.reduce((sum, i) => sum + (i.Total?.BalanceDue || 0), 0)
  };
}
```

### Metric: Quote Acceptance Rate

```javascript
function calculateAcceptanceRate(quotes, period) {
  const periodQuotes = quotes.filter(q => isInPeriod(q.DateIssued, period));
  const accepted = periodQuotes.filter(q => q.Status?.Name === 'Accepted');
  
  return {
    rate: (accepted.length / periodQuotes.length) * 100,
    acceptedCount: accepted.length,
    totalCount: periodQuotes.length
  };
}
```

### Metric: Trend Calculation

```javascript
function calculateTrend(currentValue, previousValue) {
  const change = ((currentValue - previousValue) / previousValue) * 100;
  return {
    change: change.toFixed(1),
    trend: change >= 0 ? 'up' : 'down'
  };
}
```

---

## 🚀 Export Functionality

### PDF Export

```typescript
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

async function exportToPDF() {
  const dashboard = document.getElementById('dashboard-content');
  const canvas = await html2canvas(dashboard);
  const imgData = canvas.toDataURL('image/png');
  
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  
  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  pdf.save(`simpro-dashboard-${new Date().toISOString().split('T')[0]}.pdf`);
}
```

### CSV Export

```typescript
function exportToCSV(data, filename) {
  const csv = data.map(row => Object.values(row).join(',')).join('\n');
  const header = Object.keys(data[0]).join(',');
  const csvContent = `${header}\n${csv}`;
  
  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${filename}-${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
}
```

---

## 📱 Responsive Design

### Breakpoints
- **Mobile:** < 768px (Single column, stacked cards)
- **Tablet:** 768px - 1024px (2 columns for most sections)
- **Desktop:** > 1024px (Full multi-column layout)

### Mobile Optimizations
- Horizontal scrolling for tables
- Collapsible sections
- Touch-friendly tap targets (min 44px)
- Simplified charts for small screens

---

## 🔒 Security Considerations

1. **API Token:** Store in environment variables, never expose to client
2. **Data Access:** Implement role-based access control
3. **Rate Limiting:** Cache API responses to avoid hitting rate limits
4. **Data Privacy:** Filter sensitive customer data before display

---

## 🎯 Performance Optimization

### Data Caching
```typescript
// Use SWR for data fetching with caching
import useSWR from 'swr';

function Dashboard() {
  const { data: invoices, error } = useSWR(
    '/api/simpro/invoices',
    fetcher,
    { refreshInterval: 60000 } // Refresh every minute
  );
}
```

### Lazy Loading
```typescript
import dynamic from 'next/dynamic';

const ChartComponent = dynamic(() => import('./ChartComponent'), {
  loading: () => <p>Loading chart...</p>,
  ssr: false
});
```

---

## 📊 Future Enhancements

### Phase 2 Features:
- [ ] Real-time updates via WebSocket
- [ ] Custom date range picker
- [ ] Drill-down views for each metric
- [ ] Email alert subscriptions
- [ ] Custom dashboard builder
- [ ] Multi-branch comparison
- [ ] Year-over-year trends
- [ ] Revenue forecasting

### Advanced Analytics:
- [ ] Predictive analytics for cash flow
- [ ] Customer segmentation analysis
- [ ] Job profitability tracking
- [ ] Resource utilization heatmaps

---

## 🐛 Troubleshooting

### Issue: Charts not displaying
**Solution:** Ensure mock data structure matches expected format

### Issue: API rate limiting
**Solution:** Implement data caching and reduce polling frequency

### Issue: Slow load times
**Solution:** Use pagination and lazy loading for large datasets

---

## 📚 Related Documentation

- [Simpro API Documentation](../swagger.json)
- [Quote Follow-up Workflow](./QUOTE-FOLLOWUP-GUIDE.md)
- [Invoice Follow-up Workflow](./INVOICE-FOLLOWUP-GUIDE.md)
- [Theme System](./THEME-TOGGLE-GUIDE.md)

---

**Status:** ✅ MVP Complete with Mock Data  
**Next Step:** Connect to live Simpro API  
**Date:** January 23, 2026
