import { Suspense } from 'react';
import CategoryHeader from '@/components/category/CategoryHeader';
import CategoryFilters from '@/components/category/CategoryFilters';
import BlogList from '@/components/category/BlogList';
import CategorySidebar from '@/components/category/CategorySidebar';
import { CategoryService } from '@/lib/services/category.service';

async function getData(slug) {
  try {
    const categoryService = new CategoryService();
    const data = await categoryService.getCategoryBySlug(slug);
    
    if (!data) {
      return { notFound: true };
    }

    return { category: data };
  } catch (error) {
    console.error('Error loading category:', error);
    throw new Error('Error loading category');
  }
}

export default async function CategoryPage({ params }) {
  const { category } = await getData(params.slug);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Category not found.</div>
      </div>
    );
  }

  return (
    <main className="gradient-background min-h-screen relative">
      <div className="content-wrapper">
        <CategoryHeader data={category} />
        
        <div className="container mx-auto px-4 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <Suspense 
                fallback={
                  <div className="animate-pulse space-y-4">
                    <div className="h-10 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-[200px] bg-gray-200 rounded"></div>
                  </div>
                }
              >
                <CategoryFilters category={category} />
                <BlogList category={category} />
              </Suspense>
            </div>

            <div className="lg:col-span-4">
              <div className="sticky top-8">
                <CategorySidebar category={category.title} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 