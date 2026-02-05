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
  const [count, setCount] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    async function fetchCustomerCount() {
      try {
        const response = await fetch('/api/simpro/customers');
        if (!response.ok) {
          throw new Error('Failed to fetch customer count');
        }
        const data = await response.json();
        const formattedCount = formatCustomerCount(data.count);
        setCount(formattedCount);
        
        // Trigger fade-in animation after a short delay
        setTimeout(() => setIsVisible(true), 100);
      } catch (error) {
        console.error('Error fetching customer count:', error);
        // Fallback to a default message if API fails
        setCount('500+');
        setTimeout(() => setIsVisible(true), 100);
      }
    }

    fetchCustomerCount();
  }, []);

  return (
    <div 
      className={`flex items-center gap-3 transition-opacity duration-1000 ease-in-out ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="bg-[var(--primary)] p-3">
        <Users className="h-8 w-8 text-white" />
      </div>
      <div>
        <div className="text-white font-bold text-lg">
          {count || '500+'}
        </div>
        <div className="text-gray-400">Clients Served</div>
      </div>
    </div>
  );
}
