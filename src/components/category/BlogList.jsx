'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, Clock } from 'lucide-react';

const BlogList = ({ posts, pagination }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="space-y-8">

      {/* Blog Posts */}
      <div className="space-y-8">
        {posts.map((post) => (
          <article key={post.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
            <Link href={`/blog/${post.slug}`}>
              <div className="flex flex-col md:flex-row">

                {/* Blog Image */}
                <div className="relative w-full md:w-72 h-48">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Blog Content */}
                <div className="p-6 flex-1">
                  <h2 className="text-xl font-bold mb-2 hover:text-[#805aed] transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  {/* Meta Information */}
                  <div className="flex items-center text-sm text-gray-500 space-x-4">
                    <span>{post.author}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                    <span>•</span>
                    <div className="flex items-center space-x-1">
                      <Eye size={16} />
                      <span>{post.views}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center space-x-1">
                      <Clock size={16} />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-12">
          <button
            onClick={() => handlePageChange(pagination.currentPage - 1)}
            disabled={pagination.currentPage === 1}
            className="px-4 py-2 text-sm rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-gray-100 text-gray-600 hover:bg-gray-200"
          >
            Önceki
          </button>

          {/* Page Numbers */}
          <div className="flex items-center space-x-2">
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
              .filter(page => {
                if (page === 1 || page === pagination.totalPages) return true;
                return Math.abs(page - pagination.currentPage) <= 2;
              })
              .map((page, index, array) => {
                if (index > 0 && page - array[index - 1] > 1) {
                  return (
                    <span key={`gap-${page}`} className="px-4 py-2">
                      ...
                    </span>
                  );
                }

                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                      pagination.currentPage === page
                        ? 'bg-[#805aed] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {page}
                  </button>
                );
              })}
          </div>

          <button
            onClick={() => handlePageChange(pagination.currentPage + 1)}
            disabled={pagination.currentPage === pagination.totalPages}
            className="px-4 py-2 text-sm rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-gray-100 text-gray-600 hover:bg-gray-200"
          >
            Sonraki
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogList; 