import { BlogService } from '../services/blog.service';
import { AuthService } from '../services/auth.service';

export class BlogAccess {
  constructor() {
    this.service = new BlogService();
    this.authService = new AuthService();
  }

  // Public endpoints - everyone can access
  async getPosts(params) {
    return await this.service.getPosts(params);
  }

  async getPostBySlug(slug) {
    return await this.service.getPostBySlug(slug);
  }

  async getRelatedPosts(params) {
    return await this.service.getRelatedPosts(params);
  }

  async getEditorsPicks(limit) {
    return await this.service.getEditorsPicks(limit);
  }

  // Protected endpoints - member login required
  async createPost(userId, postData) {
    const session = await this.authService.getCurrentSession();
    if (!session || session.user.id !== userId) {
      throw new Error('You must be logged in to perform this action!');
    }
    return await this.service.createPost(userId, postData);
  }

  async updatePost(userId, postId, postData) {
    const session = await this.authService.getCurrentSession();
    if (!session || session.user.id !== userId) {
      throw new Error('You do not have permission to perform this action!');
    }
    return await this.service.updatePost(postId, postData);
  }

  async deletePost(userId, postId) {
    const session = await this.authService.getCurrentSession();
    if (!session || session.user.id !== userId) {
      throw new Error('You do not have permission to perform this action!');
    }
    return await this.service.deletePost(postId);
  }

  // Admin endpoints - only admin users
  async setEditorsPickStatus(adminId, postId, isEditorsPick) {
    const session = await this.authService.getCurrentSession();
    if (!session || !session.user.app_metadata?.isAdmin) {
      throw new Error('This action requires admin privileges!');
    }
    return await this.service.setEditorsPickStatus(postId, isEditorsPick);
  }
} 