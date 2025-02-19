import Image from 'next/image';
import { CalendarDays, Eye } from 'lucide-react';

const BlogContent = ({ data }) => {
  return (
    <article className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="space-y-4">
        {/* Kategori ve Başlık */}
        <div>
          <span className="text-[#805aed] font-semibold">{data.category}</span>
          <h1 className="text-3xl md:text-4xl font-bold mt-2">{data.title}</h1>
        </div>

        {/* Meta Bilgileri */}
        <div className="flex items-center gap-4 text-gray-600 text-sm">
          <div className="flex items-center gap-1">
            <CalendarDays size={16} />
            <span>{data.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye size={16} />
            <span>{data.views.toLocaleString()} views</span>
          </div>
        </div>

        {/* Blog Görseli */}
        <div className="relative w-full h-[400px] rounded-xl overflow-hidden">
          <Image
            src={data.image}
            alt={data.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Blog İçeriği */}
        <div className="prose prose-lg max-w-none mt-8">
          {data.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="text-gray-700 leading-relaxed">
              {paragraph.trim()}
            </p>
          ))}
        </div>
      </div>
    </article>
  );
};

export default BlogContent; 