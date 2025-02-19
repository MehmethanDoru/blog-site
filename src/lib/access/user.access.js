import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';

export class UserAccess {
  constructor() {
    this.service = new UserService();
    this.authService = new AuthService();
  }

  // Public endpoints
  async getPublicProfile(userId) {
    return await this.service.getUserProfile(userId);
  }

  // Protected endpoints - only logged in users
  async updateOwnProfile(userId, updates) {
    const session = await this.authService.getCurrentSession();
    if (!session || session.user.id !== userId) {
      throw new Error('You do not have permission to perform this action!');
    }
    return await this.service.updateUserProfile(userId, updates);
  }

  async getOwnPosts(userId, params) {
    const session = await this.authService.getCurrentSession();
    if (!session || session.user.id !== userId) {
      throw new Error('You do not have permission to perform this action!');
    }
    return await this.service.getUserPosts(userId, params);
  }

  // Admin endpoints
  async updateUserRole(adminId, userId, newRole) {
    const session = await this.authService.getCurrentSession();
    if (!session || !session.user.app_metadata?.isAdmin) {
      throw new Error('This action requires admin privileges!');
    }
    return await this.service.updateUserRole(userId, newRole);
  }

  async deleteUser(adminId, userId) {
    const session = await this.authService.getCurrentSession();
    if (!session || !session.user.app_metadata?.isAdmin) {
      throw new Error('This action requires admin privileges!');
    }
    return await this.service.deleteUser(userId);
  }

  async getAllUserPosts(adminId, userId, params) {
    const session = await this.authService.getCurrentSession();
    if (!session || !session.user.app_metadata?.isAdmin) {
      throw new Error('This action requires admin privileges!');
    }
    return await this.service.getUserPosts(userId, params);
  }
} 