'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserCircle, FileText, Settings, LayoutDashboard, FolderKanban, BookOpen } from 'lucide-react';
import { AuthService } from '@/lib/services/auth.service';

export default function ProfileSidebar() {
  const pathname = usePathname();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const authService = new AuthService();
        const currentSession = await authService.getCurrentSession();
        console.log('Current Session:', currentSession);
        console.log('Is Admin:', currentSession?.user?.app_metadata?.isAdmin);
        setSession(currentSession);
      } catch (error) {
        console.error('Session check error:', error);
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, []);

  const baseMenuItems = [
    {
      title: 'Profile Info',
      href: '/profile',
      icon: UserCircle
    },
    {
      title: 'Posts',
      href: '/profile/posts',
      icon: FileText
    },
    {
      title: 'Read History',
      href: '/profile/read-history',
      icon: BookOpen
    }
  ];

  const adminMenuItems = [
    {
      title: 'Category Management',
      href: '/profile/category-management',
      icon: FolderKanban
    },
  ];

  console.log('Session State:', session);
  console.log('Is Admin Check:', session?.user?.app_metadata?.isAdmin);

  const menuItems = session?.user?.app_metadata?.isAdmin 
    ? [...baseMenuItems, ...adminMenuItems]
    : baseMenuItems;

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-4">
        <div className="space-y-2 animate-pulse">
          {[1, 2, 3].map((item) => (
            <div key={item} className="h-10 bg-gray-200 rounded-md" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <nav className="space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                isActive
                  ? 'bg-[#805aed] text-white'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-[#805aed]'
              }`}
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.title}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}