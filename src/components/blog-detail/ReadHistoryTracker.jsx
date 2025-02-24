'use client';

import { useEffect } from 'react';
import { AuthService } from '@/lib/services/auth.service';
import { ReadHistoryService } from '@/lib/services/read-history.service';

export default function ReadHistoryTracker({ postId }) {
  useEffect(() => {
    let timeoutId;
    
    const trackReading = async () => {
      try {
        const authService = new AuthService();
        const session = await authService.getCurrentSession();
        
        if (session?.user?.id) {
          console.log('Adding to read history after 3 seconds of reading');
          const readHistoryService = new ReadHistoryService();
          await readHistoryService.addToHistory(session.user.id, postId);
        }
      } catch (error) {
        console.error('Failed to add to read history:', error);
      }
    };

    // after 3 seconds of reading
    timeoutId = setTimeout(trackReading, 3000);

    // when component unmounts
    return () => clearTimeout(timeoutId);
  }, [postId]);

  return null;
} 