'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserCircle, FileText, Settings, Key } from 'lucide-react';

export default function ProfileSidebar() {
  const pathname = usePathname();

  const menuItems = [
    {
      title: 'Profile Information',
      href: '/profile',
      icon: UserCircle
    },
    {
      title: 'My Posts',
      href: '/profile/posts',
      icon: FileText
    },
    {
      title: 'Account Settings',
      href: '/profile/settings',
      icon: Settings
    },
    {
      title: 'Change Password',
      href: '/profile/password',
      icon: Key
    }
  ];

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