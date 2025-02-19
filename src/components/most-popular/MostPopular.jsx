'use client';

import Link from 'next/link';
import Image from 'next/image';

const MostPopular = () => {
    // Bu veriler daha sonra Supabase'den gelecek
    const popularPosts = [
        {
            id: 1,
            title: 'A Lesson From the Henrietta Lacks Story: Science Needs Your Cells',
            author: 'akbarh',
            date: 'July 7, 2021',
            image: '',
            slug: 'science-needs-cells',
            excerpt: 'Cursus iaculis etiam in In nullam donec sem sed consequat scelerisque nibh ...',
            views: 12453
        },
        {
            id: 2,
            title: 'What Moves Gravel-Size Gypsum Crystals Around the Desert?',
            author: 'akbarh',
            date: 'July 7, 2021',
            image: '',
            slug: 'gypsum-crystals',
            excerpt: 'Cursus iaculis etiam in In nullam donec sem sed consequat scelerisque nibh ...',
            views: 1545
        },
        {
            id: 3,
            title: 'Scientists, Feeling Under Siege, March Against Trump Policies',
            author: 'akbarh',
            date: 'July 7, 2021',
            image: '',
            slug: 'scientists-march',
            excerpt: 'Cursus iaculis etiam in In nullam donec sem sed consequat scelerisque nibh ...',
            views: 75
        }
    ];

    // Okunma sayısını formatla (1.2k, 12.5k gibi)
    const formatViews = (views) => {
        if (views >= 1000) {
            return `${(views / 1000).toFixed(1)}k`;
        }
        return views;
    };

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-bold">Most Popular</h2>
                <Link href="/popular" className="text-[#805aed] hover:text-[#7950e9] text-sm font-medium flex items-center">
                    More in Popular
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {popularPosts.map((post, index) => (
                    <article key={post.id} className="group">
                        <Link href={`/blog/${post.slug}`}>
                            <div className="relative aspect-[16/10] mb-4 overflow-hidden rounded-xl">
                                <Image
                                    src={post.image || '/images/default-post.jpg'}
                                    alt={post.title}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                                {/* Okunma sayısı rozeti */}
                                <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-white text-xs px-2.5 py-1.5 rounded-full flex items-center space-x-1">
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    <span>{formatViews(post.views)}</span>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <h3 className="text-lg font-bold leading-tight line-clamp-2 group-hover:text-[#805aed] transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-gray-600 text-sm line-clamp-2">
                                    {post.excerpt}
                                </p>
                                <div className="flex items-center text-sm text-gray-500 space-x-4">
                                    <span>{post.author}</span>
                                    <span>•</span>
                                    <span>{post.date}</span>
                                </div>
                            </div>
                        </Link>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default MostPopular; 