'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Newspaper } from 'lucide-react';
import { CategoryService } from '@/lib/services/category.service';
import { toast } from 'react-hot-toast';

const CategorySidebar = ({ category }) => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalViews: 0,
    uniqueAuthors: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      if (!category) {
        setLoading(false);
        return;
      }

      try {
        console.log('Loading stats for category:', category);
        setLoading(true);
        
        const categoryService = new CategoryService();
        const categoryStats = await categoryService.getCategoryStats(category.id);
        
        console.log('Received category stats:', categoryStats);
        
        if (categoryStats) {
          setStats(categoryStats);
        }
      } catch (error) {
        console.error('Error loading category stats:', error);
        toast.error('Failed to load category statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category]);

  const formatNumber = (num) => {
    if (!num) return '0';
    
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toLocaleString();
  };

  if (!category) {
    return null;
  }

  return (
    <div className="space-y-8">
      {/* category statistics */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Newspaper className="text-[#805aed]" size={20} />
          Statistics for <span className="text-[#805aed]">{category.name.toUpperCase()}</span> 
        </h3>
        <div className="space-y-4">
          {loading ? (
            // Loading placeholders
            Array(3).fill(0).map((_, index) => (
              <div key={index} className="flex justify-between items-center">
                <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-12 animate-pulse"></div>
              </div>
            ))
          ) : (
            <>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Posts</span>
                <span className="font-medium">{formatNumber(stats.totalPosts)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Authors</span>
                <span className="font-medium">{formatNumber(stats.uniqueAuthors)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Views</span>
                <span className="font-medium">{formatNumber(stats.totalViews)}</span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Advertisement Area */}
      <div className="bg-transparent rounded-lg overflow-hidden">
        <div className="relative h-[500px]">
          <Image
            src="/images/ads.jpg"
            alt="Advertisement"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain"
          />    
        </div>
      </div>
    </div>
  );
};

export default CategorySidebar; 