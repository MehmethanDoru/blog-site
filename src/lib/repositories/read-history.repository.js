import { supabase } from '../config/supabase';

export class ReadHistoryRepository {
  constructor() {
    this.tableName = 'read_history';
  }

  async checkExists(userId, postId) {
    return await supabase
      .from(this.tableName)
      .select('*')
      .eq('user_id', userId)
      .eq('post_id', postId);
  }

  async create(data) {
    console.log('Creating read history record:', data); // Debug için

    const response = await supabase
      .from(this.tableName)
      .insert([data])
      .select()
      .single();

    console.log('Supabase response:', response); // Debug için

    if (response.error) {
      console.error('Supabase error:', response.error); // Debug için
    }

    return response;
  }

  async findByUserId(userId, { page = 1, limit = 10 }) {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    console.log('Fetching read history for user:', userId); // Debug için

    const response = await supabase
      .from(this.tableName)
      .select(`
        *,
        posts (
          id,
          title,
          slug,
          excerpt,
          image,
          created_at,
          views,
          categories (
            id,
            name,
            slug
          )
        )
      `, { count: 'exact' })
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .range(from, to);

    console.log('Read history response:', response); // Debug için

    return response;
  }
} 