import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

// Component untuk melindungi routes yang memerlukan authentication
export default function ProtectedRoute({ children }) {
  // Ambil isAuthenticated dari AuthContext
  const { isAuthenticated, isLoading } = useAuth();

  // Jika masih loading, tampilkan loading screen
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-lg text-gray-600">Memuat...</p>
        </div>
      </div>
    );
  }

  // Jika user belum login, redirect ke halaman Authentication
  if (!isAuthenticated) {
    return <Navigate to="/pendaftaran" replace />;
  }

  // Jika user sudah login, tampilkan halaman
  return children;
}
