import WriteForm from '@/components/profile/write/WriteForm';
import ProfileSidebar from '@/components/profile/ProfileSidebar';

export const metadata = {
  title: 'Write Blog - Claris',
  description: 'Write a new blog post.',
};

export default function WritePage() {
  return (
    <main className="gradient-background min-h-screen relative">
      <div className="content-wrapper">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Sidebar */}
            <div className="lg:col-span-3">
              <ProfileSidebar />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-9">
              <WriteForm />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 