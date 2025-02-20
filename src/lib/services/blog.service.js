import { BlogRepository } from '../repositories/blog.repository';

export class BlogService {
  constructor() {
    this.repository = new BlogRepository();
  }

  async getPosts(params) {
    try {
      const { data: posts, error, count } = await this.repository.findAll(params);
      
      if (error) throw error;

      return {
        posts,
        totalCount: count,
        currentPage: params.page || 1,
        totalPages: Math.ceil(count / (params.limit || 10))
      };
    } catch (error) {
      console.error('Blog posts get error:', error);
      throw error;
    }
  }

  async getPostBySlug(slug) {
    try {
      const { data: post, error } = await this.repository.findBySlug(slug);
      
      if (error) throw error;
      
      await this.repository.incrementViews(slug);
      
      return post;
    } catch (error) {
      console.error('Blog post get error:', error);
      throw error;
    }
  }

  async getRelatedPosts(params) {
    try {
      const { data: posts, error } = await this.repository.findRelated(params);
      
      if (error) throw error;
      
      return posts;
    } catch (error) {
      console.error('Related posts get error:', error);
      throw error;
    }
  }

  async createPost(userId, postData) {
    try {
      const { data: post, error } = await this.repository.create({
        ...postData,
        author_id: userId,
        created_at: new Date().toISOString()
      });
      if (error) throw error;
      return post;
    } catch (error) {
      console.error('Blog post creation error:', error);
      throw error;
    }
  }

  async updatePost(postId, postData) {
    try {
      const { data: post, error } = await this.repository.update(postId, {
        ...postData,
        updated_at: new Date().toISOString()
      });
      if (error) throw error;
      return post;
    } catch (error) {
      console.error('Blog post update error:', error);
      throw error;
    }
  }

  async deletePost(postId) {
    try {
      const { error } = await this.repository.delete(postId);
      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Blog post deletion error:', error);
      throw error;
    }
  }

  async getEditorsPicks(limit) {
    try {
      const { data: posts, error } = await this.repository.findEditorsPicks(limit);
      
      if (error) throw error;
      
      return posts;
    } catch (error) {
      console.error('Editors picks get error:', error);
      throw error;
    }
  }

  async setEditorsPickStatus(postId, isEditorsPick) {
    try {
      const { data: post, error } = await this.repository.updateEditorsPickStatus(postId, isEditorsPick);
      if (error) throw error;
      return post;
    } catch (error) {
      console.error('Editors pick update error:', error);
      throw error;
    }
  }
} 