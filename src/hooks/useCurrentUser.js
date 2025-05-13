import { useState, useCallback, useEffect } from 'react';
import { debugLog } from '@/utils/debugLogger';

const apiUrl = "http://localhost:5000";

export default function useCurrentUser() {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);
  
  const fetchCurrentUser = useCallback(async () => {
    try {
      setUserLoading(true);
      const response = await fetch(`${apiUrl}/api/v1/auth/me`, {
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }
      
      const data = await response.json();
      localStorage.setItem('user', JSON.stringify(data));
      
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