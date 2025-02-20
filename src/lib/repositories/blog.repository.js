import { supabase } from '../config/supabase';

export class BlogRepository {
  constructor() {
    this.tableName = 'posts';
  }

  // Basic CRUD operations
  async create(data) {
    const postData = {
      title: data.title,
      excerpt: data.excerpt,
      content: data.content,
      category_id: data.category_id,
      image: data.image,
      status: data.status || 'draft',
      author_id: data.author_id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      views: 0,
      slug: this.generateSlug(data.title)
    };

    return await supabase
      .from(this.tableName)
      .insert(postData)
      .select(`
        *,
        categories (id, name, slug),
        users (id, name, avatar)
      `)
      .single();
  }

  generateSlug(title) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }

  async update(id, data) {
    return await supabase
      .from(this.tableName)
      .update(data)
      .eq('id', id)
      .select(`
        *,
        categories (id, name, slug),
        users (id, name, avatar)
      `)
      .single();
  }

  async delete(id) {
    return await supabase
      .from(this.tableName)
      .delete()
      .eq('id', id);
  }

  // Custom queries
  async findAll({ page = 1, limit = 10, filter = 'latest', categoryId = null }) {
    let query = supabase
      .from(this.tableName)
      .select(`
        *,
        categories (id, name, slug),
        users (id, name, avatar)
      `, { count: 'exact' });

    if (categoryId) {
      query = query.eq('category_id', categoryId);
    }

    if (filter === 'latest') {
      query = query.order('created_at', { ascending: false });
    } else if (filter === 'popular') {
      query = query.order('views', { ascending: false });
    }

    const from = (page - 1) * limit;
    const to = from + limit - 1;
    
    return await query.range(from, to);
  }

  async findBySlug(slug) {
    return await supabase
      .from(this.tableName)
      .select(`
        *,
        categories (id, name, slug),
        users (id, name, avatar)
      `)
      .eq('slug', slug)
      .single();
  }

  async findRelated({ categoryId, currentPostId, limit = 3 }) {
    return await supabase
      .from(this.tableName)
      .select(`
        *,
        categories (id, name, slug)
      `)
      .eq('category_id', categoryId)
      .neq('id', currentPostId)
      .limit(limit);
  }

  async findEditorsPicks(limit = 3) {
    return await supabase
      .from(this.tableName)
      .select(`
        *,
        categories (id, name, slug),
        users (id, name, avatar)
      `)
      .eq('is_editors_pick', true)
      .order('created_at', { ascending: false })
      .limit(limit);
  }

  async updateEditorsPickStatus(postId, isEditorsPick) {
    return await supabase
      .from(this.tableName)
      .update({ is_editors_pick: isEditorsPick })
      .eq('id', postId)
      .select()
      .single();
  }
} 