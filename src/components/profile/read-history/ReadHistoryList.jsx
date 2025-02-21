'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Eye } from 'lucide-react';
import { ReadHistoryAccess } from '@/lib/access/read-history.access';
import { AuthService } from '@/lib/services/auth.service';

export default function ReadHistoryList() {
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 0,
    totalCount: 0
  });

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const authService = new AuthService();
      const session = await authService.getCurrentSession();
      
      if (!session) {
        return;
      }

      const readHistoryAccess = new ReadHistoryAccess();
      const result = await readHistoryAccess.getUserHistory(session.user.id, {
        page: 1,
        limit: 10
      });

      setHistory(result.history);
      setPagination({
        currentPage: result.currentPage,
        totalPages: result.totalPages,
        totalCount: result.totalCount
      });
    } catch (error) {
      console.error('Error loading read history:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Read History</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="animate-pulse">
              <div className="h-24 bg-gray-200 rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Read History</h2>
      <div className="space-y-6">
        {history.map((item) => (
          <article key={item.id} className="border rounded-lg overflow-hidden">
            <Link href={`/blog/${item.posts.slug}`}>
              <div className="flex items-center p-4">
                <div className="relative w-32 h-20 flex-shrink-0">
                  <Image
                    src={item.posts.image || '/images/default-post.jpg'}
                    alt={item.posts.title}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="font-semibold hover:text-[#805aed] transition-colors">
                    {item.posts.title}
                  </h3>
                  <div className="flex items-center text-sm text-gray-500 mt-2">
                    <span>{formatDate(item.created_at)}</span>
                    <span className="mx-2">•</span>
                    <div className="flex items-center">
                      <Eye size={16} className="mr-1" />
                      <span>{item.posts.views || 0}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </article>
        ))}

        {history.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No reading history found.
          </div>
        )}
      </div>
    </div>
  );
}
