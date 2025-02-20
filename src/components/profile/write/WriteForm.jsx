'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { CategoryService } from '@/lib/services/category.service';
import { BlogService } from '@/lib/services/blog.service';
import { AuthService } from '@/lib/services/auth.service';
import WriteHeader from './WriteHeader';
import Editor from './Editor';

export default function WriteForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [session, setSession] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category_id: '',
    image: '',
    author_id: '',
    created_at: '',
    updated_at: ''
  });

  useEffect(() => {
    loadCategories();
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const authService = new AuthService();
      const currentSession = await authService.getCurrentSession();
      if (!currentSession) {
        router.push('/auth/login');
        return;
      }
      setSession(currentSession);
      setFormData(prev => ({
        ...prev,
        author_id: currentSession.user.id
      }));
    } catch (error) {
      console.error('Session check error:', error);
      router.push('/auth/login');
    }
  };

  const loadCategories = async () => {
    try {
      const categoryService = new CategoryService();
      const data = await categoryService.getAllCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error loading categories:', error);
      toast.error('Error loading categories');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditorChange = (content) => {
    setFormData(prev => ({
      ...prev,
      content
    }));
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      toast.error('Please enter a title');
      return false;
    }
    if (!formData.excerpt.trim()) {
      toast.error('Please enter an excerpt');
      return false;
    }
    if (!formData.category_id) {
      toast.error('Please select a category');
      return false;
    }
    if (!formData.content.trim()) {
      toast.error('Please enter content');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!session?.user?.id) {
      toast.error('Please login to continue');
      return;
    }

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const blogService = new BlogService();
      const now = new Date().toISOString();
      const postData = {
        ...formData,
        status: 'published',
        created_at: now,
        updated_at: now
      };
      
      await blogService.createPost(session.user.id, postData);
      toast.success('Blog post published successfully!');
      router.push('/profile/posts');
      setFormData({
        title: '',
        excerpt: '',
        category_id: '',
        image: '',
        content: '',
        author_id: '',
        created_at: '',
        updated_at: ''
      });
    } catch (error) {
      console.error('Error publishing post:', error);
      if (error.message.includes('duplicate key value violates unique constraint')) {
        toast.error('A post with this title already exists. Please choose a different title.');
      } else {
        toast.error(error.message || 'Error publishing blog post');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <WriteHeader 
        loading={loading} 
        onSubmit={handleSubmit}
      />

      <form className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#805aed] focus:outline-none focus:ring-1 focus:ring-[#805aed]"
            placeholder="Blog post title"
          />
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Excerpt
          </label>
          <textarea
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            required
            rows={3}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#805aed] focus:outline-none focus:ring-1 focus:ring-[#805aed]"
            placeholder="Brief summary of the blog post"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#805aed] focus:outline-none focus:ring-1 focus:ring-[#805aed]"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Featured Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Featured Image URL
          </label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#805aed] focus:outline-none focus:ring-1 focus:ring-[#805aed]"
            placeholder="Image URL"
          />
        </div>

        {/* Content Editor */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content
          </label>
          <Editor 
            content={formData.content}
            onChange={handleEditorChange}
          />
        </div>
      </form>
    </div>
  );
} 