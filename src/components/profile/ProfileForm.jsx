'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { AuthService } from '@/lib/services/auth.service';
import { UserService } from '@/lib/services/user.service';

export default function ProfileForm() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [session, setSession] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    website: '',
    hackerrank: '',
    linkedin: '',
    github: ''
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const authService = new AuthService();
      const userService = new UserService();
      const currentSession = await authService.getCurrentSession();
      
      if (!currentSession) {
        throw new Error('Session not found');
      }

      setSession(currentSession);
      
      const userProfile = await userService.getUserProfile(currentSession.user.id);
      
      setFormData({
        name: currentSession.user.user_metadata?.name || '',
        bio: userProfile?.bio || '',
        website: userProfile?.website || '',
        hackerrank: userProfile?.hackerrank || '',
        linkedin: userProfile?.linkedin || '',
        github: userProfile?.github || ''
      });
    } catch (error) {
      console.error('Error loading profile:', error);
      toast.error('Error loading profile');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const userService = new UserService();
      
      // Update profile
      await userService.updateUserProfile(session.user.id, {
        name: formData.name,
        bio: formData.bio,
        website: formData.website,
        hackerrank: formData.hackerrank,
        linkedin: formData.linkedin,
        github: formData.github,
        updated_at: new Date().toISOString()
      });

      toast.success('Profile updated successfully');
      
      await loadProfile();
    } catch (error) {
      console.error('Update error:', error);
      toast.error('Update error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="animate-pulse">
          <div className="h-32 w-32 bg-gray-200 rounded-full mx-auto mb-6" />
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="max-w-2xl mx-auto">

        {/* Profile Photo */}
        <div className="text-center mb-8">
          <div className="relative w-32 h-32 mx-auto mb-4">
            <Image
              src={session.user.user_metadata?.avatar_url || "/images/default-avatar.webp"}
              alt="Profil"
              fill
              className="rounded-full object-cover"
            />
          </div>
          <button
            type="button"
            className="text-sm text-[#805aed] hover:text-[#704ece]"
          >
            Change Photo
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#805aed] focus:outline-none focus:ring-1 focus:ring-[#805aed]"
            />
          </div>

          {/* Biography */}
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
              Biography
            </label>
            <textarea
              id="bio"
              name="bio"
              rows={4}
              value={formData.bio}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#805aed] focus:outline-none focus:ring-1 focus:ring-[#805aed]"
            />
          </div>

          {/* Website */}
          <div>
            <label htmlFor="website" className="block text-sm font-medium text-gray-700">
              Website
            </label>
            <input
              type="url"
              id="website"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-[#805aed]"
            />
          </div>

          {/* Social Media */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div>
              <label htmlFor="hackerrank" className="block text-sm font-medium text-gray-700">
                HackerRank
              </label>
              <input
                type="text"
                id="hackerrank"
                name="hackerrank"
                value={formData.hackerrank}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#805aed] focus:outline-none focus:ring-1 focus:ring-[#805aed]"
              />
            </div>

            <div>
              <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">
                LinkedIn
              </label>
              <input
                type="text"
                id="linkedin"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#805aed] focus:outline-none focus:ring-1 focus:ring-[#805aed]"
              />
            </div>

            <div>
              <label htmlFor="github" className="block text-sm font-medium text-gray-700">
                GitHub
              </label>
              <input
                type="text"
                id="github"
                name="github"
                value={formData.github}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#805aed] focus:outline-none focus:ring-1 focus:ring-[#805aed]"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#805aed] hover:bg-[#704ece] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#805aed] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 