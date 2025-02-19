import CategoryHeader from '@/components/category/CategoryHeader';
import CategoryFilters from '@/components/category/CategoryFilters';
import BlogList from '@/components/category/BlogList';
import CategorySidebar from '@/components/category/CategorySidebar';

const getCategoryData = async (slug) => {
  const categories = {
    technology: {
      title: 'Technology',
      description: 'Latest news and insights about technology, innovations, and digital transformation.',
      totalPosts: 156,
      image: '/images/categories/technology.webp'
    },
    gadget: {
      title: 'Gadget',
      description: 'Reviews, comparisons and guides about the latest gadgets and consumer electronics.',
      totalPosts: 89,
      image: '/images/categories/gadget.webp'
    },
    software: {
      title: 'Software',
      description: 'Everything about software development, programming languages, and tools.',
      totalPosts: 124,
      image: '/images/categories/software.webp'
    },
    games: {
      title: 'Games',
      description: 'Gaming news, reviews, and in-depth analysis of the latest releases.',
      totalPosts: 93,
      image: '/images/categories/games.webp'
    }
  };

  return categories[slug] || null;
};

const getCategoryPosts = async (slug, page = 1, filter = 'latest') => {
  return {
    posts: [
      {
        id: 1,
        title: 'The Future of AI: GPT-4 and Beyond',
        excerpt: 'Exploring the latest developments in artificial intelligence and what the future holds...',
        author: 'Mehmethan Doru',
        date: '3 gün önce',
        image: '/images/dafault-blog.webp',
        slug: 'future-of-ai-gpt4',
        views: 1234,
        readTime: '5 dk'
      },
      {
        id: 2,
        title: 'Web Development Trends in 2024',
        excerpt: 'A comprehensive look at the most important web development trends this year...',
        author: 'Mehmethan Doru',
        date: '5 gün önce',
        image: '/images/dafault-blog.webp',
        slug: 'web-development-trends-2024',
        views: 2345,
        readTime: '7 dk'
      },
      {
        id: 3,
        title: 'Understanding Blockchain Technology',
        excerpt: 'A beginner-friendly guide to blockchain technology and its applications...',
        author: 'Mehmethan Doru',
        date: '1 hafta önce',
        image: '/images/dafault-blog.webp',
        slug: 'understanding-blockchain',
        views: 3456,
        readTime: '10 dk'
      }
    ],
    pagination: {
      currentPage: page,
      totalPages: 12,
      totalPosts: 156
    }
  };
};

export default async function CategoryPage({ params, searchParams }) {
  const { slug } = params;
  const page = parseInt(searchParams.page) || 1;
  const filter = searchParams.filter || 'latest';

  const categoryData = await getCategoryData(slug);
  const { posts, pagination } = await getCategoryPosts(slug, page, filter);

  if (!categoryData) {
    return <div>Kategori bulunamadı.</div>;
  }

  return (
    <main className="gradient-background min-h-screen relative">
      <div className="content-wrapper">
        <CategoryHeader data={categoryData} />
        
        <div className="container mx-auto px-4 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            <div className="lg:col-span-8">
              <CategoryFilters 
                totalPosts={pagination.totalPosts} 
                currentFilter={filter}
              />
              <BlogList 
                posts={posts} 
                pagination={pagination}
              />
            </div>

            <div className="lg:col-span-4">
              <div className="sticky top-8">
                <CategorySidebar category={categoryData.title} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 