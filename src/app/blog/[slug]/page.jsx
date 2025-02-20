import BlogContent from '@/components/blog-detail/BlogContent';
import AuthorCard from '@/components/blog-detail/AuthorCard';
import RelatedPosts from '@/components/blog-detail/RelatedPosts';
import CommentSection from '@/components/blog-detail/CommentSection';
import { BlogService } from '@/lib/services/blog.service';

const getBlogData = async (slug) => {
  try {
    const blogService = new BlogService();
    const post = await blogService.getPostBySlug(slug);
    
    if (!post) {
      return null;
    }

    // get related posts
    const relatedPosts = await blogService.getRelatedPosts({
      categoryId: post.category_id,
      currentPostId: post.id,
      limit: 3
    });

    return {
      post,
      relatedPosts
    };
  } catch (error) {
    console.error('blog data fetching error:', error);
    return null;
  }
};

export default async function BlogPost({ params }) {
  const data = await getBlogData(params.slug);

  if (!data || !data.post) {
    return (
      <main className="gradient-background min-h-screen relative">
        <div className="content-wrapper">
          <div className="container mx-auto px-4 py-16">
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Blog post not found
              </h1>
              <p className="text-gray-600">
                The blog post you are looking for does not exist or has been removed.
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const { post, relatedPosts } = data;

  return (
    <main className="gradient-background min-h-screen relative">
      <div className="content-wrapper">
        <div className="container mx-auto px-4 lg:px-8 py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <BlogContent data={post} />
              <div className="hidden lg:block">
                <CommentSection postId={params.slug} />
              </div>
            </div>

            <div className="lg:col-span-4 space-y-8">
              <div className="sticky top-8">
                <AuthorCard author={post.users} />
                <RelatedPosts posts={relatedPosts} />
              </div>
            </div>

            {/* comments will be shown at the bottom on mobile */}
            <div className="lg:hidden col-span-1 lg:col-span-12">
              <CommentSection postId={params.slug} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 