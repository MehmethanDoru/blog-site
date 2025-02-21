import { ReadHistoryRepository } from '../repositories/read-history.repository';

export class ReadHistoryService {
  constructor() {
    this.repository = new ReadHistoryRepository();
  }

  async addToHistory(userId, postId) {
    try {
      // Önce kaydın var olup olmadığını kontrol et
      const { data: existingRecord } = await this.repository.checkExists(userId, postId);
      
      // Eğer kayıt zaten varsa, işlemi atla
      if (existingRecord && existingRecord.length > 0) {
        console.log('Post already in read history');
        return existingRecord[0];
      }

      // Kayıt yoksa yeni kayıt oluştur
      const data = {
        user_id: userId,
        post_id: postId,
        created_at: new Date().toISOString()
      };

      const { data: history, error } = await this.repository.create(data);
      
      if (error) {
        throw error;
      }

      return history;
    } catch (error) {
      console.error('Read history creation error:', error);
      throw error;
    }
  }

  async getUserHistory(userId, params) {
    try {
      const { data: history, error, count } = await this.repository.findByUserId(userId, params);
      if (error) throw error;

      return {
        history,
        totalCount: count,
        currentPage: params.page || 1,
        totalPages: Math.ceil(count / (params.limit || 10))
      };
    } catch (error) {
      console.error('Read history get error:', error);
      throw error;
    }
  }
} 