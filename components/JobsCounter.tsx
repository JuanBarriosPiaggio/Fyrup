'use client';

import { useState, useEffect } from 'react';
import { Briefcase } from 'lucide-react';

// Format the jobs count for display
function formatJobsCount(count: number): string {
  if (count >= 1000) {
    const thousands = Math.floor(count / 100) * 100;
    return `${(thousands / 1000).toFixed(0)}k+`;
  } else if (count >= 100) {
    const hundreds = Math.floor(count / 100) * 100;
    return `${hundreds}+`;
  } else if (count >= 50) {
    const rounded = Math.floor(count / 50) * 50;
    return `${rounded}+`;
  } else {
    return `${count}+`;
  }
}

export default function JobsCounter() {
  const [count, setCount] = useState<string>('100+'); // Show placeholder immediately
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    async function fetchJobsCount() {
      try {
        const response = await fetch('/api/simpro/jobs/completed', {
          cache: 'no-store' // Don't cache on client side, Redis handles server-side caching
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch jobs count');
        }
        
        const data = await response.json();
        
        // If Redis needs refresh, the API will return needsRefresh: true
        if (data.needsRefresh) {
          console.log('Jobs count cache is being populated, will retry in 10 seconds...');
          
          // Retry after 10 seconds to get the refreshed count
          setTimeout(() => {
            if (isMounted) {
              fetchJobsCount();
            }
          }, 10000);
          
          // Keep showing placeholder while refresh is in progress
          if (isMounted) {
            setIsLoading(false);
          }
          return;
        }
        
        const formattedCount = formatJobsCount(data.count);
        
        if (isMounted) {
          setCount(formattedCount);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching jobs count:', error);
        // Keep the placeholder if API fails
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchJobsCount();
    
    // Cleanup function to prevent state updates on unmounted component
    return () => {
      isMounted = false;
    };
  }, []); // Empty dependency array ensures this only runs once

  return (
    <div className="flex items-center gap-3">
      <div className="bg-[var(--primary)] p-3">
        <Briefcase className="h-8 w-8 text-white" />
      </div>
      <div>
        <div className={`text-white font-bold text-lg transition-opacity duration-500 ${
          isLoading ? 'opacity-70' : 'opacity-100'
        }`}>
          {count}
        </div>
        <div className="text-gray-400">Jobs Completed</div>
      </div>
    </div>
  );
}
