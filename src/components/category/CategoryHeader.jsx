import Image from 'next/image';
import { FileText, Eye, Users } from 'lucide-react';

const CategoryHeader = ({ data }) => {
  const formatNumber = (num) => {
    if (!num) return '0';
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toLocaleString();
  };

  return (
    <div className="relative h-[300px] w-full overflow-hidden">

      <div className="absolute inset-0">
        <Image
          src={data.image || '/images/dafault-blog.webp'}
          alt={`${data.title} category image`}
          fill
          sizes="100vw"
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center h-full">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {data.title}
            </h1>
            <p className="text-lg text-gray-200">
              {data.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
                <FileText size={16} className="text-white mr-2" />
                <span className="text-white font-medium">
                  {formatNumber(data.totalPosts)} Posts
                </span>
              </div>
              <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
                <Eye size={16} className="text-white mr-2" />
                <span className="text-white font-medium">
                  {formatNumber(data.totalViews)} Views
                </span>
              </div>
              <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
                <Users size={16} className="text-white mr-2" />
                <span className="text-white font-medium">
                  {formatNumber(data.uniqueAuthors)} Authors
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryHeader; 