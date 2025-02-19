'use client';

import Image from 'next/image';
import Link from 'next/link';

const FeaturedPost = ({ category, title, excerpt, author, date, image, slug }) => {
    return (
        <div className="relative h-[500px] w-full overflow-hidden rounded-xl group">
           
            <div className="absolute inset-0">
                <Image
                    src={image || '/images/default-post.jpg'}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
            </div>

            {/* Content */}
            <div className="relative h-full flex flex-col justify-end p-6 text-white">
                <div className="space-y-3">
                    <span className="inline-block px-3 py-1 text-sm font-medium bg-indigo-600 rounded-full">
                        {category}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold leading-tight">
                        {title}
                    </h2>
                    <p className="text-gray-200 line-clamp-2">
                        {excerpt}
                    </p>
                    <div className="flex items-center space-x-4 pt-2">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden">
                                <Image
                                    src={author?.avatar || '/images/default-avatar.webp'}
                                    alt={author?.name}
                                    width={32}
                                    height={32}
                                    className="object-cover"
                                />
                            </div>
                            <span className="text-sm font-medium">{author?.name}</span>
                        </div>
                        <span className="text-sm text-gray-300">{date}</span>
                    </div>
                </div>
            </div>

            {/* Clickable Area */}
            <Link href={`/blog/${slug}`} className="absolute inset-0">
                <span className="sr-only">Read Article</span>
            </Link>
        </div>
    );
};

export default FeaturedPost; 