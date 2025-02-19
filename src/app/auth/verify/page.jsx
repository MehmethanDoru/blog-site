import VerifyForm from '@/components/auth/VerifyForm';

export const metadata = {
  title: 'E-posta Doğrulama - TechWire',
  description: 'E-posta adresinizi doğrulayın.',
};

export default function VerifyPage() {
  return (
    <main className="gradient-background min-h-screen relative">
      <div className="content-wrapper">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto">
            <VerifyForm />
          </div>
        </div>
      </div>
    </main>
  );
} 