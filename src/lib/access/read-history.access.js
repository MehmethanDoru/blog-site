import { ReadHistoryService } from '../services/read-history.service';
import { AuthService } from '../services/auth.service';

export class ReadHistoryAccess {
  constructor() {
    this.service = new ReadHistoryService();
    this.authService = new AuthService();
  }

  async addToHistory(userId, postId) {
    const session = await this.authService.getCurrentSession();
    if (!session || session.user.id !== userId) {
      throw new Error('You must be logged in to perform this action!');
    }
    return await this.service.addToHistory(userId, postId);
  }

  async getUserHistory(userId, params) {
    const session = await this.authService.getCurrentSession();
    if (!session || session.user.id !== userId) {
      throw new Error('You must be logged in to perform this action!');
    }
    return await this.service.getUserHistory(userId, params);
  }
} 