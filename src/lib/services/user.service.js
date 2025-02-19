import { UserRepository } from '../repositories/user.repository';

export class UserService {
  constructor() {
    this.repository = new UserRepository();
  }

  async getUserProfile(userId) {
    try {
      const { data: profile, error } = await this.repository.findById(userId);
      if (error) throw error;
      return profile;
    } catch (error) {
      console.error('Error while getting user profile:', error);
      throw error;
    }
  }

  async getUserRole(userId) {
    try {
      const { data: role, error } = await this.repository.getUserRole(userId);
      if (error) throw error;
      return role;
    } catch (error) {
      console.error('Error while checking user role:', error);
      throw error;
    }
  }

  async updateUserRole(userId, newRole) {
    try {
      const { data: role, error } = await this.repository.updateUserRole(userId, newRole);
      if (error) throw error;
      return role;
    } catch (error) {
      console.error('Error while updating user role:', error);
      throw error;
    }
  }

  async updateUserProfile(userId, updates) {
    try {
      const { data: profile, error } = await this.repository.update(userId, updates);
      if (error) throw error;
      return profile;
    } catch (error) {
      console.error('Error while updating user profile:', error);
      throw error;
    }
  }

  async getUserPosts(userId, params) {
    try {
      const { data: posts, error, count } = await this.repository.getUserPosts(userId, params);
      if (error) throw error;

      return {
        posts,
        totalCount: count,
        currentPage: params.page || 1,
        totalPages: Math.ceil(count / (params.limit || 10))
      };
    } catch (error) {
      console.error('Error while getting user posts:', error);
      throw error;
    }
  }

  async deleteUser(userId) {
    try {
      const { error } = await this.repository.delete(userId);
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error while deleting user:', error);
      throw error;
    }
  }
} 