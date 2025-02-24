'use client';

import Image from 'next/image';
import Link from 'next/link';

const ReviewCard = ({ category, title, excerpt, date, image, slug }) => {
    return (
        <article className="flex space-x-6">
            <Link href={`/blog/${slug}`} className="relative w-48 h-32 md:w-96 md:h-64 flex-shrink-0 overflow-hidden rounded-xl">
                <Image
                    src={image || '/images/default-post.jpg'}
                    alt={title}
                    fill
                    className="object-cover rounded-xl transition-transform duration-300 hover:scale-110 hover:rounded-xl"
                />
            </Link>

            <div className="flex-1 min-w-0">
                <div className="space-y-2">
                    <Link href={`/category/${category.toLowerCase()}`} className="text-[#805aed] text-sm font-medium hover:text-[#7950e9] transition-colors">{category}</Link>
                    <h3 className="text-xl md:text-2xl font-bold leading-tight line-clamp-2">
                        <Link href={`/blog/${slug}`} className="hover:text-[#805aed] transition-colors">
                            {title}
                        </Link>
                    </h3>
                    <p className="text-gray-600 text-sm md:text-lg line-clamp-2">{excerpt}</p>
                    <div className="flex items-center text-sm text-gray-500 space-x-4">
                        <span>{date}</span>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default ReviewCard;