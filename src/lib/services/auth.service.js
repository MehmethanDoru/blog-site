import { AuthRepository } from '../repositories/auth.repository';

export class AuthService {
  constructor() {
    this.repository = new AuthRepository();
  }

  async signUp({ email, password, name }) {
    try {
      // Create user
      const { data: auth, error: signUpError } = await this.repository.signUp({
        email,
        password
      });

      if (signUpError) throw signUpError;

      // Create user profile
      if (auth.user) {
        const { error: profileError } = await this.repository.createProfile({
          id: auth.user.id,
          name,
          email,
          avatar: '/images/default-avatar.webp'
        });

        if (profileError) throw profileError;

        // Assign default user role
        const { error: roleError } = await this.repository.createUserRole(auth.user.id);

        if (roleError) throw roleError;
      }

      return auth;
    } catch (error) {
      console.error('Error while signing up:', error);
      throw error;
    }
  }

  async signIn({ email, password }) {
    try {
      const { data, error } = await this.repository.signIn({ email, password });
      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error while signing in:', error);
      throw error;
    }
  }

  async signOut() {
    try {
      const { error } = await this.repository.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Error while signing out:', error);
      throw error;
    }
  }

  async resetPassword(email) {
    try {
      const { error } = await this.repository.resetPassword(email);
      if (error) throw error;
    } catch (error) {
      console.error('Error while sending password reset email:', error);
      throw error;
    }
  }

  async updatePassword(newPassword) {
    try {
      const { error } = await this.repository.updatePassword(newPassword);
      if (error) throw error;
    } catch (error) {
      console.error('Error while updating password:', error);
      throw error;
    }
  }

  async getCurrentSession() {
    try {
      const { data: { session }, error } = await this.repository.getSession();
      if (error) throw error;
      return session;
    } catch (error) {
      console.error('Error while checking session:', error);
      throw error;
    }
  }
} 