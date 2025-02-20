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
    return await supabase
      .from('users')
      .update({
        bio: data.bio,
        website: data.website,
        hackerrank: data.hackerrank,
        linkedin: data.linkedin,
        github: data.github,
        updated_at: data.updated_at
      })
      .eq('id', id)
      .select()
      .single();
  }

  async delete(id) {
    return await supabase
      .from(this.tableName)
      .delete()
      .eq('id', id);
  }

  // Custom queries
  async findById(id) {
    return await supabase
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .single();
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