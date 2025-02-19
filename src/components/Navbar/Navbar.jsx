'use client';

import { useState, useEffect } from 'react';
import { AuthService } from '@/lib/services/auth.service';
import MobileNavbar from './MobileNavbar';
import DesktopNavbar from './DesktopNavbar';
import { toast } from 'react-hot-toast';
import './Navbar.css';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);

    const categories = [
        { name: 'TECHNOLOGY', slug: 'technology' },
        { name: 'GADGET', slug: 'gadget' },
        { name: 'SOFTWARE', slug: 'software' },
        { name: 'APPS', slug: 'apps' },
        { name: 'GAMES', slug: 'games' },
        { name: 'PODCAST', slug: 'podcast' }
    ];

    useEffect(() => {
        checkSession();
    }, []);

    const checkSession = async () => {
        try {
            const authService = new AuthService();
            const currentSession = await authService.getCurrentSession();
            setSession(currentSession);
        } catch (error) {
            console.error('Session check error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            const authService = new AuthService();
            await authService.signOut();
            setSession(null);
            toast.success('Başarıyla çıkış yapıldı');
            window.location.href = '/';
        } catch (error) {
            console.error('Çıkış hatası:', error);
            toast.error('Çıkış yapılırken hata oluştu');
        }
    };

    const navbarProps = {
        isMenuOpen,
        setIsMenuOpen,
        isProfileMenuOpen,
        setIsProfileMenuOpen,
        session,
        loading,
        categories,
        handleLogout
    };

    return (
        <nav className="bg-transparent w-full top-0 left-0 z-50 py-2 mt-2">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Desktop Navbar */}
                <div className="hidden md:block">
                    <DesktopNavbar {...navbarProps} />
                </div>

                {/* Mobile Navbar */}
                <div className="md:hidden">
                    <MobileNavbar {...navbarProps} />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;