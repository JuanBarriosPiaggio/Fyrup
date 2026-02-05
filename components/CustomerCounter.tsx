'use client';

import { useState, useEffect } from 'react';
import { Users } from 'lucide-react';

// Round the customer count to a nice display number
function formatCustomerCount(count: number): string {
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

export default function CustomerCounter() {
  const [count, setCount] = useState<string>('100+'); // Show placeholder immediately
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Only fetch once by checking if we've already fetched
    let isMounted = true;
    
    async function fetchCustomerCount() {
      try {
        const response = await fetch('/api/simpro/customers', {
          // Add cache to prevent multiple fetches
          next: { revalidate: 3600 } // Cache for 1 hour
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch customer count');
        }
        
        const data = await response.json();
        const formattedCount = formatCustomerCount(data.count);
        
        if (isMounted) {
          setCount(formattedCount);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching customer count:', error);
        // Keep the placeholder if API fails
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
  }, []); // Empty dependency array ensures this only runs once

  return (
    <div className="flex items-center gap-3">
      <div className="bg-[var(--primary)] p-3">
        <Users className="h-8 w-8 text-white" />
      </div>
      <div>
        <div className={`text-white font-bold text-lg transition-opacity duration-500 ${
          isLoading ? 'opacity-70' : 'opacity-100'
        }`}>
          {count}
        </div>
        <div className="text-gray-400">Clients Served</div>
      </div>
    </div>
  );
}
