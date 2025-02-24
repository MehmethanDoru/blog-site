import LoginForm from '@/components/auth/LoginForm';

export const metadata = {
  title: 'Login - Claris',
  description: 'Login to your Claris account.',
};

export default function LoginPage() {
  return (
    <main className="gradient-background min-h-screen relative">
      <div className="content-wrapper">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto">
            <LoginForm />
          </div>
        </div>
      </div>
    </main>
  );
} 