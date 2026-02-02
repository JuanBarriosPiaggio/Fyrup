'use client';

import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  FileText, 
  DollarSign, 
  Clock, 
  CheckCircle,
  AlertCircle,
  Calendar,
  Filter,
  Download,
  ArrowRight,
  Users,
  Briefcase
} from 'lucide-react';
import Link from 'next/link';
import {
  calculateInvoiceMetrics,
  calculateQuoteMetrics,
  formatCurrency,
  getRecentJobs,
  calculateTopEstimators,
  calculateInvoiceDistribution,
  calculateConversionFunnel,
  calculateJobCompletionRate,
  calculateAvgDaysToPay,
  calculateTrend
} from '@/lib/dashboard-utils';

export default function Dashboard() {
  const [dateFilter, setDateFilter] = useState('30');
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Real data state
  const [invoices, setInvoices] = useState<any[]>([]);
  const [quotes, setQuotes] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);

  // Fetch data from Simpro API
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      
      try {
        const [invoicesRes, quotesRes, jobsRes] = await Promise.all([
          fetch(`/api/simpro/invoices?filter=${dateFilter}`),
          fetch(`/api/simpro/quotes?filter=${dateFilter}`),
          fetch(`/api/simpro/jobs?filter=${dateFilter}`)
        ]);

        if (!invoicesRes.ok || !quotesRes.ok || !jobsRes.ok) {
          throw new Error('Failed to fetch data from Simpro');
        }

        const [invoicesData, quotesData, jobsData] = await Promise.all([
          invoicesRes.json(),
          quotesRes.json(),
          jobsRes.json()
        ]);

        setInvoices(invoicesData);
        setQuotes(quotesData);
        setJobs(jobsData);
      } catch (err: any) {
        console.error('Dashboard data fetch error:', err);
        setError(err.message || 'Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [dateFilter]);

  // Calculate metrics from real data
  const invoiceMetrics = calculateInvoiceMetrics(invoices);
  const quoteMetrics = calculateQuoteMetrics(quotes);
  const recentJobsData = getRecentJobs(jobs, 5);
  const topEstimatorsData = calculateTopEstimators(quotes, 5);
  const invoiceDistribution = calculateInvoiceDistribution(invoices);
  const conversionFunnel = calculateConversionFunnel(quotes, jobs, invoices);
  const jobCompletionRate = calculateJobCompletionRate(jobs);
  const avgDaysToPay = calculateAvgDaysToPay(invoices);

  // Format metrics for display (using dummy trends for now - would need historical data)
  const metrics = {
    totalInvoices: { 
      value: invoiceMetrics.total.count, 
      change: 12.5, 
      trend: 'up' as const, 
      amount: formatCurrency(invoiceMetrics.total.amount) 
    },
    outstanding: { 
      value: invoiceMetrics.outstanding.count, 
      change: 8.2, 
      trend: 'down' as const, 
      amount: formatCurrency(invoiceMetrics.outstanding.amount),
      overdue: invoiceMetrics.overdue.count
    },
    paid: { 
      value: invoiceMetrics.paid.count, 
      change: 15.3, 
      trend: 'up' as const, 
      amount: formatCurrency(invoiceMetrics.paid.amount)
    },
    quoteValue: { 
      value: quoteMetrics.open.count, 
      change: 22.1, 
      trend: 'up' as const, 
      amount: formatCurrency(quoteMetrics.open.amount)
    },
    acceptanceRate: { 
      value: Math.round(quoteMetrics.acceptanceRate), 
      change: 5.4, 
      trend: 'up' as const, 
      suffix: '%' 
    }
  };

  // Calculate alerts from real data
  const alerts = [
    { 
      id: 1, 
      type: 'critical' as const, 
      count: invoiceMetrics.overdue.count, 
      text: 'Invoices overdue > 30 days', 
      value: formatCurrency(invoiceMetrics.overdue.amount)
    },
    { 
      id: 2, 
      type: 'warning' as const, 
      count: quoteMetrics.pending.count, 
      text: 'Quotes pending > 7 days', 
      value: formatCurrency(quoteMetrics.pending.amount)
    },
    { 
      id: 3, 
      type: 'info' as const, 
      count: 0, // Would need to match jobs to invoices
      text: 'Jobs completed but not invoiced', 
      value: '£0'
    }
  ];

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary)] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
          <h2 className="mt-4 text-xl font-bold text-gray-900">Error Loading Dashboard</h2>
          <p className="mt-2 text-gray-600">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-[var(--primary)] text-white rounded-lg hover:bg-[var(--primary-hover)]"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-[var(--heading)]">Business Health Snapshot</h1>
              <p className="text-gray-600 mt-1">Real-time metrics from Simpro</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              {/* Date Filter */}
              <select 
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              >
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
                <option value="custom">Custom range</option>
              </select>

              {/* Branch Filter */}
              <select 
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              >
                <option value="all">All Branches</option>
                <option value="london">London</option>
                <option value="south">South East</option>
              </select>

              {/* Export Button */}
              <button className="inline-flex items-center px-4 py-2 bg-[var(--primary)] text-white rounded-lg text-sm font-medium hover:bg-[var(--primary-hover)] transition-colors">
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Financial Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {/* Total Invoices */}
          <MetricCard
            title="Total Invoices"
            value={metrics.totalInvoices.value}
            amount={metrics.totalInvoices.amount}
            change={metrics.totalInvoices.change}
            trend={metrics.totalInvoices.trend}
            icon={<FileText className="h-6 w-6" />}
          />

          {/* Outstanding */}
          <MetricCard
            title="Outstanding"
            value={metrics.outstanding.value}
            amount={metrics.outstanding.amount}
            change={metrics.outstanding.change}
            trend={metrics.outstanding.trend}
            subtitle={`${metrics.outstanding.overdue} overdue`}
            icon={<Clock className="h-6 w-6" />}
            variant="warning"
          />

          {/* Paid */}
          <MetricCard
            title="Paid Invoices"
            value={metrics.paid.value}
            amount={metrics.paid.amount}
            change={metrics.paid.change}
            trend={metrics.paid.trend}
            icon={<CheckCircle className="h-6 w-6" />}
            variant="success"
          />

          {/* Quote Value */}
          <MetricCard
            title="Open Quotes"
            value={metrics.quoteValue.value}
            amount={metrics.quoteValue.amount}
            change={metrics.quoteValue.change}
            trend={metrics.quoteValue.trend}
            icon={<Briefcase className="h-6 w-6" />}
          />

          {/* Acceptance Rate */}
          <MetricCard
            title="Acceptance Rate"
            value={metrics.acceptanceRate.value}
            suffix="%"
            change={metrics.acceptanceRate.change}
            trend={metrics.acceptanceRate.trend}
            icon={<TrendingUp className="h-6 w-6" />}
            variant="primary"
          />
        </div>

        {/* Alerts Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-[var(--heading)] mb-4">Actionable Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {alerts.map((alert) => (
              <AlertCard key={alert.id} alert={alert} />
            ))}
          </div>
        </div>

        {/* Charts & Tables Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Invoice Status Distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-[var(--heading)] mb-4">Invoice Status</h3>
            <div className="flex items-center justify-center h-64">
              <div className="relative">
                <svg className="w-48 h-48 transform -rotate-90">
                  <circle cx="96" cy="96" r="80" fill="none" stroke="#e5e7eb" strokeWidth="20" />
                  <circle cx="96" cy="96" r="80" fill="none" stroke="var(--primary)" strokeWidth="20" strokeDasharray="503" strokeDashoffset="125" className="transition-all" />
                  <circle cx="96" cy="96" r="80" fill="none" stroke="#10b981" strokeWidth="20" strokeDasharray="503" strokeDashoffset="0" className="transition-all" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[var(--heading)]">{invoiceDistribution.total}</div>
                    <div className="text-sm text-gray-600">Total</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="text-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-1"></div>
                <div className="text-sm font-medium text-gray-700">Paid</div>
                <div className="text-lg font-bold text-[var(--heading)]">{invoiceDistribution.values[0]}</div>
              </div>
              <div className="text-center">
                <div className="w-3 h-3 bg-[var(--primary)] rounded-full mx-auto mb-1"></div>
                <div className="text-sm font-medium text-gray-700">Outstanding</div>
                <div className="text-lg font-bold text-[var(--heading)]">{invoiceDistribution.values[1]}</div>
              </div>
              <div className="text-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mx-auto mb-1"></div>
                <div className="text-sm font-medium text-gray-700">Overdue</div>
                <div className="text-lg font-bold text-[var(--heading)]">{invoiceDistribution.values[2]}</div>
              </div>
            </div>
          </div>

          {/* Quote to Job Funnel */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-[var(--heading)] mb-4">Conversion Funnel</h3>
            <div className="space-y-4">
              {conversionFunnel.map((step, index) => (
                <FunnelStep 
                  key={index}
                  label={step.label} 
                  value={step.value} 
                  percentage={Math.round(step.percentage)} 
                />
              ))}
            </div>
          </div>
        </div>

        {/* Recent Jobs & Top Estimators */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Jobs Table */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-[var(--heading)]">Recent Jobs</h3>
              <Link href="#" className="text-sm font-medium text-[var(--primary)] hover:text-[var(--primary-hover)]">
                View all
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="text-left text-xs font-semibold text-gray-600 uppercase bg-gray-50">
                  <tr>
                    <th className="px-4 py-3">Job ID</th>
                    <th className="px-4 py-3">Client</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Value</th>
                    <th className="px-4 py-3">Days Open</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-gray-200">
                  {recentJobsData.length > 0 ? (
                    recentJobsData.map((job) => (
                      <tr key={job.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 font-medium text-[var(--primary)]">J-{job.id}</td>
                        <td className="px-4 py-3 text-gray-900">{job.client}</td>
                        <td className="px-4 py-3">
                          <StatusBadge status={job.status} />
                        </td>
                        <td className="px-4 py-3 font-semibold text-gray-900">{job.value}</td>
                        <td className="px-4 py-3 text-gray-600">{job.daysOpen}d</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                        No recent jobs found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Estimators */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-[var(--heading)] mb-4">Top Estimators</h3>
            <div className="space-y-4">
              {topEstimatorsData.length > 0 ? (
                topEstimatorsData.map((estimator, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[var(--primary)] text-white flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 text-sm">{estimator.name}</div>
                        <div className="text-xs text-gray-600">{estimator.jobs} jobs • {estimator.rate}% rate</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-[var(--heading)] text-sm">{estimator.revenue}</div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-gray-500 py-4">
                  No estimator data available
                </div>
              )}
            </div>
          </div>
        </div>

        {/* KPIs Footer */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <KPICard label="Avg Days to Pay" value={avgDaysToPay.toFixed(1)} unit="days" trend="down" />
          <KPICard label="Quote Response Time" value="N/A" unit="" trend="up" />
          <KPICard label="Job Completion Rate" value={jobCompletionRate.toString()} unit="%" trend="up" />
          <KPICard label="Customer Satisfaction" value="N/A" unit="" trend="up" />
        </div>
      </div>
    </div>
  );
}

// Reusable Components

function MetricCard({ title, value, amount, change, trend, subtitle, suffix, icon, variant = 'default' }: any) {
  const variants = {
    default: 'bg-gray-50',
    primary: 'bg-[var(--primary)]/5',
    success: 'bg-green-50',
    warning: 'bg-yellow-50'
  };

  const iconVariants = {
    default: 'text-gray-600',
    primary: 'text-[var(--primary)]',
    success: 'text-green-600',
    warning: 'text-yellow-600'
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${variants[variant]}`}>
          <div className={iconVariants[variant]}>{icon}</div>
        </div>
        <div className={`flex items-center text-sm font-semibold ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
          {trend === 'up' ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
          {change > 0 ? '+' : ''}{change}%
        </div>
      </div>
      <div>
        <div className="text-sm font-medium text-gray-600 mb-1">{title}</div>
        <div className="text-2xl font-bold text-[var(--heading)]">
          {value}{suffix}
        </div>
        {amount && <div className="text-sm font-semibold text-gray-700 mt-1">{amount}</div>}
        {subtitle && <div className="text-xs text-gray-500 mt-1">{subtitle}</div>}
      </div>
    </div>
  );
}

function AlertCard({ alert }: any) {
  const variants = {
    critical: 'bg-red-50 border-red-200 text-red-700',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-700',
    info: 'bg-blue-50 border-blue-200 text-blue-700'
  };

  const iconVariants = {
    critical: 'text-red-600',
    warning: 'text-yellow-600',
    info: 'text-blue-600'
  };

  return (
    <div className={`rounded-xl border-2 p-6 ${variants[alert.type]}`}>
      <div className="flex items-start justify-between mb-3">
        <AlertCircle className={`h-6 w-6 ${iconVariants[alert.type]}`} />
        <span className="px-3 py-1 bg-white rounded-full text-sm font-bold">{alert.count}</span>
      </div>
      <div className="font-semibold mb-2">{alert.text}</div>
      <div className="text-2xl font-bold mb-3">{alert.value}</div>
      <button className="text-sm font-semibold hover:underline inline-flex items-center">
        View Details
        <ArrowRight className="h-4 w-4 ml-1" />
      </button>
    </div>
  );
}

function FunnelStep({ label, value, percentage }: any) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm mb-2">
        <span className="font-medium text-gray-700">{label}</span>
        <span className="font-bold text-[var(--heading)]">{value}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div 
          className="bg-[var(--primary)] h-3 rounded-full transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <div className="text-right text-xs text-gray-600 mt-1">{percentage}%</div>
    </div>
  );
}

function StatusBadge({ status }: any) {
  const variants: any = {
    completed: 'bg-green-100 text-green-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    overdue: 'bg-red-100 text-red-800',
    scheduled: 'bg-purple-100 text-purple-800'
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${variants[status]}`}>
      {status.replace('-', ' ')}
    </span>
  );
}

function KPICard({ label, value, unit, trend }: any) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="text-sm font-medium text-gray-600 mb-2">{label}</div>
      <div className="flex items-end justify-between">
        <div>
          <span className="text-3xl font-bold text-[var(--heading)]">{value}</span>
          <span className="text-lg text-gray-600 ml-1">{unit}</span>
        </div>
        {trend === 'down' ? (
          <TrendingDown className="h-5 w-5 text-green-600" />
        ) : (
          <TrendingUp className="h-5 w-5 text-green-600" />
        )}
      </div>
    </div>
  );
}
