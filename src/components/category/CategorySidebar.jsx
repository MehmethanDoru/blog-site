import Image from 'next/image';
import Link from 'next/link';
import { Newspaper, TrendingUp, Tag } from 'lucide-react';

const getTrendingTopics = () => {
  return [
    { id: 1, name: 'Artificial Intelligence', count: 45 },
    { id: 2, name: 'Machine Learning', count: 32 },
    { id: 3, name: 'Web Development', count: 28 },
    { id: 4, name: 'Cybersecurity', count: 24 },
    { id: 5, name: 'Cloud Computing', count: 19 }
  ];
};

const CategorySidebar = ({ category }) => {
  const trendingTopics = getTrendingTopics();

  return (
    <div className="space-y-8">

      {/* category statistics */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Newspaper className="text-[#805aed]" size={20} />
          Kategori İstatistikleri
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Toplam Yazı</span>
            <span className="font-medium">156</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Toplam Yazar</span>
            <span className="font-medium">12</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Toplam Görüntülenme</span>
            <span className="font-medium">45.2K</span>
          </div>
        </div>
      </div>

      {/* Trend Topics */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <TrendingUp className="text-[#805aed]" size={20} />
          Trend Konular
        </h3>
        <div className="space-y-3">
          {trendingTopics.map((topic) => (
            <div key={topic.id} className="flex justify-between items-center">
              <Link 
                href={`/category/${topic.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-gray-600 hover:text-[#805aed] transition-colors flex items-center gap-2"
              >
                <Tag size={16} />
                {topic.name}
              </Link>
              <span className="text-sm text-gray-500">{topic.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Advertisement Area */}
      <div className="bg-transparent rounded-lg overflow-hidden">
        <div className="relative h-[500px]">
          <Image
            src="/images/ads.jpg"
            alt="Advertisement"
            fill
            className="object-contain"
          />    
        </div>
      </div>
    </div>
  );
};

export default CategorySidebar; 