import RegisterForm from '@/components/auth/RegisterForm';

export const metadata = {
  title: 'Register - Claris',
  description: 'Register to your Claris account.',
};

export default function RegisterPage() {
  return (
    <main className="gradient-background min-h-screen relative">
      <div className="content-wrapper">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto">
            <RegisterForm />
          </div>
        </div>
      </div>
    </main>
  );
} 