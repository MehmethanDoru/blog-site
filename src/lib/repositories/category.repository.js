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
      console.log('Fetching stats for category:', categoryId);

      // Get posts with count
      const { data: posts, error: postsError } = await supabase
        .from('posts')
        .select(`
          id,
          views,
          author_id
        `)
        .eq('category_id', categoryId);

      if (postsError) {
        console.error('Error fetching posts:', postsError);
        throw postsError;
      }

      // Calculate stats
      const totalPosts = posts?.length || 0;
      const totalViews = posts?.reduce((sum, post) => sum + (post.views || 0), 0) || 0;
      const uniqueAuthors = new Set(posts?.map(post => post.author_id) || []).size;

      const stats = {
        totalPosts,
        totalViews,
        uniqueAuthors
      };

      console.log('Posts found:', posts);
      console.log('Final stats:', stats);
      return stats;

    } catch (error) {
      console.error('Error getting category stats:', error);
      throw error;
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