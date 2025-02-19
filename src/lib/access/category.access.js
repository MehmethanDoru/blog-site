import { CategoryService } from '../services/category.service';
import { AuthService } from '../services/auth.service';

export class CategoryAccess {
  constructor() {
    this.service = new CategoryService();
    this.authService = new AuthService();
  }

  // Public endpoints
  async getCategories() {
    return await this.service.getAllCategories();
  }

  async getCategoryBySlug(slug) {
    return await this.service.getCategoryBySlug(slug);
  }

  async getCategoryStats(categoryId) {
    return await this.service.getCategoryStats(categoryId);
  }

  async getTrendingTopics(limit) {
    return await this.service.getTrendingTopics(limit);
  }

  // Admin endpoints
  async createCategory(adminId, categoryData) {
    const session = await this.authService.getCurrentSession();
    if (!session || !session.user.app_metadata?.isAdmin) {
      throw new Error('This action requires admin privileges!');
    }
    return await this.service.createCategory(categoryData);
  }

  async updateCategory(adminId, categoryId, categoryData) {
    const session = await this.authService.getCurrentSession();
    if (!session || !session.user.app_metadata?.isAdmin) {
      throw new Error('This action requires admin privileges!');
    }
    return await this.service.updateCategory(categoryId, categoryData);
  }

  async deleteCategory(adminId, categoryId) {
    const session = await this.authService.getCurrentSession();
    if (!session || !session.user.app_metadata?.isAdmin) {
      throw new Error('This action requires admin privileges!');
    }
    return await this.service.deleteCategory(categoryId);
  }
} 