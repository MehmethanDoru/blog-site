'use client';

import Link from 'next/link';
import Image from 'next/image';

const EditorsPick = () => {
    const editorsPicks = [
        {
            id: 1,
            category: 'GAMES',
            title: 'For Families of Teens at Microsoft Surface',
            image: '',
            slug: 'microsoft-surface'
        },
        {
            id: 2,
            category: 'TECHNOLOGY',
            title: 'Why Netflix shares are down 10%',
            image: '',
            slug: 'netflix-shares'
        },
        {
            id: 3,
            category: 'APPS',
            title: '6 Bots That Deliver Science and Serendipity on Twitter',
            image: '',
            slug: 'twitter-bots'
        }
    ];

    return (
        <div className='border-b border-gray-200 pb-8'>
            <h2 className="text-2xl font-bold mb-6">Editor's Pick</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {editorsPicks.map((pick) => (
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
                ))}
            </div>
        </div>
    );
};

export default EditorsPick; 