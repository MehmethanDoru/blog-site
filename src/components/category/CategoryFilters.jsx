'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { FileText } from 'lucide-react';

const CategoryFilters = ({ category }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentFilter = searchParams.get('filter') || 'latest';

  const filters = [
    { id: 'latest', name: 'Latest' },
    { id: 'popular', name: 'Popular' },
  ];

  const handleFilterChange = (filterId) => {
    const params = new URLSearchParams(searchParams);
    params.set('filter', filterId);
    params.delete('page');
    router.push(`?${params.toString()}`);
  };

  const formatNumber = (num) => {
    if (!num) return '0';
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toLocaleString();
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
      <div className="flex items-center text-gray-600">
        <FileText size={16} className="mr-2 text-[#805aed]" />
        <span>Total</span>
        <span className="font-medium text-gray-900 mx-1">{formatNumber(category.totalPosts)}</span>
        <span>posts in this category</span>
      </div>

      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-500">Sort by:</span>
        <div className="flex items-center space-x-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => handleFilterChange(filter.id)}
              className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                currentFilter === filter.id
                  ? 'bg-[#805aed] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {filter.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryFilters; 