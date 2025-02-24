'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-hot-toast';
import { AuthService } from '@/lib/services/auth.service';

function VerifyFormContent() {
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
    if (value.length > 1) return; // Only one character
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Automatically move to the next input
    if (value !== '' && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // When the Backspace key is pressed, move to the previous input
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
      setError('Please enter the 6-digit code completely');
      setLoading(false);
      return;
    }

    try {
      const authService = new AuthService();
      await authService.verifyEmail(email, verificationCode);
      toast.success('Your email address has been verified!');
      router.push('/auth/login');
    } catch (error) {
      console.error('Verification error:', error);
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
      toast.success('New verification code sent!');
    } catch (error) {
      console.error('Code sending error:', error);
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-center mb-6">Email Verification</h1>
      
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm">
          {error}
        </div>
      )}

      <p className="text-center text-gray-600 mb-6">
        Enter the 6-digit verification code sent to {email}
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
          {loading ? 'Verifying...' : 'Verify'}
        </button>
      </form>

      <div className="mt-4 text-center">
        <button
          onClick={handleResendCode}
          className="text-sm text-indigo-600 hover:text-indigo-500"
        >
          Resend Code
        </button>
      </div>
    </div>
  );
}

export default function VerifyForm() {
  return (
    <Suspense fallback={
      <div className="bg-white p-8 rounded-lg shadow-md animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-6"></div>
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="flex justify-center space-x-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="w-12 h-12 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
          <div className="h-10 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    }>
      <VerifyFormContent />
    </Suspense>
  );
} 