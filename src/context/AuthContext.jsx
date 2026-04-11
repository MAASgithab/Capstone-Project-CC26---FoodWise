import { createContext, useState, useEffect } from 'react';

// Buat context untuk authentication
export const AuthContext = createContext();

// Provider component untuk membungkus aplikasi
export function AuthProvider({ children }) {
  // State untuk menyimpan user yang sedang login
  const [user, setUser] = useState(null);
  // State untuk loading saat authentication process
  const [isLoading, setIsLoading] = useState(true);
  // State untuk menyimpan error message
  const [error, setError] = useState(null);

  // UseEffect untuk cek apakah user sudah login saat aplikasi dimulai
  useEffect(() => {
    // Ambil token dan user dari localStorage
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    // Jika ada token dan user, set state user
    if (storedToken && storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Selesai loading
    setIsLoading(false);
  }, []);

  // Fungsi untuk sign up
  const signup = async (namaLengkap, email, password) => {
    try {
      setError(null);
      setIsLoading(true);

      // Kirim request ke sign-up API
      // Note: Gunakan port 4000 untuk sign-up-api
      const response = await fetch('http://localhost:4000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Sign up gagal');
      }

      // Simpan token dan user ke localStorage
      localStorage.setItem('token', data.token);
      const userData = {
        user_id: data.user.user_id,
        email: data.user.email,
        nama_lengkap: namaLengkap, // Simpan nama dari form input
      };
      localStorage.setItem('user', JSON.stringify(userData));

      // Update state user
      setUser(userData);

      return { success: true, message: 'Sign up berhasil!' };
    } catch (err) {
      const errorMsg = err.message || 'Terjadi kesalahan saat sign up';
      setError(errorMsg);
      return { success: false, message: errorMsg };
    } finally {
      setIsLoading(false);
    }
  };

  // Fungsi untuk sign in
  const signin = async (email, password) => {
    try {
      setError(null);
      setIsLoading(true);

      // Kirim request ke sign-in API
      // Note: Gunakan port 3000 untuk log-in-api
      const response = await fetch('http://localhost:3000/api/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Email atau password salah');
      }

      // Simpan token dan user ke localStorage
      localStorage.setItem('token', data.token);
      const userData = {
        user_id: data.user.user_id,
        email: data.user.email,
        nama_lengkap: data.user.nama_lengkap || data.user.email, // Gunakan email sebagai fallback
      };
      localStorage.setItem('user', JSON.stringify(userData));

      // Update state user
      setUser(userData);

      return { success: true, message: 'Login berhasil!' };
    } catch (err) {
      const errorMsg = err.message || 'Terjadi kesalahan saat login';
      setError(errorMsg);
      return { success: false, message: errorMsg };
    } finally {
      setIsLoading(false);
    }
  };

  // Fungsi untuk logout
  const logout = () => {
    // Hapus token dan user dari localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // Reset state user
    setUser(null);
    setError(null);
  };

  // Value untuk diberikan ke context
  const value = {
    user,
    isLoading,
    error,
    signup,
    signin,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

