import BlogContent from '@/components/blog-detail/BlogContent';
import AuthorCard from '@/components/blog-detail/AuthorCard';
import RelatedPosts from '@/components/blog-detail/RelatedPosts';
import CommentSection from '@/components/blog-detail/CommentSection';

// Bu veriler daha sonra Supabase'den gelecek
const getBlogData = async (slug) => {
  return {
    title: "iPad Pro M1 Chip: Bringing The MacBook Pro Power",
    category: "GADGET",
    author: {
      name: "Mehmethan Doru",
      avatar: "/images/default-avatar.webp",
      bio: "Frontend Developer & Tech Enthusiast",
      social: {
        website: "https://mehmethandoru.com",
        linkedin: "https://linkedin.com/in/mehmethandoru",
        github: "https://github.com/mehmethandoru"
      }
    },
    date: "July 7, 2021",
    content: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    `,
    image: "/images/dafault-blog.webp",
    views: 12453
  };
};

export default async function BlogPost({ params }) {
  const blogData = await getBlogData(params.slug);

  return (
    <main className="gradient-background min-h-screen relative">
      <div className="content-wrapper">
        <div className="container mx-auto px-4 lg:px-8 py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Ana içerik - 8 sütun */}
            <div className="lg:col-span-8">
              <BlogContent data={blogData} />
              <div className="hidden lg:block">
                <CommentSection postId={params.slug} />
              </div>
            </div>

            {/* Yan panel - 4 sütun */}
            <div className="lg:col-span-4 space-y-8">
              <div className="sticky top-8">
                <AuthorCard author={blogData.author} />
                <RelatedPosts 
                  category={blogData.category} 
                  currentPostId={params.slug}
                />
              </div>
            </div>

            {/* Mobilde en altta görünecek yorumlar */}
            <div className="lg:hidden col-span-1 lg:col-span-12">
              <CommentSection postId={params.slug} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 