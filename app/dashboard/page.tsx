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
  const [selectedMonth, setSelectedMonth] = useState<string>(new Date().toISOString().slice(0, 7)); // YYYY-MM
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showInvoiceDetails, setShowInvoiceDetails] = useState(false);
  const [selectedInvoiceType, setSelectedInvoiceType] = useState<'outstanding' | 'overdue' | null>(null);
  const [showAllJobs, setShowAllJobs] = useState(false);
  
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
      value: formatCurrency(invoiceMetrics.overdue.amount),
      onClick: () => {
        setSelectedInvoiceType('overdue');
        setShowInvoiceDetails(true);
      }
    },
    { 
      id: 2, 
      type: 'warning' as const, 
      count: invoiceMetrics.outstanding.count, 
      text: 'Outstanding invoices', 
      value: formatCurrency(invoiceMetrics.outstanding.amount),
      onClick: () => {
        setSelectedInvoiceType('outstanding');
        setShowInvoiceDetails(true);
      }
    },
    { 
      id: 3, 
      type: 'info' as const, 
      count: quoteMetrics.pending.count, 
      text: 'Quotes pending > 7 days', 
      value: formatCurrency(quoteMetrics.pending.amount),
      onClick: () => {}
    }
  ];

  // Get filtered invoices for detail view
  const getFilteredInvoices = () => {
    if (selectedInvoiceType === 'overdue') {
      return invoices.filter(inv => {
        if (inv.IsPaid) return false;
        const daysDiff = Math.floor((new Date().getTime() - new Date(inv.DateIssued).getTime()) / (1000 * 60 * 60 * 24));
        return daysDiff > 30;
      });
    } else if (selectedInvoiceType === 'outstanding') {
      return invoices.filter(inv => !inv.IsPaid);
    }
    return [];
  };

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
    <div className="min-h-screen bg-gray-50/50 pt-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-white to-gray-50 border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-[var(--heading)] tracking-tight">Dashboard</h1>
              <p className="text-gray-500 mt-2 text-sm">Real-time business metrics • Last updated: {new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              {/* Month Selector */}
              <input
                type="month"
                value={selectedMonth}
                onChange={(e) => {
                  setSelectedMonth(e.target.value);
                  // Calculate days in selected month for API filter
                  const monthStart = new Date(e.target.value + '-01');
                  const today = new Date();
                  const daysDiff = Math.floor((today.getTime() - monthStart.getTime()) / (1000 * 60 * 60 * 24));
                  setDateFilter(daysDiff.toString());
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              />

              {/* Quick Date Filter */}
              <select 
                value={dateFilter}
                onChange={(e) => {
                  setDateFilter(e.target.value);
                  // Reset month selector when using quick filters
                  if (['7', '30', '90'].includes(e.target.value)) {
                    const date = new Date();
                    setSelectedMonth(date.toISOString().slice(0, 7));
                  }
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              >
                <option value="7">Last 7 days</option>
                <option value="30">Last 30 days</option>
                <option value="90">Last 90 days</option>
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

      <div className="px-4 sm:px-6 lg:px-8 py-10">
        {/* Financial Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 mb-10">
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
            variant="primary"
          />

          {/* Paid */}
          <MetricCard
            title="Paid Invoices"
            value={metrics.paid.value}
            amount={metrics.paid.amount}
            change={metrics.paid.change}
            trend={metrics.paid.trend}
            icon={<CheckCircle className="h-6 w-6" />}
            variant="primary"
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
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-[var(--heading)] mb-6 tracking-tight">Actionable Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {alerts.map((alert) => (
              <AlertCard key={alert.id} alert={alert} />
            ))}
          </div>
        </div>

        {/* Charts & Tables Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-10">
          {/* Invoice Status Distribution */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold text-[var(--heading)] mb-6 tracking-tight">Invoice Status</h3>
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
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold text-[var(--heading)] mb-6 tracking-tight">Conversion Funnel</h3>
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Recent Jobs Table */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-[var(--heading)] tracking-tight">Recent Jobs</h3>
              <button 
                onClick={() => setShowAllJobs(true)}
                className="text-sm font-medium text-[var(--primary)] hover:text-[var(--primary-hover)] transition-colors"
              >
                View all
              </button>
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
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold text-[var(--heading)] mb-6 tracking-tight">Top Estimators</h3>
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-10">
          <KPICard label="Avg Days to Pay" value={avgDaysToPay.toFixed(1)} unit="days" trend="down" />
          <KPICard label="Quote Response Time" value="N/A" unit="" trend="up" />
          <KPICard label="Job Completion Rate" value={jobCompletionRate.toString()} unit="%" trend="up" />
          <KPICard label="Customer Satisfaction" value="N/A" unit="" trend="up" />
        </div>
      </div>

      {/* Invoice Details Modal */}
      {showInvoiceDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
              <div>
                <h2 className="text-2xl font-bold text-[var(--heading)]">
                  {selectedInvoiceType === 'overdue' ? 'Overdue Invoices' : 'Outstanding Invoices'}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  {getFilteredInvoices().length} invoice{getFilteredInvoices().length !== 1 ? 's' : ''} • 
                  Total: {formatCurrency(getFilteredInvoices().reduce((sum, inv) => sum + (inv.Total?.IncTax || inv.Total?.ExTax || 0), 0))}
                </p>
              </div>
              <button
                onClick={() => setShowInvoiceDetails(false)}
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid gap-4">
                {getFilteredInvoices().map((invoice) => {
                  const daysSinceIssued = Math.floor((new Date().getTime() - new Date(invoice.DateIssued).getTime()) / (1000 * 60 * 60 * 24));
                  const customerName = invoice.Customer?.CompanyName || 
                                      (invoice.Customer?.GivenName && invoice.Customer?.FamilyName 
                                        ? `${invoice.Customer.GivenName} ${invoice.Customer.FamilyName}` 
                                        : 'Unknown Customer');
                  
                  return (
                    <div key={invoice.ID} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between">
                        {/* Invoice Info */}
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-lg font-bold text-[var(--primary)]">
                              Invoice #{invoice.ID}
                            </span>
                            {daysSinceIssued > 30 && (
                              <span className="px-3 py-1 bg-[var(--primary)]/20 text-[var(--primary)] text-xs font-semibold rounded-full">
                                {daysSinceIssued} days overdue
                              </span>
                            )}
                          </div>

                          {/* Customer Details */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Customer</div>
                              <div className="font-semibold text-gray-900">{customerName}</div>
                              {invoice.Customer?.ID && (
                                <div className="text-sm text-gray-600">ID: {invoice.Customer.ID}</div>
                              )}
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Issue Date</div>
                              <div className="font-medium text-gray-900">
                                {new Date(invoice.DateIssued).toLocaleDateString('en-GB', { 
                                  day: 'numeric', 
                                  month: 'long', 
                                  year: 'numeric' 
                                })}
                              </div>
                              <div className="text-sm text-gray-600">{daysSinceIssued} days ago</div>
                            </div>
                          </div>

                          {/* Financial Details */}
                          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                            <div>
                              <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Amount Ex Tax</div>
                              <div className="text-lg font-bold text-gray-900">
                                {formatCurrency(invoice.Total?.ExTax || 0)}
                              </div>
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Tax</div>
                              <div className="text-lg font-bold text-gray-900">
                                {formatCurrency((invoice.Total?.IncTax || 0) - (invoice.Total?.ExTax || 0))}
                              </div>
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-gray-500 uppercase mb-1">Total Inc Tax</div>
                              <div className="text-lg font-bold text-[var(--primary)]">
                                {formatCurrency(invoice.Total?.IncTax || invoice.Total?.ExTax || 0)}
                              </div>
                            </div>
                          </div>

                          {/* Status */}
                          <div className="mt-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              invoice.Status?.Name ? 'bg-gray-100 text-gray-700' : 'bg-yellow-100 text-yellow-700'
                            }`}>
                              {invoice.Status?.Name || 'Unpaid'}
                            </span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="ml-4 flex flex-col gap-2">
                          <button className="px-4 py-2 bg-[var(--primary)] text-white text-sm font-semibold rounded-lg hover:bg-[var(--primary-hover)] transition-colors">
                            View in Simpro
                          </button>
                          <button className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-50 transition-colors">
                            Send Reminder
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {getFilteredInvoices().length === 0 && (
                <div className="text-center py-12">
                  <CheckCircle className="h-16 w-16 text-[var(--primary)] mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">All Clear!</h3>
                  <p className="text-gray-600">
                    {selectedInvoiceType === 'overdue' 
                      ? 'No overdue invoices at the moment.' 
                      : 'No outstanding invoices at the moment.'}
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
              <button
                onClick={() => setShowInvoiceDetails(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-[var(--primary)] text-white font-semibold rounded-lg hover:bg-[var(--primary-hover)] transition-colors inline-flex items-center">
                <Download className="h-4 w-4 mr-2" />
                Export List
              </button>
            </div>
          </div>
        </div>
      )}

      {/* All Jobs Modal */}
      {showAllJobs && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
              <div>
                <h2 className="text-2xl font-bold text-[var(--heading)]">All Jobs</h2>
                <p className="text-sm text-gray-600 mt-1">
                  {jobs.length} job{jobs.length !== 1 ? 's' : ''} found
                </p>
              </div>
              <button
                onClick={() => setShowAllJobs(false)}
                className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="text-left text-xs font-semibold text-gray-600 uppercase bg-gray-50">
                    <tr>
                      <th className="px-4 py-3">Job ID</th>
                      <th className="px-4 py-3">Client</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Value</th>
                      <th className="px-4 py-3">Issue Date</th>
                      <th className="px-4 py-3">Days Open</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-gray-200">
                    {jobs.map((job) => {
                      const daysSinceIssued = Math.floor((new Date().getTime() - new Date(job.DateIssued).getTime()) / (1000 * 60 * 60 * 24));
                      const customerName = job.Customer?.CompanyName || 
                                          (job.Customer?.GivenName && job.Customer?.FamilyName 
                                            ? `${job.Customer.GivenName} ${job.Customer.FamilyName}` 
                                            : 'Unknown Customer');
                      const statusName = typeof job.Status === 'object' ? job.Status.Name : job.Status;
                      const statusLower = statusName?.toLowerCase() || 'unknown';

                      return (
                        <tr key={job.ID} className="hover:bg-gray-50">
                          <td className="px-4 py-3 font-medium text-[var(--primary)]">J-{job.ID}</td>
                          <td className="px-4 py-3 text-gray-900">{customerName}</td>
                          <td className="px-4 py-3">
                            <StatusBadge status={statusLower} />
                          </td>
                          <td className="px-4 py-3 font-semibold text-gray-900">
                            {formatCurrency(job.Total?.IncTax || 0)}
                          </td>
                          <td className="px-4 py-3 text-gray-600">
                            {new Date(job.DateIssued).toLocaleDateString('en-GB')}
                          </td>
                          <td className="px-4 py-3 text-gray-600">{daysSinceIssued}d</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {jobs.length === 0 && (
                <div className="text-center py-12">
                  <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">No Jobs Found</h3>
                  <p className="text-gray-600">There are no jobs in the selected period.</p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-end gap-3">
              <button
                onClick={() => setShowAllJobs(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-[var(--primary)] text-white font-semibold rounded-lg hover:bg-[var(--primary-hover)] transition-colors inline-flex items-center">
                <Download className="h-4 w-4 mr-2" />
                Export List
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Reusable Components

type MetricCardVariant = 'default' | 'primary';

interface MetricCardProps {
  title: string;
  value: number | string;
  amount?: string;
  change: number;
  trend: 'up' | 'down';
  subtitle?: string;
  suffix?: string;
  icon: React.ReactNode;
  variant?: MetricCardVariant;
}

function MetricCard({ title, value, amount, change, trend, subtitle, suffix, icon, variant = 'default' }: MetricCardProps) {
  const variants: Record<MetricCardVariant, string> = {
    default: 'bg-gradient-to-br from-gray-50 to-gray-100',
    primary: 'bg-gradient-to-br from-[var(--primary)]/10 to-[var(--primary)]/5'
  };

  const iconVariants: Record<MetricCardVariant, string> = {
    default: 'text-gray-600',
    primary: 'text-[var(--primary)]'
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg hover:border-gray-200 transition-all duration-300 group">
      <div className="flex items-start justify-between mb-6">
        <div className={`p-4 rounded-xl ${variants[variant]} group-hover:scale-110 transition-transform duration-300`}>
          <div className={iconVariants[variant]}>{icon}</div>
        </div>
        <div className={`flex items-center px-3 py-1.5 rounded-full text-xs font-bold ${
          trend === 'up' ? 'bg-[var(--primary)]/10 text-[var(--primary)]' : 'bg-[var(--primary)]/10 text-[var(--primary)]'
        }`}>
          {trend === 'up' ? <TrendingUp className="h-3.5 w-3.5 mr-1" /> : <TrendingDown className="h-3.5 w-3.5 mr-1" />}
          {change > 0 ? '+' : ''}{change}%
        </div>
      </div>
      <div>
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{title}</div>
        <div className="text-3xl font-bold text-[var(--heading)] mb-1">
          {value}{suffix}
        </div>
        {amount && <div className="text-base font-semibold text-gray-600 mt-2">{amount}</div>}
        {subtitle && <div className="text-xs text-gray-500 mt-2">{subtitle}</div>}
      </div>
    </div>
  );
}

type AlertType = 'critical' | 'warning' | 'info';

interface Alert {
  id: number;
  type: AlertType;
  count: number;
  text: string;
  value: string;
  onClick?: () => void;
}

interface AlertCardProps {
  alert: Alert;
}

function AlertCard({ alert }: AlertCardProps) {
  const variants: Record<AlertType, string> = {
    critical: 'bg-gradient-to-br from-[var(--primary)]/15 to-[var(--primary)]/5 border-[var(--primary)]/30 text-[var(--heading)]',
    warning: 'bg-gradient-to-br from-[var(--primary)]/10 to-[var(--primary)]/5 border-[var(--primary)]/20 text-[var(--heading)]',
    info: 'bg-gradient-to-br from-[var(--primary)]/10 to-[var(--primary)]/5 border-[var(--primary)]/20 text-[var(--heading)]'
  };

  const iconVariants: Record<AlertType, string> = {
    critical: 'text-[var(--primary)]',
    warning: 'text-[var(--primary)]',
    info: 'text-[var(--primary)]'
  };

  return (
    <div 
      className={`rounded-2xl border-2 p-6 ${variants[alert.type]} cursor-pointer transition-all hover:shadow-xl hover:scale-[1.02] duration-300 group`}
      onClick={alert.onClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-white rounded-xl shadow-sm group-hover:shadow-md transition-shadow">
          <AlertCircle className={`h-6 w-6 ${iconVariants[alert.type]}`} />
        </div>
        <span className="px-4 py-2 bg-white rounded-full text-sm font-bold shadow-sm">{alert.count}</span>
      </div>
      <div className="font-semibold text-sm mb-3 uppercase tracking-wide">{alert.text}</div>
      <div className="text-3xl font-bold mb-4">{alert.value}</div>
      <button className="text-sm font-semibold hover:underline inline-flex items-center group-hover:gap-2 transition-all">
        View Details
        <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}

interface FunnelStepProps {
  label: string;
  value: number;
  percentage: number;
}

function FunnelStep({ label, value, percentage }: FunnelStepProps) {
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

interface StatusBadgeProps {
  status: string;
}

function StatusBadge({ status }: StatusBadgeProps) {
  const variants: Record<string, string> = {
    completed: 'bg-[var(--primary)]/10 text-[var(--primary)]',
    'in-progress': 'bg-[var(--primary)]/20 text-[var(--primary)]',
    overdue: 'bg-[var(--primary)]/15 text-[var(--primary)]',
    scheduled: 'bg-[var(--primary)]/10 text-[var(--primary)]',
    complete: 'bg-[var(--primary)]/10 text-[var(--primary)]'
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${variants[status] || 'bg-gray-100 text-gray-600'}`}>
      {status.replace('-', ' ')}
    </span>
  );
}

interface KPICardProps {
  label: string;
  value: string;
  unit: string;
  trend: 'up' | 'down';
}

function KPICard({ label, value, unit, trend }: KPICardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 group">
      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">{label}</div>
      <div className="flex items-end justify-between">
        <div>
          <span className="text-3xl font-bold text-[var(--heading)]">{value}</span>
          <span className="text-base text-gray-500 ml-1">{unit}</span>
        </div>
        <div className="p-2 rounded-xl transition-colors bg-[var(--primary)]/10 group-hover:bg-[var(--primary)]/20">
          {trend === 'down' ? (
            <TrendingDown className="h-5 w-5 text-[var(--primary)]" />
          ) : (
            <TrendingUp className="h-5 w-5 text-[var(--primary)]" />
          )}
        </div>
      </div>
    </div>
  );
}
