'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

const DesktopNavbar = ({ session, loading, categories, isProfileMenuOpen, setIsProfileMenuOpen, handleLogout }) => {
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
        <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
                <Link href="/" className="flex items-center space-x-2">
                    <Image src="/images/common/logo.png" alt="TechWire Logo" width={96} height={96} className="h-24 w-auto" />
                </Link>
                
                {/* Categories Menu */}
                <div className="flex items-center space-x-8 navbar-menu">
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
            <div className="flex items-center space-x-8">
                {!loading && (
                    <>
                        {session ? (
                            <div className="relative" ref={menuRef}>
                                <button
                                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                                    className="flex items-center space-x-2 text-gray-700 hover:text-[#805aed]"
                                >
                                    <div className="relative w-8 h-8 rounded-full overflow-hidden">
                                        <Image
                                            src={session.user.user_metadata?.avatar_url || "/images/default-avatar.webp"}
                                            alt="Profile"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <span className="font-medium">{session.user.user_metadata?.name || 'User'}</span>
                                </button>

                                {isProfileMenuOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
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
                        ) : (
                            <>
                                <Link href="/subscribe" className="text-medium font-bold text-[#805aed] hover:text-[#704ece] transition-colors">
                                    Subscribe
                                </Link>
                                <Link href="/auth/login" className="text-medium font-medium hover:text-[#805aed] text-gray-700 transition-colors">
                                    Login
                                </Link>
                            </>
                        )}
                    </>
                )}
                <button className="p-2 text-gray-600 transition-colors hover:text-[#805aed]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default DesktopNavbar;