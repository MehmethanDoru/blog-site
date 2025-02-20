import CategoryManagement from '@/components/profile/CategoryManagement';
import ProfileSidebar from '@/components/profile/ProfileSidebar';

export const metadata = {
  title: 'Category Management - Claris',
  description: 'Claris category management panel.',
};

export default function CategoryManagementPage() {
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
              <CategoryManagement />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 