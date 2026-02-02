# Dashboard Quick Reference Card

## 🎯 Access
```
Route: /dashboard
URL: http://localhost:3000/dashboard
Nav Link: Header → "Dashboard"
```

---

## 📊 Layout Overview

```
┌─────────────────────────────────────────────────────────────┐
│  BUSINESS HEALTH SNAPSHOT                [Filters] [Export] │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌───────┐  ┌───────┐  ┌───────┐  ┌───────┐  ┌───────┐    │
│  │Total  │  │Outst. │  │ Paid  │  │Quotes │  │Accept │    │
│  │Invoice│  │Invoice│  │Invoice│  │ Value │  │ Rate  │    │
│  │  247  │  │  43   │  │  204  │  │  89   │  │  68%  │    │
│  │£184K  │  │£32.4K │  │£151K  │  │£267K  │  │  ↑    │    │
│  │  ↑12% │  │  ↓8%  │  │  ↑15% │  │  ↑22% │  │  +5%  │    │
│  └───────┘  └───────┘  └───────┘  └───────┘  └───────┘    │
│                                                               │
│  ┌────────────────┐  ┌────────────────┐  ┌────────────────┐│
│  │   CRITICAL     │  │    WARNING     │  │      INFO      ││
│  │  Overdue > 30d │  │  Quotes > 7d   │  │ Jobs Not Inv.  ││
│  │   18 invoices  │  │   12 quotes    │  │    8 jobs      ││
│  │    £28,340     │  │    £45,200     │  │   £22,100      ││
│  │ [View Details] │  │ [View Details] │  │ [View Details] ││
│  └────────────────┘  └────────────────┘  └────────────────┘│
│                                                               │
│  ┌─────────────────────┐  ┌─────────────────────────────┐  │
│  │  Invoice Status     │  │   Conversion Funnel         │  │
│  │                     │  │                             │  │
│  │      ●━━━●          │  │  Quotes Sent    ▓▓▓▓▓ 100% │  │
│  │     ╱     ╲         │  │  Accepted       ▓▓▓░░  67% │  │
│  │    ●   247 ●        │  │  Jobs Created   ▓▓░░░  58% │  │
│  │     ╲     ╱         │  │  Completed      ▓░░░░  44% │  │
│  │      ●━━━●          │  │  Invoiced       ▓░░░░  41% │  │
│  │                     │  │                             │  │
│  │  🟢 Paid: 204       │  │                             │  │
│  │  🟠 Outstanding: 43 │  │                             │  │
│  │  🔴 Overdue: 18     │  │                             │  │
│  └─────────────────────┘  └─────────────────────────────┘  │
│                                                               │
│  ┌────────────────────────────────┐  ┌─────────────────┐   │
│  │    Recent Jobs                 │  │ Top Estimators  │   │
│  ├────┬────────┬────────┬─────────┤  ├─────────────────┤   │
│  │ ID │ Client │ Status │ Value   │  │ ① John Smith    │   │
│  ├────┼────────┼────────┼─────────┤  │   £87,420       │   │
│  │J01 │ Siren  │ ✅ Done│ £2,340  │  │                 │   │
│  │J02 │ Mi-Move│ 🔵 Prog│ £4,560  │  │ ② Sarah Johnson │   │
│  │J03 │ Worksp │ 🔴 Late│ £1,890  │  │   £76,890       │   │
│  │J04 │ Academy│ ✅ Done│ £3,210  │  │                 │   │
│  │J05 │ Ambass │ 🟣 Sched│ £5,670 │  │ ③ Mike Wilson   │   │
│  └────┴────────┴────────┴─────────┘  │   £65,200       │   │
│                                       │                 │   │
│                                       │ ④ Emma Davis    │   │
│                                       │   £54,780       │   │
│                                       │                 │   │
│                                       │ ⑤ Tom Brown     │   │
│                                       │   £48,320       │   │
│                                       └─────────────────┘   │
│                                                               │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
│  │Avg Days  │  │Quote Resp│  │Completion│  │Satisfact.│   │
│  │ to Pay   │  │  Time    │  │   Rate   │  │  Score   │   │
│  │  28.5    │  │   4.2    │  │   94%    │  │   4.8    │   │
│  │  days ↓  │  │  days ↓  │  │    ↑     │  │   /5 ↑   │   │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎨 Color Coding

### Status Badges
- 🟢 **Green** - Completed, Paid, Success
- 🔵 **Blue** - In Progress, Active
- 🔴 **Red** - Overdue, Critical, Failed
- 🟣 **Purple** - Scheduled, Pending
- 🟡 **Yellow** - Warning, Attention Needed

### Alert Levels
- 🔴 **Critical** - Requires immediate action
- 🟡 **Warning** - Needs attention soon
- 🔵 **Info** - For your information

### Trend Indicators
- ↑ **Up** - Increasing (green for positive metrics)
- ↓ **Down** - Decreasing (green for cost/time metrics)

---

## 🎮 Interactive Elements

### Filters
```
Date Range:  [Last 30 days ▼]
Branch:      [All Branches ▼]
```

### Actions
```
[Export ↓] - Download PDF or CSV
```

### Clickable Items
- Metric cards → Drill-down view
- Job IDs → Job details
- "View Details" links → Filtered lists
- Chart segments → Related data

---

## 📊 Data Sources

### Current: Mock Data
- Hardcoded demonstration values
- Shows structure and layout
- Ready for API integration

### Future: Live Simpro API
```javascript
GET /invoices/     // Invoice data
GET /quotes/       // Quote data
GET /jobs/         // Job data
GET /customers/    // Customer data
```

---

## ⚡ Quick Actions

### View Dashboard
```bash
npm run dev
# Open: http://localhost:3000/dashboard
```

### Change Theme
```
Click palette icon (🎨) in header
Switches: Orange ↔ Copper
```

### Filter Data
```
1. Select date range (7/30/90 days)
2. Select branch (if applicable)
3. Data auto-updates
```

### Export Report
```
1. Click "Export" button
2. Choose PDF or CSV
3. Save to downloads
```

---

## 📱 Responsive Breakpoints

### Mobile (< 768px)
- Single column
- Stacked cards
- Scroll tables
- Simplified charts

### Tablet (768-1024px)
- 2 columns
- Compact layout
- Touch-friendly

### Desktop (> 1024px)
- Multi-column
- Full features
- Optimal density

---

## 🔧 Customization Options

### Date Ranges
```javascript
'7'   → Last 7 days
'30'  → Last 30 days (default)
'90'  → Last 90 days
'custom' → Custom date picker
```

### Metrics Display
```javascript
// Each card shows:
- Icon (contextual)
- Label (metric name)
- Value (number)
- Amount (currency, optional)
- Trend (% change)
- Arrow (up/down indicator)
```

### Chart Types
```javascript
Donut Chart  → Status distribution
Funnel Chart → Conversion rates
Bar Chart    → Time series (future)
Line Chart   → Trends (future)
```

---

## 📖 Documentation Links

| Document | Purpose |
|----------|---------|
| [DASHBOARD-SUMMARY.md](./DASHBOARD-SUMMARY.md) | Complete overview |
| [DASHBOARD-GUIDE.md](./DASHBOARD-GUIDE.md) | Implementation details |
| [DASHBOARD-API-SPEC.md](./DASHBOARD-API-SPEC.md) | API integration |

---

## 🎯 Key Metrics at a Glance

| Section | Metric | What It Shows |
|---------|--------|---------------|
| **Financial** | Total Invoices | Revenue generated |
| **Financial** | Outstanding | Money owed |
| **Financial** | Paid | Cash received |
| **Sales** | Quotes Value | Potential revenue |
| **Sales** | Acceptance Rate | Sales effectiveness |
| **Operations** | Recent Jobs | Current activity |
| **Team** | Top Estimators | Performance leaders |
| **Efficiency** | Days to Pay | Cash flow speed |
| **Quality** | Completion Rate | Delivery success |

---

## 💡 Tips

### For Best Performance
- Use 30-day view for balanced data/speed
- Filter by branch for focused insights
- Export reports for offline analysis

### For Decision Making
- Check alerts first (red → yellow → blue)
- Monitor trends (arrows) over absolute values
- Compare periods using % change indicators

### For Presentations
- Export to PDF for stakeholder reports
- Use full-screen mode (F11) for demos
- Screenshot charts for slide decks

---

## 🚀 Next Steps

1. **Review Dashboard** - Navigate to `/dashboard`
2. **Check Mock Data** - Verify layout and design
3. **Read API Spec** - Understand data requirements
4. **Connect Simpro** - Implement live data fetching
5. **Test & Iterate** - Refine based on feedback

---

**Quick Access:** http://localhost:3000/dashboard  
**Status:** ✅ Ready with Mock Data  
**Updated:** January 23, 2026
