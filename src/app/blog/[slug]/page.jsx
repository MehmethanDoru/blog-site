import { notFound } from 'next/navigation';
import { BlogService } from '@/lib/services/blog.service';
import BlogContent from '@/components/blog-detail/BlogContent';
// import AuthorCard from '@/components/blog-detail/AuthorCard';
import RelatedPosts from '@/components/blog-detail/RelatedPosts';
import ReadHistoryTracker from '@/components/blog-detail/ReadHistoryTracker';

// page metadata
export async function generateMetadata({ params: { slug } }) {
  try {
    const blogService = new BlogService();
    const post = await blogService.getPostBySlug(slug);

    if (!post) {
      return {
        title: 'Blog Post Not Found',
        description: 'Blog post not found or has been removed.',
      };
    }

    return {
      title: `${post.title} - Blog`,
      description: post.excerpt,
    };
  } catch (error) {
    console.error('Metadata error:', error);
    return {
      title: 'Error',
      description: 'An error occurred',
    };
  }
}

export default async function BlogPost({ params: { slug } }) {
  try {
    const blogService = new BlogService();
    const post = await blogService.getPostBySlug(slug);

    if (!post) {
      notFound();
    }

    // Get related posts
    const relatedPosts = await blogService.getRelatedPosts({
      categoryId: post.category_id,
      currentPostId: post.id,
      limit: 3
    });
    
    return (
      <main className="gradient-background min-h-screen relative">
        <div className="content-wrapper">
          <div className="container mx-auto px-4 lg:px-8 py-8 md:py-12">

            <ReadHistoryTracker postId={post.id} />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8">
                <BlogContent data={post} />
              </div>

              <div className="lg:col-span-4 space-y-8">
                <div className="sticky top-8">
                  {/* <AuthorCard author={post.users} /> */}
                  <RelatedPosts posts={relatedPosts} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  } catch (error) {
    console.error('Blog post error:', error);
    notFound();
  }
}