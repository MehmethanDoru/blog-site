import { supabase } from '../config/supabase';

export class CategoryRepository {
  constructor() {
    this.tableName = 'categories';
  }

  // Basic CRUD operations
  async create(data) {
    return await supabase
      .from(this.tableName)
      .insert([{
        name: data.name,
        slug: data.slug,
        description: data.description,
        image: data.image,
        created_at: new Date().toISOString()
      }])
      .select()
      .single();
  }

  async update(id, data) {
    const updateData = {
      name: data.name,
      slug: data.slug,
      description: data.description,
      image: data.image
    };

    return await supabase
      .from(this.tableName)
      .update(updateData)
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
  async findAll() {
    return await supabase
      .from(this.tableName)
      .select('*')
      .order('created_at', { ascending: false });
  }

  async findBySlug(slug) {
    return await supabase
      .from(this.tableName)
      .select('*')
      .eq('slug', slug)
      .single();
  }

  async getStats(categoryId) {
    try {
      // Get total posts count
      const { count: totalPosts } = await supabase
        .from('posts')
        .select('*', { count: 'exact', head: true })
        .eq('category_id', categoryId);

      // Get total views
      const { data: viewsData } = await supabase
        .from('posts')
        .select('views')
        .eq('category_id', categoryId);

      const totalViews = viewsData?.reduce((sum, post) => sum + (post.views || 0), 0) || 0;

      // Get unique authors count
      const { data: authorsData } = await supabase
        .from('posts')
        .select('author_id')
        .eq('category_id', categoryId);

      const uniqueAuthors = new Set(authorsData?.map(post => post.author_id) || []).size;

      return {
        totalPosts: totalPosts || 0,
        totalViews,
        uniqueAuthors
      };
    } catch (error) {
      console.error('Error getting category stats:', error);
      return {
        totalPosts: 0,
        totalViews: 0,
        uniqueAuthors: 0
      };
    }
  }

  async getTrendingTopics(limit = 5) {
    return await supabase
      .from('topics')
      .select('*')
      .order('post_count', { ascending: false })
      .limit(limit);
  }
} 