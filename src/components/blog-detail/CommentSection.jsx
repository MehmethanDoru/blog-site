import Image from 'next/image';
import { MessageCircle } from 'lucide-react';

// Bu veriler daha sonra Supabase'den gelecek
const getComments = async (postId) => {
  return [
    {
      id: 1,
      user: {
        name: 'Ali Yılmaz',
        avatar: '/images/default-avatar.webp'
      },
      content: 'Harika bir yazı olmuş, teşekkürler! iPad Pro gerçekten etkileyici bir cihaz.',
      date: '2 saat önce'
    },
    {
      id: 2,
      user: {
        name: 'Melisanur Demir',
        avatar: '/images/default-avatar.webp'
      },
      content: 'M1 çipin performansı masaüstü bilgisayarları aratmıyor. Detaylı inceleme için teşekkürler.',
      date: '5 saat önce'
    }
  ];
};

const CommentSection = async ({ postId }) => {
  const comments = await getComments(postId);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <MessageCircle className="text-[#805aed]" />
        <h2 className="text-2xl font-bold">Yorumlar ({comments.length})</h2>
      </div>

      {/* Yorum Formu */}
      <div className="mb-8">
        <textarea
          placeholder="Yorumunuzu yazın..."
          className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#805aed] resize-none h-32"
        />
        <button className="mt-4 bg-[#805aed] text-white px-6 py-2 rounded-lg hover:bg-[#704ece] transition-colors">
          Yorum Yap
        </button>
      </div>

      {/* Yorumlar Listesi */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4">
            <div className="relative w-12 h-12 flex-shrink-0">
              <Image
                src={comment.user.avatar}
                alt={comment.user.name}
                fill
                className="rounded-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold">{comment.user.name}</h4>
                <span className="text-sm text-gray-500">{comment.date}</span>
              </div>
              <p className="text-gray-700">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection; 