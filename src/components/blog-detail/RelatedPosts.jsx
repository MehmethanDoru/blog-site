import Image from 'next/image';
import Link from 'next/link';

// Bu veriler daha sonra Supabase'den gelecek
const getRelatedPosts = async (category, currentPostId) => {
  return [
    {
      id: '1',
      title: 'MacBook Air M2: The Perfect Laptop for Most People',
      image: '/images/dafault-blog.webp',
      category: 'GADGET',
      date: 'July 10, 2021',
      slug: 'macbook-air-m2-the-perfect-laptop'
    },
    {
      id: '2', 
      title: 'iPhone 14 Pro Review: The Dynamic Island Life',
      image: '/images/dafault-blog.webp',
      category: 'GADGET',
      date: 'July 15, 2021',
      slug: 'iphone-14-pro-review'
    },
    {
      id: '3',
      title: 'AirPods Pro 2: Better in Every Way',
      image: '/images/default-post.jpg',
      category: 'GADGET',
      date: 'July 20, 2021',
      slug: 'airpods-pro-2-review'
    }
  ];
};

const RelatedPosts = async ({ category, currentPostId }) => {
  const relatedPosts = await getRelatedPosts(category, currentPostId);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold mb-6">İlgili Yazılar</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedPosts.map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`}>
            <div className="group cursor-pointer">
              <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div>
                <span className="text-[#805aed] text-sm font-semibold">
                  {post.category}
                </span>
                <h3 className="font-bold mt-2 group-hover:text-[#805aed] transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm mt-2">{post.date}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedPosts;