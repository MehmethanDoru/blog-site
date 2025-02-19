'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const categories = [
        { name: 'TECHNOLOGY', slug: 'technology' },
        { name: 'GADGET', slug: 'gadget' },
        { name: 'SOFTWARE', slug: 'software' },
        { name: 'APPS', slug: 'apps' },
        { name: 'GAMES', slug: 'games' },
        { name: 'PODCAST', slug: 'podcast' }
    ];

    return (
        <nav className="bg-transparent w-full top-0 left-0 z-50 py-2 mt-2">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    <div className="flex items-center space-x-8">
                        <Link href="/" className="flex items-center space-x-2">
                            <Image src="/images/common/logo.png" alt="TechWire Logo" width={96} height={96} className="h-24 w-auto" />
                        </Link>
                        
                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center space-x-8 navbar-menu">
                            {categories.map((category) => (
                                <Link 
                                    key={category.slug}
                                    href={`/category/${category.slug}`} 
                                    className="text-sm font-medium text-gray-700 transition-colors hover:text-[#805aed]"
                                >
                                    {category.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Right Side Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/subscribe" className="text-medium font-bold text-[#805aed] hover:text-[#704ece] transition-colors">
                            Subscribe
                        </Link>
                        <Link href="/signin" className="text-medium font-medium hover:text-[#805aed] text-gray-700 transition-colors signin-button">
                            Sign In
                        </Link>
                        <button className="p-2 text-gray-600 transition-colors hover:text-[#805aed]">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center space-x-4 mobile-menu-button">
                        <button className="p-2 text-gray-600 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-600 focus:outline-none transition-colors"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden border-t border-gray-100 navbar-menu">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {categories.map((category) => (
                                <Link 
                                    key={category.slug}
                                    href={`/category/${category.slug}`}
                                    className="block px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-[#805aed]"
                                >
                                    {category.name}
                                </Link>
                            ))}
                            <Link href="/subscribe" className="block px-3 py-2 text-sm font-medium text-[#805aed] transition-colors">Subscribe</Link>
                            <Link href="/signin" className="block px-3 py-2 text-sm font-medium text-gray-700 transition-colors">Sign In</Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;