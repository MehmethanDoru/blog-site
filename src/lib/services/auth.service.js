import { AuthRepository } from '../repositories/auth.repository';

export class AuthService {
  constructor() {
    this.repository = new AuthRepository();
  }

  async signUp({ email, password, name }) {
    try {
      // Önce authentication kaydı yap
      const { user, session } = await this.repository.signUp({
        email,
        password,
        name
      });

      if (!user) {
        throw new Error('Registration failed');
      }

      await this.repository.createProfile({
        id: user.id,
        email: user.email,
        name: name
      });

      await this.repository.createUserRole(user.id);

      return { user, session };
    } catch (error) {
      console.error('Registration error:', error);
      if (error.message.includes('unique constraint')) {
        throw new Error('This email address is already in use');
      }
      throw new Error(error.message || 'Registration error');
    }
  }

  async signIn({ email, password }) {
    try {
      const { data, error } = await this.repository.signIn({
        email,
        password
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Login error:', error);
      if (error.message.includes('Email not confirmed')) {
        throw new Error('Please verify your email');
      }
      throw new Error('Invalid email or password');
    }
  }

  async verifyEmail(email, token) {
    try {
      const { error } = await this.repository.verifyEmail(email, token);
      if (error) throw error;
    } catch (error) {
      console.error('Email verification error:', error);
      if (error.message.includes('Invalid token')) {
        throw new Error('Invalid or expired verification code');
      }
      throw new Error('Email verification error');
    }
  }

  async resendVerificationCode(email) {
    try {
      const { error } = await this.repository.resendVerificationCode(email);
      if (error) throw error;
    } catch (error) {
      console.error('Verification code error:', error);
      throw new Error('Verification code error');
    }
  }

  async signOut() {
    try {
      const { error } = await this.repository.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Logout error:', error);
      throw new Error('Logout error');
    }
  }

  async resetPassword(email) {
    try {
      const { error } = await this.repository.resetPassword(email);
      if (error) throw error;
    } catch (error) {
      console.error('Password reset error:', error);
      throw new Error('Password reset email error');
    }
  }


  async getCurrentSession() {
    try {
      const { data: { session }, error } = await this.repository.getSession();
      if (error) throw error;
      return session;
    } catch (error) {
      console.error('Session check error:', error);
      return null;
    }
  }
} 