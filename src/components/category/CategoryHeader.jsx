import Image from 'next/image';

const CategoryHeader = ({ data }) => {
  return (
    <div className="relative h-[300px] w-full overflow-hidden">

      <div className="absolute inset-0">
        <Image
          src={data.image || '/images/dafault-blog.webp'}
          alt={data.title}
          fill
          className="object-cover"
          priority
        />

        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-center h-full">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {data.title}
            </h1>
            <p className="text-lg text-gray-200">
              {data.description}
            </p>
            <div className="mt-6 inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full">
              <span className="text-white font-medium">
                {data.totalPosts} yazı
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryHeader; 