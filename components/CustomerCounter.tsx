'use client';

import { useState, useEffect } from 'react';
import { Users } from 'lucide-react';

// Round the customer count to a nice display number
function formatCustomerCount(count: number): string {
  if (count >= 1000) {
    // Show as "1.5k+" for better accuracy
    const thousands = (count / 1000).toFixed(1);
    // Remove ".0" if it's a round number (e.g., "2.0k" becomes "2k")
    const formatted = thousands.endsWith('.0') ? thousands.slice(0, -2) : thousands;
    return `${formatted}k+`;
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

export default function CustomerCounter() {
  const [displayCount, setDisplayCount] = useState<number>(0);
  const [targetCount, setTargetCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    async function fetchCustomerCount() {
      try {
        const response = await fetch('/api/simpro/customers', {
          cache: 'no-store' // Don't cache on client side, Redis handles server-side caching
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch customer count');
        }
        
        const data = await response.json();
        
        // If Redis needs refresh, the API will return needsRefresh: true
        if (data.needsRefresh) {
          console.log('Customer count cache is being populated, will retry in 10 seconds...');
          
          // Retry after 10 seconds to get the refreshed count
          setTimeout(() => {
            if (isMounted) {
              fetchCustomerCount();
            }
          }, 10000);
          
          if (isMounted) {
            setIsLoading(false);
          }
          return;
        }
        
        if (isMounted) {
          setTargetCount(data.count);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching customer count:', error);
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchCustomerCount();
    
    // Cleanup function to prevent state updates on unmounted component
    return () => {
      isMounted = false;
    };
  }, []);

  // Count up animation
  useEffect(() => {
    if (targetCount === 0) return;

    const duration = 2000; // 2 seconds
    const steps = 60; // 60 steps for smooth animation
    const increment = targetCount / steps;
    const stepDuration = duration / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      if (currentStep >= steps) {
        setDisplayCount(targetCount);
        clearInterval(timer);
      } else {
        setDisplayCount(Math.floor(increment * currentStep));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [targetCount]);

  return (
    <div className="flex items-center gap-3">
      <div className="bg-[var(--primary)] p-3">
        <Users className="h-8 w-8 text-white" />
      </div>
      <div>
        <div className={`text-white font-bold text-lg transition-opacity duration-500 ${isLoading ? 'opacity-70' : 'opacity-100'
          }`}>
          {formatCustomerCount(displayCount)}
        </div>
        <div className="text-gray-400">Clients Served</div>
      </div>
    </div>
  );
}
