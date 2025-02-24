'use client';

import { useEffect, useState } from 'react';
import FeaturedPost from './FeaturedPost';
import Link from 'next/link';
import { BlogRepository } from '@/lib/repositories/blog.repository';

const HeroSection = () => {
    const [featuredPost, setFeaturedPost] = useState(null);
    const [randomPosts, setRandomPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const blogRepo = new BlogRepository();
                
                // Fetch featured post
                const { data: featuredPosts } = await blogRepo.findAll({ limit: 1 });
                if (featuredPosts && featuredPosts.length > 0) {
                    const post = featuredPosts[0];
                    setFeaturedPost({
                        category: post.categories?.name.toUpperCase() || 'GENERAL',
                        title: post.title,
                        excerpt: post.excerpt || post.content?.substring(0, 150) + '...',
                        date: new Date(post.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        }),
                        image: post.image || '',
                        imageAlt: post.title || 'Featured blog post image',
                        slug: post.slug
                    });
                }

                // Fetch random posts for right side
                const { data: randomPostsData } = await blogRepo.findAll({ 
                    limit: 3,
                    filter: 'random'
                });

                if (randomPostsData) {
                    setRandomPosts(randomPostsData.map(post => ({
                        id: post.id,
                        category: post.categories?.name.toUpperCase() || 'GENERAL',
                        title: post.title,
                        slug: post.slug
                    })));
                }

            } catch (error) {
                console.error('Error loading posts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-[-30px] md:mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Main Featured Post */}
                <div className="lg:col-span-2">
                    {featuredPost && <FeaturedPost {...featuredPost} />}
                </div>

                {/* Right Side Cards */}
                <div className="grid grid-cols-1 gap-6">
                    {loading ? (
                        // Skeleton loading state
                        Array(3).fill(0).map((_, index) => (
                            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-[#e0e0e084] animate-pulse flex-1 min-h-[140px]">
                                <div className="h-4 bg-gray-200 w-20 mb-3 rounded"></div>
                                <div className="h-6 bg-gray-200 w-full rounded"></div>
                            </div>
                        ))
                    ) : (
                        randomPosts.map((post) => (
                            <div key={post.id} className="bg-white p-6 rounded-xl shadow-sm border border-[#e0e0e084] flex flex-col justify-between ">
                                <div>
                                    <span className="text-[#805aed] text-sm font-medium">{post.category}</span>
                                    <h3 className="mt-2 text-xl font-bold line-clamp-2">
                                        <Link href={`/blog/${post.slug}`} className="hover:text-[#805aed] transition-colors">
                                            {post.title}
                                        </Link>
                                    </h3>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export default HeroSection;