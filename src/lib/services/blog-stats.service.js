import { supabase } from '../config/supabase';

export class BlogStatsService {
  async getOverallStats() {
    try {
      // Total number of posts
      const { count: totalPosts } = await supabase
        .from('posts')
        .select('*', { count: 'exact' });

      // Number of published posts  
      const { count: publishedPosts } = await supabase
        .from('posts')
        .select('*', { count: 'exact' })
        .eq('status', 'published');

      // Number of unique authors
      const { data: authors } = await supabase
        .from('posts')
        .select('author_id')
        .not('author_id', 'is', null);
      const uniqueAuthors = new Set(authors?.map(post => post.author_id)).size;

      // Total number of views
      const { data: views } = await supabase
        .from('posts')
        .select('views');
      const totalViews = views?.reduce((sum, post) => sum + (post.views || 0), 0);

      return {
        totalPosts: totalPosts || 0,
        publishedPosts: publishedPosts || 0,
        totalAuthors: uniqueAuthors || 0,
        totalViews: totalViews || 0
      };
    } catch (error) {
      console.error('Error fetching statistics:', error);
      return {
        totalPosts: 0,
        publishedPosts: 0,
        totalAuthors: 0,
        totalViews: 0
      };
    }
  }

  async getAuthorStats(authorId) {
    try {
      // Total posts by author
      const { count: totalPosts } = await supabase
        .from('posts')
        .select('*', { count: 'exact' })
        .eq('author_id', authorId);

      // Published posts by author
      const { count: publishedPosts } = await supabase
        .from('posts')
        .select('*', { count: 'exact' })
        .eq('author_id', authorId)
        .eq('status', 'published');

      // Total views of author's posts
      const { data: views } = await supabase
        .from('posts')
        .select('views')
        .eq('author_id', authorId);
      const totalViews = views?.reduce((sum, post) => sum + (post.views || 0), 0);

      return {
        totalPosts: totalPosts || 0,
        publishedPosts: publishedPosts || 0,
        totalViews: totalViews || 0
      };
    } catch (error) {
      console.error('Error fetching author statistics:', error);
      return {
        totalPosts: 0,
        publishedPosts: 0,
        totalViews: 0
      };
    }
  }
}