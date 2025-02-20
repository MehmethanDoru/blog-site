'use client';

import { useState, useEffect } from 'react';

export default function CategoryForm({ onSubmit, initialData = null, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '', 
    image: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        slug: initialData.slug || '',
        description: initialData.description || '',
        image: initialData.image || ''
      });
    } else {
      setFormData({
        name: '',
        slug: '',
        description: '',
        image: ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name' && !initialData) {
      // Generate automatic slug
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setFormData(prev => ({
        ...prev,
        [name]: value,
        slug
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    if (!initialData) {
      setFormData({
        name: '',
        slug: '',
        description: '',
        image: ''
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#805aed] focus:outline-none focus:ring-1 focus:ring-[#805aed]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Slug
          </label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#805aed] focus:outline-none focus:ring-1 focus:ring-[#805aed]"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#805aed] focus:outline-none focus:ring-1 focus:ring-[#805aed]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Image URL
        </label>
        <input
          type="url"
          name="image"
          value={formData.image}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-[#805aed] focus:outline-none focus:ring-1 focus:ring-[#805aed]"
        />
      </div>

      <div className="flex justify-end">
        {initialData && (
          <button
            type="button"
            onClick={() => {
              onCancel();
              setFormData({
                name: '',
                slug: '',
                description: '',
                image: ''
              });
            }}
            className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-[#805aed] hover:bg-[#704ece] rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#805aed]"
        >
          {initialData ? 'Update' : 'Add'}
        </button>
      </div>
    </form>
  );
}