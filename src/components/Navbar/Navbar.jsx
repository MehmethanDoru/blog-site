'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { AuthService } from '@/lib/services/auth.service';
import { CategoryService } from '@/lib/services/category.service';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import SearchModal from '../search/SearchModal';
import { useNavbar } from '@/contexts/NavbarContext';
import './Navbar.css';

const Navbar = () => {
    const router = useRouter();
    const { navbarKey } = useNavbar();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [isMoreOpen, setIsMoreOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [session, setSession] = useState(null);
    const [categories, setCategories] = useState({ mainCategories: [], moreCategories: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkSession();
        loadCategories();
    }, [navbarKey]);

    const checkSession = async () => {
        try {
            const authService = new AuthService();
            const currentSession = await authService.getCurrentSession();
            setSession(currentSession);
        } catch (error) {
            console.error('Session check error:', error);
        }
    };

    const loadCategories = async () => {
        try {
            const categoryService = new CategoryService();
            const data = await categoryService.getNavigationCategories();
            setCategories(data);
        } catch (error) {
            console.error('Error loading categories:', error);
            toast.error('Error loading categories');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            const authService = new AuthService();
            await authService.signOut();
            setSession(null);
            toast.success('Successfully logged out');
            window.location.href = '/';
        } catch (error) {
            console.error('Logout error:', error);
            toast.error('Logout error');
        }
    };

    const handleProfileClick = (path) => {
        router.push(path);
        setIsProfileMenuOpen(false);
        checkSession(); // Profil menüsünden bir yere tıklandığında session'ı yeniden kontrol et
    };

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
                            {!loading && categories.mainCategories.map((category) => (
                                <Link
                                    key={category.id}
                                    href={`/category/${category.slug}`}
                                    className="text-sm font-medium text-gray-700 transition-colors hover:text-[#805aed]"
                                >
                                    {category.name.toUpperCase()}
                                </Link>
                            ))}
                            {categories.moreCategories.length > 0 && (
                                <div className="relative">
                                    <button
                                        onClick={() => setIsMoreOpen(!isMoreOpen)}
                                        className="text-sm font-medium text-gray-700 transition-colors hover:text-[#805aed]"
                                    >
                                        MORE
                                    </button>
                                    {isMoreOpen && (
                                        <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                                            {categories.moreCategories.map((category) => (
                                                <Link
                                                    key={category.id}
                                                    href={`/category/${category.slug}`}
                                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                >
                                                    {category.name.toUpperCase()}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Side Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {!loading && (
                            <>
                                {session ? (
                                    <div className="relative">
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
                                                <button
                                                    onClick={() => handleProfileClick('/profile')}
                                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                >
                                                    Profile
                                                </button>
                                                <button
                                                    onClick={() => handleProfileClick('/profile/posts')}
                                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                >
                                                    My Posts
                                                </button>
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
                                        <Link href="/auth/register" className="text-medium font-bold text-[#805aed] hover:text-[#704ece] transition-colors">
                                            Register
                                        </Link>
                                        <Link href="/auth/login" className="text-medium font-medium hover:text-[#805aed] text-gray-700 transition-colors">
                                            Login
                                        </Link>
                                    </>
                                )}
                            </>
                        )}
                        <button 
                            onClick={() => setIsSearchOpen(true)} 
                            className="p-2 text-gray-600 transition-colors hover:text-[#805aed]"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center space-x-4">
                        {!loading && session && (
                            <div className="relative">
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
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                                        <button
                                            onClick={() => handleProfileClick('/profile')}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            Profile
                                        </button>
                                        <button
                                            onClick={() => handleProfileClick('/profile/posts')}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                        >
                                            My Posts
                                        </button>
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
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden border-t border-gray-100 navbar-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {!loading && [...categories.mainCategories, ...categories.moreCategories].map((category) => (
                            <Link
                                key={category.id}
                                href={`/category/${category.slug}`}
                                className="block px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-[#805aed]"
                            >
                                {category.name.toUpperCase()}
                            </Link>
                        ))}
                        {!loading && !session && (
                            <>
                                <Link href="/auth/register" className="block px-3 py-2 text-sm font-medium text-[#805aed] transition-colors">
                                    Register
                                </Link>
                                <Link href="/auth/login" className="block px-3 py-2 text-sm font-medium text-gray-700 transition-colors">
                                    Login
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}

            <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </nav>
    );
};

export default Navbar;