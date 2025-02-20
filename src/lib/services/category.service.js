import { CategoryRepository } from '../repositories/category.repository';

export class CategoryService {
  constructor() {
    this.repository = new CategoryRepository();
  }

  async getAllCategories() {
    try {
      const { data, error } = await this.repository.findAll();
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Categories get error:', error);
      throw new Error('Error fetching categories');
    }
  }

  async getNavigationCategories() {
    try {
      const { data, error } = await this.repository.findAll();
      if (error) throw error;

      const sortedCategories = data.sort((a, b) => 
        new Date(b.created_at) - new Date(a.created_at)
      );

      // get first 5 categories
      const mainCategories = sortedCategories.slice(0, 5);
      const moreCategories = sortedCategories.slice(5);

      return {
        mainCategories,
        moreCategories
      };
    } catch (error) {
      console.error('Navigation categories get error:', error);
      throw new Error('Error fetching navigation categories');
    }
  }

  async getCategoryBySlug(slug) {
    try {
      const { data: category, error } = await this.repository.findBySlug(slug);
      if (error) throw error;
      return category;
    } catch (error) {
      console.error('Category get error:', error);
      throw error;
    }
  }

  async getCategoryStats(categoryId) {
    try {
      const stats = await this.repository.getStats(categoryId);
      return stats;
    } catch (error) {
      console.error('Category statistics get error:', error);
      return {
        totalPosts: 0,
        totalViews: 0,
        uniqueAuthors: 0
      };
    }
  }

  async getTrendingTopics(limit) {
    try {
      const { data: topics, error } = await this.repository.getTrendingTopics(limit);
      if (error) throw error;
      return topics;
    } catch (error) {
      console.error('Trend topics get error:', error);
      throw error;
    }
  }

  async createCategory(categoryData) {
    try {
      const { data, error } = await this.repository.create(categoryData);
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Category creation error:', error);
      throw new Error('Error creating category');
    }
  }

  async updateCategory(categoryId, categoryData) {
    try {
      const { data, error } = await this.repository.update(categoryId, categoryData);
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Category update error:', error);
      throw new Error('Error updating category');
    }
  }

  async deleteCategory(categoryId) {
    try {
      const { error } = await this.repository.delete(categoryId);
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Category deletion error:', error);
      throw new Error('Error deleting category');
    }
  }
} 