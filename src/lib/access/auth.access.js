import { AuthService } from '../services/auth.service';

export class AuthAccess {
  constructor() {
    this.service = new AuthService();
  }

  // Public endpoints
  async register(userData) {
    return await this.service.signUp(userData);
  }

  async login(credentials) {
    return await this.service.signIn(credentials);
  }

  async logout() {
    return await this.service.signOut();
  }

  async forgotPassword(email) {
    return await this.service.resetPassword(email);
  }

  // Protected endpoints - only logged in users
  async changePassword(userId, newPassword) {
    const session = await this.service.getCurrentSession();
    if (!session || session.user.id !== userId) {
      throw new Error('You do not have permission to perform this action!');
    }
    return await this.service.updatePassword(newPassword);
  }

  // Admin endpoints
  async resetUserPassword(adminId, userId, newPassword) {
    const session = await this.service.getCurrentSession();
    if (!session || !session.user.app_metadata?.isAdmin) {
      throw new Error('This action requires admin privileges!');
    }
  }
} 