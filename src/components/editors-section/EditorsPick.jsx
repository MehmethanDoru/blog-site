'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { BlogRepository } from '@/lib/repositories/blog.repository';

const EditorsPick = () => {
    const [editorsPicks, setEditorsPicks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEditorsPicks = async () => {
            try {
                const blogRepo = new BlogRepository();
                const { data: posts } = await blogRepo.findAll({
                    limit: 3,
                    filter: 'random'
                });

                if (posts) {
                    setEditorsPicks(posts.map(post => ({
                        id: post.id,
                        category: post.categories?.name.toUpperCase() || 'GENERAL',
                        title: post.title,
                        image: post.image || '',
                        slug: post.slug
                    })));
                }
            } catch (error) {
                console.error('Error loading editor picks:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEditorsPicks();
    }, []);

    return (
        <div className='border-b border-gray-200 pb-8'>
            <h2 className="text-2xl font-bold mb-6">Editor's Pick</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    // Skeleton loading state
                    Array(3).fill(0).map((_, index) => (
                        <div key={index} className="animate-pulse">
                            <div className="relative aspect-[4/3] mb-4 bg-gray-200 rounded-lg"></div>
                            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                        </div>
                    ))
                ) : (
                    editorsPicks.map((pick) => (
                        <article key={pick.id} className="group">
                            <Link href={`/blog/${pick.slug}`}>
                                <div className="relative aspect-[4/3] mb-4 overflow-hidden rounded-lg">
                                    <Image
                                        src={pick.image || '/images/default-post.jpg'}
                                        alt={pick.title}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <div className="absolute top-3 left-3">
                                        <span className="inline-block bg-white/90 backdrop-blur-sm text-[#805aed] text-xs font-medium px-2 py-1 rounded-md">
                                            {pick.category}
                                        </span>
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold leading-tight line-clamp-2 group-hover:text-[#805aed] transition-colors">
                                    {pick.title}
                                </h3>
                            </Link>
                        </article>
                    ))
                )}
            </div>
        </div>
    );
};

export default EditorsPick;