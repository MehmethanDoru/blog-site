'use client';

import { useRouter, useSearchParams } from 'next/navigation';

const CategoryFilters = ({ totalPosts, currentFilter }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const filters = [
    { id: 'latest', name: 'En Yeni' },
    { id: 'popular', name: 'En Popüler' },
  ];

  const handleFilterChange = (filterId) => {
    const params = new URLSearchParams(searchParams);
    params.set('filter', filterId);
    params.delete('page');
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
      <div className="text-gray-600">
        Toplam <span className="font-medium text-gray-900">{totalPosts}</span> yazı
      </div>

      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-500">Sırala:</span>
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