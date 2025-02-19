import { supabase } from '../config/supabase';

export class AuthRepository {
  async signUp({ email, password, name }) {

    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name
        },
        emailRedirectTo: `${window.location.origin}/auth/verify`
      }
    });

    if (signUpError) throw signUpError;

    return authData;
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

  async verifyEmail(email, token) {
    return await supabase.auth.verifyOtp({
      email,
      token,
      type: 'email'
    });
  }

  async resendVerificationCode(email) {
    return await supabase.auth.resend({
      email,
      type: 'signup'
    });
  }

  async resetPassword(email) {
    return await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/reset-password`
    });
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