import { supabase } from '../config/supabase';

export class BlogRepository {
  constructor() {
    this.tableName = 'posts';
  }

  async create(data) {
    return await supabase
      .from(this.tableName)
      .insert([data])
      .select()
      .single();
  }

  generateSlug(title) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }

  async update(id, data) {
    return await supabase
      .from(this.tableName)
      .update(data)
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

  async findAll({ page = 1, limit = 10, filter = 'latest', categoryId = null }) {
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    let query = supabase
      .from('posts')
      .select(`
        id,
        title,
        excerpt,
        slug,
        views,
        created_at,
        updated_at,
        image,
        author_id,
        categories (
          id,
          name,
          slug
        )
      `, { count: 'exact' });

    if (categoryId) {
      query = query.eq('category_id', categoryId);
    }

    if (filter === 'latest') {
      query = query.order('created_at', { ascending: false });
    } else if (filter === 'popular') {
      query = query.order('views', { ascending: false });
    }

    const { data: posts, error, count } = await query.range(from, to);

    if (error) {
      console.error('Error fetching posts:', error);
      return { data: null, error, count: 0 };
    }

    // Yazarları ayrı bir sorgu ile alalım
    const authorIds = posts.map(post => post.author_id);
    const { data: authors } = await supabase.auth.admin.listUsers();
    const authorsMap = authors?.users?.reduce((acc, user) => {
      acc[user.id] = {
        id: user.id,
        name: user.user_metadata?.name || user.email,
        avatar: user.user_metadata?.avatar_url
      };
      return acc;
    }, {});

    // Post verilerine yazarları ekleyelim
    const postsWithAuthors = posts.map(post => ({
      ...post,
      author: authorsMap[post.author_id]
    }));

    return { data: postsWithAuthors, error: null, count };
  }

  async findBySlug(slug) {
    console.log('Searching for blog post with slug:', slug);

    const { data: post, error } = await supabase
      .from(this.tableName)
      .select(`
        *,
        categories (
          id,
          name,
          slug
        )
      `)
      .eq('slug', slug)
      .single();

    if (error) {
      console.error('Blog post query error:', error);
      return { data: null, error };
    }

    if (!post) {
      console.log('No blog post found with slug:', slug);
      return { data: null, error: null };
    }

    // Yazarı ayrı bir sorgu ile alalım
    const { data: { user }, error: userError } = await supabase.auth.admin.getUserById(post.author_id);
    
    if (!userError && user) {
      post.author = {
        id: user.id,
        name: user.user_metadata?.name || user.email,
        avatar: user.user_metadata?.avatar_url,
        bio: user.user_metadata?.bio,
        website: user.user_metadata?.website,
        linkedin: user.user_metadata?.linkedin,
        github: user.user_metadata?.github
      };
    }

    console.log('Found blog post:', post);
    return { data: post, error: null };
  }

  async findRelated({ categoryId, currentPostId, limit = 3 }) {
    const { data: posts, error } = await supabase
      .from(this.tableName)
      .select(`
        *,
        categories (
          id,
          name,
          slug
        )
      `)
      .eq('category_id', categoryId)
      .neq('id', currentPostId)
      .limit(limit);

    if (error) {
      console.error('Error fetching related posts:', error);
      return { data: null, error };
    }

    // Yazarları ayrı bir sorgu ile alalım
    const authorIds = posts.map(post => post.author_id);
    const { data: authors } = await supabase.auth.admin.listUsers();
    const authorsMap = authors?.users?.reduce((acc, user) => {
      acc[user.id] = {
        id: user.id,
        name: user.user_metadata?.name || user.email,
        avatar: user.user_metadata?.avatar_url
      };
      return acc;
    }, {});

    // Post verilerine yazarları ekleyelim
    const postsWithAuthors = posts.map(post => ({
      ...post,
      author: authorsMap[post.author_id]
    }));

    return { data: postsWithAuthors, error: null };
  }

  async findEditorsPicks(limit = 3) {
    return await supabase
      .from(this.tableName)
      .select(`
        *,
        categories (
          id,
          name,
          slug
        ),
        users (
          id,
          name,
          avatar
        )
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

  async incrementViews(slug) {
    try {
      const { data: post, error: findError } = await supabase
        .from(this.tableName)
        .select('views')
        .eq('slug', slug)
        .single();

      if (findError) {
        console.error('Error finding post:', findError);
        return null;
      }

      const { data: updatedPost, error: updateError } = await supabase
        .from(this.tableName)
        .update({ 
          views: (post?.views || 0) + 1 
        })
        .eq('slug', slug)
        .select()
        .single();

      if (updateError) {
        console.error('Error updating views:', updateError);
        return null;
      }

      return updatedPost;
    } catch (error) {
      console.error('View increment error:', error);
      return null;
    }
  }
}