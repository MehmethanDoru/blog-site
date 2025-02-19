import { CategoryRepository } from '../repositories/category.repository';

export class CategoryService {
  constructor() {
    this.repository = new CategoryRepository();
  }

  async getAllCategories() {
    try {
      const { data: categories, error } = await this.repository.findAll();
      if (error) throw error;
      return categories;
    } catch (error) {
      console.error('Categories get error:', error);
      throw error;
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
      const { postsCount, viewsData, authorsData } = await this.repository.getStats(categoryId);

      if (postsCount.error) throw postsCount.error;
      if (viewsData.error) throw viewsData.error;
      if (authorsData.error) throw authorsData.error;

      const totalViews = viewsData.data.reduce((sum, post) => sum + post.views, 0);
      const uniqueAuthors = new Set(authorsData.data.map(post => post.author_id)).size;

      return {
        totalPosts: postsCount.count,
        totalViews,
        uniqueAuthors
      };
    } catch (error) {
      console.error('Category statistics get error:', error);
      throw error;
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
      const { data: category, error } = await this.repository.create(categoryData);
      if (error) throw error;
      return category;
    } catch (error) {
      console.error('Category creation error:', error);
      throw error;
    }
  }

  async updateCategory(id, categoryData) {
    try {
      const { data: category, error } = await this.repository.update(id, categoryData);
      if (error) throw error;
      return category;
    } catch (error) {
      console.error('Category update error:', error);
      throw error;
    }
  }

  async deleteCategory(id) {
    try {
      const { error } = await this.repository.delete(id);
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Category deletion error:', error);
      throw error;
    }
  }
} 