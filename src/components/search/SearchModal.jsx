'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BlogRepository } from '@/lib/repositories/blog.repository';
import Image from 'next/image';
import Link from 'next/link';

const SearchModal = ({ isOpen, onClose }) => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (searchQuery.length >= 2) {
                setLoading(true);
                try {
                    const blogRepo = new BlogRepository();
                    const { data } = await blogRepo.search(searchQuery, { limit: 5 });
                    setSearchResults(data || []);
                } catch (error) {
                    console.error('Search error:', error);
                } finally {
                    setLoading(false);
                }
            } else {
                setSearchResults([]);
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
            <div className="bg-white w-full max-w-2xl rounded-lg shadow-xl mx-4">
                <div className="p-4 border-b">
                    <div className="flex items-center space-x-4">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search in blog posts..."
                            className="flex-1 outline-none text-lg"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            autoFocus
                        />
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="max-h-[60vh] overflow-y-auto">
                    {loading ? (
                        <div className="p-4 space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="animate-pulse flex space-x-4">
                                    <div className="w-20 h-20 bg-gray-200 rounded"></div>
                                    <div className="flex-1 space-y-2 py-1">
                                        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : searchQuery.length >= 2 ? (
                        <div className="p-4 space-y-4">
                            {searchResults.length > 0 ? (
                                searchResults.map((post) => (
                                    <Link 
                                        key={post.id} 
                                        href={`/blog/${post.slug}`}
                                        onClick={onClose}
                                        className="flex space-x-4 hover:bg-gray-50 p-2 rounded-lg transition-colors"
                                    >
                                        <div className="relative w-20 h-20 flex-shrink-0">
                                            <Image
                                                src={post.image || '/images/default-post.jpg'}
                                                alt={post.title}
                                                fill
                                                className="object-cover rounded-lg"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-sm text-[#805aed] font-medium">
                                                {post.categories?.name}
                                            </div>
                                            <h3 className="font-medium line-clamp-2">
                                                {post.title}
                                            </h3>
                                            <p className="text-sm text-gray-500 line-clamp-1">
                                                {post.excerpt}
                                            </p>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    No results found
                                </div>
                            )}
                        </div>
                    ) : searchQuery.length > 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            Enter at least 2 characters
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default SearchModal;