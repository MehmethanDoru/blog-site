'use client';

import { useEffect, useState } from 'react';
import { FileText, Users, Eye, CheckCircle } from 'lucide-react';
import { BlogStatsService } from '@/lib/services/blog-stats.service';

export default function BlogStats({ authorId = null }) {
  const [stats, setStats] = useState({
    totalPosts: 0,
    publishedPosts: 0,
    totalAuthors: 0,
    totalViews: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, [authorId]);

  const loadStats = async () => {
    try {
      const blogStatsService = new BlogStatsService();
      const data = authorId 
        ? await blogStatsService.getAuthorStats(authorId)
        : await blogStatsService.getOverallStats();
      
      setStats(data);
    } catch (error) {
      console.error('İstatistik yükleme hatası:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num;
  };

  const stats_items = [
    {
      label: 'total posts',
      value: stats.totalPosts,
      icon: FileText,
      color: 'text-blue-500'
    },
    {
      label: 'published posts',
      value: stats.publishedPosts,
      icon: CheckCircle,
      color: 'text-green-500'
    },
    ...(authorId ? [] : [{
      label: 'total authors',
      value: stats.totalAuthors,
      icon: Users,
      color: 'text-purple-500'
    }]),
    {
      label: 'total views',
      value: formatNumber(stats.totalViews),
      icon: Eye,
      color: 'text-orange-500'
    }
  ];

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-8 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-20 mb-1"></div>
              <div className="h-6 bg-gray-200 rounded w-12"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats_items.map((item, index) => {
          const Icon = item.icon;
          return (
            <div key={index} className="text-center">
              <Icon className={`w-8 h-8 mx-auto mb-2 ${item.color}`} />
              <p className="text-sm text-gray-600 mb-1">{item.label}</p>
              <p className="text-2xl font-bold">{item.value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
} 