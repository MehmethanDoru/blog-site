import ReadHistoryList from '@/components/profile/read-history/ReadHistoryList';
import ProfileSidebar from '@/components/profile/ProfileSidebar';

export const metadata = {
  title: 'Read History - Claris',
  description: 'View your reading history.',
};

export default function ReadHistoryPage() {
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
              <ReadHistoryList />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}