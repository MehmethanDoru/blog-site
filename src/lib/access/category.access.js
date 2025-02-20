import { CategoryService } from '../services/category.service';
import { AuthService } from '../services/auth.service';

export class CategoryAccess {
  constructor() {
    this.service = new CategoryService();
    this.authService = new AuthService();
  }

  async getCategories() {
    return await this.service.getAllCategories();
  }

  async createCategory(userId, categoryData) {
    const session = await this.authService.getCurrentSession();
    if (!session || !session.user.app_metadata?.isAdmin) {
      throw new Error('This action requires admin privileges!');
    }
    return await this.service.createCategory(categoryData);
  }

  async updateCategory(userId, categoryId, categoryData) {
    const session = await this.authService.getCurrentSession();
    if (!session || !session.user.app_metadata?.isAdmin) {
      throw new Error('This action requires admin privileges!');
    }
    return await this.service.updateCategory(categoryId, categoryData);
  }

  async deleteCategory(userId, categoryId) {
    const session = await this.authService.getCurrentSession();
    if (!session || !session.user.app_metadata?.isAdmin) {
      throw new Error('This action requires admin privileges!');
    }
    return await this.service.deleteCategory(categoryId);
  }
} 