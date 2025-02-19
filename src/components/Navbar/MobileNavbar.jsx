'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

const MobileNavbar = ({ 
    session, 
    loading, 
    categories, 
    isMenuOpen, 
    setIsMenuOpen,
    isProfileMenuOpen,
    setIsProfileMenuOpen,
    handleLogout 
}) => {
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsProfileMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [setIsProfileMenuOpen]);

    return (
        <>
            <div className="flex justify-between items-center h-16">
                <Link href="/" className="flex items-center space-x-2">
                    <Image src="/images/common/logo.png" alt="TechWire Logo" width={96} height={96} className="h-24 w-auto" />
                </Link>

                <div className="flex items-center space-x-4">
                    {!loading && session && (
                        <div className="relative" ref={menuRef}>
                            <button
                                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                                className="flex items-center space-x-2"
                            >
                                <div className="relative w-8 h-8 rounded-full overflow-hidden">
                                    <Image
                                        src={session.user.user_metadata?.avatar_url || "/images/default-avatar.webp"}
                                        alt="Profile"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </button>

                            {isProfileMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                                    <Link
                                        href="/profile"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Profile
                                    </Link>
                                    <Link
                                        href="/profile/posts"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        My Posts
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
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
                <div className="border-t border-gray-100 navbar-menu">
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
                        {!loading && !session && (
                            <>
                                <Link href="/subscribe" className="block px-3 py-2 text-sm font-medium text-[#805aed] transition-colors">
                                    Subscribe
                                </Link>
                                <Link href="/auth/login" className="block px-3 py-2 text-sm font-medium text-gray-700 transition-colors">
                                    Login
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default MobileNavbar;