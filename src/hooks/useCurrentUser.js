import { useState, useCallback, useEffect } from 'react';
import { debugLog } from '@/utils/debugLogger';

export default function useCurrentUser() {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  const fetchCurrentUser = useCallback(async () => {
    try {
      setUserLoading(true);
      const response = await fetch('http://localhost:5000/api/auth/me', {
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }
      
      const data = await response.json();
      setUser(data);
      debugLog('User fetched successfully:', data);
    } catch (error) {
      debugLog('Failed to fetch user:', error);
      setUser(null);
    } finally {
      setUserLoading(false);
    }
  }, []);
  
  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  return { user, userLoading, refetchUser: fetchCurrentUser };
}