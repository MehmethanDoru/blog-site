import { supabase } from '../config/supabase';

export class UserRepository {
  constructor() {
    this.tableName = 'users';
  }

  // Basic CRUD operations
  async create(data) {
    return await supabase
      .from(this.tableName)
      .insert(data)
      .select()
      .single();
  }

  async update(id, data) {
    const { data: userData, error } = await supabase.auth.updateUser({
      data: {
        name: data.name,
        bio: data.bio,
        website: data.website,
        linkedin: data.linkedin,
        github: data.github,
        hackerrank: data.hackerrank,
        updated_at: new Date().toISOString()
      }
    });

    if (error) {
      console.error('Error updating user:', error);
      return { data: null, error };
    }

    return { 
      data: {
        id: userData.user.id,
        email: userData.user.email,
        name: userData.user.user_metadata?.name,
        avatar: userData.user.user_metadata?.avatar_url,
        bio: userData.user.user_metadata?.bio,
        website: userData.user.user_metadata?.website,
        linkedin: userData.user.user_metadata?.linkedin,
        github: userData.user.user_metadata?.github,
        hackerrank: userData.user.user_metadata?.hackerrank,
        updated_at: userData.user.user_metadata?.updated_at
      }, 
      error: null 
    };
  }

  async delete(id) {
    return await supabase
      .from(this.tableName)
      .delete()
      .eq('id', id);
  }

  // Custom queries
  async findById(id) {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) {
      console.error('Error getting user:', error);
      return { data: null, error };
    }

    return { 
      data: {
        id: user.id,
        email: user.email,
        name: user.user_metadata?.name,
        avatar: user.user_metadata?.avatar_url,
        bio: user.user_metadata?.bio,
        website: user.user_metadata?.website,
        linkedin: user.user_metadata?.linkedin,
        github: user.user_metadata?.github,
        hackerrank: user.user_metadata?.hackerrank,
        updated_at: user.user_metadata?.updated_at
      }, 
      error: null 
    };
  }

  async findByEmail(email) {
    return await supabase
      .from(this.tableName)
      .select('*')
      .eq('email', email)
      .single();
  }

  async getUserRole(userId) {
    return await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .single();
  }

  async updateUserRole(userId, role) {
    return await supabase
      .from('user_roles')
      .upsert({ user_id: userId, role })
      .select()
      .single();
  }

  async getUserPosts(userId, { page = 1, limit = 10 }) {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    return await supabase
      .from('posts')
      .select(`
        *,
        categories (id, name, slug)
      `, { count: 'exact' })
      .eq('author_id', userId)
      .order('created_at', { ascending: false })
      .range(from, to);
  }
} 