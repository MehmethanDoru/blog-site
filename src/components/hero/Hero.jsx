'use client';

import FeaturedPost from './FeaturedPost';
import Link from 'next/link';

const HeroSection = () => {

    const featuredPost = {
        category: 'SOFTWARE',
        title: 'Running macOS and Windows 10 on the Same Computer',
        excerpt: 'Cursus iaculis etiam in In nullam donec sem sed consequat scelerisque nibh amet, massa egestas risus, gravida vel amet, imperdiet...',
        author: {
            name: 'akbarh',
            avatar: ''
        },
        date: 'July 7, 2021',
        image: '',
        slug: 'running-macos-and-windows'
    };

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-[-30px] md:mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Main Featured Post */}
                <div className="lg:col-span-2">
                    <FeaturedPost {...featuredPost} />
                </div>

                {/* Right Side Cards */}
                <div className="space-y-6 ">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-[#e0e0e084]">
                        <span className="text-[#805aed] text-sm font-medium">APPS</span>
                        <h3 className="mt-2 text-xl font-bold">
                            <Link href="/blog/glass-3d-print" className="hover:text-[#805aed] transition-colors">
                                Broke a Glass? Someday You Might 3-D-Print a New One
                            </Link>
                        </h3>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-[#e0e0e084]">
                        <span className="text-[#805aed] text-sm font-medium">GAMES</span>
                        <h3 className="mt-2 text-xl font-bold">
                            <Link href="/blog/giant-shipworm" className="hover:text-[#805aed] transition-colors">
                                This Is a Giant Shipworm. You May Wish It Had Stayed In Its Tube.
                            </Link>
                        </h3>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border border-[#e0e0e084]">
                        <span className="text-[#805aed] text-sm font-medium">EDITORS PICK</span>
                        <h3 className="mt-2 text-xl font-bold">
                            <Link href="/blog/microsoft-surface" className="hover:text-[#805aed] transition-colors">
                                For Families of Teens at Microsoft Surface
                            </Link>
                        </h3>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection; 