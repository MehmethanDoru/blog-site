import { Suspense } from 'react';
import VerifyForm from '@/components/auth/VerifyForm';

export const metadata = {
  title: 'Verify - Claris',
  description: 'Verify your email address.',
};

export default function VerifyPage() {
  return (
    <main className="gradient-background min-h-screen relative">
      <div className="content-wrapper">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto">
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
              <VerifyForm />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
} 