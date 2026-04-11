import { useContext } from 'react';
import { AuthContext } from './AuthContext';

// Custom hook untuk menggunakan AuthContext
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth harus digunakan dalam AuthProvider');
  }

  return context;
}
