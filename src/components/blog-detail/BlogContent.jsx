'use client';

import Image from 'next/image';
import { CalendarDays, Eye } from 'lucide-react';

const BlogContent = ({ data }) => {
  if (!data) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatViews = (views) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    }
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toLocaleString();
  };

  return (
    <article className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="space-y-4">
        <div>
          <span className="text-[#805aed] font-semibold">{data.categories?.name || 'general'}</span>
          <h1 className="text-3xl md:text-4xl font-bold mt-2">{data.title}</h1>
        </div>

        {/* meta information */}
        <div className="flex items-center gap-4 text-gray-600 text-sm">
          <div className="flex items-center gap-1">
            <CalendarDays size={16} />
            <span>{formatDate(data.created_at)}</span>
          </div>
          <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
            <Eye size={16} className="text-[#805aed]" />
            <span>{formatViews(data.views || 0)} views</span>
          </div>
        </div>

        {/* blog image */}
        {data.image && (
          <div className="relative w-full h-[400px] rounded-xl overflow-hidden">
            <Image
              src={data.image}
              alt={data.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}

        {/* blog content */}
        <div 
          className="prose prose-lg max-w-none overflow-hidden mt-8 prose-headings:text-gray-900 prose-p:text-gray-700 prose-img:rounded-xl prose-img:w-full prose-img:object-cover" 
          dangerouslySetInnerHTML={{ __html: data.content }} 
        />
      </div>
    </article>
  );
};

export default BlogContent; 