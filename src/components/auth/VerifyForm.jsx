'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { AuthService } from '@/lib/services/auth.service';

export default function VerifyForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const emailParam = searchParams.get('email');
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  const handleCodeChange = (index, value) => {
    if (value.length > 1) return; // Sadece tek karakter
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Otomatik olarak sonraki input'a geç
    if (value !== '' && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Backspace tuşuna basıldığında önceki input'a geç
    if (e.key === 'Backspace' && index > 0 && code[index] === '') {
      const prevInput = document.getElementById(`code-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const verificationCode = code.join('');
    if (verificationCode.length !== 6) {
      setError('Lütfen 6 haneli kodu eksiksiz girin');
      setLoading(false);
      return;
    }

    try {
      const authService = new AuthService();
      await authService.verifyEmail(email, verificationCode);
      toast.success('E-posta adresiniz doğrulandı!');
      router.push('/auth/login');
    } catch (error) {
      console.error('Doğrulama hatası:', error);
      setError(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendCode = async () => {
    try {
      const authService = new AuthService();
      await authService.resendVerificationCode(email);
      toast.success('Yeni doğrulama kodu gönderildi!');
    } catch (error) {
      console.error('Kod gönderme hatası:', error);
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">E-posta Doğrulama</h1>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm">
          {error}
        </div>
      )}

      <p className="text-center text-gray-600 mb-6">
        {email} adresine gönderilen 6 haneli doğrulama kodunu girin
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-center space-x-2">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`code-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleCodeChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 text-center text-lg font-semibold border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Doğrulanıyor...' : 'Doğrula'}
        </button>
      </form>

      <div className="mt-4 text-center">
        <button
          onClick={handleResendCode}
          className="text-sm text-indigo-600 hover:text-indigo-500"
        >
          Kodu tekrar gönder
        </button>
      </div>
    </div>
  );
} 