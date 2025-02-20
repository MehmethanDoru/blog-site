'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { CategoryAccess } from '@/lib/access/category.access';
import { AuthService } from '@/lib/services/auth.service';
import CategoryHeader from './category/CategoryHeader';
import CategoryForm from './category/CategoryForm';
import CategoryList from './category/CategoryList';

export default function CategoryManagement() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCategory, setEditingCategory] = useState(null);
  const [session, setSession] = useState(null);

  useEffect(() => {
    checkSession();
    loadCategories();
  }, []);

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
      const categoryAccess = new CategoryAccess();
      const data = await categoryAccess.getCategories();
      setCategories(data);
    } catch (error) {
      console.error('Error loading categories:', error);
      toast.error('Error loading categories');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    if (!session) {
      toast.error('Session not found!');
      return;
    }

    try {
      const categoryAccess = new CategoryAccess();

      if (editingCategory) {
        await categoryAccess.updateCategory(session.user.id, editingCategory.id, formData);
        toast.success('Category updated successfully!');
        setEditingCategory(null);
      } else {
        await categoryAccess.createCategory(session.user.id, formData);
        toast.success('Category created successfully!');
      }

      loadCategories();
    } catch (error) {
      console.error('Category save error:', error);
      toast.error(error.message);
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
  };

  const handleDelete = async (categoryId) => {
    if (!session?.user?.id) {
      toast.error('Session not found!');
      return;
    }

    try {
      const categoryAccess = new CategoryAccess();
      await categoryAccess.deleteCategory(session.user.id, categoryId);
      toast.success('Category deleted successfully!');
      loadCategories();
    } catch (error) {
      console.error('Category delete error:', error);
      toast.error('Error deleting category');
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-1/4" />
          <div className="h-10 bg-gray-200 rounded" />
          <div className="h-10 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <CategoryHeader />
      
      <CategoryForm 
        onSubmit={handleSubmit}
        initialData={editingCategory}
        onCancel={() => setEditingCategory(null)}
      />

      <CategoryList 
        categories={categories}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}