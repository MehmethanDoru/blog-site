import { supabase } from '../config/supabase';

export class AuthRepository {
  async signUp({ email, password }) {
    return await supabase.auth.signUp({
      email,
      password
    });
  }

  async signIn({ email, password }) {
    return await supabase.auth.signInWithPassword({
      email,
      password
    });
  }

  async signOut() {
    return await supabase.auth.signOut();
  }

  async resetPassword(email) {
    return await supabase.auth.resetPasswordForEmail(email);
  }

  async updatePassword(newPassword) {
    return await supabase.auth.updateUser({
      password: newPassword
    });
  }

  async getSession() {
    return await supabase.auth.getSession();
  }

  async createProfile(userData) {
    return await supabase
      .from('users')
      .insert(userData)
      .select()
      .single();
  }

  async createUserRole(userId, role = 'user') {
    return await supabase
      .from('user_roles')
      .insert({
        user_id: userId,
        role
      });
  }
} 